import { createMemo, createSignal, For, onCleanup, onMount, Show } from 'solid-js';
import RobotStage from '../components/RobotStage';
import './Team1516.css';

type AwardKind = 'Design' | 'Excellence' | 'Judges' | 'Inspire';
type Award = {
  kind: AwardKind;
  title: string;
  date: string;
  season: string;
  game: string;
  event: string;
  eventId: string;
};

// Verified against the official team and event records on October 15, 2026.
// These are 1516A's records only; the featured machine is the 2025–26 archive.
const awards: Award[] = [
  { kind: 'Judges', title: 'Judges Award', date: '2026-02-21', season: '2025–26', game: 'Push Back', event: 'Bay Area VEX V5 Push Back Tournament #6', eventId: 'RE-V5RC-25-1476' },
  { kind: 'Design', title: 'Design Award', date: '2025-02-08', season: '2024–25', game: 'High Stakes', event: 'Central Valley High Stakes VEX V5 Robotics Competition #6', eventId: 'RE-V5RC-24-6721' },
  { kind: 'Inspire', title: 'Inspire Award', date: '2025-01-20', season: '2024–25', game: 'High Stakes', event: 'CVCHS Ugly Robotics High Stakes Tournament #2', eventId: 'RE-V5RC-24-7783' },
  { kind: 'Design', title: 'Design Award', date: '2024-02-10', season: '2023–24', game: 'Over Under', event: 'Central Valley Over and Under Tournament #6', eventId: 'RE-VRC-23-4674' },
  { kind: 'Excellence', title: 'Excellence Award', date: '2024-02-03', season: '2023–24', game: 'Over Under', event: 'Panther Over Under Roar Tournament', eventId: 'RE-VRC-23-4883' },
  { kind: 'Design', title: 'Design Award', date: '2023-09-16', season: '2023–24', game: 'Over Under', event: 'Central Valley Over and Under: Tournament #1', eventId: 'RE-VRC-23-2208' },
  { kind: 'Design', title: 'Design Award', date: '2023-02-25', season: '2022–23', game: 'Spin Up', event: 'VRC, River Islands VRC Spin Up, MS&HS, In-Person, with Standard Judging', eventId: 'RE-VRC-23-0531' },
  { kind: 'Judges', title: 'Judges Award', date: '2022-03-05', season: '2021–22', game: 'Tipping Point', event: '2022 Northern California VRC High School State Championship – SILICON VALLEY', eventId: 'RE-VRC-21-7029' },
  { kind: 'Excellence', title: 'Excellence Award – High School', date: '2022-01-29', season: '2021–22', game: 'Tipping Point', event: 'VRC, Central Valley Vex Robotics Tipping Point Tournament #5, HS&MS, In-person, with Standard Judging', eventId: 'RE-VRC-21-6380' },
  { kind: 'Design', title: 'Design Award', date: '2021-02-20', season: '2020–21', game: 'Change Up', event: 'Dublin Robotics Club TOURNAMENT – Change Up #5', eventId: 'RE-VRC-21-3717' },
  { kind: 'Design', title: 'Design Award', date: '2019-11-23', season: '2019–20', game: 'Tower Takeover', event: 'Central Valley Tower Takeover', eventId: 'RE-VRC-19-9941' },
  { kind: 'Design', title: 'Design Award', date: '2016-11-19', season: '2016–17', game: 'Starstruck', event: 'Northern California Starstruck Tournament', eventId: 'RE-VRC-16-1566' },
  { kind: 'Judges', title: 'Judges Award', date: '2014-02-08', season: '2013–14', game: 'Toss Up', event: 'Tracy NorCal VEX Toss Up Tournament', eventId: 'RE-VRC-14-0212' },
];

const awardFilters = ['All awards', 'Design', 'Excellence', 'Judges', 'Inspire'] as const;
type AwardFilter = typeof awardFilters[number];

