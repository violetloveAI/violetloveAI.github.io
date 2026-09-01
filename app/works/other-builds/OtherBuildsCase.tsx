'use client';

import Image from 'next/image';
import { CaseCursor } from '../_components/CaseCursor';
import { useEmbeddedMode } from '../_components/useEmbeddedMode';
import styles from './other-builds.module.css';

const builds = [
  {
    id: 'job-intel',
    number: '01',
    eyebrow: 'AI JOB INTELLIGENCE',
    title: '求职情报终端',
    english: 'NEW GRAD INTELLIGENCE TERMINAL',
    summary: '把 JD、简历和岗位风险拆成事实、推断、未知与下一步；不急着投，先做投递决策。',
    proof: ['JD 解构', '事实分级', '投递决策'],
    image: '/projects/other-builds/job-intel-terminal.png',
    imageAlt: '求职情报终端的岗位录入与 JD 解构工作台',
    primaryUrl: 'https://github.com/violetloveAI/ngit-intelligence-terminal',
    primaryLabel: '查看 GitHub',
    secondaryUrl: null,
    secondaryLabel: null,
    tone: 'job',
    screenLabel: 'REAL UI / TARGET ACQUISITION',
  },
  {
    id: 'life-moment',
    number: '02',
    eyebrow: 'PERSONAL LIFE PROTOTYPE',
    title: '此刻',
    english: 'LIFE FLOW JOURNAL',
    summary: '把每日主线、想法、饮食、运动、书影音与 AI 周报，收进一条只属于自己的生活流。',
    proof: ['生活时间线', '移动优先', '每周回顾'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/08-life-moment.avif',
    imageAlt: '此刻个人生活记录 App 的黏土风格插画',
    primaryUrl: 'https://violetloveai.github.io/life-flow-journal-demo/',
    primaryLabel: '打开 Demo',
    secondaryUrl: 'https://github.com/violetloveAI/life-flow-journal-demo',
    secondaryLabel: 'GitHub',
    tone: 'life',
    screenLabel: 'INTERACTIVE DEMO / IPHONE FIRST',
  },
  {
    id: 'codex-companion',
    number: '03',
    eyebrow: 'MACOS DESKTOP EXPERIMENT',
    title: 'Codex 桌面搭档',
    english: 'VIOLET FOR CODEX DESKTOP',
    summary: '让 Codex 的任务状态长成会说话、会提醒、会在屏幕边缘探头的本地语音桌宠。',
    proof: ['本地语音', '任务气泡', '边缘探头'],
    image: '/projects/other-builds/codex-companion.webp',
    imageAlt: 'Codex 桌面搭档 Violet 的原生桌宠、左右边缘探头和功能预览',
    primaryUrl: 'https://github.com/violetloveAI/violet-codex-pet',
    primaryLabel: '查看 GitHub',
    secondaryUrl: null,
    secondaryLabel: null,
    tone: 'pet',
    screenLabel: 'NATIVE MACOS / LOCAL FIRST',
  },
] as const;

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function OtherBuildsCase({ embedded = false }: { embedded?: boolean }) {
  const isEmbedded = useEmbeddedMode(embedded);

  return (
    <main className={`${styles.page} ${isEmbedded ? styles.embedded : ''}`} data-cursor-theme="clay">
      <CaseCursor embedded={isEmbedded} />
      <div className={styles.texture} aria-hidden="true" />

      <header className={styles.topbar}>
        {/* vinext production prefetch currently throws on hash navigation. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className={styles.backLink} href="/#work"><span aria-hidden="true">←</span> WORKS</a>
        <div className={styles.identity}><span>VIOLET XIE / PERSONAL WEBSITE</span><span>06 / OTHER BUILDS</span></div>
        <span className={styles.status}><i aria-hidden="true" /> LAB IS GROWING</span>
      </header>

      <section className={styles.showcase} aria-labelledby="other-builds-title">
        <div className={styles.clayPath} aria-hidden="true"><i /><i /><i /><i /></div>

        <header className={styles.hero}>
          <div>
            <span className={styles.kicker}>06 / PERSONAL LAB · QUICK PROTOTYPES</span>
            <h1 id="other-builds-title">更多实验 <em>/ OTHER BUILDS</em></h1>
          </div>
          <div className={styles.heroNote}>
            <span>WHY THEY ARE HERE</span>
            <p>我也会为自己的生活、兴趣和新想法，快速做出原型。</p>
            <div className={styles.heroTags}><i>3 BUILDS</i><i>REAL UI</i><i>STILL GROWING</i></div>
          </div>
        </header>

        <div className={styles.buildGrid}>
          {builds.map((build) => (
            <article className={`${styles.buildCard} ${styles[build.tone]}`} key={build.id}>
              <header className={styles.cardTop}>
                <span>{build.number}</span>
                <small>{build.eyebrow}</small>
                <i aria-hidden="true" />
              </header>

              <a className={styles.mediaLink} href={build.primaryUrl} target="_blank" rel="noreferrer" aria-label={`${build.title}：${build.primaryLabel}`}>
                <div className={styles.screenTop}><span>{build.screenLabel}</span><b aria-hidden="true">•••</b></div>
                <div className={styles.mediaFrame}>
                  <Image src={build.image} alt={build.imageAlt} fill sizes="(max-width: 900px) 92vw, 31vw" unoptimized />
                </div>
                <span className={styles.openHint}>OPEN <ExternalArrow /></span>
              </a>

              <div className={styles.cardCopy}>
                <div className={styles.titleRow}><h2>{build.title}</h2><span>{build.number}</span></div>
                <strong>{build.english}</strong>
                <p>{build.summary}</p>
                <div className={styles.proofList}>{build.proof.map((item) => <span key={item}>{item}</span>)}</div>
              </div>

              <footer className={styles.cardFooter}>
                <a className={styles.primaryAction} href={build.primaryUrl} target="_blank" rel="noreferrer">{build.primaryLabel} <ExternalArrow /></a>
                {build.secondaryUrl && build.secondaryLabel ? (
                  <a className={styles.secondaryAction} href={build.secondaryUrl} target="_blank" rel="noreferrer">{build.secondaryLabel} <ExternalArrow /></a>
                ) : <span className={styles.localNote}>PUBLIC REPOSITORY</span>}
              </footer>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.progress} aria-hidden="true"><i /><i /><i /><i /></div>
        <p>NOTICE → BUILD → TRY → KEEP</p>
        <a href="https://github.com/violetloveAI?tab=repositories" target="_blank" rel="noreferrer">ALL REPOSITORIES <ExternalArrow /></a>
      </footer>
    </main>
  );
}
