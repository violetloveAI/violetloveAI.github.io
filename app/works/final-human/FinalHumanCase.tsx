'use client';

import Image from 'next/image';
import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { CaseCursor } from '../_components/CaseCursor';
import { useEmbeddedMode } from '../_components/useEmbeddedMode';
import styles from './final-human.module.css';

const githubUrl = 'https://github.com/violetloveAI/finalhuman';

const chapters = [
  {
    index: '01', label: '创意命题', english: 'CONCEPT',
    title: '把 AI 幻觉风险，变成一场追问证据的调查。',
    body: '验证 AI 虚构客户、层层误传。玩家要在幻觉进入产品前找出源头。',
    proof: ['AI 安全议题游戏化', '3 个 AI + 1 个人类', '明确故事冲突'],
    gameImage: '/projects/final-human/opening.webp',
    gameRatio: '1672 / 941',
    gameAlt: 'Final Human 游戏开场：最后一个人类员工',
    gameCaption: '开场：最后一个人类员工',
    awardImage: '/projects/final-human/game-verdict.webp',
    awardRatio: '4000 / 2666',
    awardAlt: 'Final Human 调查结案界面',
    awardCaption: '隐私友好预览 · 调查结案',
  },
  {
    index: '02', label: '玩法与角色', english: 'BUILD',
    title: '有限 TOKEN、证据卡与庭审，把核验做成玩法。',
    body: '我主导选题、方案、核心玩法、产品推进与路演，并与队友协作完成开发。',
    proof: ['2 人团队', '负责人 / 主策', '协作开发 + 主力路演'],
    gameImage: '/projects/final-human/game-investigation.webp',
    gameRatio: '2552 / 1284',
    gameAlt: 'Final Human 调查界面：玩家选择一位 AI 同事提出质询',
    gameCaption: '调查：用有限 TOKEN 逐层质询',
    awardImage: '/projects/final-human/game-investigation.webp',
    awardRatio: '4000 / 2666',
    awardAlt: 'Final Human 调查与质询界面',
    awardCaption: '隐私友好预览 · 调查质询',
  },
  {
    index: '03', label: '双奖验证', english: 'PROOF',
    title: '一件作品，同时获得赛道亚军与跨赛道专项奖。',
    body: 'Final Human 获游戏开发赛道亚军和“极准·一发入魂”专项奖。',
    proof: ['游戏开发赛道亚军', '极准·一发入魂', '完整游戏 + 现场路演'],
    gameImage: '/projects/final-human/game-verdict.webp',
    gameRatio: '2277 / 1280',
    gameAlt: 'Final Human 调查结案界面：玩家判断哪些 AI 产生了幻觉',
    gameCaption: '结案：确认幻觉是否进入产品',
    awardImage: '/projects/final-human/opening.webp',
    awardRatio: '5712 / 4284',
    awardAlt: 'Final Human 游戏开场画面',
    awardCaption: '隐私友好预览 · 游戏开场',
  },
] as const;

