import { createSignal, createUniqueId, onCleanup, onMount, Show } from 'solid-js';
import type { Component, JSX } from 'solid-js';
import type { BufferGeometry, LightShadow, Material, Object3D, Skeleton, Texture } from 'three';
import './RobotStage.css';

export interface RobotStageProps {
  variant?: 'hero' | 'explorer';
  class?: string;
  poster?: string;
  showControls?: boolean;
}

type StageState = 'poster' | 'loading' | 'ready' | 'error';
type Viewer = {
  dispose: () => void;
  refresh: () => void;
  resize: () => void;
  rotate: (horizontal: number, vertical?: number) => void;
  reset: () => void;
};

const mediaUrl = (name: string) => `${import.meta.env.BASE_URL}media/${name}`;

/** Observe every result, even when cancellation wins the race. */
function withCancellation<T>(pending: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    const aborted = () => {
      signal.removeEventListener('abort', aborted);
      reject(signal.reason ?? new DOMException('Robot loading cancelled.', 'AbortError'));
    };
    signal.addEventListener('abort', aborted, { once: true });
    pending.then((value) => {
      signal.removeEventListener('abort', aborted);
      resolve(value);
    }, (error) => {
      signal.removeEventListener('abort', aborted);
      reject(error);
    });
    if (signal.aborted) aborted();
  });
}

/** GLTF resources belong to this view, including shared materials and ImageBitmaps. */
function disposeObjects(roots: Object3D[]) {
  const geometries = new Set<BufferGeometry>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();
  const skeletons = new Set<Skeleton>();
  const shadows = new Set<LightShadow>();
  const bitmaps = new Set<ImageBitmap>();

  for (const root of roots) {
    root.traverse((object) => {
      const mesh = object as Object3D & {
        geometry?: BufferGeometry;
        material?: Material | Material[];
        skeleton?: Skeleton;
        shadow?: LightShadow;
      };
      if (mesh.geometry) geometries.add(mesh.geometry);
      if (mesh.skeleton) skeletons.add(mesh.skeleton);
      if (mesh.shadow) shadows.add(mesh.shadow);
      if (mesh.material) {
        for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
          materials.add(material);
          for (const value of Object.values(material)) {
            if (value && typeof value === 'object' && (value as Texture).isTexture) {
              textures.add(value as Texture);
            }
          }
        }
      }
    });
  }
  for (const texture of textures) {
    const images: unknown[] = Array.isArray(texture.image) ? texture.image : [texture.image];
    for (const image of images) {
      if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) bitmaps.add(image);
    }
    texture.dispose();
  }
  for (const bitmap of bitmaps) bitmap.close();
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  for (const skeleton of skeletons) skeleton.dispose();
  for (const shadow of shadows) shadow.dispose();
}

