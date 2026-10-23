import { A } from '@solidjs/router';
import { onCleanup, onMount } from 'solid-js';
import './HomePage.css';

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.6" /></svg>;
}

export default function HomePage() {
  let page!: HTMLDivElement;
  onMount(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations: Animation[] = [];
    if (media.matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const animation = entry.target.animate([{opacity: 0, transform: 'translateY(18px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)'});
        animations.push(animation);
        observer.unobserve(entry.target);
      });
    }, {threshold: .1});
    page.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    const stopMotion = () => { if (media.matches) { observer.disconnect(); animations.forEach(animation => animation.cancel()); } };
    media.addEventListener('change', stopMotion);
    onCleanup(() => { observer.disconnect(); media.removeEventListener('change', stopMotion); animations.forEach(animation => animation.cancel()); });
  });

  return (
    <div class="home-page" ref={page}>
      <section class="home-hero section-shell" aria-labelledby="home-heading">
        <div class="home-hero__layout">
          <div class="home-hero__copy">
            <p class="eyebrow">California High School · San Ramon, CA</p>
            <h1 id="home-heading">Cal High <br />Robotics<span>.</span></h1>
            <p>We’re students who design, build, program, and compete with robots. Our club brings together experienced builders and people picking up their first tool.</p>
            <div class="home-hero__paths">
              <A class="home-primary-link" href="/contact">Join the club <Arrow /></A>
              <A class="home-simple-link" href="/teams">Explore our teams <Arrow /></A>
              <a class="home-simple-link" href="#programs" onClick={() => document.getElementById('programs')?.scrollIntoView()}>Find your program <Arrow /></a>
            </div>
          </div>
          <figure class="home-hero__photo">
            <img src="/club/team-x-2026.webp" alt="Eight Cal High 1516X students together at the 2026 VEX World Championship" width="1600" height="1066" fetchpriority="high" />
            <figcaption><span>Team 1516X at VEX Worlds</span><span>St. Louis, Missouri · 2026</span></figcaption>
          </figure>
        </div>
        <div class="home-milestone"><p class="eyebrow">A club first</p><p>In 2026, 1516X became the first Cal High team to qualify for the VEX World Championship.</p><A href="/teams#team-1516x" class="home-simple-link">Meet Team X <Arrow /></A></div>
      </section>

      <section class="home-programs section-shell" id="programs" aria-labelledby="programs-heading">
        <div class="home-section-heading"><p class="eyebrow">Learn with us</p><h2 id="programs-heading">A place to get started.</h2><p>Two programs, for two different stages of learning.</p></div>
        <div class="home-programs__layout">
          <figure class="home-programs__photo" data-reveal><img src="/club/drive-camp-classroom.webp" alt="Summer camp participants gathered around a classroom table with a laptop and robot parts" width="1946" height="1459" loading="lazy" /><figcaption>Learning together at our 2026 summer camp.</figcaption></figure>
          <div class="home-programs__list">
            <article class="home-program-entry" data-reveal><p class="home-program-entry__audience">For California High School students</p><h3>Cubs</h3><p>Our novice program is the starting point for Cal High students learning to build and code. Put those skills into practice through competitions here at school.</p><A href="/cubs" class="home-simple-link">Explore Cubs <Arrow /></A></article>
            <article class="home-program-entry" data-reveal><p class="home-program-entry__audience">For younger students · Grades 6–9 in 2026</p><h3>Summer camp</h3><p>A hands-on introduction to robotics with Cal High students. Our recent camp brought younger learners together to design, build, and try out their ideas.</p><A href="/summer-camp" class="home-simple-link">About summer camp <Arrow /></A></article>
          </div>
        </div>
      </section>

      <section class="home-teams" aria-labelledby="teams-heading"><div class="section-shell">
        <div class="home-teams__intro"><div class="home-section-heading"><p class="eyebrow">VEX competition</p><h2 id="teams-heading">Meet Team 1516.</h2></div><p>Our teams share a club, a school, and plenty of ideas. Each brings its own approach to the field.</p></div>
        <div class="home-team-grid">
          <article class="home-team" data-reveal><p class="eyebrow">The Fightin’ Grizzlies</p><h3>1516A</h3><p>Explore Team A’s work, competition history, and engineering.</p><A href="/1516a" class="home-simple-link">Inside Team A <Arrow /></A></article>
          <article class="home-team" data-reveal><p class="eyebrow">VEX World Championship · 2026</p><h3>1516X</h3><p>A regional Design Award earned Team X its place at the 2026 World Championship.</p><A href="/teams#team-1516x" class="home-simple-link">Meet Team X <Arrow /></A></article>
        </div>
        <div class="home-upcoming"><div><p class="eyebrow">Coming next</p><h3>1516Y, 1516Z & 1516V</h3></div><p>Three upcoming teams, with new stories still to be written.</p><A href="/teams#upcoming-teams" class="home-simple-link">All our teams <Arrow /></A></div>
      </div></section>

      <section class="home-legacy section-shell" aria-labelledby="legacy-heading">
        <figure class="home-legacy__photo" data-reveal><img src="/club/frc-2007.jpg" alt="Cal High’s FRC Team 1516 robot at the 2007 Silicon Valley Regional" width="1600" height="1063" loading="lazy" /><figcaption>FRC 1516 at Silicon Valley Regional, 2007. Photo: NASA / Dominic Hart.</figcaption></figure>
        <div class="home-legacy__copy" data-reveal><p class="eyebrow">Our history</p><h2 id="legacy-heading">Building a club<br />since 2005.</h2><p>Cal High Robotics began in FIRST Robotics. Eight FRC seasons, a regional win, and two trips to the FIRST Championship are part of the story we carry forward.</p><p>The club shifted its focus to VEX in 2012. Today’s students are adding their own chapter.</p><A href="/legacy" class="home-simple-link">Explore our history <Arrow /></A></div>
      </section>
    </div>
  );
}
