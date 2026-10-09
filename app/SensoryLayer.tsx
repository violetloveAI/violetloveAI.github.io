'use client';

import { useEffect, useRef, useState } from 'react';
import { UI_SOUND_EVENT, type UISoundKind } from './lib/ui-sound';
import styles from './sensory-controls.module.css';

const chapters = ['top', 'work', 'career', 'education', 'life', 'contact'] as const;
type ChapterId = (typeof chapters)[number];
type SoundStatus = 'off' | 'loading' | 'on' | 'error';

const SOUND_PREFERENCE = 'violet-ui-sound-enabled';
const soundFiles: Record<UISoundKind, string> = {
  select: '/sounds/clay-select.wav',
  open: '/sounds/paper-open.wav',
  success: '/sounds/soft-success.wav',
};
const isSoundKind = (kind: unknown): kind is UISoundKind => kind === 'select' || kind === 'open' || kind === 'success';

export function SensoryLayer() {
  const worldRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<{ toggle: () => void } | null>(null);
  const [soundStatus, setSoundStatus] = useState<SoundStatus>('off');
  const [soundMessage, setSoundMessage] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [peeking, setPeeking] = useState(false);
  const [instantDock, setInstantDock] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLButtonElement>(null);
  const soundEnabled = soundStatus === 'on';

  useEffect(() => {
    if (!collapsed) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateEdge = (x: number) => {
      if (!finePointer.matches || document.activeElement === restoreRef.current) return;
      setPeeking(x >= window.innerWidth - 64);
    };
    const onMove = (event: PointerEvent) => updateEdge(event.clientX);
    const onFrameMove = (event: Event) => updateEdge((event as CustomEvent<{ x: number }>).detail.x);
    const hidePeek = () => {
      if (document.activeElement !== restoreRef.current) setPeeking(false);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('violet-frame-pointer-move', onFrameMove);
    window.addEventListener('blur', hidePeek);
    document.documentElement.addEventListener('mouseleave', hidePeek);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('violet-frame-pointer-move', onFrameMove);
      window.removeEventListener('blur', hidePeek);
      document.documentElement.removeEventListener('mouseleave', hidePeek);
    };
  }, [collapsed]);

  useEffect(() => {
    let alive = true;
    let preferred = false;
    let context: AudioContext | null = null;
    let master: GainNode | null = null;
    let source: AudioBufferSourceNode | null = null;
    let buffers: Partial<Record<UISoundKind, AudioBuffer>> = {};
    let loadPromise: Promise<void> | null = null;
    let enabling = false;
    let generation = 0;
    let lastPlayedAt = -Infinity;
    let actualEnabled = false;
    const abort = new AbortController();

    try { preferred = localStorage.getItem(SOUND_PREFERENCE) === 'true'; } catch { /* Preference storage is optional. */ }

    const remember = () => {
      try { localStorage.setItem(SOUND_PREFERENCE, String(preferred)); } catch { /* Playback still works without storage. */ }
    };
    const stopSound = () => {
      if (!source) return;
      source.onended = null;
      try { source.stop(); } catch { /* The buffer may already have ended. */ }
      source.disconnect();
      source = null;
    };
    const play = (kind: UISoundKind) => {
      if (!actualEnabled || !preferred || !context || !master || context.state !== 'running' || document.hidden) return;
      const buffer = buffers[kind];
      const now = performance.now();
      if (!buffer || now - lastPlayedAt < 90) return;
      lastPlayedAt = now;
      stopSound();
      const next = context.createBufferSource();
      next.buffer = buffer;
      next.connect(master);
      next.onended = () => {
        next.disconnect();
        if (source === next) source = null;
      };
      source = next;
      next.start();
    };
    const loadSounds = (audio: AudioContext) => {
      if (!loadPromise) {
        loadPromise = Promise.all((Object.entries(soundFiles) as [UISoundKind, string][]).map(async ([kind, url]) => {
          const response = await fetch(url, { signal: abort.signal });
          if (!response.ok) throw new Error(`Sound failed to load: ${response.status}`);
          const buffer = await audio.decodeAudioData(await response.arrayBuffer());
          return [kind, buffer] as const;
        })).then((entries) => { buffers = Object.fromEntries(entries); }).catch((error: unknown) => {
          loadPromise = null;
          throw error;
        });
      }
      return loadPromise;
    };
    const enable = async (explicit: boolean) => {
      if (enabling || !alive || document.hidden) return;
      const attempt = ++generation;
      enabling = true;
      setSoundStatus('loading');
      setSoundMessage('');
      try {
        if (!context) {
          const AudioContextConstructor = window.AudioContext
            ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
          if (!AudioContextConstructor) throw new Error('Audio is unavailable');
          context = new AudioContextConstructor();
          master = context.createGain();
          master.gain.value = 0.65;
          master.connect(context.destination);
          context.onstatechange = () => {
            if (!alive || !context || context.state === 'running' || enabling || !actualEnabled) return;
            actualEnabled = false;
            stopSound();
            setSoundStatus('off');
          };
        }
        const audio = context;
        // resume() is invoked during the gesture, before any network awaits.
        await Promise.all([audio.resume(), loadSounds(audio)]);
        if (!alive || generation !== attempt || document.hidden) return;
        if (audio.state !== 'running') throw new Error('Audio could not be unlocked');
        preferred = true;
        actualEnabled = true;
        remember();
        setSoundStatus('on');
        setSoundMessage('音效已开启');
        if (explicit) play('select');
      } catch {
        if (!alive || generation !== attempt) return;
        actualEnabled = false;
        preferred = false;
        remember();
        stopSound();
        void context?.suspend().catch(() => {});
        setSoundStatus('error');
        setSoundMessage('音效暂时无法开启，请再次点击重试');
      } finally {
        if (attempt === generation) enabling = false;
      }
    };
    const disable = () => {
      generation += 1;
      enabling = false;
      preferred = false;
      actualEnabled = false;
      remember();
      stopSound();
      void context?.suspend().catch(() => {});
      setSoundStatus('off');
      setSoundMessage('音效已关闭');
    };
    controllerRef.current = { toggle: () => {
      if (actualEnabled || enabling) disable();
      else void enable(true);
    } };

    // Use nodeType rather than instanceof: embedded documents have their own Element constructor.
    const elementFrom = (event: Event) => {
      const node = event.target as Node | null;
      return node?.nodeType === 1 ? node as Element : node?.parentElement ?? null;
    };
    const restoreOnGesture = (event: Event) => {
      if (!event.isTrusted || !preferred || actualEnabled || enabling || document.hidden) return;
      if (elementFrom(event)?.closest('.sfx-toggle-v2')) return;
      if (event instanceof KeyboardEvent && ['Shift', 'Control', 'Alt', 'Meta', 'Escape'].includes(event.key)) return;
      void enable(false);
    };
    const navigationClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const element = elementFrom(event);
      if (!element || element.closest('[data-sound="none"], [disabled], [aria-disabled="true"], .sfx-toggle-v2')) return;
      const control = element.closest('[data-sound], a[href]');
      if (!control) return;
      const kind = control.getAttribute('data-sound');
      if (kind === 'select' || kind === 'open') { play(kind); return; }
      // Success must be dispatched only after the operation resolves.
      if (kind) return;
      if (control.tagName.toLowerCase() !== 'a') return;
      const href = control.getAttribute('href')?.trim();
      if (!href || href === '#' || href.startsWith('javascript:')) return;
      play('open');
    };
    const onSoundRequest = (event: Event) => {
      const kind = (event as CustomEvent<{ kind?: unknown }>).detail?.kind;
      if (isSoundKind(kind)) play(kind);
    };
    const bindDocument = (doc: Document) => {
      doc.addEventListener('pointerdown', restoreOnGesture, { passive: true, capture: true });
      doc.addEventListener('keydown', restoreOnGesture, true);
      doc.addEventListener('click', navigationClick);
      return () => {
        doc.removeEventListener('pointerdown', restoreOnGesture, true);
        doc.removeEventListener('keydown', restoreOnGesture, true);
        doc.removeEventListener('click', navigationClick);
      };
    };
    const unbindMain = bindDocument(document);
    const frames = new Map<HTMLIFrameElement, () => void>();
    const syncFrames = () => {
      const current = new Set(document.querySelectorAll<HTMLIFrameElement>('#work iframe.work-embed-frame-v3'));
      frames.forEach((dispose, frame) => { if (!current.has(frame)) { dispose(); frames.delete(frame); } });
      current.forEach((frame) => {
        if (frames.has(frame)) return;
        let unbind: (() => void) | undefined;
        const onLoad = () => {
          unbind?.();
          unbind = undefined;
          try {
            const doc = frame.contentDocument;
            if (doc && frame.contentWindow?.location.origin === window.location.origin) unbind = bindDocument(doc);
          } catch { /* Remote embeds own their interaction policy. */ }
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
    const onVisibility = () => {
      if (!document.hidden) return;
      generation += 1;
      enabling = false;
      actualEnabled = false;
      stopSound();
      void context?.suspend().catch(() => {});
      setSoundStatus('off');
      setSoundMessage('');
      // Keep the explicit preference; a new visible-page gesture restores it.
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener(UI_SOUND_EVENT, onSoundRequest);

    return () => {
      alive = false;
      generation += 1;
      controllerRef.current = null;
      abort.abort();
      unbindMain();
      frameObserver.disconnect();
      frames.forEach((dispose) => dispose());
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener(UI_SOUND_EVENT, onSoundRequest);
      stopSound();
      if (context) { context.onstatechange = null; void context.close().catch(() => {}); }
      master?.disconnect();
      buffers = {};
    };
  }, []);

  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;
    let frame: number | null = null;
    let activeChapter: ChapterId = 'top';
    const updateJourney = () => {
      frame = null;
      const work = document.getElementById('work');
      const contact = document.getElementById('contact');
      const journeyStart = work?.offsetTop ?? 0;
      const journeyEnd = contact ? contact.offsetTop + contact.offsetHeight - window.innerHeight : journeyStart + 1;
      const progress = Math.min(1, Math.max(0, (window.scrollY - journeyStart) / Math.max(1, journeyEnd - journeyStart)));
      world.style.setProperty('--journey-x', `${(progress * -32).toFixed(2)}px`);
      world.style.setProperty('--journey-y', `${(progress * -52).toFixed(2)}px`);
      world.style.setProperty('--journey-thread', progress.toFixed(4));
      const probe = window.scrollY + window.innerHeight * 0.2;
      let nextChapter: ChapterId = 'top';
      chapters.slice(1).forEach((chapter) => {
        const section = document.getElementById(chapter);
        if (section && section.offsetTop <= probe) nextChapter = chapter;
      });
      if (nextChapter !== activeChapter) {
        activeChapter = nextChapter;
        world.dataset.scene = nextChapter;
      }
    };
    const requestJourneyUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateJourney);
    };
    updateJourney();
    window.addEventListener('scroll', requestJourneyUpdate, { passive: true });
    window.addEventListener('resize', requestJourneyUpdate);
    return () => {
      window.removeEventListener('scroll', requestJourneyUpdate);
      window.removeEventListener('resize', requestJourneyUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
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
      <div className={styles.dock} data-collapsed={collapsed} data-peeking={peeking} data-instant={instantDock} data-sound="none" data-cursor-theme="clay">
        <div id="website-sound-controls" className={styles.controls} inert={collapsed}>
          <button
            ref={toggleRef}
            type="button"
            className={`sfx-toggle-v2 ${styles.toggle}`}
            data-sound="none"
            aria-pressed={soundEnabled}
            aria-busy={soundStatus === 'loading'}
            aria-label={soundStatus === 'loading' ? '正在开启音效，点击取消' : soundEnabled ? '关闭网站音效' : '开启网站音效'}
            title={soundStatus === 'error' ? '音效暂时无法开启，点击重试' : soundEnabled ? '关闭网站音效' : '开启轻柔的操作音效'}
            onClick={() => controllerRef.current?.toggle()}
          >
            <span className={`sfx-bars-v2 ${styles.bars}`} aria-hidden="true"><i /><i /><i /></span>
            <span>{soundStatus === 'loading' ? '音效：开启中' : `音效：${soundEnabled ? '开' : '关'}`}</span>
          </button>
          <button
            type="button"
            className={styles.hide}
            aria-label="收起音效控件"
            title="收起到右边缘"
            aria-controls="website-sound-controls"
            aria-expanded={!collapsed}
            onClick={(event) => {
              const keyboard = event.detail === 0;
              setInstantDock(keyboard);
              setCollapsed(true);
              setPeeking(false);
              if (keyboard) requestAnimationFrame(() => restoreRef.current?.focus({ preventScroll: true }));
              else event.currentTarget.blur();
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6M19 5v14" /></svg>
          </button>
        </div>
        <button
          ref={restoreRef}
          type="button"
          className={styles.restore}
          tabIndex={collapsed ? 0 : -1}
          aria-hidden={!collapsed}
          aria-label="展开音效控件"
          aria-controls="website-sound-controls"
          aria-expanded={!collapsed}
          onFocus={() => setPeeking(true)}
          onBlur={() => setPeeking(false)}
          onClick={(event) => {
            const keyboard = event.detail === 0;
            setInstantDock(keyboard);
            setCollapsed(false);
            setPeeking(false);
            if (keyboard) requestAnimationFrame(() => toggleRef.current?.focus({ preventScroll: true }));
            else event.currentTarget.blur();
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
          <span>音效</span>
        </button>
      </div>
      <span className={styles.status} role="status" aria-live="polite">{soundMessage}</span>
    </>
  );
}
