'use client';

import { useEffect, useId, useRef, useState } from 'react';
import styles from './LifeImageViewer.module.css';

export type LifeFullImage = {
  src: string;
  alt: string;
  label?: string;
  width?: number;
  height?: number;
};

export function LifeImageViewer({ image, onClose }: {
  image: LifeFullImage | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const labelId = useId();
  const hintId = useId();
  const [view, setView] = useState({ src: '', original: false });
  const isOpen = image !== null;
  const original = image !== null && view.src === image.src && view.original;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [isOpen]);

  function close() {
    setView({ src: '', original: false });
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={labelId}
      aria-describedby={hintId}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      {image && (
        <>
          <header className={styles.toolbar}>
            <div className={styles.description}>
              <p id={labelId} className={styles.label}>{image.label || image.alt || '查看原图'}</p>
              <p id={hintId} className={styles.hint}>
                {original ? '原始尺寸 · 可横向、纵向滚动查看' : '完整原图 · 保留原始比例'}
              </p>
            </div>
            <button
              type="button"
              className={styles.mode}
              aria-pressed={original}
              onClick={() => {
                setView({ src: image.src, original: !original });
                viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
            >
              {original ? '适应屏幕' : '原始尺寸'}
            </button>
            <button ref={closeRef} type="button" className={styles.close} onClick={close} aria-label="关闭原图">
              <span aria-hidden="true">×</span>
            </button>
          </header>
          <div ref={viewportRef} className={styles.viewport} data-original={original}>
            <div
              className={styles.canvas}
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              {/* The original asset must remain available at its native pixel dimensions without image optimization. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.image}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                draggable={false}
                decoding="async"
              />
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
