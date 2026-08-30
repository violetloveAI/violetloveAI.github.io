'use client';

import Image from 'next/image';
import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import styles from './clay-product-case.module.css';

export type ProductStoryStep = {
  index: string;
  label: string;
  english: string;
  title: string;
  body: string;
  proof: readonly string[];
  marker: string;
  desktop: string;
  desktopAlt: string;
  phone: string;
  phoneAlt: string;
  screenLabel: string;
  screenNote: string;
};

export type ProductMetric = {
  label: string;
  value: string;
};

export type ClayProductCaseProps = {
  index: string;
  kind: string;
  englishName: string;
  name: string;
  status: readonly [string, string];
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  summary: string;
  resultLead: string;
  resultAccent: string;
  metrics: readonly ProductMetric[];
  storySteps: readonly ProductStoryStep[];
  workflow: string;
  demoUrl: string;
  githubUrl: string;
  clayArt: string;
  deviceMode: 'phone' | 'dual';
  showcaseDesktop?: string;
  showcaseDesktopAlt?: string;
  showcasePhone?: string;
  showcasePhoneAlt?: string;
  showcaseLabel?: string;
  accent: string;
  accentDeep: string;
  accentSoft: string;
};

type CaseVars = CSSProperties & {
  '--case-accent': string;
  '--case-accent-deep': string;
  '--case-accent-soft': string;
};

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ClayProductCase({
  index,
  kind,
  englishName,
  name,
  status,
  titleBefore,
  titleAccent,
  titleAfter,
  summary,
  resultLead,
  resultAccent,
  metrics,
  storySteps,
  workflow,
  demoUrl,
  githubUrl,
  clayArt,
  deviceMode,
  showcaseDesktop,
  showcaseDesktopAlt,
  showcasePhone,
  showcasePhoneAlt,
  showcaseLabel,
  accent,
  accentDeep,
  accentSoft,
}: ClayProductCaseProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [liveDemo, setLiveDemo] = useState(false);
  const selectedStep = storySteps[activeStep];
  const stageDesktop = showcaseDesktop ?? selectedStep.desktop;
  const stageDesktopAlt = showcaseDesktopAlt ?? selectedStep.desktopAlt;
  const stagePhone = showcasePhone ?? selectedStep.phone;
  const stagePhoneAlt = showcasePhoneAlt ?? selectedStep.phoneAlt;
  const stageScreenLabel = showcaseLabel ?? selectedStep.screenLabel;
  const caseVars: CaseVars = {
    '--case-accent': accent,
    '--case-accent-deep': accentDeep,
    '--case-accent-soft': accentSoft,
  };

  const handleStepKeys = (event: KeyboardEvent<HTMLButtonElement>, current: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    const next = (current + direction + storySteps.length) % storySteps.length;
    setActiveStep(next);
    document.getElementById(`${name}-step-${next}`)?.focus();
  };

  const deviceCopy = deviceMode === 'dual' ? '1280 × 720 + 390 × 844' : '390 × 844 / MOBILE PRODUCT VIEW';

  return (
    <main className={`${styles.page} ${deviceMode === 'dual' ? styles.dualPage : ''}`} style={caseVars}>
      <div className={styles.texture} aria-hidden="true" />
      <header className={styles.topbar}>
        {/* vinext production prefetch currently throws on hash navigation. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className={styles.backLink} href="/#work" aria-label="返回作品列表"><span aria-hidden="true">←</span> WORKS</a>
        <div className={styles.identity}>
          <span>VIOLET XIE / PERSONAL WEBSITE</span>
          <span>{index} / {kind}</span>
        </div>
        <a className={styles.topDemoLink} href={demoUrl} target="_blank" rel="noreferrer">OPEN DEMO <ExternalArrow /></a>
      </header>

      <section className={styles.showcase} aria-labelledby={`${name}-title`}>
        <div className={styles.clayPath} aria-hidden="true"><i /><i /><i /><i /></div>

        {deviceMode === 'dual' ? (
          <aside className={styles.caseRail} aria-label={`${name} 项目案例说明`}>
            <header className={styles.railHeader}>
              <div className={styles.statusLine}><span>{status[0]}</span><span>{status[1]}</span></div>
              <p className={styles.railKicker}>{index} / CASE FILE · {englishName}</p>
              <h1 id={`${name}-title`}>
                {titleBefore}
                <em>{titleAccent}</em>
                {titleAfter}
              </h1>
              <p className={styles.railPurpose}>{summary}</p>
            </header>

            <div className={styles.railTabs} role="tablist" aria-label="切换案例章节">
              {storySteps.map((step, stepIndex) => (
                <button
                  id={`${name}-step-${stepIndex}`}
                  key={step.index}
                  type="button"
                  role="tab"
                  aria-label={`${step.index} ${step.label} ${step.english}`}
                  aria-selected={activeStep === stepIndex}
                  aria-controls={`${name}-rail-detail`}
                  tabIndex={activeStep === stepIndex ? 0 : -1}
                  onClick={() => setActiveStep(stepIndex)}
                  onKeyDown={(event) => handleStepKeys(event, stepIndex)}
                ><span>{step.index}</span><strong>{step.label}</strong><small>{step.english}</small></button>
              ))}
            </div>

            <article className={styles.railStory} id={`${name}-rail-detail`} role="tabpanel" aria-live="polite" key={selectedStep.index}>
              <div className={styles.railStoryMeta}><span>{selectedStep.index}</span><small>{selectedStep.english}</small></div>
              <h2>{selectedStep.title}</h2>
              <p>{selectedStep.body}</p>
              <div className={styles.railProof}>
                {selectedStep.proof.map((proof, proofIndex) => <span key={proof}><i>0{proofIndex + 1}</i>{proof}</span>)}
              </div>
            </article>

            <footer className={styles.railEvidence}>
              <p>{resultLead}<strong>{resultAccent}</strong></p>
              <dl aria-label="项目验证证据">
                {metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
              </dl>
            </footer>
          </aside>
        ) : (
          <>
            <article className={styles.introCard}>
              <div className={styles.statusLine}><span>{status[0]}</span><span>{status[1]}</span></div>
              <p className={styles.kicker}>{index} / VIBE CODING WORKS · {englishName}</p>
              <h1 id={`${name}-title`}>
                {titleBefore}
                <em>{titleAccent}</em>
                {titleAfter}
              </h1>
              <p className={styles.summary}>{summary}</p>
            </article>

            <figure className={styles.featureShot} key={`${selectedStep.index}-${selectedStep.desktop}`}>
              <div className={styles.shotCopy}>
                <span>{selectedStep.index} / KEY SCREEN</span>
                <strong>{selectedStep.screenLabel}</strong>
                <p>{selectedStep.screenNote}</p>
              </div>
              <div className={styles.shotViewport}>
                <Image src={selectedStep.desktop} alt={selectedStep.desktopAlt} fill sizes="230px" className={styles.shotImage} />
              </div>
              <figcaption>点击右侧章节，桌面与手机画面会同步切换</figcaption>
            </figure>
          </>
        )}

        <div className={`${styles.productStage} ${deviceMode === 'dual' ? styles.dualStage : styles.phoneStage}`}>
          <span className={styles.stageLabel}>{deviceCopy}</span>
          <div className={styles.clayHalo} aria-hidden="true" />
          <div className={styles.subjectArt} aria-hidden="true">
            <Image src={clayArt} alt="" fill sizes="380px" unoptimized />
          </div>

          {deviceMode === 'dual' ? (
            <div className={styles.dualCluster}>
              <div className={styles.desktopDevice}>
                <div className={styles.desktopTop} aria-hidden="true"><i /><i /><i /><span>{liveDemo ? 'LIVE PRODUCT / DESKTOP' : stageScreenLabel}</span></div>
                <div className={styles.desktopScreen}>
                  {liveDemo ? (
                    <iframe className={styles.desktopFrame} src={demoUrl} width="1280" height="720" title={`${name} 桌面端实时 Demo`} sandbox="allow-scripts allow-same-origin allow-forms" />
                  ) : (
                    <Image src={stageDesktop} alt={stageDesktopAlt} width={1280} height={720} sizes="810px" className={styles.desktopImage} priority />
                  )}
                </div>
                <span className={styles.desktopFoot} aria-hidden="true" />
              </div>
              <div className={styles.phoneDevice}>
                <span className={styles.phoneSpeaker} aria-hidden="true" />
                <div className={styles.phoneScreen}>
                  {liveDemo ? (
                    <iframe className={styles.phoneFrame} src={demoUrl} width="390" height="844" title={`${name} 手机端实时 Demo`} sandbox="allow-scripts allow-same-origin allow-forms" />
                  ) : (
                    <Image src={stagePhone} alt={stagePhoneAlt} width={390} height={844} sizes="203px" className={styles.phoneImage} />
                  )}
                </div>
                <span className={styles.phoneHome} aria-hidden="true" />
              </div>
            </div>
          ) : (
            <div className={styles.singlePhoneScale}>
              <div className={styles.singlePhone}>
                <span className={styles.singlePhoneTop} aria-hidden="true"><i /></span>
                <div className={styles.singlePhoneScreen}>
                  {liveDemo ? (
                    <iframe className={styles.singlePhoneFrame} src={demoUrl} width="390" height="844" title={`${name} 手机端实时 Demo`} sandbox="allow-scripts allow-same-origin allow-forms" />
                  ) : (
                    <Image src={selectedStep.phone} alt={selectedStep.phoneAlt} width={390} height={844} sizes="390px" className={styles.singlePhoneImage} priority />
                  )}
                </div>
                <span className={styles.singlePhoneHome} aria-hidden="true" />
              </div>
            </div>
          )}

          <button className={styles.liveToggle} type="button" aria-pressed={liveDemo} onClick={() => setLiveDemo((current) => !current)}>
            <i aria-hidden="true" />
            <span><small>{liveDemo ? 'RETURN TO' : 'CLICK TO TRY'}</small><strong>{liveDemo ? 'KEY VIEW' : 'LIVE DEMO'}</strong></span>
            <b aria-hidden="true">{liveDemo ? '←' : '→'}</b>
          </button>
          <div className={styles.productMarker} key={selectedStep.marker} aria-hidden="true"><span>{selectedStep.index}</span></div>
        </div>

        {deviceMode === 'phone' && <article className={styles.resultsCard}>
          <span>OUTCOME / 结果</span>
          <h2>{resultLead}<strong>{resultAccent}</strong></h2>
          <dl className={styles.metrics} aria-label="项目成果">
            {metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
          </dl>
        </article>}

        {deviceMode === 'phone' && <aside className={styles.storyPanel} aria-label="项目故事">
          <div className={styles.stepTabs} role="tablist" aria-label="切换项目故事章节">
            {storySteps.map((step, stepIndex) => (
              <button
                id={`${name}-step-${stepIndex}`}
                key={step.index}
                type="button"
                role="tab"
                aria-label={`${step.index} ${step.label} ${step.english}`}
                aria-selected={activeStep === stepIndex}
                aria-controls={`${name}-story-detail`}
                tabIndex={activeStep === stepIndex ? 0 : -1}
                onClick={() => setActiveStep(stepIndex)}
                onKeyDown={(event) => handleStepKeys(event, stepIndex)}
              ><span>{step.index}</span><strong>{step.label}</strong></button>
            ))}
          </div>
          <article className={styles.storyDetail} id={`${name}-story-detail`} role="tabpanel" aria-live="polite" key={selectedStep.index}>
            <span>{selectedStep.index} / {selectedStep.english}</span>
            <h2>{selectedStep.title}</h2>
            <p>{selectedStep.body}</p>
            <div className={styles.proofList}>
              {selectedStep.proof.map((proof, proofIndex) => <span key={proof}><i>0{proofIndex + 1}</i>{proof}</span>)}
            </div>
          </article>
        </aside>}
      </section>

      <footer className={styles.footer}>
        <div className={styles.progress} aria-label={`当前故事章节 ${activeStep + 1}，共 ${storySteps.length} 章`}>
          {storySteps.map((step, stepIndex) => (
            <button key={step.index} type="button" aria-label={`查看第 ${stepIndex + 1} 章：${step.label}`} aria-current={activeStep === stepIndex ? 'step' : undefined} onClick={() => setActiveStep(stepIndex)}><span /></button>
          ))}
        </div>
        <p>{workflow}</p>
        <div className={styles.footerLinks}>
          <a href={githubUrl} target="_blank" rel="noreferrer">GITHUB <ExternalArrow /></a>
          <a href={demoUrl} target="_blank" rel="noreferrer">FULL DEMO <ExternalArrow /></a>
        </div>
      </footer>
    </main>
  );
}
