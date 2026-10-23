import { A } from '@solidjs/router';
import { For, Match, Show, Switch, createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import { awardCoverage, legacyAwards, legacySeasons, type LegacyMedia, type LegacyProgram, type LegacySeason } from '../data/legacy';
import './Legacy.css';

const seasonLabel = (season: string) => /^\d{4}-\d{4}$/.test(season)
  ? `${season.slice(0, 4)}–${season.slice(7)}` : season;

function eventDateLabel(date: string | undefined, season: string, endDate?: string) {
  if (!date) return `${seasonLabel(season)} season`;
  const parsed = new Date(`${date.slice(0, 10)}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return `${seasonLabel(season)} season`;
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const end = endDate ? new Date(`${endDate.slice(0, 10)}T12:00:00Z`) : undefined;
  if (end && !Number.isNaN(end.getTime()) && end.getTime() !== parsed.getTime()) return formatter.formatRange(parsed, end);
  return formatter.format(parsed);
}

function ArchiveMedia(props: { media: LegacyMedia; season: string; resetKey?: string }) {
  const [playing, setPlaying] = createSignal(false);
  const [imageFailed, setImageFailed] = createSignal(false);
  const canEmbed = () => props.media.kind === 'video' && /^[A-Za-z0-9_-]{11}$/.test(props.media.videoId ?? '');
  createEffect(() => { props.resetKey; setPlaying(false); });

  return (
    <figure class="history-media">
      <div class="history-media-frame" classList={{ 'history-media-frame--photo': props.media.kind === 'photo', 'history-media-frame--text': props.media.kind === 'gap' || props.media.kind === 'link' || (props.media.kind === 'photo' && imageFailed()) || (props.media.kind === 'video' && !canEmbed()) }}>
        <Switch>
          <Match when={props.media.kind === 'photo' && props.media.src && !imageFailed()}>
            <img src={props.media.src} alt={props.media.caption || props.media.title} loading="lazy" onError={() => setImageFailed(true)} />
          </Match>
          <Match when={canEmbed()}>
            <Show when={playing()} fallback={
              <button class="history-video-preview" type="button" onClick={() => setPlaying(true)} aria-label={`Play ${props.media.title}; video starts muted`}>
                <Show when={props.media.poster && !imageFailed()}><img src={props.media.poster} alt="" loading="lazy" onError={() => setImageFailed(true)} /></Show>
                <span class="history-video-overlay"><span class="history-play-icon" aria-hidden="true">▶</span><span><strong>Play archive video</strong><span>{props.media.title}</span></span></span>
              </button>
            }>
              <iframe src={`https://www.youtube-nocookie.com/embed/${props.media.videoId}?autoplay=1&mute=1&rel=0`} title={`${props.season}: ${props.media.title}`} allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerPolicy="strict-origin-when-cross-origin" />
            </Show>
          </Match>
          <Match when={true}>
            <div class="history-media-gap">
              <span class="history-overline">{props.season} archive</span>
              <h4>{props.media.kind === 'gap' ? 'Season media not yet located' : props.media.title}</h4>
              <p>{props.media.kind === 'photo' && imageFailed() ? 'This archived photograph could not load. The original source is linked below.' : props.media.caption}</p>
              <Show when={props.media.url || props.media.sourceUrl}><a class="history-source-link" href={props.media.url || props.media.sourceUrl} target="_blank" rel="noreferrer">{props.media.kind === 'video' ? 'Watch the recording' : 'Open the season record'} <span aria-hidden="true">↗</span></a></Show>
            </div>
          </Match>
        </Switch>
      </div>
      <figcaption>
        <Show when={props.media.kind === 'photo' || props.media.kind === 'video'}><p>{props.media.caption}</p></Show>
        <div class="history-media-credit">
          <Show when={props.media.credit}><span>{props.media.credit}</span></Show>
          <Show when={props.media.sourceUrl && props.media.kind !== 'gap'}><a href={props.media.sourceUrl} target="_blank" rel="noreferrer">Media source <span aria-hidden="true">↗</span></a></Show>
          <Show when={props.media.kind === 'video' && props.media.url}><a href={props.media.url} target="_blank" rel="noreferrer">Watch on YouTube <span aria-hidden="true">↗</span></a></Show>
        </div>
      </figcaption>
    </figure>
  );
}

function SeasonMedia(props: { season: LegacySeason; resetKey: string }) {
  const [selectedMediaIndex, setSelectedMediaIndex] = createSignal(0);
  const activeMedia = createMemo(() => props.season.media[selectedMediaIndex()] ?? props.season.media[0]);
  createEffect(() => { props.resetKey; setSelectedMediaIndex(0); });

  return <div class="history-season-media">
    <Show when={activeMedia()} keyed>{(media) => <ArchiveMedia media={media} season={`${props.season.program} ${props.season.label}`} resetKey={props.resetKey} />}</Show>
    <Show when={props.season.media.length > 1}>
      <label class="history-media-picker">Season media
        <select value={selectedMediaIndex()} onChange={(event) => setSelectedMediaIndex(Number(event.currentTarget.value))}>
          <For each={props.season.media}>{(media, index) => <option value={index()}>{media.kind === 'photo' ? 'Photo' : media.kind === 'video' ? 'Video' : 'Record'} · {media.title}</option>}</For>
        </select>
      </label>
    </Show>
  </div>;
}

export default function Legacy() {
  let page!: HTMLDivElement;
  let storyTrack!: HTMLDivElement;
  let eraBoundary!: HTMLElement;
  const storyElements: HTMLElement[] = [];
  const firstVexIndex = legacySeasons.findIndex((season) => season.program === 'VEX');
  const [desktopLayout, setDesktopLayout] = createSignal(typeof window !== 'undefined' && window.matchMedia('(min-width: 761px)').matches);
  const [selectedSeasonId, setSelectedSeasonId] = createSignal(legacySeasons[0]?.id ?? '');
  const [programFilter, setProgramFilter] = createSignal<'all' | LegacyProgram>('all');
  const [teamFilter, setTeamFilter] = createSignal('all');
  const [seasonFilter, setSeasonFilter] = createSignal('all');
  const activeSeason = createMemo(() => legacySeasons.find((season) => season.id === selectedSeasonId()) ?? legacySeasons[0]);
  const activeIndex = createMemo(() => legacySeasons.findIndex((season) => season.id === selectedSeasonId()));
  const teams = [...new Set([...awardCoverage.reviewedTeams, ...legacyAwards.map((award) => award.team)])].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const awardSeasons = [...new Set(legacyAwards.map((award) => award.season))].sort().reverse();
  const sortedAwards = [...legacyAwards].sort((a, b) => b.season.localeCompare(a.season) || (b.eventDate ?? '').localeCompare(a.eventDate ?? '') || a.team.localeCompare(b.team) || a.award.localeCompare(b.award));
  const filteredAwards = createMemo(() => sortedAwards.filter((award) => (programFilter() === 'all' || award.program === programFilter()) && (teamFilter() === 'all' || award.team === teamFilter()) && (seasonFilter() === 'all' || award.season === seasonFilter())));
  const hasFilters = () => programFilter() !== 'all' || teamFilter() !== 'all' || seasonFilter() !== 'all';
  onMount(() => {
    const desktop = window.matchMedia('(min-width: 761px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const measure = () => {
      frame = 0;
      const focusLine = window.innerHeight * 0.34;
      let index = 0;
      storyElements.forEach((element, candidate) => {
        if (element.getBoundingClientRect().top <= focusLine) index = candidate;
      });
      const boundary = eraBoundary.getBoundingClientRect();
      const progress = clamp((window.innerHeight * 0.75 - boundary.top) / (boundary.height + window.innerHeight * 0.25));
      if (progress >= 0.5 && boundary.bottom > focusLine && firstVexIndex > 0) index = firstVexIndex;
      setSelectedSeasonId(legacySeasons[index].id);
      const cover = 1 - Math.abs(progress * 2 - 1);
      page.style.setProperty('--history-era-progress', String(progress));
      page.style.setProperty('--history-era-frc-x', `${-progress * 115}%`);
      page.style.setProperty('--history-era-vex-x', `${(1 - progress) * 115}%`);
      page.style.setProperty('--history-era-wipe-x', `${(1 - cover) * 100}%`);
      page.style.setProperty('--history-era-recede', String(1 - cover * 0.035));
      page.classList.toggle('history-reduced-motion', reducedMotion.matches);
    };
    const scheduleMeasure = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    const changeLayout = () => { setDesktopLayout(desktop.matches); scheduleMeasure(); };
    window.addEventListener('scroll', scheduleMeasure, { passive: true });
    window.addEventListener('resize', scheduleMeasure);
    desktop.addEventListener('change', changeLayout);
    reducedMotion.addEventListener('change', scheduleMeasure);
    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(storyTrack);
    measure();
    onCleanup(() => {
      window.removeEventListener('scroll', scheduleMeasure);
      window.removeEventListener('resize', scheduleMeasure);
      desktop.removeEventListener('change', changeLayout);
      reducedMotion.removeEventListener('change', scheduleMeasure);
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
    });
  });

  const chooseSeason = (id: string) => {
    const index = legacySeasons.findIndex((season) => season.id === id);
    const story = storyElements[index];
    if (!story) return;
    story.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true });
    story.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };
  const resetFilters = () => { setProgramFilter('all'); setTeamFilter('all'); setSeasonFilter('all'); };
  const showSeasonAwards = (season: LegacySeason) => {
    setProgramFilter(season.program); setSeasonFilter(season.season); setTeamFilter('all');
    document.getElementById('history-awards-title')?.focus({ preventScroll: true });
    document.getElementById('history-awards')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div class="history-page" ref={page}>
      <section class="history-hero" aria-labelledby="history-title">
        <div class="history-hero-copy">
          <span class="history-overline">California High School Robotics · Since 2005</span>
          <h1 id="history-title">Our history.</h1>
          <p>Cal High students have been building robots together for more than two decades. This is the record of our FIRST and VEX teams: the people, competitions, and machines behind the number 1516.</p>
          <div class="history-hero-links"><a class="history-text-link" href="#history-seasons">Explore the seasons <span aria-hidden="true">↓</span></a><a class="history-text-link" href="#history-awards">Browse club awards <span aria-hidden="true">↓</span></a></div>
        </div>
        <figure class="history-hero-photo"><img src="/club/frc-2010.jpg" alt="The 2010 Fightin’ Grizzlies team gathered with their robot in the Team 1516 pit." width="1600" height="1231" fetchpriority="high" /><figcaption>Team 1516 at the 2010 Silicon Valley Regional. Photograph: NASA.</figcaption></figure>
      </section>

      <section class="history-context" aria-labelledby="history-context-title">
        <div class="history-context-heading"><span class="history-overline">FIRST → VEX</span><h2 id="history-context-title">How the program grew</h2></div>
        <div class="history-context-copy">
          <p>The club traces its founding to 2005, also Team 1516’s official FRC rookie year. The Grizzlies competed for eight consecutive seasons, winning the 2007 Silicon Valley Regional and reaching FIRST Championship in Atlanta in 2007 and 2009.</p>
          <p>The club dates its shift in focus to VEX to 2012. That relationship had already begun: Team 254’s January 2011 tournament report thanked Cal High for supplying a VEX field. FRC and VEX keep separate competition records; both are part of the school program’s history.</p>
          <div class="history-inline-sources"><a href="https://frc-events.firstinspires.org/team/1516" target="_blank" rel="noreferrer">FIRST participation history ↗</a><a href="https://github.com/calhighrobotics/website/blob/main/src/components/Teams.tsx" target="_blank" rel="noreferrer">Club history ↗</a><a href="https://blog.team254.com/bellarmine-vex-regional/" target="_blank" rel="noreferrer">The 2011 VEX connection ↗</a></div>
        </div>
      </section>

      <section class="history-seasons" id="history-seasons" aria-labelledby="history-seasons-title">
        <div class="history-section-heading"><div><span class="history-overline">The season archive</span><h2 id="history-seasons-title">Year by year</h2></div><p>Scroll through the seasons. The photographs and recordings follow the story, from FIRST to VEX. Choose a year to jump ahead.</p></div>
        <nav class="history-season-nav" aria-label="Choose a robotics season">
          <For each={['FRC', 'VEX'] as const}>{(program) => <div class="history-era-row"><span class="history-era-label">{program}</span><div class="history-year-buttons" role="group" aria-label={`${program} seasons`}><For each={legacySeasons.filter((season) => season.program === program)}>{(season) => <button type="button" aria-current={selectedSeasonId() === season.id ? 'step' : undefined} classList={{ 'is-selected': selectedSeasonId() === season.id }} onClick={() => chooseSeason(season.id)} aria-label={`${season.program} ${season.label}, ${season.game}`}>{season.label}</button>}</For></div></div>}</For>
        </nav>
        <label class="history-mobile-season">Choose a season<select value={selectedSeasonId()} onChange={(event) => chooseSeason(event.currentTarget.value)}><For each={['FRC', 'VEX'] as const}>{(program) => <optgroup label={program}><For each={legacySeasons.filter((season) => season.program === program)}>{(season) => <option value={season.id}>{season.label} · {season.game}</option>}</For></optgroup>}</For></select></label>
        <div class="history-scroll-layout">
          <Show when={desktopLayout()}>
            <aside class="history-scroll-stage" aria-label="Media for the current season" data-season={selectedSeasonId()}>
              <Show when={activeSeason()} keyed>{(season) => <div class="history-stage-content">
                <div class="history-stage-identification"><span class="history-overline">{season.program} · {season.game}</span><strong>{season.label}</strong></div>
                <div class="history-stage-media-window">
                  <SeasonMedia season={season} resetKey={selectedSeasonId()} />
                  <div class="history-era-wipe" aria-hidden="true"><span>Cal High Robotics</span><strong>FRC <span>→</span> VEX</strong><span>2012 · A new competition chapter</span></div>
                </div>
              </div>}</Show>
              <div class="history-stage-navigation"><button type="button" disabled={activeIndex() <= 0} onClick={() => chooseSeason(legacySeasons[activeIndex() - 1].id)}>← Previous</button><button type="button" disabled={activeIndex() >= legacySeasons.length - 1} onClick={() => chooseSeason(legacySeasons[activeIndex() + 1].id)}>Next →</button></div>
            </aside>
          </Show>
          <div class="history-story-track" ref={storyTrack}>
            <For each={legacySeasons}>{(season, index) => <>
              <Show when={index() === firstVexIndex}>
                <section class="history-era-transition" ref={eraBoundary} aria-labelledby="history-era-title">
                  <span class="history-overline">2012 · FIRST → VEX</span>
                  <h3 class="history-era-wordmark" id="history-era-title" aria-label="From FIRST Robotics Competition to VEX Robotics Competition"><span class="history-era-frc" aria-hidden="true">FRC</span><span class="history-era-vex" aria-hidden="true">VEX</span></h3>
                  <div class="history-era-rule" aria-hidden="true"><span /></div>
                  <p>The club dates its shift in focus to VEX to 2012. Eight FRC seasons lead into the VEX history below.</p>
                  <a href="https://github.com/calhighrobotics/website/blob/main/src/components/Teams.tsx" target="_blank" rel="noreferrer">The club’s history <span aria-hidden="true">↗</span></a>
                </section>
              </Show>
              <article class="history-story" data-season={season.id} id={`history-story-${season.id}`} classList={{ 'is-active': selectedSeasonId() === season.id }} ref={(element) => { storyElements[index()] = element; }} aria-labelledby={`history-title-${season.id}`}>
                <header class="history-season-heading"><span class="history-overline">{season.program} · {season.label}</span><h3 id={`history-title-${season.id}`} tabIndex={-1}>{season.game}</h3></header>
                <div class="history-season-copy">
                  <h4>{season.title}</h4><p>{season.body}</p>
                  <Show when={season.highlights.length > 0}><ul class="history-season-highlights"><For each={season.highlights}>{(highlight) => <li>{highlight}</li>}</For></ul></Show>
                  <div class="history-season-sources"><For each={season.sourceLinks}>{(source) => <a href={source.url} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a>}</For></div>
                  <Show when={legacyAwards.some((award) => award.program === season.program && award.season === season.season)}><button type="button" class="history-text-link history-season-awards-link" onClick={() => showSeasonAwards(season)}>Awards from this season <span aria-hidden="true">↓</span></button></Show>
                </div>
                <Show when={!desktopLayout()}><div class="history-story-inline-media"><SeasonMedia season={season} resetKey={selectedSeasonId()} /></div></Show>
              </article>
            </>}</For>
          </div>
        </div>
        <p class="history-video-note">YouTube videos load after you press Play and start muted. Some seasons have documented media gaps.</p>
      </section>

      <section class="history-awards" id="history-awards" aria-labelledby="history-awards-title">
        <div class="history-section-heading"><div><span class="history-overline">FRC & VEX</span><h2 id="history-awards-title" tabIndex={-1}>Club awards</h2></div><p>{awardCoverage.notice}</p></div>
        <form class="history-award-filters" aria-label="Filter award records" onSubmit={(event) => event.preventDefault()}>
          <label>Program<select value={programFilter()} onChange={(event) => setProgramFilter(event.currentTarget.value as 'all' | LegacyProgram)}><option value="all">All programs</option><option value="FRC">FIRST Robotics Competition</option><option value="VEX">VEX Robotics Competition</option></select></label>
          <label>Team<select value={teamFilter()} onChange={(event) => setTeamFilter(event.currentTarget.value)}><option value="all">All teams</option><For each={teams}>{(team) => <option value={team}>{team === '1516' ? '1516 · FRC' : team}</option>}</For></select></label>
          <label>Season<select value={seasonFilter()} onChange={(event) => setSeasonFilter(event.currentTarget.value)}><option value="all">All seasons</option><For each={awardSeasons}>{(season) => <option value={season}>{seasonLabel(season)}</option>}</For></select></label>
          <button class="history-filter-reset" type="button" disabled={!hasFilters()} onClick={resetFilters}>Reset filters</button>
        </form>
        <div class="history-award-results"><p aria-live="polite" aria-atomic="true">{filteredAwards().length} {filteredAwards().length === 1 ? 'award record' : 'award records'}</p><span>Each row records one team’s award at one event.</span></div>
        <Show when={filteredAwards().length > 0} fallback={<div class="history-awards-empty"><p>No recorded awards match these filters.</p><button type="button" class="history-text-link" onClick={resetFilters}>Show all award records <span aria-hidden="true">↗</span></button></div>}>
          <div class="history-award-table-wrap" role="region" aria-label="Award records; scroll horizontally on small screens" tabIndex={0}>
            <table class="history-award-table"><caption class="visually-hidden">Recorded Cal High Robotics awards. Each event link opens its source record.</caption><thead><tr><th scope="col">Season / game</th><th scope="col">Team</th><th scope="col">Award</th><th scope="col">Event / date</th></tr></thead>
              <tbody><For each={filteredAwards()}>{(award) => <tr><td><strong>{seasonLabel(award.season)}</strong><span>{award.game}</span></td><td><strong>{award.team}</strong><span>{award.program}</span></td><td class="history-award-name">{award.award}</td><td><a href={award.eventUrl} target="_blank" rel="noreferrer">{award.event} <span aria-hidden="true">↗</span></a><span>{eventDateLabel(award.eventDate, award.season, award.eventEndDate)}<Show when={award.scope === 'off-season'}> · Off-season</Show></span></td></tr>}</For></tbody>
            </table>
          </div>
        </Show>
        <p class="history-award-count-note">Alliance awards remain listed for each recipient team. These records are not a count of unique events or trophies. Off-season FRC awards are labeled separately from FIRST’s official-season record.</p>
        <details class="history-coverage"><summary>Archive coverage and sources</summary><div><p>{awardCoverage.heading} · Checked {awardCoverage.checkedOn}</p><ul><For each={awardCoverage.notes}>{(note) => <li>{note}</li>}</For></ul><div class="history-inline-sources"><For each={awardCoverage.sources}>{(source) => <a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>}</For></div></div></details>
      </section>

      <section class="history-people" aria-labelledby="history-people-title"><div><span class="history-overline">The people behind the program</span><h2 id="history-people-title">Building a place to learn</h2></div><div><p>Cal High’s early robotics program also brought other schools together. In December 2007, the school hosted the second annual Savage Soccer Robotics Tournament, with 30 robots from seven high schools.</p><p>Robotics teacher and club advisor John Korzick helped establish that foundation. The school newspaper credits him with helping start the Engineering Academy in 2009. His work connected students with equipment and engineering mentors, and he was named district Teacher of the Year in 2010.</p><div class="history-inline-sources"><a href="https://www.danvillesanramon.com/news/2008/01/02/srvhs-sweeps-soccer-robotics/" target="_blank" rel="noreferrer">The community tournament ↗</a><a href="https://www.thecalifornianpaper.com/2012/04/retired-educator-john-korzick-passes-away/" target="_blank" rel="noreferrer">John Korzick’s school legacy ↗</a></div></div></section>
      <section class="history-today" aria-labelledby="history-today-title"><div><span class="history-overline">The club today</span><h2 id="history-today-title">Meet the current teams</h2><p>Explore our VEX teams, their engineering work, and the students continuing Cal High’s robotics program.</p></div><A class="history-team-link" href="/teams">Explore the teams <span aria-hidden="true">↗</span></A></section>
    </div>
  );
}
