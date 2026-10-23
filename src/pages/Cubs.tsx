import { For, createSignal } from 'solid-js';
import { A } from '@solidjs/router';
import './Programs.css';

const steps = [
  { name: 'Build', label: 'Put the structure together.', description: 'Start with the physical side of robotics. Put pieces together, explore how a mechanism moves, and learn by making.', detail: 'A C-channel provides a structure for mounting and connecting other robot parts.', part: { name: 'VEX C-channel', shortName: 'C-channel', src: '/parts/vex-c-channel.svg', alt: 'Line drawing of a VEX C-channel with its square mounting-hole pattern.', purpose: 'Structure and mounting points for a robot.' } },
  { name: 'Code', label: 'Program how a robot responds.', description: 'Connect what you build to what you program. Discover how a set of instructions becomes movement.', detail: 'The V5 Brain runs a robot’s program and connects to its motors and sensors.', part: { name: 'VEX V5 Brain', shortName: 'V5 Brain', src: '/parts/vex-v5-brain.svg', alt: 'Line drawing of the VEX V5 Brain with its display, power button, and smart ports.', purpose: 'The controller that runs a robot’s program.' } },
  { name: 'Test', label: 'Find out what works.', description: 'Put your ideas to work alongside other Cal High students, with local competition as a reason to keep improving.', detail: 'Testing a drivetrain helps you see how wheel choice affects the robot’s movement.', part: { name: 'VEX 3.25-inch omni wheel', shortName: 'Omni wheel', src: '/parts/vex-omni-wheel.svg', alt: 'Line drawing of a VEX 3.25-inch omni wheel showing its ring of rollers and central hub.', purpose: 'A drive wheel with rollers that allow sideways movement.' } },
  { name: 'Repeat', label: 'Make the next version.', description: 'Notice what happened. Ask another question. Take what you learned back to the build and try again.', detail: 'Changing a gear combination changes how motion transfers between shafts.', part: { name: 'VEX 48-tooth high-strength gear', shortName: '48-tooth gear', src: '/parts/vex-gear.svg', alt: 'Line drawing of a VEX 48-tooth high-strength gear with its teeth, spokes, and central insert.', purpose: 'A way to transfer motion between shafts.' } },
];

