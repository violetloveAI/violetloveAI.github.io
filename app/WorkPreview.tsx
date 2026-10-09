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
