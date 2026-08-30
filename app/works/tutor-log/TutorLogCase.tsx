'use client';

import Image from 'next/image';
import { useState, type KeyboardEvent } from 'react';
import styles from './tutor-log.module.css';

const demoUrl = 'https://violetloveai.github.io/yang-teacher-tutor/';

const storySteps = [
  {
    index: '01',
    label: '匿名用户',
    english: 'DISCOVER',
    title: '不是做给“家教行业”，而是做给一位具体的独立教师。',
    body: '我从匿名化的一天开始理解问题：课表分散、临时调课难追踪、学生情况靠记忆，月底再重新核对收入与通勤。',
    proof: ['匿名使用者场景', '访谈与反馈', '私人数据与公开 Demo 隔离'],
    marker: 'ANONYMIZED USER / DAILY WORK',
    screenshot: '/projects/tutor-log/calendar-month.png',
    screenshotAlt: 'Tutor Log 月历与当天课程界面',
    screenLabel: '月历与当天课程',
    screenNote: '先回答老师每天最频繁的问题：今天上什么课、接下来要去哪里。',
  },
  {
    index: '02',
    label: '核心闭环',
    english: 'DESIGN',
    title: '把一节课前后的动作，收进同一条工作流。',
    body: '从重复排课、出发提醒，到学生档案、课后记录和收款状态，不再让老师在日历、备忘录与计算器之间来回切换。',
    proof: ['月历 + 双版本周课表', '重复排课与本机提醒', '学生档案与教学记录'],
    marker: 'SCHEDULE → TEACH → REVIEW',
    screenshot: '/projects/tutor-log/calendar-week.png',
    screenshotAlt: 'Tutor Log 周课表界面',
    screenLabel: '一周课程全景',
    screenNote: '用时间轴看清课程密度、学生与地点，减少临时调课带来的混乱。',
  },
  {
    index: '03',
    label: '关键取舍',
    english: 'DECIDE',
    title: '真正重要的不是功能多，而是数据可信、使用安心。',
    body: '产品坚持离线优先；报价、通勤成本与真实时薪放在同一套统计中；备份使用密码加密，公开预览只保留虚构数据。',
    proof: ['离线优先', '真实时薪与收款统计', 'AES-GCM 加密备份'],
    marker: 'PRIVATE BY DEFAULT',
    screenshot: '/projects/tutor-log/stats.png',
    screenshotAlt: 'Tutor Log 教学收入与真实时薪统计界面',
    screenLabel: '收入与真实时薪',
    screenNote: '不只统计课时，也把收款进度、通勤和实际投入放进同一套经营视角。',
  },
  {
    index: '04',
    label: '我的角色',
    english: 'DELIVER',
    title: '我负责的不是一张界面，而是从模糊需求到可以交付的产品。',
    body: '我参与需求澄清、范围定义、交互与视觉、AI 辅助开发、测试、隐私边界和发布准备，并持续根据真实使用反馈迭代。',
    proof: ['0→1 全程参与', '产品与体验决策', 'iOS 交付 · App Store Next'],
    marker: 'OWNER / BUILDER / ITERATOR',
    screenshot: '/projects/tutor-log/student-detail.png',
    screenshotAlt: 'Tutor Log 学生档案与学习轨迹界面',
    screenLabel: '学生档案与轨迹',
    screenNote: '将地点、通勤、教学提醒和学习表现沉淀为可持续使用的学生档案。',
  },
] as const;

export function TutorLogCase() {
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
    <main className={styles.page}>
      <div className={styles.texture} aria-hidden="true" />
      <header className={styles.topbar}>
        {/* vinext's production Link prefetch currently throws on hash navigation. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className={styles.backLink} href="/#work" aria-label="返回作品列表">
          <span aria-hidden="true">←</span> WORKS
        </a>
        <div className={styles.identity}>
          <span>VIOLET XIE / PERSONAL WEBSITE</span>
            <span>01 / ANONYMIZED USER CASE</span>
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
          <div className={styles.statusLine}>
            <span>ANONYMIZED CASE</span>
            <span>DELIVERED / ITERATING</span>
          </div>
          <p className={styles.kicker}>01 / VIBE CODING WORKS · TUTOR LOG</p>
          <h1 id="case-title">
            把独立教师的
            <em>课表、学生和工资，</em>
            装进一部真正会被使用的 App。
          </h1>
          <p className={styles.summary}>
            从匿名使用场景出发的 iPhone 家教工作台。我参与访谈、定义、设计、构建、测试与交付的完整过程。
          </p>
        </article>

        <figure className={styles.featureShot} key={selectedStep.screenshot}>
          <div className={styles.shotCopy}>
            <span>{selectedStep.index} / KEY SCREEN</span>
            <strong>{selectedStep.screenLabel}</strong>
            <p>{selectedStep.screenNote}</p>
          </div>
          <div className={styles.shotViewport}>
            <Image
              src={selectedStep.screenshot}
              alt={selectedStep.screenshotAlt}
              fill
              sizes="160px"
              className={styles.shotImage}
            />
          </div>
          <figcaption>点击右侧章节，查看对应产品界面</figcaption>
        </figure>

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
                    title="家教计薪器正式版功能预览"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                ) : (
                  <Image
                    src="/projects/tutor-log/calendar.jpg"
                    alt="家教计薪器当天课程、事项与导航界面"
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
            aria-label={liveDemo ? '返回关键产品画面' : '切换为实时 Demo'}
            onClick={() => setLiveDemo((current) => !current)}
          >
            <i aria-hidden="true" />
            <span>
              <small>{liveDemo ? 'RETURN TO' : 'CLICK TO TRY'}</small>
              <strong>{liveDemo ? 'KEY VIEW' : 'LIVE DEMO'}</strong>
            </span>
            <b aria-hidden="true">{liveDemo ? '←' : '→'}</b>
          </button>
          <div className={styles.productMarker} key={selectedStep.marker} aria-hidden="true">
            <span>{selectedStep.index}</span>
          </div>
        </div>

        <article className={styles.resultsCard}>
          <span>OUTCOME / 结果</span>
          <h2>不是概念图，<strong>是可验证交付。</strong></h2>
          <dl className={styles.metrics} aria-label="项目成果">
            <div><dt>USER</dt><dd>匿名教师场景</dd></div>
            <div><dt>SCOPE</dt><dd>0→1 全流程</dd></div>
            <div><dt>DELIVERY</dt><dd>iPhone 已上架</dd></div>
            <div><dt>NEXT</dt><dd>App Store 推广</dd></div>
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
        </aside>
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
