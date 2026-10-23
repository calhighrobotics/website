import { For } from 'solid-js';
import { A } from '@solidjs/router';
import './Programs.css';

const campActivities = [
  { title: 'Build a robot.', category: 'Hands on, from the start', text: 'Explore VEX robot design and manufacturing techniques, then turn those ideas into a physical build.', graphic: 'build', part: 'VEX C-channel', src: '/parts/vex-c-channel.svg', alt: 'Wireframe of a VEX C-channel with rows of holes for mounting robot parts.' },
  { title: 'Think it through.', category: 'A little lesson. A lot of doing.', text: 'Short lessons and STEM activities introduce ways to approach a challenge like a roboticist.', graphic: 'think', part: 'VEX V5 Brain', src: '/parts/vex-v5-brain.svg', alt: 'Wireframe of a VEX V5 Brain, the robot controller.' },
  { title: 'Take on a challenge.', category: 'Together, on the field', text: 'Work with fellow students and Cal High Robotics mentors, then put your robot to the test in a competition.', graphic: 'compete', part: 'VEX 3.25-inch omni wheel', src: '/parts/vex-omni-wheel.svg', alt: 'Line drawing of a VEX 3.25-inch omni wheel with rollers around its rim.' },
];

export default function SummerCamp() {
  return (
    <div class="program-page camp-page">
      <section class="camp-hero">
        <div class="camp-hero-copy">
          <p class="program-eyebrow">California High School Robotics</p>
          <h1>Summer camp</h1>
          <p class="program-lede">Hands-on robotics with Cal High student mentors.</p>
          <p class="program-intro">Cal High Robotics' summer camp brings students together for hands-on VEX building, STEM activities, and a robot competition with club mentors.</p>
          <a class="program-button" href="mailto:calhighrobotics@gmail.com?subject=Future%20robotics%20summer%20camp%20information">Ask about future camps <span aria-hidden="true">↗</span></a>
          <div class="camp-session-status"><span class="camp-completed-icon" aria-hidden="true">✓</span><div><strong>The 2026 session has wrapped.</strong><p>Looking ahead? Contact the club for future camp information.</p></div></div>
        </div>
        <figure class="camp-poster-frame camp-hero-photo">
          <div class="camp-poster-topline"><span>A BUILD IN PROGRESS</span><span>SUMMER / 2026</span></div>
          <a class="camp-photo-window" href="/club/drive-camp-extra-build.webp" target="_blank" rel="noopener noreferrer" aria-label="View the full photo of a robot build at the 2026 summer camp"><img src="/club/drive-camp-extra-build.webp" alt="Hands assembling a metal robot chassis among wheels, gears, and tools at the 2026 robotics summer camp." width="2000" height="1500" /><span class="camp-photo-year" aria-hidden="true">2026</span></a>
          <figcaption><span>From the summer camp workshop</span><span aria-hidden="true">↗</span></figcaption>
        </figure>
      </section>

      <section class="camp-session program-scroll-in" aria-labelledby="camp-session-title">
        <div class="camp-session-heading"><p class="program-eyebrow">The most recent session</p><h2 id="camp-session-title">SUMMER <span>2026.</span></h2><span class="camp-archive-tag">COMPLETED</span></div>
        <dl class="camp-facts">
          <div><dt>When</dt><dd>June 8–12<span>2026</span></dd></div>
          <div><dt>Time</dt><dd>3–6:30 PM<span>Each afternoon</span></dd></div>
          <div><dt>Who</dt><dd>Grades 6–9<span>For the 2026–27 school year</span></dd></div>
          <div><dt>Where</dt><dd>Cal High<span>San Ramon, California</span></dd></div>
          <div><dt>2026 fee</dt><dd>$250<span>Past session price</span></dd></div>
        </dl>
        <p class="camp-facts-note">These details describe the completed 2026 camp. Future dates, eligibility, and pricing will be confirmed separately.</p>
      </section>

      <section class="camp-experience" aria-labelledby="camp-experience-title">
        <div class="program-section-heading program-scroll-in"><div><p class="program-eyebrow">Inside the experience</p><h2 id="camp-experience-title">What campers<br /><span>learn</span></h2></div><p>A look at the activities featured in the 2026 program.</p></div>
        <div class="camp-activities">
          <For each={campActivities}>{activity => <article class="camp-activity program-scroll-in">
            <figure class={`camp-activity-art camp-art--${activity.graphic}`}><img src={activity.src} alt={activity.alt} width="720" height="520" loading="lazy" /><figcaption>{activity.part}</figcaption></figure>
            <p class="camp-activity-category">{activity.category}</p><h3>{activity.title}</h3><p>{activity.text}</p>
          </article>}</For>
        </div>
      </section>

      <section class="camp-gallery program-scroll-in" aria-labelledby="camp-gallery-title">
        <div class="camp-gallery-heading"><p class="program-eyebrow">Summer 2026</p><h2 id="camp-gallery-title">Photos<br /><span>from camp</span></h2></div>
        <div class="camp-gallery-grid">
          <figure><img src="/club/drive-camp-extra-match.webp" alt="Students operating robots around the competition field at Cal High's 2026 summer camp." width="2000" height="1500" loading="lazy" /><figcaption><span>Putting the build to the test</span><span>SUMMER 2026</span></figcaption></figure>
          <figure><img src="/club/drive-camp-extra-room.webp" alt="The 2026 summer camp group gathered around a robotics field in the California High School workshop." width="2000" height="1500" loading="lazy" /><figcaption><span>A room full of ideas</span><span>SUMMER 2026</span></figcaption></figure>
        </div>
      </section>

      <section class="camp-mentor-strip program-scroll-in"><figure class="camp-mentor-photo"><img src="/club/drive-camp-classroom.webp" alt="Students working with a laptop and robot parts at the 2026 robotics summer camp." width="1946" height="1459" loading="lazy" /><figcaption>At the 2026 summer camp</figcaption></figure><div><p class="program-eyebrow">Students helping students</p><h2>Student<br />mentors</h2><p>Campers learn alongside Cal High Robotics club mentors. It's a chance to ask questions, work through a build, and discover what a robot can do.</p><A class="program-text-link" href="/contact">Connect with Cal High Robotics <span aria-hidden="true">↗</span></A></div></section>

      <section class="program-faq-section program-scroll-in" aria-labelledby="camp-faq-title">
        <div><p class="program-eyebrow">Before you sign up</p><h2 id="camp-faq-title">Questions<br />for families</h2><p class="program-faq-aside">Have a camp question?<br /><a class="program-text-link" href="mailto:calhighrobotics@gmail.com?subject=Summer%20camp%20question">Email the club <span aria-hidden="true">↗</span></a></p></div>
        <div class="program-faqs">
          <details><summary>Can I register for a camp right now?<span aria-hidden="true">+</span></summary><p>The June 8–12, 2026 session has ended. Contact the club for information about future camps, including dates and how to register when the next session is announced.</p></details>
          <details><summary>Which ages was the 2026 camp for?<span aria-hidden="true">+</span></summary><p>The 2026 session was for students entering grades 6–9 in the 2026–27 school year. Eligibility for a future session will be confirmed with that camp's announcement.</p></details>
          <details><summary>What did the 2026 camp cover?<span aria-hidden="true">+</span></summary><p>The program featured VEX robot building, short lessons on manufacturing and robot design, STEM activities, club mentors, and a robot competition.</p></details>
          <details><summary>Where is California High School?<span aria-hidden="true">+</span></summary><p>The school is at 9870 Broadmoor Drive, San Ramon, CA 94583. For a future camp, confirm the exact room and arrival instructions with the club before visiting.</p></details>
          <details><summary>I'm a Cal High student. Where should I start?<span aria-hidden="true">+</span></summary><p>Explore <A href="/cubs">Cubs, the club's novice program</A>, or contact the club about getting involved. Cubs and the summer camp are separate programs.</p></details>
        </div>
      </section>

      <section class="program-bottom-cta program-scroll-in"><p class="program-eyebrow">Stay in touch</p><h2>Future camps</h2><p>Ask the club about future camp plans.</p><a class="program-button program-button--dark" href="mailto:calhighrobotics@gmail.com?subject=Future%20robotics%20summer%20camp%20information">Ask about future camps <span aria-hidden="true">↗</span></a></section>
      <p class="program-source-note">2026 program details: <a href="/club/summer-camp-2026.webp" target="_blank" rel="noopener noreferrer">camp poster ↗</a><span aria-hidden="true"> · </span><a href="https://calhigh.futurefund.com/store/campaigns/68340-cal-high-robotics-stemming-into-robotics-summer-camp-2026" target="_blank" rel="noopener noreferrer">school's past camp listing ↗</a></p>
    </div>
  );
}