export function FinalHumanCase({ embedded = false }: { embedded?: boolean }) {
  const isEmbedded = useEmbeddedMode(embedded);
  const [activeChapter, setActiveChapter] = useState(0);
  const selected = chapters[activeChapter];
  const showNextChapter = () => setActiveChapter((current) => (current + 1) % chapters.length);

  const handleKeys = (event: KeyboardEvent<HTMLButtonElement>, current: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    const next = (current + direction + chapters.length) % chapters.length;
    setActiveChapter(next);
    document.getElementById(`final-human-step-${next}`)?.focus();
  };

  return (
    <main className={`${styles.page} ${isEmbedded ? styles.embedded : ''}`} data-cursor-theme="clay">
      <CaseCursor embedded={isEmbedded} />
      <div className={styles.texture} aria-hidden="true" />
      <header className={styles.topbar}>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className={styles.backLink} href="/#work"><span aria-hidden="true">←</span> WORKS</a>
        <div className={styles.identity}><span>VIOLET XIE / PERSONAL WEBSITE</span><span>05 / HACKATHON · 2026.08</span></div>
        <a className={styles.githubLink} href={githubUrl} target="_blank" rel="noreferrer">VIEW GITHUB <span aria-hidden="true">↗</span></a>
      </header>

      <section className={styles.showcase} aria-labelledby="final-human-title">
        <div className={styles.clayOrbit} aria-hidden="true"><i /><i /><i /></div>

        <aside className={styles.caseRail} aria-label="Final Human 项目案例说明">
          <header className={styles.railHeader}>
            <div className={styles.statusLine}><span>2-PERSON TEAM</span><span>DOUBLE AWARD</span></div>
            <p>05 / CASE FILE · FINAL HUMAN</p>
            <h1 id="final-human-title">把 AI 幻觉，<em>做成一场可取证的调查游戏。</em></h1>
            <small>深圳特种兵黑客松 · 48 小时 · 清程极智主办。</small>
          </header>

          <div className={styles.railTabs} role="tablist" aria-label="切换 Final Human 案例章节">
            {chapters.map((chapter, index) => (
              <button
                id={`final-human-step-${index}`}
                key={chapter.index}
                type="button"
                role="tab"
                aria-selected={activeChapter === index}
                aria-controls="final-human-case-detail"
                tabIndex={activeChapter === index ? 0 : -1}
                onClick={() => setActiveChapter(index)}
                onKeyDown={(event) => handleKeys(event, index)}
              ><span>{chapter.index}</span><strong>{chapter.label}</strong></button>
            ))}
          </div>

          <article className={styles.railStory} id="final-human-case-detail" role="tabpanel" aria-live="polite" key={selected.index}>
            <div className={styles.railStoryMeta}><span>{selected.index}</span><small>{selected.english}</small></div>
            <h2>{selected.title}</h2>
            <p>{selected.body}</p>
            <div className={styles.railProof}>{selected.proof.map((item, index) => <span key={item}><i>0{index + 1}</i>{item}</span>)}</div>
          </article>

          <footer className={styles.railEvidence}>
            <p>作品证据，不只是参赛记录。</p>
            <dl>
              <div><dt>AWARDS</dt><dd>亚军 + 专项奖</dd></div>
              <div><dt>TEAM PRIZE</dt><dd>¥2,500 + ¥500</dd></div>
              <div><dt>ROLE</dt><dd>负责人 / 主策 / 路演</dd></div>
              <div><dt>DELIVERY</dt><dd>完整游戏 + 路演</dd></div>
            </dl>
          </footer>
        </aside>

        <div className={styles.awardStage}>
          <div className={styles.subjectArt} aria-hidden="true"><Image src="/projects/clay-subjects/final-human.webp" alt="" fill sizes="420px" unoptimized /></div>
          <span className={styles.stageLabel}>TWO SYNCHRONIZED CAROUSELS · CLICK EITHER FRAME</span>
          <button className={`${styles.carouselFrame} ${styles.gameCarousel}`} type="button" onClick={showNextChapter} aria-label={`游戏截图 ${activeChapter + 1}/3：${selected.gameCaption}。点击查看下一张`}>
            <span className={styles.carouselImage} key={selected.gameImage} style={{ '--media-ratio': selected.gameRatio } as CSSProperties}><Image src={selected.gameImage} alt={selected.gameAlt} fill sizes="(min-width: 981px) 48vw, 90vw" priority /></span>
            <span className={styles.carouselCaption}><i>GAME {selected.index} / 03</i><strong>{selected.gameCaption}</strong><small>点击切换 →</small></span>
          </button>
          <button className={`${styles.carouselFrame} ${styles.awardCarousel}`} type="button" onClick={showNextChapter} aria-label={`获奖照片 ${activeChapter + 1}/3：${selected.awardCaption}。点击查看下一张`}>
            <span className={styles.carouselImage} key={selected.awardImage} style={{ '--media-ratio': selected.awardRatio } as CSSProperties}><Image src={selected.awardImage} alt={selected.awardAlt} fill sizes="(min-width: 981px) 32vw, 90vw" priority /></span>
            <span className={styles.carouselCaption}><i>AWARD {selected.index} / 03</i><strong>{selected.awardCaption}</strong><small>点击切换 →</small></span>
          </button>
        </div>

      </section>

      <footer className={styles.footer}>
        <div className={styles.progress} aria-label={`当前故事章节 ${activeChapter + 1}，共 ${chapters.length} 章`}>
          {chapters.map((chapter, index) => <button key={chapter.index} type="button" aria-label={`查看第 ${index + 1} 章：${chapter.label}`} aria-current={activeChapter === index ? 'step' : undefined} onClick={() => setActiveChapter(index)}><span /></button>)}
        </div>
        <p>IDEATE → BUILD → PLAYTEST → PITCH → DOUBLE WIN</p>
        <div className={styles.footerLinks}><a href={githubUrl} target="_blank" rel="noreferrer">GITHUB ↗</a></div>
      </footer>
    </main>
  );
}
