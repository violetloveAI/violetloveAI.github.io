'use client';

import Image from 'next/image';
import { useEmbeddedMode } from '../_components/useEmbeddedMode';
import { useState, type KeyboardEvent } from 'react';
import { CaseCursor } from '../_components/CaseCursor';
import { ProjectHighlights } from '../_components/ProjectHighlights';
import styles from './tutor-log.module.css';

const demoUrl = 'https://violetloveai.github.io/yang-teacher-tutor/';

const storySteps = [
  {
    index: '01',
    label: '工作场景',
    english: 'DISCOVER',
    title: '把分散的家教日常，收进一个工作台。',
    body: '从老师的实际工作出发，将课表、临时调课、学生记录与收入核对整合起来，减少在日历、备忘录和账本之间切换。',
    proof: ['真实使用反馈', '课程统一管理'],
    marker: 'REAL USER / DAILY WORK',
    screenshot: '/projects/tutor-log/calendar-month.png',
    screenshotAlt: 'Tutor Log 月历与当天课程界面',
    screenLabel: '月历与当天课程',
    screenNote: '当天课程、学生与地点一目了然，出门前就能安排好教学行程。',
  },
  {
    index: '02',
    label: '业务闭环',
    english: 'DESIGN',
    title: '一节课，从排课到收款。',
    body: '以课程为主线，连通重复排课、出发提醒、学生档案、课后记录与收款状态，让教学安排和收入核对自然衔接。',
    proof: ['排课与出发提醒', '教学与收款关联'],
    marker: 'SCHEDULE → TEACH → REVIEW',
    screenshot: '/projects/tutor-log/calendar-week.png',
    screenshotAlt: 'Tutor Log 周课表界面',
    screenLabel: '一周课程全景',
    screenNote: '用时间轴看清课程密度、学生与地点，减少临时调课带来的混乱。',
  },
  {
    index: '03',
    label: '经营视角',
    english: 'DECIDE',
    title: '每节课赚多少，要算完整投入。',
    body: '扣除通勤费用，将备课、通勤与善后计入投入时间，算出真实时薪，为老师比较课程回报提供依据。',
    proof: ['真实时薪核算', '通勤成本与时间'],
    marker: 'PRIVATE BY DEFAULT',
    screenshot: '/projects/tutor-log/stats.png',
    screenshotAlt: 'Tutor Log 教学收入与真实时薪统计界面',
    screenLabel: '收入与真实时薪',
    screenNote: '将收款进度、通勤成本和时间投入放在一起，看清教学收入与实际回报。',
  },
  {
    index: '04',
    label: '我的贡献',
    english: 'DELIVER',
    title: '从用户访谈到 iPhone 交付。',
    body: '独立负责需求、交互、AI 辅助开发与测试，交付离线可用、支持加密备份的 iPhone 私人版，并持续按使用反馈迭代。',
    proof: ['独立完成 0→1', '离线与加密备份'],
    marker: 'OWNER / BUILDER / ITERATOR',
    screenshot: '/projects/tutor-log/student-detail.png',
    screenshotAlt: 'Tutor Log 学生档案与学习轨迹界面',
    screenLabel: '学生档案与轨迹',
    screenNote: '将地点、通勤、教学提醒和学习表现沉淀为可持续使用的学生档案。',
  },
] as const;

