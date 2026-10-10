'use client';

import { useEffect, useReducer, useRef } from 'react';
import type { WorkProject } from '../content/work-showcase';
import { ClayExternalLink } from './works/_components/ClayExternalLink';
import { createWorkPreview, workPreviewReducer } from './work-preview-state';
import styles from './WorkPreview.module.css';

type WorkPreviewProps = {
  project: WorkProject;
  instant: boolean;
};

export function WorkPreview({ project, instant }: WorkPreviewProps) {
  const [state, dispatch] = useReducer(workPreviewReducer, project, createWorkPreview);
  const stageRef = useRef<HTMLElement>(null);

  // A prop change cancels an obsolete pending frame before the next paint.
  if (state.requestedId !== project.id) dispatch({ type: 'select', project });

  useEffect(() => {
    if (!state.pending) return;
    const key = state.pending.key;
    const frame = stageRef.current?.querySelector<HTMLIFrameElement>(`iframe[data-frame-key="${key}"]`);
    // An SSR iframe can finish before React attaches its load handler.
    try {
      if (frame?.contentDocument?.readyState === 'complete' && frame.contentDocument.URL === frame.src) {
        dispatch({ type: 'ready', key });
        return;
      }
    } catch { /* A navigated frame may no longer be same-origin. */ }
  }, [state.pending]);

  useEffect(() => {
    if (!state.leaving) return;
    const key = state.leaving.key;
    // A fallback also releases the old document in background tabs, where a
    // CSS transitionend event may never arrive.
    const timer = window.setTimeout(() => dispatch({ type: 'settled', key }), instant ? 0 : 280);
    return () => window.clearTimeout(timer);
  }, [state.leaving, instant]);

  useEffect(() => {
    const stage = stageRef.current;
    const visibleKey = state.visible?.key;
    if (!stage || visibleKey === undefined) return;
    const frame = stage.querySelector<HTMLIFrameElement>(`iframe[data-frame-key="${visibleKey}"]`);
    if (!frame) return;

    const mobile = window.matchMedia('(max-width: 1024px)');
    let observer: ResizeObserver | undefined;
    let animationFrame = 0;
    let disposed = false;

    function measure() {
      animationFrame = 0;
      if (disposed || !mobile.matches) return;
      try {
        const doc = frame!.contentDocument;
        if (!doc?.body) return;
        // Measure at a stable viewport height first. Otherwise a case's 100svh
        // minimum could keep an old, taller measurement after its content shrinks.
        frame!.style.height = `${Math.max(360, Math.min(window.innerHeight * .7, 620))}px`;
        let height = Math.ceil(Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight));
        stage!.style.setProperty('--work-preview-mobile-height', `${height}px`);
        frame!.style.removeProperty('height');
        // A few case details use clamped viewport units. Let those reach their
        // final size after expansion without leaving a small inner scrollbar.
        for (let pass = 0; pass < 3; pass += 1) {
          const expandedHeight = Math.ceil(Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight));
          if (expandedHeight <= height) break;
          height = expandedHeight;
          stage!.style.setProperty('--work-preview-mobile-height', `${height}px`);
        }
      } catch { /* Keep the regular viewport if an iframe navigates off-origin. */ }
      finally { frame!.style.removeProperty('height'); }
    }

    function scheduleMeasure() {
      if (!disposed && !animationFrame) animationFrame = window.requestAnimationFrame(measure);
    }

    function observeDocument() {
      observer?.disconnect();
      stage!.style.removeProperty('--work-preview-mobile-height');
      if (!mobile.matches || disposed) return;
      try {
        const doc = frame!.contentDocument;
        if (!doc?.body) return;
        observer = new ResizeObserver(scheduleMeasure);
        observer.observe(doc.body);
        observer.observe(doc.documentElement);
        // Content changes can occur inside a body whose minimum height stays fixed.
        for (const child of doc.body.children) observer.observe(child);
        for (const content of doc.querySelectorAll('main, main > section')) observer.observe(content);
        void doc.fonts.ready.then(scheduleMeasure);
        scheduleMeasure();
      } catch { /* External navigation keeps its own document and scrolling. */ }
    }

    observeDocument();
    mobile.addEventListener('change', observeDocument);
    frame.addEventListener('load', observeDocument);
    window.addEventListener('resize', scheduleMeasure);
    return () => {
      disposed = true;
      observer?.disconnect();
      window.cancelAnimationFrame(animationFrame);
      mobile.removeEventListener('change', observeDocument);
      frame.removeEventListener('load', observeDocument);
      window.removeEventListener('resize', scheduleMeasure);
      stage.style.removeProperty('--work-preview-mobile-height');
    };
  }, [state.visible?.key]);

  const loading = Boolean(state.pending);
  const shownProject = state.visible?.project ?? project;
  const frames = [state.leaving, state.visible, state.pending].filter((frame) => frame !== null);

  return (
    <article
      className={`work-feature-v3 work-feature-embed-v3 ${styles.stage}`}
      ref={stageRef}
      id="work-feature-stage"
      role="tabpanel"
      aria-labelledby={`work-tab-${project.id}`}
      aria-busy={loading}
      data-preview-project={state.visible?.project.id ?? ''}
      data-preview-pending={state.pending?.project.id ?? ''}
      data-instant={instant ? 'true' : 'false'}
    >
      <div className="work-embed-shell-v3">
        {shownProject.id !== 'more-builds' && (
          <nav
            className="work-embed-links-v3"
            aria-label={`${shownProject.title}外部链接`}
            inert={loading}
          >
            {shownProject.demoUrl && <ClayExternalLink kind="demo" href={shownProject.demoUrl} projectTitle={shownProject.title} cursorLabel="OPEN DEMO" />}
            {shownProject.githubUrl && <ClayExternalLink kind="github" href={shownProject.githubUrl} projectTitle={shownProject.title} cursorLabel="OPEN GITHUB" />}
          </nav>
        )}
        <div className="work-embed-viewport-v3">
          <div className={`work-embed-preview-v3 ${styles.preview}`}>
            {frames.map((frame) => {
              const visible = frame.key === state.visible?.key;
              return (
                <div
                  key={frame.key}
                  className={styles.layer}
                  data-visible={visible ? 'true' : 'false'}
                  data-project={frame.project.id}
                  aria-hidden={!visible || loading}
                  inert={!visible || loading}
                  onTransitionEnd={(event) => {
                    if (event.target === event.currentTarget && event.propertyName === 'opacity') {
                      dispatch({ type: 'settled', key: frame.key });
                    }
                  }}
                >
                  <iframe
                    className="work-embed-frame-v3"
                    data-frame-key={frame.key}
                    // Bypass cached redirects from the previous local server’s slash rule.
                    src={`${frame.project.caseHref}?embed=1&v=2026-09-06-one-screen`}
                    title={`${frame.project.title}完整作品展示`}
                    tabIndex={visible && !loading ? 0 : -1}
                    loading="eager"
                    allow="fullscreen"
                    onLoad={() => dispatch({ type: 'ready', key: frame.key })}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
