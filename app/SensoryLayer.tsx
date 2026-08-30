'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const chapters = ['top', 'work', 'career', 'education', 'life', 'contact'] as const;

type ChapterId = (typeof chapters)[number];

export function SensoryLayer() {
  const worldRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef(false);
  const activeChapterRef = useRef<ChapterId>('top');
  const lastChapterToneAtRef = useRef(0);
  const hoveredControlRef = useRef<Element | null>(null);
  const frameRef = useRef<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const playTone = useCallback((from: number, to: number, duration: number, volume: number, delay = 0) => {
    const context = audioRef.current;
    if (!context || !soundEnabledRef.current || context.state !== 'running') return;

    const startsAt = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(from, startsAt);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(to, 1), startsAt + duration);
    gain.gain.setValueAtTime(0.0001, startsAt);
    gain.gain.exponentialRampToValueAtTime(volume, startsAt + Math.min(0.018, duration * 0.2));
    gain.gain.exponentialRampToValueAtTime(0.0001, startsAt + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startsAt);
    oscillator.stop(startsAt + duration + 0.02);
  }, []);

  const playHover = useCallback(() => {
    playTone(590, 720, 0.055, 0.012);
  }, [playTone]);

  const playPress = useCallback(() => {
    playTone(205, 112, 0.095, 0.032);
    playTone(365, 245, 0.07, 0.012, 0.018);
  }, [playTone]);

  const playChapter = useCallback((chapter: ChapterId) => {
    const now = performance.now();
    if (now - lastChapterToneAtRef.current < 900) return;
    lastChapterToneAtRef.current = now;
    const index = Math.max(0, chapters.indexOf(chapter));
    const root = 252 + index * 21;
    playTone(root, root * 1.04, 0.18, 0.018);
    playTone(root * 1.5, root * 1.56, 0.22, 0.011, 0.07);
  }, [playTone]);

  const toggleSound = async () => {
    if (soundEnabledRef.current) {
      soundEnabledRef.current = false;
      setSoundEnabled(false);
      await audioRef.current?.suspend();
      return;
    }

    if (!audioRef.current) {
      const AudioContextConstructor = window.AudioContext
        ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextConstructor) return;
      audioRef.current = new AudioContextConstructor();
    }

    await audioRef.current.resume();
    soundEnabledRef.current = true;
    setSoundEnabled(true);
    window.requestAnimationFrame(() => {
      playTone(320, 430, 0.16, 0.024);
      playTone(480, 640, 0.2, 0.014, 0.06);
    });
  };

  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const updateJourney = () => {
      frameRef.current = null;
      const work = document.getElementById('work');
      const contact = document.getElementById('contact');
      const journeyStart = work?.offsetTop ?? 0;
      const journeyEnd = contact ? contact.offsetTop + contact.offsetHeight - window.innerHeight : journeyStart + 1;
      const journeyLength = Math.max(1, journeyEnd - journeyStart);
      const progress = Math.min(1, Math.max(0, (window.scrollY - journeyStart) / journeyLength));
      world.style.setProperty('--journey-x', `${(progress * -32).toFixed(2)}px`);
      world.style.setProperty('--journey-y', `${(progress * -52).toFixed(2)}px`);
      world.style.setProperty('--journey-thread', progress.toFixed(4));

      const probe = window.scrollY + window.innerHeight * 0.2;
      let nextChapter: ChapterId = 'top';
      chapters.slice(1).forEach((chapter) => {
        const section = document.getElementById(chapter);
        if (section && section.offsetTop <= probe) nextChapter = chapter;
      });

      if (nextChapter !== activeChapterRef.current) {
        activeChapterRef.current = nextChapter;
        world.dataset.scene = nextChapter;
        playChapter(nextChapter);
      }
    };

    const requestJourneyUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateJourney);
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (!finePointer || !soundEnabledRef.current) return;
      const target = event.target instanceof Element ? event.target.closest('button, a') : null;
      if (!target || target === hoveredControlRef.current || target.classList.contains('sfx-toggle-v2')) return;
      hoveredControlRef.current = target;
      playHover();
    };

    const handlePointerOut = (event: PointerEvent) => {
      const related = event.relatedTarget instanceof Element ? event.relatedTarget : null;
      if (hoveredControlRef.current && (!related || !hoveredControlRef.current.contains(related))) {
        hoveredControlRef.current = null;
      }
    };

    const handlePress = (event: MouseEvent) => {
      if (!soundEnabledRef.current) return;
      const target = event.target instanceof Element ? event.target.closest('button, a') : null;
      if (target && !target.classList.contains('sfx-toggle-v2')) playPress();
    };

    updateJourney();
    window.addEventListener('scroll', requestJourneyUpdate, { passive: true });
    window.addEventListener('resize', requestJourneyUpdate);
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    document.addEventListener('click', handlePress);

    return () => {
      window.removeEventListener('scroll', requestJourneyUpdate);
      window.removeEventListener('resize', requestJourneyUpdate);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      document.removeEventListener('click', handlePress);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [playChapter, playHover, playPress]);

  useEffect(() => () => {
    soundEnabledRef.current = false;
    void audioRef.current?.close();
  }, []);

  return (
    <>
      <div className="craft-world-v2" data-scene="top" ref={worldRef} aria-hidden="true">
        {chapters.map((chapter) => <i className={`world-wash-v2 world-wash-v2-${chapter}`} key={chapter} />)}
        <div className="world-paper-v2" />
        <span className="world-route-v2 world-route-v2-a" />
        <span className="world-route-v2 world-route-v2-b" />
        <span className="world-route-v2 world-route-v2-c" />
        <span className="world-thread-v2" />
        <span className="world-pebble-v2 world-pebble-v2-1" />
        <span className="world-pebble-v2 world-pebble-v2-2" />
        <span className="world-pebble-v2 world-pebble-v2-3" />
        <span className="world-pebble-v2 world-pebble-v2-4" />
      </div>

      <button
        type="button"
        className="sfx-toggle-v2"
        aria-pressed={soundEnabled}
        aria-label={soundEnabled ? '关闭网站音效' : '开启网站音效'}
        title={soundEnabled ? '关闭网站音效' : '开启网站音效'}
        onClick={() => void toggleSound()}
      >
        <span className="sfx-bars-v2" aria-hidden="true"><i /><i /><i /></span>
        <span>SFX</span>
      </button>
    </>
  );
}