const detailViews = [
  { label: 'Intake', title: 'UP FRONT.', image: '/media/pushback-intake.webp', alt: 'Close view of the front intake assembly on the 1516A Push Back robot', text: 'A closer look at the front of the machine.' },
  { label: 'Drivetrain', title: 'GROUND WORK.', image: '/media/pushback-drivetrain.webp', alt: 'Close view of the wheels and drivetrain on the 1516A Push Back robot', text: 'The wheels, the gears, and the structure around them.' },
  { label: 'Details', title: 'LOOK CLOSER.', image: '/media/pushback-detail.webp', alt: 'Mechanical details of the 1516A Push Back robot', text: 'Follow the build from the big picture down to the small parts.' },
];

const Arrow = (props: { diagonal?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class="team-arrow">
    <path d={props.diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-7-7 7 7-7 7'} stroke="currentColor" stroke-width="1.6" />
  </svg>
);

const formatDate = (date: string) => new Intl.DateTimeFormat('en-US', {
  month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${date}T12:00:00Z`));

export default function Team1516() {
  let page!: HTMLDivElement;
  let hero!: HTMLElement;
  let showcase!: HTMLVideoElement;
  let revealObserver: IntersectionObserver | undefined;
  let inViewport = false;
  let reducedMotionRequested = false;
  let saveDataRequested = false;
  let manuallyPaused = false;
  let explicitlyPlaying = false;
  let autoplayBlocked = false;
  let disposed = false;
  let playbackRequest = 0;
  const [filter, setFilter] = createSignal<AwardFilter>('All awards');
  const [expanded, setExpanded] = createSignal(false);
  const [detail, setDetail] = createSignal(0);
  const [narrowLayout, setNarrowLayout] = createSignal(false);
  const [modelOpen, setModelOpen] = createSignal(false);
  const [videoFailed, setVideoFailed] = createSignal(false);
  const [sourceEnabled, setSourceEnabled] = createSignal(false);
  const [autoplayEnabled, setAutoplayEnabled] = createSignal(false);
  const [backgroundPlaying, setBackgroundPlaying] = createSignal(false);
  const selectedDetail = createMemo(() => detailViews[detail()]);
  const filteredAwards = createMemo(() => awards.filter((award) => filter() === 'All awards' || award.kind === filter()));
  const visibleAwards = createMemo(() => expanded() ? filteredAwards() : filteredAwards().slice(0, 6));
  const filterCount = (value: AwardFilter) => value === 'All awards' ? awards.length : awards.filter((award) => award.kind === value).length;

  const pauseBackground = () => {
    playbackRequest += 1;
    showcase.pause();
    setBackgroundPlaying(false);
  };

  const playBackground = () => {
    if (disposed || !inViewport || document.hidden || videoFailed()) return;
    const request = ++playbackRequest;
    setAutoplayEnabled(!reducedMotionRequested && !saveDataRequested);
    setSourceEnabled(true);
    showcase.muted = true;
    void showcase.play().then(() => {
      if (disposed || request !== playbackRequest) return;
      if (!inViewport || document.hidden || manuallyPaused) {
        showcase.pause();
        return;
      }
      setBackgroundPlaying(true);
    }).catch(() => {
      if (!disposed && request === playbackRequest) {
        autoplayBlocked = true;
        setAutoplayEnabled(false);
        setBackgroundPlaying(false);
      }
    });
  };

  const syncBackground = () => {
    if (!inViewport || document.hidden || manuallyPaused || videoFailed()) {
      setAutoplayEnabled(false);
      pauseBackground();
      return;
    }
    if ((reducedMotionRequested || saveDataRequested) && !explicitlyPlaying) {
      setAutoplayEnabled(false);
      pauseBackground();
      if (sourceEnabled()) {
        setSourceEnabled(false);
        showcase.load();
      }
      return;
    }
    if (!autoplayBlocked) playBackground();
  };

  const toggleBackground = () => {
    if (backgroundPlaying()) {
      manuallyPaused = true;
      setAutoplayEnabled(false);
      pauseBackground();
    } else {
      manuallyPaused = false;
      explicitlyPlaying = true;
      autoplayBlocked = false;
      playBackground();
    }
  };

  onMount(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: Partial<EventTarget> & { saveData?: boolean } }).connection;
    const narrowViewport = window.matchMedia('(max-width: 700px)');
    const updateLayout = () => setNarrowLayout(narrowViewport.matches);
    updateLayout();
    const motionChange = () => {
      reducedMotionRequested = reducedMotion.matches;
      if (reducedMotionRequested) explicitlyPlaying = false;
      page.dataset.motion = reducedMotion.matches ? 'reduced' : 'full';
      syncBackground();
    };
    const connectionChange = () => {
      const previouslySavingData = saveDataRequested;
      saveDataRequested = connection?.saveData === true;
      if (saveDataRequested && !previouslySavingData) explicitlyPlaying = false;
      syncBackground();
    };
    const visibilityChange = () => syncBackground();
    const mediaObserver = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting && entry.intersectionRatio >= 0.05;
      syncBackground();
    }, { threshold: [0, 0.05] });

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          revealObserver?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });
    page.querySelectorAll('[data-team-reveal]').forEach((element) => revealObserver?.observe(element));
    page.classList.add('team-motion-ready');
    motionChange();
    connectionChange();
    mediaObserver.observe(hero);
    document.addEventListener('visibilitychange', visibilityChange);
    reducedMotion.addEventListener('change', motionChange);
    narrowViewport.addEventListener('change', updateLayout);
    connection?.addEventListener?.('change', connectionChange);

    onCleanup(() => {
      disposed = true;
      pauseBackground();
      showcase.removeAttribute('src');
      showcase.load();
      mediaObserver.disconnect();
      document.removeEventListener('visibilitychange', visibilityChange);
      reducedMotion.removeEventListener('change', motionChange);
      narrowViewport.removeEventListener('change', updateLayout);
      connection?.removeEventListener?.('change', connectionChange);
      revealObserver?.disconnect();
    });
  });

  const chooseFilter = (value: AwardFilter) => {
    setFilter(value);
    setExpanded(false);
  };

  return (
    <div class="team-page" ref={page}>
      <section class="team-hero" ref={hero} aria-labelledby="team-title">
        <div class="team-ambient" aria-hidden="true">
          <div class="team-ambient-media">
            <img src="/media/override-simulator-intro-poster.webp" alt="" width="1920" height="1080" decoding="async" fetchpriority="high" />
            <video id="team-ambient-video" ref={showcase} src={sourceEnabled() ? '/media/override-simulator-intro.mp4' : undefined} muted autoplay={autoplayEnabled()} playsinline loop preload={sourceEnabled() ? 'metadata' : 'none'} poster="/media/override-simulator-intro-poster.webp" width="1920" height="1080" tabindex="-1" classList={{ 'is-active': sourceEnabled() && !videoFailed() }} onPlaying={() => { if (disposed || !inViewport || document.hidden || manuallyPaused || ((reducedMotionRequested || saveDataRequested) && !explicitlyPlaying)) pauseBackground(); else setBackgroundPlaying(true); }} onPause={() => setBackgroundPlaying(false)} onError={() => { if (sourceEnabled()) { setVideoFailed(true); pauseBackground(); } }} />
          </div>
        </div>
        <div class="team-hero-topline">
          <a href="/" class="team-club-link"><span aria-hidden="true">←</span> Cal High Robotics</a>
          <span class="team-kicker">VEX V5 / San Ramon, CA</span>
        </div>

        <div class="team-hero-content">
          <div class="team-hero-heading">
            <p class="team-kicker">California High School / VEX V5</p>
            <h1 id="team-title" class="team-wordmark" aria-label="Team 1516A"><span>1516</span><span class="team-wordmark-a">A</span><span class="team-wordmark-dot" aria-hidden="true">.</span></h1>
            <p class="team-hero-name">Fightin’ Grizzlies.</p>
            <p class="team-hero-description">California High School’s VEX V5 Robotics Competition team. Design, engineering, and competition in San Ramon, California.</p>
            <dl class="team-hero-record"><div><dt>Published awards</dt><dd>13</dd></div><div><dt>Design Awards</dt><dd>7</dd></div><div><dt>Excellence Awards</dt><dd>2</dd></div></dl>
            <div class="team-hero-actions"><a href="#awards" class="team-hero-primary-link">Award history <Arrow /></a><a href="#machine" class="team-text-link">Meet the machine <Arrow /></a></div>
          </div>
        </div>
        <div class="team-hero-footer"><span class="team-kicker">Override simulator · 2026—27 season</span><Show when={!videoFailed()}><button type="button" class="team-motion-toggle" aria-controls="team-ambient-video" onClick={toggleBackground}><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><Show when={backgroundPlaying()} fallback={<path d="M5 3.5 12 8l-7 4.5z" fill="currentColor" />}><path d="M5 3v10M11 3v10" stroke="currentColor" stroke-width="2" /></Show></svg><span>{backgroundPlaying() ? 'Pause background motion' : 'Play background motion'}</span></button></Show></div>
      </section>

      <section class="team-machine-section" id="machine" aria-labelledby="machine-title">
        <div class="team-section-heading" data-team-reveal>
          <div><p class="team-kicker">The engineering / 2025—26</p><h2 id="machine-title" class="team-display">THE<br /><span class="team-outline">BUILD.</span></h2></div>
          <div class="team-machine-intro"><p class="team-lead">Push Back.<br />2025—26.</p><p>Take a closer look at the intake, drivetrain, and structure of our 2025–26 robot.</p><a href="#details" class="team-text-link">Into the details <Arrow /></a></div>
        </div>

        <details class="team-model-disclosure" onToggle={(event) => setModelOpen(event.currentTarget.open)}><summary><span>Optional 3D design model</span><span class="team-model-disclosure-mark" aria-hidden="true">+</span></summary><Show when={modelOpen()}><div class="team-explorer"><RobotStage variant="explorer" poster="/media/pushback-hero.webp" showControls /></div></Show></details>
        <div class="team-archive-note"><span class="team-small-cross" aria-hidden="true">+</span><p>This machine is from our 2025–26 season. The current competition season is <strong>Override, 2026–27.</strong></p><a href="https://events.vex.com/teams/V5RC/1516A" target="_blank" rel="noopener noreferrer">Team record <Arrow diagonal /></a></div>
      </section>

      <section class="team-details-section" id="details" aria-labelledby="details-title">
        <div class="team-details-heading" data-team-reveal><p class="team-kicker">Under the surface</p><h2 class="team-display" id="details-title" data-team-drift>IT’S ALL IN<br /><span>THE DETAILS.</span></h2></div>
        <div class="team-details-layout" data-team-reveal>
          <div class="team-detail-navigation">
            <p>One machine.<br />A closer perspective.</p>
            <div class="team-detail-tabs" role="tablist" aria-label="Robot detail views" aria-orientation={narrowLayout() ? 'horizontal' : 'vertical'}>
              <For each={detailViews}>{(view, index) => <button type="button" role="tab" id={`detail-tab-${index()}`} aria-controls="team-detail-panel" aria-selected={detail() === index()} tabindex={detail() === index() ? 0 : -1} onClick={() => setDetail(index())} onKeyDown={(event) => {
                const forward = narrowLayout() ? 'ArrowRight' : 'ArrowDown';
                const backward = narrowLayout() ? 'ArrowLeft' : 'ArrowUp';
                if ([forward, backward, 'Home', 'End'].includes(event.key)) {
                  event.preventDefault();
                  const next = event.key === 'Home' ? 0 : event.key === 'End' ? detailViews.length - 1 : (detail() + (event.key === forward ? 1 : -1) + detailViews.length) % detailViews.length;
                  setDetail(next);
                  page.querySelector<HTMLButtonElement>(`#detail-tab-${next}`)?.focus();
                }
              }}><span>{view.label}</span><Arrow diagonal /></button>}</For>
            </div>
            <p class="team-detail-description" aria-live="polite">{selectedDetail().text}</p>
          </div>
          <div class="team-detail-panel" id="team-detail-panel" role="tabpanel" aria-labelledby={`detail-tab-${detail()}`} tabindex="0">
            <For each={detailViews}>{(view, index) => <img src={view.image} alt={view.alt} loading="lazy" decoding="async" width="1600" height="1000" classList={{ 'is-selected': detail() === index() }} aria-hidden={detail() !== index()} />}</For>
            <div class="team-detail-caption"><span class="team-kicker">Push Back / {selectedDetail().label}</span><span>{selectedDetail().title}</span></div>
          </div>
        </div>
      </section>

      <section class="team-awards-section" id="awards" aria-labelledby="awards-title">
        <div class="team-awards-heading" data-team-reveal>
          <div><p class="team-kicker">1516A / The award archive</p><h2 class="team-display" id="awards-title" data-team-drift>THE<br /><span class="team-awards-title-last">RECORD<span class="team-awards-period">.</span></span></h2></div>
          <div class="team-awards-intro"><span class="team-award-total">13<span>awards</span></span><p>Design. Excellence. Judges. Inspire.<br />Recognition across generations of Fightin’ Grizzlies.</p><a class="team-text-link" href="https://events.vex.com/teams/V5RC/1516A" target="_blank" rel="noopener noreferrer">View the official record <Arrow diagonal /></a></div>
        </div>

        <div class="team-award-filters" aria-label="Filter award history" data-team-reveal><For each={awardFilters}>{(value) => <button type="button" aria-pressed={filter() === value} classList={{ 'is-active': filter() === value }} onClick={() => chooseFilter(value)}>{value}<span>{filterCount(value).toString().padStart(2, '0')}</span></button>}</For></div>
        <p class="team-sr-only" role="status">Showing {visibleAwards().length} of {filteredAwards().length} {filter() === 'All awards' ? 'awards' : `${filter()} awards`}.</p>
        <div class="team-award-list" id="team-award-list">
          <For each={visibleAwards()}>{(award, index) => <a class="team-award-row" data-team-reveal ref={(element) => revealObserver?.observe(element)} style={{ '--team-row-delay': `${Math.min(index(), 5) * 45}ms` }} href={`https://events.vex.com/robot-competitions/vex-robotics-competition/${award.eventId}.html#awards`} target="_blank" rel="noopener noreferrer" aria-label={`${award.title}, ${award.game}, ${formatDate(award.date)}. View official event awards.`}>
            <div class="team-award-season"><span>{award.season}</span><span>{award.game}</span></div>
            <div class="team-award-name"><h3>{award.title}</h3><p>{award.event}</p></div>
            <time datetime={award.date}>{formatDate(award.date)}</time><span class="team-award-arrow"><Arrow diagonal /></span>
          </a>}</For>
        </div>
        <Show when={filteredAwards().length > 6}><div class="team-awards-expand"><button type="button" class="team-expand-button" aria-controls="team-award-list" aria-expanded={expanded()} onClick={() => setExpanded(!expanded())}>{expanded() ? 'Show recent awards' : `Show all ${filteredAwards().length} awards`}<span aria-hidden="true">{expanded() ? '−' : '+'}</span></button></div></Show>
        <div class="team-awards-note"><p>1516A’s published award history, verified October 15, 2026. Each entry links to its official event record.</p><span class="team-kicker">2014 — 2026</span></div>
      </section>

      <section class="team-club-cta" aria-labelledby="team-club-cta-title">
        <div class="team-club-cta-top" data-team-reveal><p class="team-kicker">One team. A bigger club.</p><a href="/" class="team-text-link">Back to Cal High Robotics <Arrow diagonal /></a></div>
        <a class="team-club-cta-link" href="/" data-team-reveal><h2 id="team-club-cta-title">MEET THE<br /><span>WHOLE CREW.</span></h2><span class="team-club-cta-arrow"><Arrow diagonal /></span></a>
        <p class="team-club-cta-description">1516A is part of California High School Robotics.<br />Explore the teams, the programs, and the people behind the machines.</p>
      </section>
    </div>
  );
}
