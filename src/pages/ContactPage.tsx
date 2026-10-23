import { For } from 'solid-js';
import { A } from '@solidjs/router';
import './Programs.css';

const contactPaths = [
  { label: 'For students', title: 'Join the club', text: 'New to robotics or ready for your next challenge? Tell us you’re a Cal High student and what you’re interested in.', action: 'Ask about joining', subject: 'Joining Cal High Robotics', mark: '↗' },
  { label: 'For supporters', title: 'Support students', text: 'Help create more opportunities to build and learn. Contact the club about sponsorship, materials, or other ways to support students.', action: 'Talk about sponsorship', subject: 'Supporting Cal High Robotics', mark: '+' },
  { label: 'For mentors', title: 'Become a mentor', text: 'Have engineering, programming, or hands-on experience to share? Start a conversation about how you could get involved.', action: 'Ask about mentoring', subject: 'Mentoring with Cal High Robotics', mark: '↻' },
];

export default function ContactPage() {
  return (
    <div class="contact-page">
      <section class="contact-hero">
        <p class="program-eyebrow"><span class="program-status-dot" /> California High School · San Ramon</p>
        <div class="contact-hero-heading"><h1>Get <span>involved</span></h1></div>
        <div class="contact-hero-bottom"><p>Contact the club about joining,<br />mentoring, sponsorship, or summer camp.</p><a class="contact-email-link" href="mailto:calhighrobotics@gmail.com"><span>calhighrobotics</span><span>@gmail.com</span><span class="contact-email-arrow" aria-hidden="true">↗</span></a></div>
      </section>

      <section class="contact-paths-section" aria-labelledby="contact-paths-title">
        <div class="program-section-heading program-scroll-in"><div><p class="program-eyebrow">Ways to get involved</p><h2 id="contact-paths-title">Join, mentor,<br /><span>or support</span></h2></div><p>Choose the topic that fits and email the club to start a conversation.</p></div>
        <div class="contact-paths">
          <For each={contactPaths}>{path => <article class="contact-path program-scroll-in"><span class="contact-path-mark" aria-hidden="true">{path.mark}</span><p class="program-eyebrow">{path.label}</p><h3>{path.title}</h3><p>{path.text}</p><a class="program-text-link" href={`mailto:calhighrobotics@gmail.com?subject=${encodeURIComponent(path.subject)}`}>{path.action} <span aria-hidden="true">↗</span></a></article>}</For>
        </div>
        <div class="contact-packet"><p>Interested in the club's work and ways to support it?</p><a href="/web/sponsor.pdf" target="_blank" rel="noopener noreferrer">Read the 2023 sponsorship packet <span aria-hidden="true">↗</span></a></div>
      </section>

      <section class="contact-school-section program-scroll-in" aria-labelledby="contact-school-title">
        <div class="contact-school-graphic" aria-hidden="true"><div class="contact-coordinate"><span>SAN RAMON</span><span>CALIFORNIA</span></div><div class="contact-location-target"><span /><span /><span /><b>CHS</b></div><div class="contact-coordinate"><span>9870 BROADMOOR DRIVE</span><span>94583</span></div></div>
        <div class="contact-school-copy"><p class="program-eyebrow">California High School</p><h2 id="contact-school-title">Our school</h2><address>California High School<br />9870 Broadmoor Drive<br />San Ramon, CA 94583</address><p>For meetings, camp arrival details, or a visit, check with the club first so you know where to go.</p><a class="program-text-link" href="https://chs.srvusd.net/" target="_blank" rel="noopener noreferrer">Visit the school website <span aria-hidden="true">↗</span></a></div>
      </section>

      <section class="contact-links-section program-scroll-in" aria-labelledby="contact-links-title"><div><p class="program-eyebrow">Stay connected</p><h2 id="contact-links-title">Club updates</h2></div><div class="contact-social-links"><a href="https://www.instagram.com/calhighrobotics/" target="_blank" rel="noopener noreferrer"><span><small>Club updates</small>Instagram</span><span aria-hidden="true">↗</span></a><a href="https://github.com/calhighrobotics" target="_blank" rel="noopener noreferrer"><span><small>Code & projects</small>GitHub</span><span aria-hidden="true">↗</span></a><A href="/summer-camp"><span><small>For students & families</small>Summer camp</span><span aria-hidden="true">↗</span></A></div></section>
    </div>
  );
}
