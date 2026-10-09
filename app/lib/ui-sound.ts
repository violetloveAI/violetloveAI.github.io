export type UISoundKind = 'select' | 'open' | 'success';

export const UI_SOUND_EVENT = 'violet-ui-sound';

/** Success belongs after the completed action (for example, after clipboard.writeText resolves). */
export function playUISound(kind: UISoundKind) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(UI_SOUND_EVENT, { detail: { kind } }));
}
