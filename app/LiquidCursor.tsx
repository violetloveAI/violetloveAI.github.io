'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Point = { x: number; y: number };

const frameLerp = (amount: number, delta: number) => 1 - Math.pow(1 - amount, delta / (1000 / 60));

export function LiquidCursor() {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [pointerMode, setPointerMode] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const tailARef = useRef<HTMLElement>(null);
  const tailBRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPortalTarget(document.body));
    const queries = [window.matchMedia('(hover: hover) and (pointer: fine)'), window.matchMedia('(prefers-reduced-motion: reduce)')];
    const refresh = () => setPointerMode((mode) => mode + 1);
    queries.forEach((query) => query.addEventListener('change', refresh));
    return () => {
      cancelAnimationFrame(frame);
      queries.forEach((query) => query.removeEventListener('change', refresh));
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const tailA = tailARef.current;
    const tailB = tailBRef.current;
    const label = labelRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!cursor || !tailA || !tailB || !label || !finePointer.matches) return;

    const target: Point = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const lead: Point = { ...target };
    const trailA: Point = { ...target };
    const trailB: Point = { ...target };
    let animationFrame = 0;
    let lastFrame = performance.now();
    let hasMoved = false;

    const setInteractiveTarget = (eventTarget: EventTarget | null) => {
      // Same-origin iframe elements belong to a different JavaScript realm.
      const node = eventTarget as Node | null;
      const targetElement = node?.nodeType === 1 ? node as Element : node?.parentElement ?? null;
      const interactive = targetElement?.closest<HTMLElement>('[data-cursor-label], a[href], button:not(:disabled), [role="button"], [role="tab"]');
      const cursorLabel = interactive?.dataset.cursorLabel
        ?? (interactive?.getAttribute('role') === 'tab' ? 'SWITCH / 切换' : interactive?.tagName === 'A' ? 'OPEN / 打开' : interactive ? 'CLICK / 点击' : '');
      const claySurface = targetElement?.closest(
        '[data-cursor-theme="clay"], .nav-scene, .work-canvas-v2, .career-canvas-v2, .education-canvas, .life-canvas-v2, .contact-canvas-v2, .resume-modal-backdrop',
      );
      const liquidSurface = targetElement?.closest('.opening-prompt, .hero-scene, .bio-scene');

      cursor.dataset.active = interactive ? 'true' : 'false';
      if (claySurface) cursor.dataset.theme = 'clay';
      else if (liquidSurface) cursor.dataset.theme = 'liquid';
      label.textContent = cursorLabel;
    };

    const moveTo = (x: number, y: number, eventTarget: EventTarget | null) => {
      if (document.documentElement.classList.contains('fde-opening-active')) return;
      target.x = x;
      target.y = y;
      setInteractiveTarget(eventTarget);
      cursor.dataset.visible = 'true';

      if (!hasMoved) {
        lead.x = trailA.x = trailB.x = target.x;
        lead.y = trailA.y = trailB.y = target.y;
        hasMoved = true;
        cursor.dataset.visible = 'true';
      }
    };
    const handlePointerMove = (event: PointerEvent) => moveTo(event.clientX, event.clientY, event.target);

    const handlePointerDown = () => { cursor.dataset.down = 'true'; };
    const handlePointerUp = () => { cursor.dataset.down = 'false'; };
    const handlePointerLeave = () => { cursor.dataset.visible = 'false'; };
    const handlePointerEnter = () => {
      if (hasMoved) cursor.dataset.visible = 'true';
    };
    const handleExternalVisibility = (event: Event) => {
      const visible = event instanceof CustomEvent ? event.detail !== false : true;
      cursor.dataset.visible = visible ? 'true' : 'false';
    };

    const render = (now: number) => {
      const delta = Math.min(now - lastFrame, 48);
      lastFrame = now;

      const leadEase = frameLerp(0.24, delta);
      const tailAEase = frameLerp(0.16, delta);
      const tailBEase = frameLerp(0.1, delta);

      lead.x += (target.x - lead.x) * leadEase;
      lead.y += (target.y - lead.y) * leadEase;
      trailA.x += (target.x - trailA.x) * tailAEase;
      trailA.y += (target.y - trailA.y) * tailAEase;
      trailB.x += (target.x - trailB.x) * tailBEase;
      trailB.y += (target.y - trailB.y) * tailBEase;

      cursor.style.transform = `translate3d(${lead.x}px, ${lead.y}px, 0)`;
      tailA.style.transform = `translate3d(${trailA.x - lead.x}px, ${trailA.y - lead.y}px, 0) translate(-50%, -50%)`;
      tailB.style.transform = `translate3d(${trailB.x - lead.x}px, ${trailB.y - lead.y}px, 0) translate(-50%, -50%)`;

      animationFrame = requestAnimationFrame(render);
    };

    if (!reducedMotion.matches) document.documentElement.classList.add('liquid-cursor-enabled');
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    document.documentElement.addEventListener('mouseenter', handlePointerEnter);
    window.addEventListener('violet-cursor-visibility', handleExternalVisibility);

    // Paint one cursor above the whole page, including the chapter plaques.
    // A cursor drawn inside an iframe cannot escape its stacking boundary.
    const frames = new Map<HTMLIFrameElement, () => void>();
    const syncFrames = () => {
      const current = new Set(document.querySelectorAll<HTMLIFrameElement>('#work iframe.work-embed-frame-v3'));
      frames.forEach((dispose, frame) => {
        if (!current.has(frame)) { dispose(); frames.delete(frame); }
      });
      current.forEach((frame) => {
        if (frames.has(frame)) return;
        let unbind: (() => void) | undefined;
        const onLoad = () => {
          unbind?.();
          unbind = undefined;
          try {
            const doc = frame.contentDocument;
            if (!doc || frame.contentWindow?.location.origin !== window.location.origin) return;
            const onMove = (event: PointerEvent) => {
              const rect = frame.getBoundingClientRect();
              if (!frame.offsetWidth || !frame.offsetHeight) return;
              const x = rect.left + event.clientX * rect.width / frame.offsetWidth;
              const y = rect.top + event.clientY * rect.height / frame.offsetHeight;
              moveTo(x, y, event.target);
              window.dispatchEvent(new CustomEvent('violet-frame-pointer-move', { detail: { x, y } }));
            };
            if (!reducedMotion.matches) doc.documentElement.classList.add('liquid-cursor-enabled');
            doc.addEventListener('pointermove', onMove, { passive: true });
            doc.addEventListener('pointerdown', handlePointerDown, { passive: true });
            doc.addEventListener('pointerup', handlePointerUp, { passive: true });
            doc.addEventListener('pointercancel', handlePointerUp, { passive: true });
            unbind = () => {
              doc.documentElement.classList.remove('liquid-cursor-enabled');
              doc.removeEventListener('pointermove', onMove);
              doc.removeEventListener('pointerdown', handlePointerDown);
              doc.removeEventListener('pointerup', handlePointerUp);
              doc.removeEventListener('pointercancel', handlePointerUp);
            };
          } catch { /* Cross-origin content keeps its native cursor. */ }
        };
        frame.addEventListener('load', onLoad);
        onLoad();
        frames.set(frame, () => { frame.removeEventListener('load', onLoad); unbind?.(); });
      });
    };
    syncFrames();
    const frameObserver = new MutationObserver(syncFrames);
    const work = document.getElementById('work');
    if (work) frameObserver.observe(work, { childList: true, subtree: true });
    if (!reducedMotion.matches) animationFrame = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('liquid-cursor-enabled');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.documentElement.removeEventListener('mouseenter', handlePointerEnter);
      window.removeEventListener('violet-cursor-visibility', handleExternalVisibility);
      frameObserver.disconnect();
      frames.forEach((dispose) => dispose());
      cancelAnimationFrame(animationFrame);
    };
  }, [portalTarget, pointerMode]);

  if (!portalTarget) return null;

  return createPortal(
    <>
      <svg className="liquid-filter-bank" aria-hidden="true">
        <defs>
          <filter id="violet-cursor-goo" x="-90%" y="-90%" width="280%" height="280%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          <filter id="violet-text-goo" x="-8%" y="-20%" width="116%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.05" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            />
          </filter>
        </defs>
      </svg>

      <div ref={cursorRef} className="liquid-cursor" data-active="false" data-down="false" data-visible="false" data-theme="liquid" aria-hidden="true">
        <div className="liquid-cursor-field">
          <i ref={tailBRef} className="liquid-particle liquid-tail-b"><b /></i>
          <i ref={tailARef} className="liquid-particle liquid-tail-a"><b /></i>
          <i className="liquid-particle liquid-core"><b /></i>
          <span className="clay-cursor-assembly">
            <i className="clay-cursor-sprite" />
            <i className="clay-cursor-star"><b /></i>
          </span>
        </div>
        <span ref={labelRef} className="liquid-cursor-label" />
      </div>
    </>,
    portalTarget,
  );
}
