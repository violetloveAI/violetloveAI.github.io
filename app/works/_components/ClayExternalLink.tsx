import styles from './clay-external-link.module.css';

type ClayExternalLinkProps = {
  kind: 'demo' | 'github';
  href: string;
  projectTitle: string;
  compact?: boolean;
  cursorLabel?: string;
};

function DemoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8.5 6.7v10.6L17 12 8.5 6.7Z" fill="currentColor" />
    </svg>
  );
}

function RepositoryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="8" cy="7" r="2.1" />
      <circle cx="16" cy="17" r="2.1" />
      <path d="M8 9.1v3.2a4.7 4.7 0 0 0 4.7 4.7h1.2M16 14.9V9" />
    </svg>
  );
}

export function ClayExternalLink({
  kind,
  href,
  projectTitle,
  compact = false,
  cursorLabel,
}: ClayExternalLinkProps) {
  const isDemo = kind === 'demo';
  const label = isDemo ? '打开 Demo' : '打开 GitHub';

  return (
    <a
      className={`${styles.button} ${styles[kind]} ${compact ? styles.compact : ''}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`在新标签页${label}：${projectTitle}`}
      data-cursor-label={cursorLabel}
    >
      <span className={styles.icon}>{isDemo ? <DemoIcon /> : <RepositoryIcon />}</span>
      <span className={styles.label}>{label}</span>
      <span className={styles.arrow} aria-hidden="true">↗</span>
    </a>
  );
}
