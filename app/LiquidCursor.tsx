'use client';

import { useEffect, useRef } from 'react';

type Point = { x: number; y: number };

const frameLerp = (amount: number, delta: number) => 1 - Math.pow(1 - amount, delta / (1000 / 60));

export function LiquidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const tailARef = useRef<HTMLElement>(null);
  const tailBRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const tailA = tailARef.current;
    const tailB = tailBRef.current;
    const label = labelRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!cursor || !tailA || !tailB || !label || !finePointer.matches || reducedMotion.matches) return;

    const target: Point = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const lead: Point = { ...target };
    const trailA: Point = { ...target };
    const trailB: Point = { ...target };
    let animationFrame = 0;
    let lastFrame = performance.now();
    let hasMoved = false;

    const setInteractiveTarget = (eventTarget: EventTarget | null) => {
      const targetElement = eventTarget instanceof Element ? eventTarget : null;
      const interactive = eventTarget instanceof Element
        ? eventTarget.closest<HTMLElement>('[data-cursor-label]')
        : null;
      const cursorLabel = interactive?.dataset.cursorLabel ?? '';
      const claySurface = targetElement?.closest(
        '.nav-scene, .work-canvas-v2, .career-canvas-v2, .education-canvas, .life-canvas-v2, .contact-canvas-v2, .resume-modal-backdrop',
      );
      const liquidSurface = targetElement?.closest('.opening-prompt, .hero-scene, .bio-scene');

      cursor.dataset.active = interactive ? 'true' : 'false';
      if (claySurface) cursor.dataset.theme = 'clay';
      else if (liquidSurface) cursor.dataset.theme = 'liquid';
      label.textContent = cursorLabel;
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setInteractiveTarget(event.target);

      if (!hasMoved) {
        lead.x = trailA.x = trailB.x = target.x;
        lead.y = trailA.y = trailB.y = target.y;
        hasMoved = true;
        cursor.dataset.visible = 'true';
      }
    };

    const handlePointerDown = () => { cursor.dataset.down = 'true'; };
    const handlePointerUp = () => { cursor.dataset.down = 'false'; };
    const handlePointerLeave = () => { cursor.dataset.visible = 'false'; };
    const handlePointerEnter = () => {
      if (hasMoved) cursor.dataset.visible = 'true';
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

    document.documentElement.classList.add('liquid-cursor-enabled');
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    document.documentElement.addEventListener('mouseenter', handlePointerEnter);
    animationFrame = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('liquid-cursor-enabled');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.documentElement.removeEventListener('mouseenter', handlePointerEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
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
    </>
  );
}
