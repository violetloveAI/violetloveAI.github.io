'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './CareerImageLightbox.module.css';

export type CareerLightboxImage = {
  src: string;
  alt: string;
  label: string;
};

export function CareerImageLightbox({ image, onClose }: {
  image: CareerLightboxImage | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!image || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [image]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="career-lightbox-label"
      aria-describedby="career-lightbox-hint"
      onClick={onClose}
      onCancel={onClose}
    >
      {image && (
        <>
          <div className={styles.picture}>
            <Image src={image.src} alt={image.alt} fill sizes="100vw" style={{ objectFit: 'contain' }} unoptimized />
          </div>
          <div className={styles.caption}>
            <p id="career-lightbox-label">{image.label}</p>
            <p id="career-lightbox-hint">点击任意位置关闭 · Esc 也可关闭</p>
          </div>
          <button className={styles.close} type="button" aria-label="关闭大图">
            <span aria-hidden="true">×</span>
          </button>
        </>
      )}
    </dialog>
  );
}
