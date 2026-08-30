'use client';

import Image from 'next/image';
import { useState, type KeyboardEvent } from 'react';
import styles from './final-human.module.css';

const githubUrl = 'https://github.com/violetloveAI/finalhuman';

const chapters = [
  {
    index: '01', label: '创意命题', english: 'CONCEPT',
    title: '把抽象的 AI 幻觉风险，变成一场必须亲自追问证据的调查。',
    body: '验证 AI 虚构了“王总”，开发与交付 AI 又把模拟用户一路传成真实客户。玩家是公司里最后一个人类员工，要在幻觉进入产品前找出源头。',
    proof: ['AI 安全议题游戏化', '3 个 AI + 1 个人类', '明确故事冲突'],
    gameImage: '/projects/final-human/opening.webp',
    gameAlt: 'Final Human 游戏开场：最后一个人类员工',
    gameCaption: '开场：最后一个人类员工',
    awardImage: '/projects/final-human/game-verdict.webp',
    awardAlt: 'Final Human 调查结案界面与双奖结果说明',
    awardCaption: '游戏开发赛道 · 亚军（隐私友好展示）',
  },
  {
    index: '02', label: '玩法与角色', english: 'BUILD',
    title: '有限 TOKEN 质询、证据卡和庭审，让“核验”本身成为玩法。',
    body: '我承担负责人、主策与协同开发：收敛选题，设计 ASK / PROBE / VERIFY 质询机制、证据卡和法庭三连问，并推进团队把玩法真正做成可演示的完整游戏。',
    proof: ['负责人 / 主策', '核心玩法设计', '协同开发与路演'],
    gameImage: '/projects/final-human/game-investigation.webp',
    gameAlt: 'Final Human 调查界面：玩家选择一位 AI 同事提出质询',
    gameCaption: '调查：用有限 TOKEN 逐层质询',
    awardImage: '/projects/final-human/game-investigation.webp',
    awardAlt: 'Final Human 调查界面与专项奖结果说明',
    awardCaption: '跨赛道专项奖 · 极准·一发入魂（隐私友好展示）',
  },
  {
    index: '03', label: '双奖验证', english: 'PROOF',
    title: '作品既被游戏赛道认可，也因准确击中命题获得跨赛道专项奖。',
    body: 'Final Human 在 AI Ping: Special Ops Hackathon 2026 获得游戏开发赛道亚军，同时获得跨赛道专项奖“极准·一发入魂”。',
    proof: ['游戏开发赛道亚军', '极准·一发入魂', '完整游戏 + 现场路演'],
    gameImage: '/projects/final-human/game-verdict.webp',
    gameAlt: 'Final Human 调查结案界面：玩家判断哪些 AI 产生了幻觉',
    gameCaption: '结案：确认幻觉是否进入产品',
    awardImage: '/projects/final-human/opening.webp',
    awardAlt: 'Final Human 游戏开场与双奖结果说明',
    awardCaption: '一件作品 · 两项奖项（隐私友好展示）',
  },
] as const;

export function FinalHumanCase() {
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
    <main className={styles.page}>
      <div className={styles.texture} aria-hidden="true" />
      <header className={styles.topbar}>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className={styles.backLink} href="/#work"><span aria-hidden="true">←</span> WORKS</a>
        <div className={styles.identity}><span>VIOLET XIE / PERSONAL WEBSITE</span><span>05 / HACKATHON DOUBLE AWARD</span></div>
        <a className={styles.githubLink} href={githubUrl} target="_blank" rel="noreferrer">VIEW GITHUB <span aria-hidden="true">↗</span></a>
      </header>

      <section className={styles.showcase} aria-labelledby="final-human-title">
        <div className={styles.clayOrbit} aria-hidden="true"><i /><i /><i /></div>

        <aside className={styles.caseRail} aria-label="Final Human 项目案例说明">
          <header className={styles.railHeader}>
            <div className={styles.statusLine}><span>HACKATHON</span><span>DOUBLE AWARD</span></div>
            <p>05 / CASE FILE · FINAL HUMAN</p>
            <h1 id="final-human-title">把 AI 幻觉，<em>做成一局可质询、可取证、可判决的游戏。</em></h1>
            <small>不是概念提案：完成可玩的调查游戏、现场路演，并获得黑客松双奖。</small>
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
              <div><dt>PRIZE</dt><dd>¥2,500 + ¥500</dd></div>
              <div><dt>ROLE</dt><dd>负责人 / 主策</dd></div>
              <div><dt>DELIVERY</dt><dd>完整游戏 + 路演</dd></div>
            </dl>
          </footer>
        </aside>

        <div className={styles.awardStage}>
          <div className={styles.subjectArt} aria-hidden="true"><Image src="/projects/clay-subjects/final-human.webp" alt="" fill sizes="420px" unoptimized /></div>
          <span className={styles.stageLabel}>TWO SYNCHRONIZED CAROUSELS · CLICK EITHER FRAME</span>
          <button className={`${styles.carouselFrame} ${styles.gameCarousel}`} type="button" onClick={showNextChapter} aria-label={`游戏截图 ${activeChapter + 1}/3：${selected.gameCaption}。点击查看下一张`}>
            <span className={styles.carouselImage} key={selected.gameImage}><Image src={selected.gameImage} alt={selected.gameAlt} fill sizes="430px" priority /></span>
            <span className={styles.carouselCaption}><i>GAME {selected.index} / 03</i><strong>{selected.gameCaption}</strong><small>点击切换 →</small></span>
          </button>
          <button className={`${styles.carouselFrame} ${styles.awardCarousel}`} type="button" onClick={showNextChapter} aria-label={`获奖照片 ${activeChapter + 1}/3：${selected.awardCaption}。点击查看下一张`}>
            <span className={styles.carouselImage} key={selected.awardImage}><Image src={selected.awardImage} alt={selected.awardAlt} fill sizes="430px" priority /></span>
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
