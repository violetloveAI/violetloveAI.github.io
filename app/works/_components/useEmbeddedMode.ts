'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener('popstate', onStoreChange);
  return () => window.removeEventListener('popstate', onStoreChange);
};

const getSnapshot = () => new URLSearchParams(window.location.search).get('embed') === '1';
const getServerSnapshot = () => false;

export function useEmbeddedMode(defaultValue = false) {
  const embeddedFromQuery = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return defaultValue || embeddedFromQuery;
}
