'use client';

import { useState } from 'react';
import Image from 'next/image';
import { fdeHackathons } from '../content/fde-hackathons';
import type { CareerLightboxImage } from './CareerImageLightbox';
import styles from './FdeHackathonCases.module.css';

export function FdeHackathonCases({ onOpenImage }: { onOpenImage: (image: CareerLightboxImage) => void }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const project = fdeHackathons[caseIndex];
  const picture = project.images[imageIndex];
  const photoPlaceholder = 'photoPlaceholder' in project ? project.photoPlaceholder : null;

  const selectCase = (index: number) => {
    setCaseIndex(index);
    setImageIndex(0);
  };

  return (
    <div className={styles.root}>
      <div className={styles.tabs} role="tablist" aria-label="选择黑客松项目">
        {fdeHackathons.map((item, index) => (
          <button
            type="button" role="tab" key={item.id}
            id={`fde-case-tab-${item.id}`} aria-selected={index === caseIndex}
            aria-controls="fde-case-panel" tabIndex={index === caseIndex ? 0 : -1}
            onClick={() => selectCase(index)}
            onKeyDown={(event) => {
              if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
              event.preventDefault();
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? fdeHackathons.length - 1
                : (index + (event.key === 'ArrowRight' ? 1 : -1) + fdeHackathons.length) % fdeHackathons.length;
              const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
              tabs?.[next]?.focus();
              selectCase(next);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className={styles.panel} id="fde-case-panel" role="tabpanel" aria-labelledby={`fde-case-tab-${project.id}`}>
        <div className={`career-mission-copy ${styles.copy}`}>
          <h4>{project.title}</h4>
          <p>{project.summary}</p>
          <ul>{project.proof.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className={`career-mission-media-group ${styles.media}`}>
          {photoPlaceholder ? (
            <>
              <figure className={`career-mission-media ${styles.placeholder}`} aria-label={`${project.name}：${photoPlaceholder}`}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="3" />
                  <circle cx="8" cy="9" r="1.5" />
                  <path d="m4 17 5-5 4 4 3-3 5 5" />
                </svg>
                <span>{photoPlaceholder}</span>
              </figure>
              <a className="career-media-expand" href={project.href}>查看作品 <span aria-hidden="true">↗</span></a>
            </>
          ) : (<>
          <figure className="career-mission-media is-gallery">
            <button
              type="button" className="career-media-switcher"
              onClick={() => setImageIndex((imageIndex + 1) % project.images.length)}
              aria-label={`切换到下一张${project.name}图片；当前第 ${imageIndex + 1} 张，共 ${project.images.length} 张`}
            >
              <Image src={picture.src} alt={picture.alt} fill sizes="(max-width: 800px) 100vw, 300px" style={{ objectFit: 'contain' }} loading="lazy" unoptimized />
            </button>
            <span className="career-media-status" aria-hidden="true">{imageIndex + 1} / {project.images.length} · 点击图片切换</span>
            <nav className="career-media-pages" aria-label={`${project.name}图片页码`}>
              {project.images.map((item, index) => (
                <button
                  key={item.src} type="button" className={imageIndex === index ? 'is-active' : ''}
                  aria-label={`查看第 ${index + 1} 张：${item.label}`} aria-current={imageIndex === index ? 'true' : undefined}
                  onClick={() => setImageIndex(index)}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </nav>
            <figcaption>{picture.label}</figcaption>
          </figure>
          <button type="button" className="career-media-expand" onClick={() => onOpenImage(picture)} aria-label={`查看大图：${picture.label}`} aria-haspopup="dialog">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
            </svg>
            查看大图
          </button>
          </>)}
        </div>
      </div>
    </div>
  );
}
