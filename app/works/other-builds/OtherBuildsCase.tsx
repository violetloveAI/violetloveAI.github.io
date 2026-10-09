'use client';

import Image from 'next/image';
import { useEmbeddedMode } from '../_components/useEmbeddedMode';
import { useState } from 'react';
import { CaseCursor } from '../_components/CaseCursor';
import { ClayExternalLink } from '../_components/ClayExternalLink';
import styles from './other-builds.module.css';

const builds = [
  {
    id: 'final-human',
    number: '01',
    eyebrow: '获奖互动游戏',
    title: 'Final Human',
    english: 'AI HALLUCINATION INVESTIGATION',
    summary: '把 AI 幻觉做成证据驱动的调查游戏。我主导选题、玩法与路演，与队友在 24 小时内交付双奖作品。',
    proof: ['黑客松双奖作品', '产品与玩法主导'],
    images: [
      { src: '/projects/final-human/opening.webp', alt: 'Final Human 互动推理游戏封面与三位 AI 角色', label: '游戏封面与角色', fit: 'contain', position: 'center' },
      { src: '/projects/final-human/game-investigation.webp', alt: 'Final Human 中质询 AI、管理 Token 并调查线索的界面', label: '质询与线索调查', fit: 'contain', position: 'center' },
      { src: '/projects/final-human/two-awards.webp', alt: 'Final Human 获游戏赛道亚军与一发入魂奖的现场照片', label: '游戏亚军 · 跨赛道专项奖', fit: 'contain', position: 'center' },
    ],
    demoUrl: 'https://violetloveai.github.io/finalhuman/',
    githubUrl: 'https://github.com/violetloveAI/finalhuman',
    tone: 'job',
  },
  {
    id: 'gongxingji',
    number: '02',
    eyebrow: '双人生活游戏',
    title: '共星纪',
    english: 'DUAL LIFE UNIVERSE',
    summary: '把双人记录与共同回忆设计成合作型生活 RPG，用远征任务和成长视图，让日常的小进展看得见。',
    proof: ['合作型生活 RPG', '成长进度可视化'],
    images: [
      { src: '/projects/other-builds/gongxingji-03.webp', alt: '共星纪耀星与汐星双人生活宇宙主视觉', label: '双人生活宇宙', fit: 'contain', position: 'center' },
      { src: '/projects/other-builds/gongxingji-demo-overview.png', alt: '共星纪在线 Demo 首页与双星状态', label: '今日主线与双星状态', fit: 'contain', position: 'center' },
      { src: '/projects/other-builds/gongxingji-calendar.png', alt: '共星纪在线 Demo 月视图与共同成长统计', label: '月视图与共同成长统计', fit: 'contain', position: 'center' },
    ],
    demoUrl: 'https://violetloveai.github.io/gongxingji-showcase-demo/',
    githubUrl: 'https://github.com/violetloveAI/gongxingji-showcase-demo',
    tone: 'stars',
  },
  {
    id: 'live-answers',
    number: '03',
    eyebrow: '公共答案共创原型',
    title: '活答案',
    english: 'LIVE ANSWERS',
    summary: '让公共答案随新经历持续更新：串起经历贡献、版本对比与审阅发布，让每次补充有来源，每次修改可追溯。',
    proof: ['经历共创答案', '版本差异可追溯'],
    images: [
      { src: '/projects/other-builds/live-answers-home.png', alt: '活答案首页，展示持续更新的公共答案与个人经历卡片', label: '持续生长的答案', fit: 'contain', position: 'center' },
      { src: '/projects/other-builds/live-answers-contribution.png', alt: '活答案贡献预览，作者核对公开内容、隐私与身份', label: '经历贡献与公开确认', fit: 'contain', position: 'center' },
      { src: '/projects/other-builds/live-answers-review.png', alt: '活答案审阅差异，展示新增内容、依据与采纳发布操作', label: '差异审阅与发布', fit: 'contain', position: 'center' },
    ],
    demoUrl: 'https://violetloveai.github.io/zhihu-live-answers/',
    githubUrl: 'https://github.com/violetloveAI/zhihu-live-answers',
    tone: 'life',
  },
  {
    id: 'codex-companion',
    number: '04',
    eyebrow: '桌宠交互实验',
    title: 'Codex 桌面搭档',
    english: 'VIOLET FOR CODEX DESKTOP',
    summary: '用本地语音、任务气泡与九组动画，让 Codex 任务状态可听、可见；从屏幕边缘探头的角色，为桌面增添陪伴感。',
    proof: ['本地语音反馈', '九组状态动画'],
    images: [
      { src: '/projects/other-builds/codex-companion-01.png', alt: 'Codex 桌面搭档 Violet 的原生桌宠与左右边缘探头预览', label: '桌宠与边缘探头', fit: 'contain', position: 'center' },
      { src: '/projects/other-builds/codex-companion-02.png', alt: 'Codex 桌面搭档在明暗桌面上的左右边缘探头状态', label: '适配明暗桌面的边缘探头', fit: 'contain', position: 'center' },
      { src: '/projects/other-builds/codex-companion-03.png', alt: 'Codex 桌面搭档 Violet 的待机、奔跑、挥手与任务状态动画表', label: '九组任务动画状态', fit: 'contain', position: 'center' },
    ],
    demoUrl: 'https://violetloveai.github.io/violet-codex-pet-demo/',
    githubUrl: 'https://github.com/violetloveAI/violet-codex-pet',
    tone: 'pet',
  },
] as const;

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

