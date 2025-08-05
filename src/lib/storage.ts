/**
 * SSR-safe localStorage helpers
 */
export const isBrowser = typeof window !== 'undefined';

const KEY_PREFIX = 'learnpy::';

function k(key: string) {
  return `${KEY_PREFIX}${key}`;
}

export function getJSON<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(k(key));
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setJSON(key: string, value: unknown) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(k(key), JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

export function getNumber(key: string, fallback = 0) {
  if (!isBrowser) return fallback;
  const raw = window.localStorage.getItem(k(key));
  const n = raw !== null ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

export function setNumber(key: string, value: number) {
  if (!isBrowser) return;
  window.localStorage.setItem(k(key), String(value));
}

export function remove(key: string) {
  if (!isBrowser) return;
  window.localStorage.removeItem(k(key));
}
