'use client';

import { LiquidCursor } from '../../LiquidCursor';

export function CaseCursor({ embedded = false }: { embedded?: boolean }) {
  return (
    <>
      {embedded ? <style>{'html, body { background: transparent !important; }'}</style> : null}
      {!embedded && <LiquidCursor />}
    </>
  );
}
