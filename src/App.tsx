import { createEffect, ErrorBoundary, lazy, Suspense } from 'solid-js';
import { A, Navigate, Route, Routes, useLocation } from '@solidjs/router';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import PhotoColor from './components/PhotoColor';
import HomePage from './pages/HomePage';

const TeamsPage = lazy(() => import('./pages/TeamsPage'));
const Team1516 = lazy(() => import('./pages/Team1516'));
const Legacy = lazy(() => import('./pages/Legacy'));
const Cubs = lazy(() => import('./pages/Cubs'));
const SummerCamp = lazy(() => import('./pages/SummerCamp'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': { title: 'Cal High Robotics — California High School', description: 'Meet California High School Robotics in San Ramon: our student VEX teams, Cubs novice program, hands-on summer camp, and FRC 1516 history.' },
  '/teams': { title: 'The Teams — Cal High Robotics', description: 'Meet Cal High Robotics teams 1516A and 1516X, explore their work, and get to know upcoming teams 1516Y, 1516Z, and 1516V.' },
  '/1516a': { title: '1516A — Cal High Robotics', description: 'Explore Team 1516A, the Fightin’ Grizzlies of California High School, our Push Back robot, and our award history.' },
  '/legacy': { title: 'Our Legacy — Cal High Robotics', description: 'From FRC Team 1516 in 2005 to VEX and the 2026 World Championship: explore the history of California High School Robotics.' },
  '/cubs': { title: 'Cubs — Cal High Robotics', description: 'Cubs introduces Cal High students to building, coding, and competing with robots through the school’s novice robotics program.' },
  '/summer-camp': { title: 'Summer Camp — Cal High Robotics', description: 'Hands-on robotics for younger students. Explore California High School Robotics summer camp and ask about future sessions.' },
  '/contact': { title: 'Get Involved — Cal High Robotics', description: 'Join, mentor, or support California High School Robotics. Contact our student robotics club in San Ramon, California.' },
};

function NotFound() {
  return <section class="not-found section-shell"><p class="eyebrow">Page not found / 404</p><h1>Off the field.</h1><p>This page has moved or doesn’t exist. Head back to the club and find your next stop.</p><A href="/" class="text-link">Back to the homepage <span aria-hidden="true">↗</span></A></section>;
}

export default function App() {
  const location = useLocation();
  let main!: HTMLElement;
  let previousPath = location.pathname;

  createEffect(() => {
    const path = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    const metadata = pageMetadata[path] ?? { title: 'Page Not Found — Cal High Robotics', description: 'Explore California High School Robotics teams, programs, and history.' };
    document.title = metadata.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = metadata.description;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://calhighrobotics.org${path === '/' ? '/' : path}`;
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = metadata.title;
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = metadata.description;
    if (previousPath !== location.pathname) {
      main?.focus({ preventScroll: true });
      previousPath = location.pathname;
    }
  });

  return (
    <>
      <PhotoColor />
      <a class="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" ref={main} tabIndex={-1}>
        <ErrorBoundary fallback={<section class="not-found section-shell"><p class="eyebrow">The page couldn’t load</p><h1>Try again.</h1><p>Reload the page to continue exploring the club.</p><a class="text-link" href={location.pathname}>Reload this page <span aria-hidden="true">↗</span></a></section>}>
          <Suspense fallback={<div class="route-loading" role="status"><span>CAL HIGH ROBOTICS</span><span>Loading the next page…</span></div>}>
            <Routes>
              <Route path="/" component={HomePage} />
              <Route path="/teams" component={TeamsPage} />
              <Route path="/1516a" component={Team1516} />
              <Route path="/1516A" component={() => <Navigate href="/1516a" />} />
              <Route path="/teams/1516a" component={() => <Navigate href="/1516a" />} />
              <Route path="/legacy" component={Legacy} />
              <Route path="/cubs" component={Cubs} />
              <Route path="/summer-camp" component={SummerCamp} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/events" component={() => <Navigate href="/summer-camp" />} />
              <Route path="/camp2024" component={() => <Navigate href="/summer-camp" />} />
              <Route path="/sponsor" component={() => <Navigate href="/contact" />} />
              <Route path="/apply" component={() => <Navigate href="/contact" />} />
              <Route path="/formsubmitted" component={() => <Navigate href="/contact" />} />
              <Route path="*" component={NotFound} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <SiteFooter />
    </>
  );
}
