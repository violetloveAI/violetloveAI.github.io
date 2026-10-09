import styles from './project-highlights.module.css';

export function ProjectHighlights({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.highlights} aria-label="项目亮点">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}