const RobotStage: Component<RobotStageProps> = (props) => {
  const instructionsId = `robot-stage-${createUniqueId()}`;
  const [state, setState] = createSignal<StageState>('poster');
  const [message, setMessage] = createSignal('');
  const [posterMissing, setPosterMissing] = createSignal(false);
  let stage!: HTMLDivElement;
  let viewport!: HTMLDivElement;
  let activateButton: HTMLButtonElement | undefined;
  let viewer: Viewer | undefined;
  let controller: AbortController | undefined;
  let disposed = false;
  let generation = 0;
  let inView = true;
  let reducedMotion = false;

  const isHero = () => props.variant !== 'explorer';
  const canRender = () => !disposed && inView && !document.hidden;

  const releaseViewer = () => {
    controller?.abort();
    controller = undefined;
    viewer?.dispose();
    viewer = undefined;
  };

  const closeViewer = () => {
    generation += 1;
    releaseViewer();
    setState('poster');
    setMessage('Image view.');
  };

  const activate = async () => {
    if (state() === 'loading') return;
    if (state() === 'ready') {
      closeViewer();
      return;
    }
    const run = ++generation;
    releaseViewer();
    setState('loading');
    setMessage('Loading the interactive robot.');
    const abortController = new AbortController();
    controller = abortController;
    const loadTimeout = window.setTimeout(() => {
      abortController.abort(new Error('Robot loading exceeded 45 seconds.'));
    }, 45_000);
    let cleanupAttempt: (() => void) | undefined;

    try {
      // No renderer, model, or Three.js JavaScript is loaded before activation.
      const [THREE, { OrbitControls }, { GLTFLoader }, { DRACOLoader }, { RoomEnvironment }, modelData] = await withCancellation(Promise.all([
        import('three'),
        import('three/addons/controls/OrbitControls.js'),
        import('three/addons/loaders/GLTFLoader.js'),
        import('three/addons/loaders/DRACOLoader.js'),
        import('three/addons/environments/RoomEnvironment.js'),
        fetch(mediaUrl('pushback.glb'), { signal: abortController.signal }).then((response) => {
          if (!response.ok) throw new Error(`Model request failed: ${response.status}`);
          return response.arrayBuffer();
        }),
      ]), abortController.signal);
      if (disposed || run !== generation) return;

      type DecoderWorker = Worker & {
        _callbacks: Record<string, { reject: (error: unknown) => void }>;
      };
      type DecoderInternals = {
        _initDecoder: () => Promise<void>;
        _getWorker: (taskId: number, taskCost: number) => Promise<DecoderWorker>;
      };
      const decoderInternals = DRACOLoader.prototype as unknown as DecoderInternals;

      // r186 dispose() does not cancel initialization or reject worker tasks.
      // These two version-pinned hooks keep this loader's lifetime explicit.
      class OwnedDRACOLoader extends DRACOLoader {
        private stopped = false;
        private workers = new Set<DecoderWorker>();
        private workerError = (event: ErrorEvent) => {
          event.preventDefault();
          abortController.abort(new Error('The robot decoder could not start.'));
          this.dispose();
        };

        _initDecoder() {
          const pending = this.stopped
            ? Promise.reject(new DOMException('Robot decoder cancelled.', 'AbortError'))
            : decoderInternals._initDecoder.call(this).then(() => {
              if (this.stopped) {
                // Initialization may have created its Blob URL after disposal.
                super.dispose();
                throw new DOMException('Robot decoder cancelled.', 'AbortError');
              }
            });
          // GLTFLoader calls preload(), which does not observe this promise.
          void pending.catch(() => undefined);
          return pending;
        }

        _getWorker(taskId: number, taskCost: number) {
          return decoderInternals._getWorker.call(this, taskId, taskCost).then((worker) => {
            if (this.stopped) {
              worker.terminate();
              super.dispose();
              throw new DOMException('Robot decoder cancelled.', 'AbortError');
            }
            if (!this.workers.has(worker)) {
              this.workers.add(worker);
              worker.addEventListener('error', this.workerError);
            }
            return worker;
          });
        }

        override dispose() {
          this.stopped = true;
          const reason = abortController.signal.reason ?? new DOMException('Robot decoder disposed.', 'AbortError');
          for (const worker of this.workers) {
            worker.removeEventListener('error', this.workerError);
            for (const callback of Object.values(worker._callbacks)) callback.reject(reason);
          }
          this.workers.clear();
          // Repeat the base cleanup to catch any initialization that settled late.
          return super.dispose();
        }
      }

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'default' });
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 100);
      let controls: InstanceType<typeof OrbitControls> | undefined;
      let environment: ReturnType<InstanceType<typeof THREE.PMREMGenerator>['fromScene']> | undefined;
      let draco: OwnedDRACOLoader | undefined;
      const loadingManager = new THREE.LoadingManager();
      let frame = 0;
      let closed = false;
      let ready = false;
      let radius = 1;
      let lastAspect = 0;
      let loadedScenes: Object3D[] = [];
      const canvas = renderer.domElement;
      const touchPointers = new Set<number>();
      let touchDrag: { id: number; startX: number; startY: number; lastX: number; direction: 'pending' | 'horizontal' | 'vertical' } | undefined;

      const failed = () => {
        if (closed || disposed || run !== generation) return;
        const restoreFocus = stage.contains(document.activeElement);
        generation += 1;
        releaseViewer();
        setState('error');
        setMessage('The 3D view is unavailable. You can still see the robot image or try again.');
        if (restoreFocus) activateButton?.focus({ preventScroll: true });
      };

      const requestRender = () => {
        if (!frame && !closed && ready && canRender()) frame = requestAnimationFrame(render);
      };

      function render() {
        frame = 0;
        if (closed || !ready || !canRender()) return;
        try {
          controls?.update();
          renderer.render(scene, camera);
        } catch {
          failed();
        }
      }

      const rotate = (horizontal: number, vertical = 0) => {
        if (!ready || closed || !controls) return;
        controls.rotateLeft(horizontal);
        if (vertical) controls.rotateUp(vertical);
        requestRender();
      };

      // OrbitControls owns mouse input. Touch uses horizontal movement only,
      // leaving vertical panning and browser pinch zoom to the page.
      const touchStart = (event: PointerEvent) => {
        if (event.pointerType !== 'touch') return;
        event.stopImmediatePropagation();
        touchPointers.add(event.pointerId);
        touchDrag = touchPointers.size === 1
          ? { id: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, direction: 'pending' }
          : undefined;
      };
      const touchMove = (event: PointerEvent) => {
        if (event.pointerType !== 'touch') return;
        event.stopImmediatePropagation();
        if (!touchDrag || touchDrag.id !== event.pointerId || touchPointers.size !== 1) return;
        const dx = event.clientX - touchDrag.startX;
        const dy = event.clientY - touchDrag.startY;
        if (touchDrag.direction === 'pending' && Math.max(Math.abs(dx), Math.abs(dy)) > 7) {
          touchDrag.direction = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
        }
        if (touchDrag.direction === 'horizontal') {
          rotate(((event.clientX - touchDrag.lastX) / Math.max(1, canvas.clientWidth)) * Math.PI * 1.7);
        }
        touchDrag.lastX = event.clientX;
      };
      const touchEnd = (event: PointerEvent) => {
        if (event.pointerType !== 'touch') return;
        event.stopImmediatePropagation();
        touchPointers.delete(event.pointerId);
        if (touchDrag?.id === event.pointerId) touchDrag = undefined;
      };
      const contextLost = (event: Event) => {
        event.preventDefault();
        failed();
      };

      cleanupAttempt = () => {
        if (closed) return;
        closed = true;
        cancelAnimationFrame(frame);
        canvas.removeEventListener('webglcontextlost', contextLost);
        canvas.removeEventListener('pointerdown', touchStart, true);
        canvas.removeEventListener('pointermove', touchMove, true);
        canvas.removeEventListener('pointerup', touchEnd, true);
        canvas.removeEventListener('pointercancel', touchEnd, true);
        canvas.removeEventListener('lostpointercapture', touchEnd, true);
        controls?.removeEventListener('change', requestRender);
        controls?.dispose();
        loadingManager.abort();
        draco?.dispose();
        disposeObjects([scene, ...loadedScenes]);
        scene.environment = null;
        environment?.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        canvas.remove();
      };

      const fitCamera = () => {
        const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
        const limitingFov = Math.min(halfFov, Math.atan(Math.tan(halfFov) * camera.aspect));
        const distance = (radius / Math.sin(limitingFov)) * 1.06;
        const direction = camera.position.clone().sub(controls!.target).normalize();
        camera.position.copy(controls!.target).addScaledVector(direction, distance);
        camera.near = Math.max(0.01, distance - radius * 2.5);
        camera.far = distance + radius * 6;
        camera.updateProjectionMatrix();
        controls!.update();
        controls!.saveState();
        controls!.position0.set(0.94, 0.79, -1.07).normalize().multiplyScalar(distance).add(controls!.target);
      };

      viewer = {
        dispose: cleanupAttempt,
        rotate,
        reset: () => {
          if (controls) {
            // Flush old angular deltas before returning to the saved camera.
            const damping = controls.enableDamping;
            controls.enableDamping = false;
            controls.update();
            controls.reset();
            controls.enableDamping = damping;
          }
          requestRender();
        },
        refresh: () => {
          if (controls) {
            controls.enabled = canRender() && ready;
            controls.enableDamping = !reducedMotion;
          }
          if (!canRender()) {
            cancelAnimationFrame(frame);
            frame = 0;
          } else requestRender();
        },
        resize: () => {
          if (closed) return;
          const width = Math.max(1, viewport.clientWidth);
          const height = Math.max(1, viewport.clientHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          if (ready && Math.abs(lastAspect - camera.aspect) > 0.01) fitCamera();
          lastAspect = camera.aspect;
          requestRender();
        },
      };

      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.82;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.shadowMap.autoUpdate = false;
      canvas.setAttribute('aria-hidden', 'true');
      canvas.addEventListener('webglcontextlost', contextLost);
      canvas.addEventListener('pointerdown', touchStart, true);
      canvas.addEventListener('pointermove', touchMove, true);
      canvas.addEventListener('pointerup', touchEnd, true);
      canvas.addEventListener('pointercancel', touchEnd, true);
      canvas.addEventListener('lostpointercapture', touchEnd, true);
      viewport.append(canvas);

      controls = new OrbitControls(camera, canvas);
      canvas.style.touchAction = 'pan-y pinch-zoom';
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.enableDamping = !reducedMotion;
      controls.dampingFactor = 0.09;
      controls.rotateSpeed = 0.65;
      controls.minPolarAngle = Math.PI * 0.12;
      controls.maxPolarAngle = Math.PI * 0.57;
      controls.addEventListener('change', requestRender);
      camera.position.set(0.94, 0.79, -1.07);
      controls.update();

      const room = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      try {
        environment = pmrem.fromScene(room, 0.04);
        scene.environment = environment.texture;
        scene.environmentIntensity = 0.35;
      } finally {
        room.dispose();
        pmrem.dispose();
      }
      scene.add(new THREE.HemisphereLight(0xffffff, 0x8b8271, 0.35));
      const keyLight = new THREE.DirectionalLight(0xfff4e3, 1.8);
      keyLight.position.set(4, 7, 3);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -4;
      keyLight.shadow.camera.right = 4;
      keyLight.shadow.camera.top = 4;
      keyLight.shadow.camera.bottom = -4;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 18;
      keyLight.shadow.normalBias = 0.025;
      scene.add(keyLight);
      const rimLight = new THREE.DirectionalLight(0xe3edff, 0.7);
      rimLight.position.set(-4, 3, -4);
      scene.add(rimLight);

      draco = new OwnedDRACOLoader(loadingManager);
      draco.setDecoderPath(`${import.meta.env.BASE_URL}draco/`);
      draco.setWorkerLimit(2);
      const loader = new GLTFLoader(loadingManager);
      loader.setDRACOLoader(draco);
      const decodeTimeout = window.setTimeout(() => {
        abortController.abort(new Error('Robot decoding exceeded 15 seconds.'));
      }, 15_000);
      const parsed = loader.parseAsync(modelData, mediaUrl('')).then((gltf) => {
        if (closed || disposed || run !== generation || abortController.signal.aborted) {
          disposeObjects(gltf.scenes);
          throw new DOMException('Robot loading cancelled.', 'AbortError');
        }
        return gltf;
      });
      const gltf = await withCancellation(parsed, abortController.signal).finally(() => {
        window.clearTimeout(decodeTimeout);
        draco?.dispose();
        draco = undefined;
      });
      if (closed || disposed || run !== generation) {
        disposeObjects(gltf.scenes);
        cleanupAttempt();
        return;
      }
      loadedScenes = gltf.scenes;
      const model = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const longest = Math.max(size.x, size.y, size.z);
      if (!Number.isFinite(longest) || longest <= 0) throw new Error('Model has no visible geometry.');
      const scale = 2.8 / longest;
      const center = bounds.getCenter(new THREE.Vector3());
      const assembly = new THREE.Group();
      assembly.add(model);
      assembly.scale.setScalar(scale);
      assembly.position.copy(center).multiplyScalar(-scale);
      scene.add(assembly);
      model.traverse((object) => {
        if ((object as InstanceType<typeof THREE.Mesh>).isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
      const normalizedBounds = new THREE.Box3().setFromObject(assembly);
      radius = normalizedBounds.getBoundingSphere(new THREE.Sphere()).radius;
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), new THREE.ShadowMaterial({ opacity: 0.15 }));
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = normalizedBounds.min.y - 0.012;
      shadow.receiveShadow = true;
      scene.add(shadow);
      viewer.resize();
      fitCamera();
      await withCancellation(renderer.compileAsync(scene, camera), abortController.signal);
      if (closed || disposed || run !== generation) {
        cleanupAttempt();
        return;
      }
      ready = true;
      renderer.shadowMap.needsUpdate = true;
      setState('ready');
      setMessage('3D view ready. Drag to turn the robot, or use the arrow and reset controls.');
      viewer.refresh();
      requestRender();
    } catch (error) {
      abortController.abort(error);
      cleanupAttempt?.();
      if (disposed || run !== generation) return;
      viewer = undefined;
      setState('error');
      setMessage('The 3D view could not load. You can still see the robot image or try again.');
      console.warn('Robot explorer could not initialize.', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      window.clearTimeout(loadTimeout);
    }
  };

  const keyboard: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (event) => {
    if (state() !== 'ready' || event.target !== viewport || event.altKey || event.ctrlKey || event.metaKey) return;
    const step = Math.PI / 12;
    switch (event.key) {
      case 'ArrowLeft': viewer?.rotate(step); break;
      case 'ArrowRight': viewer?.rotate(-step); break;
      case 'ArrowUp': viewer?.rotate(0, step); break;
      case 'ArrowDown': viewer?.rotate(0, -step); break;
      case 'Home':
      case 'r':
      case 'R': viewer?.reset(); break;
      default: return;
    }
    event.preventDefault();
  };

  onMount(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      reducedMotion = media.matches;
      viewer?.refresh();
    };
    const visibility = () => viewer?.refresh();
    updateMotion();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', visibility);
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      visibility();
    });
    intersection.observe(stage);
    const resize = new ResizeObserver(() => viewer?.resize());
    resize.observe(viewport);
    onCleanup(() => {
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', visibility);
      intersection.disconnect();
      resize.disconnect();
    });
  });

  onCleanup(() => {
    disposed = true;
    generation += 1;
    releaseViewer();
  });

  return (
    <div
      ref={stage}
      class={`robot-stage robot-stage--${props.variant ?? 'hero'} ${props.class ?? ''}`}
      data-state={state()}
    >
      <div class="robot-stage__poster" aria-hidden={state() === 'ready'}>
        <Show when={!posterMissing()} fallback={<div class="robot-stage__image-fallback">Robot preview unavailable</div>}>
          <img
            class="robot-stage__image"
            src={props.poster ?? mediaUrl('pushback-hero.webp')}
            alt="Team 1516's competition robot with an aluminum frame and intake mechanism."
            width="1800"
            height="2100"
            loading={isHero() ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={isHero() ? 'high' : 'auto'}
            draggable={false}
            onError={() => setPosterMissing(true)}
          />
        </Show>
      </div>
      <div
        ref={viewport}
        class="robot-stage__viewport"
        role="group"
        aria-label="Interactive 3D robot model"
        aria-describedby={instructionsId}
        aria-hidden={state() !== 'ready'}
        tabIndex={state() === 'ready' ? 0 : -1}
        onKeyDown={keyboard}
      />
      <Show when={!isHero()}>
        <div class="robot-stage__guide" id={instructionsId}>
          <span class="robot-stage__guide-mark" aria-hidden="true">↔</span>
          <span>{state() === 'ready' ? 'Drag to turn · Arrow keys to orbit · R to reset' : 'Take a closer look.'}</span>
        </div>
        <div class="robot-stage__toolbar">
          <button
            ref={activateButton}
            type="button"
            class="robot-stage__activate"
            aria-disabled={state() === 'loading'}
            aria-busy={state() === 'loading'}
            onClick={activate}
          >
            <Show when={state() === 'loading'}><span class="robot-stage__spinner" aria-hidden="true" /></Show>
            <span>{state() === 'ready' ? 'Back to image' : state() === 'loading' ? 'Loading 3D…' : state() === 'error' ? 'Try 3D again' : 'Explore in 3D'}</span>
            <Show when={state() !== 'loading'}><span aria-hidden="true">{state() === 'ready' ? '↙' : '↗'}</span></Show>
          </button>
          <Show when={props.showControls !== false}>
            <div class="robot-stage__turn-controls" role="group" aria-label="Rotate the robot">
              <button type="button" aria-label="Rotate robot left" disabled={state() !== 'ready'} onClick={() => viewer?.rotate(Math.PI / 8)}>←</button>
              <button type="button" class="robot-stage__reset" disabled={state() !== 'ready'} onClick={() => viewer?.reset()}>Reset</button>
              <button type="button" aria-label="Rotate robot right" disabled={state() !== 'ready'} onClick={() => viewer?.rotate(-Math.PI / 8)}>→</button>
            </div>
          </Show>
        </div>
        <p class="robot-stage__status" classList={{ 'robot-stage__status--visible': state() === 'error' }} role="status" aria-live="polite">{message()}</p>
      </Show>
    </div>
  );
};

export default RobotStage;
