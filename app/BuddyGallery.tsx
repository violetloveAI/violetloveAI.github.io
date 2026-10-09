'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import styles from './WorkShowcase.module.css';

const buddyScenes = [
  { label: '按兴趣组队', title: '今天，和谁一起学？', note: '选择兴趣、时长和搭子，让练习从自己想读的故事开始。', image: 'team-selection.png', alt: '英语搭子团真实界面：选择兴趣故事、五位搭子和学习领队' },
  { label: '答错后接力', title: '卡住的地方，有搭子接住。', note: '小书虫发现阅读误解，词芽芽带着原句和答案，在原题下继续帮。', image: 'wrong-answer.png', alt: '英语搭子团真实界面：词芽芽接住 expired 的阅读误解，在原题下提供帮助' },
  { label: '把话写出来', title: '刚刚说的话，继续写下去。', note: '小笔头承接用户确认的表达，让听、说、写留在同一份上下文里。', image: 'writing-source.png', alt: '英语搭子团真实界面：小笔头接续口语表达，保留原话与写作来源' },
] as const;

export function BuddyGallery({ headingLevel = 4 }: { headingLevel?: 2 | 4 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h4';
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const id = useId();
  const scene = buddyScenes[active];
  const src = `/projects/english-buddy/${scene.image}`;

  useEffect(() => {
    const element = dialog.current;
    if (!expanded || !element) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    return () => { element.close(); document.body.style.overflow = overflow; };
  }, [expanded]);

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryTop}><span>PRODUCT IN ACTION</span><span>0{active + 1} / 03</span></div>
      <div className={styles.galleryStage} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`}>
        <div className={styles.galleryAside}>
          <Image src="/projects/english-buddy/character-lineup.png" alt="词芽芽、小耳朵、话匣子、小书虫、小笔头五位学习搭子" width={1774} height={887} sizes="200px" unoptimized />
          <p className={styles.sceneNumber}>0{active + 1}<span> / LEARNING MOMENT</span></p>
          <Heading className={styles.sceneTitle}>{scene.title}</Heading>
          <p className={styles.sceneNote}>{scene.note}</p>
          <span className={styles.galleryHint}>真实产品界面 · 点击可放大</span>
        </div>
        <button type="button" className={styles.phone} onClick={() => setExpanded(true)} aria-label={`放大截图：${scene.label}`} aria-haspopup="dialog">
          <Image src={src} alt={scene.alt} width={390} height={844} sizes="(max-width: 600px) 48vw, 230px" loading="lazy" unoptimized />
          <span className={styles.zoom} aria-hidden="true">↗</span>
        </button>
      </div>
      <div className={styles.sceneTabs} role="tablist" aria-label="英语搭子团产品截图" ref={tabs}>
        {buddyScenes.map((item, index) => <button key={item.label} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (active + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
          setActive(next);
          tabs.current?.querySelectorAll('button')[next]?.focus();
        }}><span>0{index + 1}</span>{item.label}</button>)}
      </div>
      <dialog ref={dialog} className={styles.lightbox} aria-label={scene.alt} onCancel={() => setExpanded(false)} onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false); }}>
        {expanded && <><button className={styles.close} type="button" onClick={() => setExpanded(false)} autoFocus aria-label="关闭截图">关闭 ×</button><Image src={src} alt={scene.alt} width={390} height={844} unoptimized /><p>{scene.label} · 产品真实截图</p></>}
      </dialog>
    </div>
  );
}