type Build = (typeof builds)[number];

function BuildGallery({ build }: { build: Build }) {
  const [activeImage, setActiveImage] = useState(0);
  const image = build.images[activeImage];
  const showNext = () => setActiveImage((current) => (current + 1) % build.images.length);

  return (
    <div className={styles.mediaLink}>
      <button
        className={styles.mediaButton}
        type="button"
        onClick={showNext}
        aria-label={`${build.title}：${image.label}，第 ${activeImage + 1} 张，共 ${build.images.length} 张。点击查看下一张`}
      >
        <span className={styles.mediaFrame}>
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 680px) 92vw, (max-width: 1024px) 45vw, 24vw"
            data-fit={image.fit}
            style={{ objectFit: image.fit, objectPosition: image.position }}
            unoptimized
          />
        </span>
      </button>

      <div className={styles.galleryFooter}>
        <span className={styles.mediaCaption} title={image.label}>
          <b>{activeImage + 1} / {build.images.length}</b>{image.label}
        </span>
        <span className={styles.pager} aria-label={`${build.title}图片页码`}>
          {build.images.map((item, index) => (
            <button
              key={item.src}
              type="button"
              aria-label={`查看第 ${index + 1} 张：${item.label}`}
              aria-current={activeImage === index ? 'true' : undefined}
              onClick={() => setActiveImage(index)}
            ><span /></button>
          ))}
        </span>
      </div>
    </div>
  );
}

export default function OtherBuildsCase({ embedded: embeddedProp = false }: { embedded?: boolean }) {
  const embedded = useEmbeddedMode(embeddedProp);
  return (
    <main className={`${styles.page} ${embedded ? styles.embedded : ''}`} data-cursor-theme="clay">
      <CaseCursor embedded={embedded} />
      <div className={styles.texture} aria-hidden="true" />

      <header className={styles.topbar}>
        {/* vinext production prefetch currently throws on hash navigation. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className={styles.backLink} href="/#work"><span aria-hidden="true">←</span> WORKS</a>
        <div className={styles.identity}><span>VIOLET XIE / PERSONAL WEBSITE</span><span>07 / MORE CREATIONS</span></div>
        <span className={styles.status}><i aria-hidden="true" /> LAB IS GROWING</span>
      </header>

      <section className={styles.showcase} aria-labelledby="other-builds-title">
        <div className={styles.clayPath} aria-hidden="true"><i /><i /><i /><i /></div>

        <header className={styles.hero}>
          <div className={styles.heroTitle}>
            <span className={styles.sectionNumber} aria-hidden="true">07</span>
            <div>
              <span className={styles.kicker}>创意产品 · 交互探索</span>
              <h1 id="other-builds-title">更多创作</h1>
            </div>
          </div>
          <p className={styles.heroNote}>把日常观察变成产品，<br />让想法成为可体验的作品。</p>
        </header>

        <div className={styles.buildGrid}>
          {builds.map((build) => (
            <article className={`${styles.buildCard} ${styles[build.tone]}`} key={build.id}>
              <header className={styles.cardTop}>
                <span>{build.number}</span>
                <small>{build.eyebrow}</small>
                <i aria-hidden="true" />
              </header>

              <BuildGallery build={build} />

              <div className={styles.cardCopy}>
                <div className={styles.titleRow}><h2>{build.title}</h2></div>
                <p>{build.summary}</p>
                <div className={styles.proofList}>
                  {build.proof.map((item) => (
                    <span
                      key={item}
                      className={build.id === 'final-human' && item === '黑客松双奖作品' ? styles.awardProof : undefined}
                    >{item}</span>
                  ))}
                </div>
              </div>

              <footer className={styles.cardFooter}>
                {build.demoUrl ? (
                  <ClayExternalLink kind="demo" href={build.demoUrl} projectTitle={build.title} compact />
                ) : null}
                <ClayExternalLink kind="github" href={build.githubUrl} projectTitle={build.title} compact />
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
