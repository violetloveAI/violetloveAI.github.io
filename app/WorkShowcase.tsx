'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { workProjects } from '../content/work-showcase';
import { WorkPreview } from './WorkPreview';
import { playUISound } from './lib/ui-sound';
import styles from './VineWorkShowcase.module.css';

export function WorkShowcase() {
  const section = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [input, setInput] = useState<'pointer' | 'keyboard'>('pointer');
  const [reduceMotion, setReduceMotion] = useState(false);
  const selectedWork = workProjects[selectedIndex];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (window.location.hash !== '#work') return;
    let cancelled = false;
    let frame = 0;
    // The opening chapter changes height after hydration and font loading.
    void document.fonts.ready.then(() => {
      frame = requestAnimationFrame(() => {
        if (!cancelled && window.location.hash === '#work') {
          section.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
        }
      });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, []);

  function selectWork(index: number, source: 'pointer' | 'keyboard') {
    setInput(source);
    setSelectedIndex(index);
    if (source === 'pointer' && index !== selectedIndex) playUISound('select');
  }

  function browseWork(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + workProjects.length) % workProjects.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % workProjects.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = workProjects.length - 1;
    selectWork(nextIndex, 'keyboard');
    tabs.current[nextIndex]?.focus({ preventScroll: true });
    if (window.matchMedia('(max-width: 1024px)').matches) {
      tabs.current[nextIndex]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' });
    }
  }

  const palette = {
    '--work-accent': selectedWork.accent,
    '--work-accent-soft': selectedWork.accentSoft,
    '--work-accent-deep': selectedWork.accentDeep,
    '--work-canvas-light': selectedWork.canvasLight,
    '--work-canvas': selectedWork.canvas,
    '--work-canvas-deep': selectedWork.canvasDeep,
    '--work-count': workProjects.length,
    '--work-ui-ink': selectedWork.id === 'jialihua' ? '#25473e' : '#f4eddd',
  } as CSSProperties;

  return (
    <section
      ref={section}
      id="work"
      className={`work-canvas-v2 ${styles.section}`}
      aria-labelledby="work-title"
      data-active-work={selectedWork.id}
      data-work-input={input}
      style={palette}
    >
      <h2 id="work-title" className="sr-only">AI 辅助构建作品展示</h2>
      <header className={styles.mobileHeading} aria-hidden="true">
        <p>AI 辅助构建</p>
        <span>{workProjects.length} 个作品，点选查看</span>
      </header>
      {selectedWork.id === 'jialihua' && (
        <div className={`chapter-nameplate ${styles.nameplate}`} aria-hidden="true">
          <Image src="/assets/cartoon-clay-v2/01-navigation/01-ai-assisted-building.webp" width={2043} height={770} alt="" sizes="(max-width: 800px) 76vw, 540px" loading="lazy" unoptimized />
        </div>
      )}
      <div className={`work-stage-v3 ${styles.stage}`} data-active-work={selectedWork.id}>
        <div className={styles.dock}>
          <div className={styles.rail}>
            <Image
              className={styles.vine}
              src="/assets/cartoon-clay-v2/work-buttons-v3/web/work-rail-wave-v5.avif"
              alt=""
              fill
              sizes="(max-width: 1024px) 1120px, 100vw"
              aria-hidden="true"
              unoptimized
            />
            <div className={styles.tabs} role="tablist" aria-label="选择作品">
              {workProjects.map((project, index) => {
                const selected = selectedIndex === index;
                return (
                  <button
                    ref={(element) => { tabs.current[index] = element; }}
                    type="button"
                    role="tab"
                    id={`work-tab-${project.id}`}
                    aria-label={`${project.title} · ${project.english}`}
                    aria-selected={selected}
                    aria-controls="work-feature-stage"
                    tabIndex={selected ? 0 : -1}
                    className={styles.button}
                    data-work-project-button
                    data-sound="none"
                    onPointerDown={() => setInput('pointer')}
                    data-selected={selected ? 'true' : 'false'}
                    key={project.id}
                    style={{
                      '--button-accent': project.accent,
                      '--button-soft': project.accentSoft,
                    } as CSSProperties}
                    onClick={(event) => selectWork(index, event.detail > 0 ? 'pointer' : 'keyboard')}
                    onKeyDown={(event) => browseWork(event, index)}
                    data-cursor-label={`OPEN ${project.english}`}
                  >
                    <span className={styles.halo} aria-hidden="true" />
                    <span className={styles.sparkles} aria-hidden="true">
                      {Array.from({ length: 6 }, (_, sparkleIndex) => <i key={sparkleIndex} />)}
                    </span>
                    <Image className={styles.art} src={project.image} alt="" fill sizes="(max-width: 600px) 23vw, (max-width: 1024px) 13vw, 160px" unoptimized />
                    <span className={styles.label}>{project.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <footer className={`work-controls-v3 ${styles.controls}`}>
          <div className="work-counter-v3" aria-hidden="true"><strong>{selectedWork.index}</strong><span>/ {String(workProjects.length).padStart(2, '0')}</span></div>
          <p>{selectedWork.title}<span className={styles.selectedDescription}>{selectedWork.eyebrow}</span></p>
          <a href={selectedWork.caseHref} aria-label={`${selectedWork.title}：${selectedWork.caseLabel}`}>{selectedWork.caseLabel}<span aria-hidden="true">→</span></a>
        </footer>
        <WorkPreview project={selectedWork} instant={reduceMotion || input === 'keyboard'} />
      </div>
      <p className="sr-only" aria-live="polite">正在展示：{selectedWork.title}。可用左右方向键、Home 与 End 切换作品。</p>
    </section>
  );
}
