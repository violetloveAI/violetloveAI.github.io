'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './FdeTriptychIntro.module.css';

type EntryPhase = 'loading' | 'intro' | 'done';

const CRITICAL_IMAGES = [
  '/assets/portrait/violet-clay-portrait-3d-cutout.webp',
  '/assets/cartoon-clay-v2/navigation-system/04-route-without-stops.webp',
  '/assets/cartoon-clay-v2/navigation-system/05-route-stop-disc.webp',
  '/assets/cartoon-clay-v2/01-navigation/01-ai-assisted-building.webp',
  '/assets/cartoon-clay-v2/01-navigation/02-career.webp',
  '/assets/cartoon-clay-v2/01-navigation/03-education.webp',
  '/assets/cartoon-clay-v2/01-navigation/04-life-interests.webp',
  '/assets/cartoon-clay-v2/01-navigation/05-contact.webp',
] as const;

const BLOCKED_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'PageDown',
  'PageUp',
  'Home',
  'End',
  ' ',
  'Spacebar',
]);

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    const settle = () => resolve();

    image.onload = async () => {
      try {
        await image.decode?.();
      } catch {
        // A decoded frame is preferable, but a loaded image is still usable.
      }
      settle();
    };
    image.onerror = settle;
    image.src = src;
  });
}