export default function Cubs() {
  const [activeStep, setActiveStep] = createSignal(0);
  const [paused, setPaused] = createSignal(false);

  return (
    <div class="program-page cubs-page" classList={{ 'is-paused': paused() }}>
      <section class="program-hero cubs-hero">
        <div class="program-hero-copy">
          <p class="program-eyebrow">California High School Robotics</p>
          <h1>Cubs</h1>
          <p class="program-lede">The novice robotics program for Cal High students.</p>
          <p class="program-intro">Cubs is Cal High Robotics' starting point for students at California High School. Learn to build, learn to code, and find your people along the way.</p>
          <div class="program-actions">
            <a class="program-button" href="mailto:calhighrobotics@gmail.com?subject=Getting%20started%20with%20Cubs">Ask about joining <span aria-hidden="true">↗</span></a>
            <a class="program-text-link" href="#how-cubs-works">See how it works <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <aside class="cubs-parts" aria-label="Explore VEX robot parts">
          <div class="cubs-parts-header"><p>Explore VEX parts</p><button type="button" class="cubs-motion-toggle" onClick={() => setPaused(!paused())} aria-pressed={paused()}>{paused() ? 'Play motion' : 'Pause motion'} <span aria-hidden="true">{paused() ? '▷' : 'Ⅱ'}</span></button></div>
          <figure class="cubs-part-view" id="cubs-part-view">
            <div class="cubs-part-stage"><img class="cubs-part-image" src={steps[activeStep()].part.src} alt={steps[activeStep()].part.alt} width="720" height="520" /></div>
            <figcaption><strong>{steps[activeStep()].part.name}</strong><p>{steps[activeStep()].part.purpose}</p></figcaption>
          </figure>
          <div class="cubs-part-picker" role="group" aria-label="Choose a VEX part"><For each={steps}>{(step, index) => <button type="button" onClick={() => setActiveStep(index())} aria-pressed={activeStep() === index()} aria-controls="cubs-part-view"><span>{step.part.shortName}</span><span aria-hidden="true">↗</span></button>}</For></div>
        </aside>
      </section>

      <section class="cubs-manifesto program-scroll-in" aria-labelledby="cubs-purpose">
        <p class="program-eyebrow">A place to begin</p>
        <h2 id="cubs-purpose">How Cubs<br /><span>works</span></h2>
        <div class="cubs-manifesto-copy">
          <p>The first robot doesn't have to be perfect. Cubs gives Cal High students an introduction to building and coding, with local, in-school competition to put those skills to work.</p>
          <p>Come with a question, a half-formed idea, or just a little curiosity. Starting is the important part.</p>
        </div>
      </section>

      <section class="cubs-gallery program-scroll-in" aria-labelledby="cubs-gallery-title">
        <div class="program-section-heading"><div><p class="program-eyebrow">From the club archive</p><h2 id="cubs-gallery-title">Cubs<br /><span>in action</span></h2></div><p>Cal High students learning to build and work together.</p></div>
        <div class="cubs-gallery-grid">
          <figure class="cubs-gallery-featured"><img src="/club/cubs-competition-2025.webp" alt="Cubs students using controllers around a robotics competition field at Cal High on December 6, 2025." width="1024" height="768" loading="lazy" /><figcaption><strong>Cubs competition, December 6, 2025</strong><small>Photo: Naman Kamalesh / <a href="https://www.thecalifornianpaper.com/2025/12/robotics-club-teaches-real-world-skills-through-its-cubs-program/" target="_blank" rel="noopener noreferrer">The Californian</a></small></figcaption></figure>
          <figure><img src="/club/drive-cubs-2023-workshop.webp" alt="Cubs participants working together on a robot at a classroom table in the 2022–2023 archive." width="1718" height="1138" loading="lazy" /><figcaption><strong>Cubs participants work on a robot.</strong><span>2022–2023 archive</span><small>Photo: <a href="https://www.thecalifornianpaper.com/" target="_blank" rel="noopener noreferrer">The Californian</a></small></figcaption></figure>
          <figure><img src="/club/drive-cubs-2023-robot-detail.webp" alt="A Cubs robot with wheels, wiring, and a lifting mechanism surrounded by students at a workbench." width="1494" height="982" loading="lazy" /><figcaption><strong>A closer look at a Cubs robot build.</strong><span>2022–2023 archive</span><small>Photo: <a href="https://www.thecalifornianpaper.com/" target="_blank" rel="noopener noreferrer">The Californian</a></small></figcaption></figure>
        </div>
      </section>

      <section class="program-process" id="how-cubs-works" aria-labelledby="cubs-process-title">
        <div class="program-section-heading program-scroll-in">
          <div><p class="program-eyebrow">The engineering loop</p><h2 id="cubs-process-title">What you<br /><span>learn</span></h2></div>
          <p>Robotics is a cycle of making, trying, and learning. Pick a step to explore.</p>
        </div>
        <div class="cubs-process-layout">
          <div class="cubs-process-steps">
            <For each={steps}>{(step, index) => (
              <button type="button" class="cubs-step" classList={{ 'is-active': activeStep() === index() }} onClick={() => setActiveStep(index())} aria-pressed={activeStep() === index()} aria-controls="cubs-step-display">
                <span class="cubs-step-number">0{index() + 1}</span>
                <span class="cubs-step-content"><span class="cubs-step-name">{step.name}</span><span class="cubs-step-label">{step.label}</span><span class="cubs-step-description">{step.description}</span></span>
                <span class="cubs-step-arrow" aria-hidden="true">↗</span>
              </button>
            )}</For>
          </div>
          <div id="cubs-step-display" class="cubs-step-display" data-step={activeStep()} aria-live="polite" aria-atomic="true">
            <span class="cubs-display-label">{steps[activeStep()].part.name}</span>
            <div class="cubs-display-art"><img class="cubs-part-image" src={steps[activeStep()].part.src} alt={steps[activeStep()].part.alt} width="720" height="520" loading="lazy" /></div>
            <div class="cubs-display-copy"><span class="cubs-display-count">0{activeStep() + 1} / 04</span><h3>{steps[activeStep()].name}</h3><p>{steps[activeStep()].detail}</p></div>
          </div>
        </div>
      </section>

      <section class="program-faq-section program-scroll-in" aria-labelledby="cubs-faq-title">
        <div><p class="program-eyebrow">Before you start</p><h2 id="cubs-faq-title">Questions<br />about Cubs</h2><p class="program-faq-aside">Something else on your mind?<br /><A class="program-text-link" href="/contact">Talk to the club <span aria-hidden="true">↗</span></A></p></div>
        <div class="program-faqs">
          <details><summary>Who is Cubs for?<span aria-hidden="true">+</span></summary><p>Cubs is Cal High Robotics' novice program for students at California High School who want to begin learning robotics.</p></details>
          <details><summary>Do I need robotics experience?<span aria-hidden="true">+</span></summary><p>Cubs is designed as a starting point. Its focus is introducing students to building and coding robots. Bring your curiosity and ask the club about getting involved.</p></details>
          <details><summary>When and where does Cubs meet?<span aria-hidden="true">+</span></summary><p>Contact the club for the current meeting schedule, location, and joining details. <a href="mailto:calhighrobotics@gmail.com?subject=Cubs%20meeting%20and%20joining%20details">Ask about this year's Cubs program.</a></p></details>
          <details><summary>Is Cubs the summer camp?<span aria-hidden="true">+</span></summary><p>They're separate programs. Cubs introduces Cal High students to robotics during the school year. The club's summer camp brings robotics to younger students. <A href="/summer-camp">Explore the summer camp.</A></p></details>
        </div>
      </section>

      <section class="program-bottom-cta program-scroll-in"><p class="program-eyebrow">For Cal High students</p><h2>Join Cubs</h2><a class="program-button program-button--dark" href="mailto:calhighrobotics@gmail.com?subject=Getting%20started%20with%20Cubs">Ask about Cubs <span aria-hidden="true">↗</span></a></section>
      <p class="program-source-note">Program details: <a href="/web/sponsor.pdf" target="_blank" rel="noopener noreferrer">club program overview (2023 PDF) ↗</a></p>
    </div>
  );
}
