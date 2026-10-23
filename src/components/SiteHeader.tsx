import { A, useLocation } from '@solidjs/router';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = createSignal(false);
  const location = useLocation();
  let header!: HTMLElement;
  let menuButton!: HTMLButtonElement;

  createEffect(() => {
    location.pathname;
    setMenuOpen(false);
  });

  onMount(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen()) {
        setMenuOpen(false);
        menuButton.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (menuOpen() && !header.contains(event.target as Node)) setMenuOpen(false);
    };
    const onFocusOut = (event: FocusEvent) => {
      if (menuOpen() && event.relatedTarget && !header.contains(event.relatedTarget as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    header.addEventListener('focusout', onFocusOut);
    onCleanup(() => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      header.removeEventListener('focusout', onFocusOut);
    });
  });

  return (
    <header class="site-header" classList={{ 'site-header--home': location.pathname === '/' }} ref={header}>
      <div class="site-header__inner section-shell">
        <A class="site-brand" href="/" aria-label="Cal High Robotics home">
          <img class="site-brand__mark" src="/club/drive-logo.svg" alt="" width="45" height="45" />
          <span class="site-brand__wordmark"><strong>CAL HIGH</strong><span>ROBOTICS / 1516</span></span>
        </A>
        <button ref={menuButton} class="site-menu-toggle" type="button" aria-expanded={menuOpen()} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen())}>
          <span>{menuOpen() ? 'Close' : 'Menu'}</span><span class="site-menu-toggle__lines" aria-hidden="true" />
        </button>
        <nav id="site-navigation" class="site-nav" classList={{ 'is-open': menuOpen() }} aria-label="Primary navigation" onClick={event => {
          const link = (event.target as HTMLElement).closest('a');
          if (link && menuOpen()) {
            setMenuOpen(false);
            if (link.pathname === location.pathname) menuButton.focus();
          }
        }}>
          <A class="site-nav__link" activeClass="is-active" href="/" end>Home</A>
          <A class="site-nav__link" activeClass="is-active" href="/teams">The teams</A>
          <A class="site-nav__link" activeClass="is-active" href="/legacy">Our legacy</A>
          <A class="site-nav__link" activeClass="is-active" href="/cubs">Cubs</A>
          <A class="site-nav__link" activeClass="is-active" href="/summer-camp">Summer camp</A>
          <A class="site-nav__join" href="/contact">Get involved <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.7" /></svg></A>
        </nav>
      </div>
    </header>
  );
}