export function TutorLogCase({ embedded: embeddedProp = false }: { embedded?: boolean }) {
  const embedded = useEmbeddedMode(embeddedProp);
  const [activeStep, setActiveStep] = useState(0);
  const [liveDemo, setLiveDemo] = useState(false);
  const selectedStep = storySteps[activeStep];

  const handleStepKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    const next = (index + direction + storySteps.length) % storySteps.length;
    setActiveStep(next);
    document.getElementById(`tutor-step-${next}`)?.focus();
  };

  return (
    <main className={`${styles.page} ${styles.readable} ${embedded ? styles.embedded : ''}`} data-cursor-theme="clay">
      <CaseCursor embedded={embedded} />
      <div className={styles.texture} aria-hidden="true" />
      <header className={styles.topbar}>
        {/* vinext's production Link prefetch currently throws on hash navigation. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className={styles.backLink} href="/#work" aria-label="返回作品列表">
          <span aria-hidden="true">←</span> WORKS
        </a>
        <div className={styles.identity}>
          <span>VIOLET XIE / PERSONAL WEBSITE</span>
          <span>04 / REAL USER PRODUCT</span>
        </div>
        <a className={styles.topDemoLink} href={demoUrl} target="_blank" rel="noreferrer">
          OPEN DEMO <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className={styles.showcase} aria-labelledby="case-title">
        <div className={styles.clayPath} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>

        <article className={styles.introCard}>
          <ProjectHighlights items={['家教经营工作台', '独立交付 iPhone']} />
          <p className={styles.kicker}>04 / 课时簿 · TUTOR LOG</p>
          <h1 id="case-title">
            排课、教学与收入，
            <em>一处管理。</em>
          </h1>
          <p className={styles.summary}>
            从真实家教工作流出发，独立交付 iPhone 私人版，把排课、教学记录与收款管理连成闭环。
          </p>
          <ol className={styles.designHighlights} aria-label="产品设计亮点">
            <li>
              <span aria-hidden="true">01</span>
              <div><strong>课表到收款</strong><p>一节课串起教学与收入</p></div>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <div><strong>真实时薪</strong><p>将备课、通勤计入投入</p></div>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <div><strong>离线使用</strong><p>加密备份随时恢复</p></div>
            </li>
          </ol>
        </article>

        <div className={styles.productStage}>
          <span className={styles.stageLabel}>375 × 812 / NATIVE PRODUCT VIEW</span>
          <div className={styles.phoneGlow} aria-hidden="true" />
          <div className={styles.phoneScale}>
            <div className={styles.phone}>
              <div className={styles.phoneTop} aria-hidden="true"><i /></div>
              <div className={styles.phoneScreen}>
                {liveDemo ? (
                  <iframe
                    className={styles.demoFrame}
                    src={demoUrl}
                    width="375"
                    height="812"
                    title="课时簿网页功能预览（虚构数据）"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                    onPointerEnter={() => window.dispatchEvent(new CustomEvent('violet-cursor-visibility', { detail: false }))}
                    onPointerLeave={() => window.dispatchEvent(new CustomEvent('violet-cursor-visibility', { detail: true }))}
                  />
                ) : (
                  <Image
                    key={selectedStep.screenshot}
                    src={selectedStep.screenshot}
                    alt={selectedStep.screenshotAlt}
                    width={375}
                    height={812}
                    sizes="375px"
                    priority
                    className={styles.productImage}
                  />
                )}
              </div>
              <span className={styles.phoneHome} aria-hidden="true" />
            </div>
          </div>
          <button
            className={styles.liveToggle}
            type="button"
            aria-pressed={liveDemo}
            aria-label={liveDemo ? '点击返回关键产品画面' : '点击查看在线 Demo，使用虚构数据演示'}
            onClick={() => setLiveDemo((current) => !current)}
          >
            <i aria-hidden="true" />
            <span>
              <small>{liveDemo ? '点击返回' : '点击查看'}</small>
              <strong>{liveDemo ? '关键画面' : '在线 DEMO'}</strong>
            </span>
            <b aria-hidden="true">{liveDemo ? '←' : '→'}</b>
          </button>
          {!embedded && <div className={styles.productMarker} key={selectedStep.marker} aria-hidden="true">
            <span>{selectedStep.index}</span>
          </div>}
        </div>

        <div className={styles.detailsColumn}>
        <article className={styles.resultsCard}>
          <span>产品成果</span>
          <h2>已进入老师的<strong>日常工作。</strong></h2>
          <dl className={styles.metrics} aria-label="项目成果">
            <div><dt>使用</dt><dd>真实家教工作流</dd></div>
            <div><dt>交付</dt><dd>iPhone 私人版</dd></div>
            <div><dt>职责</dt><dd>0→1 独立交付</dd></div>
            <div><dt>亮点</dt><dd>真实时薪核算</dd></div>
          </dl>
        </article>

        <aside className={styles.storyPanel} aria-label="项目故事">
          <div className={styles.stepTabs} role="tablist" aria-label="切换项目故事章节">
            {storySteps.map((step, index) => (
              <button
                id={`tutor-step-${index}`}
                key={step.index}
                type="button"
                role="tab"
                aria-label={`${step.index} ${step.label} ${step.english}`}
                aria-selected={activeStep === index}
                aria-controls="tutor-story-detail"
                tabIndex={activeStep === index ? 0 : -1}
                onClick={() => setActiveStep(index)}
                onKeyDown={(event) => handleStepKeys(event, index)}
              >
                <span>{step.index}</span>
                <strong>{step.label}</strong>
              </button>
            ))}
          </div>

          <article
            className={styles.storyDetail}
            id="tutor-story-detail"
            role="tabpanel"
            aria-live="polite"
            key={selectedStep.index}
          >
            <span>{selectedStep.index} / {selectedStep.english}</span>
            <h2>{selectedStep.title}</h2>
            <p>{selectedStep.body}</p>
            <div className={styles.proofList}>
              {selectedStep.proof.map((proof, index) => (
                <span key={proof}><i>0{index + 1}</i>{proof}</span>
              ))}
            </div>
          </article>
          {embedded && <div className={styles.productMarker} key={selectedStep.marker} aria-hidden="true">
            <span>{selectedStep.index}</span>
          </div>}
        </aside>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.progress} aria-label={`当前故事章节 ${activeStep + 1}，共 ${storySteps.length} 章`}>
          {storySteps.map((step, index) => (
            <button
              key={step.index}
              type="button"
              aria-label={`查看第 ${index + 1} 章：${step.label}`}
              aria-current={activeStep === index ? 'step' : undefined}
              onClick={() => setActiveStep(index)}
            ><span /></button>
          ))}
        </div>
        <p>DISCOVER → DEFINE → BUILD → TEST → DELIVER</p>
        <div className={styles.footerLinks}>
          <a href="https://github.com/violetloveAI/yang-teacher-tutor" target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href={demoUrl} target="_blank" rel="noreferrer">FULL DEMO ↗</a>
        </div>
      </footer>
    </main>
  );
}
