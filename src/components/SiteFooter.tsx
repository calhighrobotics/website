import { A } from '@solidjs/router';

export default function SiteFooter() {
  return (
    <footer class="site-footer">
      <div class="section-shell">
        <div class="site-footer__top">
          <div>
            <p class="eyebrow">California High School / San Ramon, CA</p>
            <h2 class="site-footer__heading">Join Cal High<br /><span>Robotics.</span></h2>
          </div>
          <div class="site-footer__contact">
            <p>Ask about joining, mentoring, or supporting the club. We’d like to hear from you.</p>
            <a class="text-link site-footer__email" href="mailto:calhighrobotics@gmail.com">calhighrobotics@gmail.com <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5" /></svg></a>
          </div>
        </div>
        <div class="site-footer__bottom">
          <p>© {new Date().getFullYear()} California High School Robotics Club</p>
          <nav class="site-footer__socials" aria-label="Club links">
            <A href="/contact">Contact</A>
            <a href="https://instagram.com/calhighrobotics" target="_blank" rel="noopener noreferrer">Instagram ↗<span class="visually-hidden"> (opens in a new tab)</span></a>
            <a href="https://github.com/calhighrobotics" target="_blank" rel="noopener noreferrer">GitHub ↗<span class="visually-hidden"> (opens in a new tab)</span></a>
          </nav>
        </div>
      </div>
      <div class="site-footer__wordmark" aria-hidden="true">CAL HIGH ROBOTICS.</div>
    </footer>
  );
}