export function FdeTriptychIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const releaseScrollRef = useRef<() => void>(() => undefined);
  const [phase, setPhase] = useState<EntryPhase>('loading');
  const [progress, setProgress] = useState(0);
  const [resourcesReady, setResourcesReady] = useState(false);

  useEffect(() => {
    const isDeepLink = window.location.hash && window.location.hash !== '#top';
    if (isDeepLink) {
      const frame = requestAnimationFrame(() => setPhase('done'));
      return () => cancelAnimationFrame(frame);
    }

    const html = document.documentElement;
    const previousRestoration = window.history.scrollRestoration;
    let released = false;
    let correctingScroll = false;

    const pinToStart = () => {
      if (correctingScroll || (window.scrollX === 0 && window.scrollY === 0)) return;
      correctingScroll = true;
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        correctingScroll = false;
      });
    };
    const preventGesture = (event: Event) => event.preventDefault();
    const blockActivation = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const preventScrollKey = (event: KeyboardEvent) => {
      if (BLOCKED_KEYS.has(event.key) && !isTypingTarget(event.target)) event.preventDefault();
    };
    const cursorVisibility = (visible: boolean) => {
      window.dispatchEvent(new CustomEvent('violet-cursor-visibility', { detail: visible }));
    };

    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    html.classList.add('fde-opening-active');
    cursorVisibility(false);
    window.addEventListener('wheel', preventGesture, { passive: false, capture: true });
    window.addEventListener('touchmove', preventGesture, { passive: false, capture: true });
    window.addEventListener('pointerdown', blockActivation, true);
    window.addEventListener('click', blockActivation, true);
    window.addEventListener('keydown', preventScrollKey, true);
    window.addEventListener('scroll', pinToStart, true);

    const release = () => {
      if (released) return;
      released = true;
      window.removeEventListener('wheel', preventGesture, true);
      window.removeEventListener('touchmove', preventGesture, true);
      window.removeEventListener('pointerdown', blockActivation, true);
      window.removeEventListener('click', blockActivation, true);
      window.removeEventListener('keydown', preventScrollKey, true);
      window.removeEventListener('scroll', pinToStart, true);
      html.classList.remove('fde-opening-active');
      window.history.scrollRestoration = previousRestoration;
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
      cursorVisibility(true);
    };

    releaseScrollRef.current = release;
    return release;
  }, []);

  useEffect(() => {
    if (phase !== 'loading') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minimumVisibleMs = reducedMotion ? 180 : 760;
    const startedAt = performance.now();
    let completed = 0;
    let finished = false;
    let cancelled = false;
    let frame = 0;
    let displayed = 0;

    const windowReady = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
    });
    const fontsReady = document.fonts?.ready.then(() => undefined) ?? Promise.resolve();
    const tasks = [windowReady, fontsReady, ...CRITICAL_IMAGES.map(preloadImage)];

    tasks.forEach((task) => {
      void task.finally(() => {
        completed += 1;
      });
    });
    void Promise.allSettled(tasks).then(() => {
      finished = true;
    });

    const fallback = window.setTimeout(() => {
      finished = true;
    }, 12000);

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startedAt;
      const actual = (completed / tasks.length) * 100;
      const timeCap = Math.min(100, (elapsed / minimumVisibleMs) * 100);
      const target = finished && elapsed >= minimumVisibleMs ? 100 : Math.min(actual, timeCap);
      displayed += (target - displayed) * (target === 100 ? 0.2 : 0.12);

      if (target === 100 && displayed >= 99.45) {
        displayed = 100;
        setProgress(100);
        setResourcesReady(true);
        return;
      }

      setProgress(Math.min(99, Math.floor(displayed)));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, [phase]);

  useGSAP(
    () => {
      if (!resourcesReady) return;
      gsap.set(`.${styles.triptych}`, { autoAlpha: 1 });
      gsap.timeline({
        onComplete: () => setPhase('intro'),
      })
        .to(`.${styles.loaderCopy}`, { opacity: 0, y: -14, duration: 0.22, ease: 'power3.in' })
        .to(`.${styles.loader}`, { opacity: 0, duration: 0.26, ease: 'power3.out' }, '<0.06');
    },
    { scope: rootRef, dependencies: [resourcesReady] },
  );

  useGSAP(
    () => {
      if (phase !== 'intro') return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const finish = () => {
        releaseScrollRef.current();
        setPhase('done');
      };

      if (reducedMotion) {
        gsap.set(`.${styles.panel}`, { clipPath: 'inset(0 0 0% 0)' });
        gsap.set(`.${styles.word}`, { opacity: 1, y: 0 });
        gsap.set(`.${styles.signature}`, { opacity: 1, y: 0, scale: 1 });
        gsap.to(rootRef.current, { opacity: 0, duration: 0.24, delay: 0.55, onComplete: finish });
        return;
      }

      const timeline = gsap.timeline({ onComplete: finish });
      timeline
        .fromTo(`.${styles.panel}`, { clipPath: 'inset(0 0 100% 0)' }, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.66,
          stagger: 0.08,
          ease: 'power3.inOut',
        })
        .fromTo(`.${styles.word}`, { opacity: 0, y: 54 }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
        }, '-=0.3')
        .fromTo(`.${styles.signature}`, { opacity: 0, y: 18, scale: 0.92 }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.48,
          ease: 'back.out(1.35)',
        }, '-=0.22')
        .to(`.${styles.signature}`, { opacity: 0, y: -10, duration: 0.24, ease: 'power2.in' }, '+=0.42')
        .to(`.${styles.word}`, { opacity: 0, y: -28, duration: 0.32, stagger: 0.045, ease: 'power3.in' }, '<')
        .to(`.${styles.panel}`, {
          yPercent: (index) => index === 1 ? 100 : -100,
          duration: 0.7,
          stagger: 0.045,
          ease: 'expo.inOut',
        }, '-=0.12')
        .to(rootRef.current, { opacity: 0, duration: 0.18, ease: 'power2.out' }, '-=0.16');

      const safety = window.setTimeout(finish, 5000);
      return () => window.clearTimeout(safety);
    },
    { scope: rootRef, dependencies: [phase] },
  );

  if (phase === 'done') return null;

  return (
    <div ref={rootRef} className={styles.root} data-entry-sequence aria-live="polite">
      <section className={styles.loader} data-entry-loader aria-label="网站加载进度">
        <div className={styles.loaderCopy}>
          <div className={styles.loaderMeta}>
            <span>VIOLET XIE / FDE PORTFOLIO</span>
            <span>FIELD · PRODUCT · TECHNOLOGY</span>
          </div>
          <div className={styles.loaderCenter}>
            <div
              className={styles.progressNumber}
              role="progressbar"
              aria-label="进入 Violet Xie 作品集所需资源"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <span>{progress}</span>
              <small>%</small>
            </div>
            <div className={styles.progressTrack} aria-hidden="true">
              <span className={styles.progressFillLeft} style={{ transform: `scaleX(${progress / 100})` }} />
              <span className={styles.progressFillRight} style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
            <p className={styles.loaderStatus}>
              {progress < 100 ? '正在进入 Violet Xie 的现场、产品与技术之间' : '入口就绪，正在连接 F·D·E'}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.triptych} aria-hidden="true">
        <div className={`${styles.panel} ${styles.fieldPanel}`}>
          <span className={styles.panelIndex}>01 / FIELD</span>
          <strong className={styles.word}>现场</strong>
        </div>
        <div className={`${styles.panel} ${styles.productPanel}`}>
          <span className={styles.panelIndex}>02 / PRODUCT</span>
          <strong className={styles.word}>产品</strong>
        </div>
        <div className={`${styles.panel} ${styles.technologyPanel}`}>
          <span className={styles.panelIndex}>03 / TECHNOLOGY</span>
          <strong className={styles.word}>技术</strong>
        </div>
        <div className={styles.signature}>
          <b>F·D·E</b>
          <span>把三端连接起来，让答案真正发生。</span>
        </div>
      </section>
    </div>
  );
}
