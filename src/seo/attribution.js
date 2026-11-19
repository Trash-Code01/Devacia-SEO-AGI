import { createTouch, advanceAttribution, attributionEventParams } from './attribution-state.js';

const ATTRIBUTION_STORAGE_KEY = 'devacia_attribution';
const SESSION_STORAGE_KEY = 'devacia_attribution_session';
const memory = new WeakMap();

function cache() {
  if (!memory.has(window)) memory.set(window, {});
  return memory.get(window);
}

function readStorage(type, key) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window[type].getItem(key);
    const value = raw ? JSON.parse(raw) : null;
    if (value && typeof value === 'object' && !Array.isArray(value)) return value;
  } catch { /* Browser privacy settings must not interrupt enquiries. */ }
  return cache()[key] || null;
}

function writeStorage(type, key, value) {
  cache()[key] = value;
  try { window[type].setItem(key, JSON.stringify(value)); } catch { /* Keep in-memory attribution for this document. */ }
}

function readGaClientId() {
  try {
    const value = document.cookie.split('; ').find((entry) => entry.startsWith('_ga='))?.split('=').slice(1).join('=');
    const parts = value?.split('.');
    return parts?.length >= 4 ? `${parts[2]}.${parts[3]}` : undefined;
  } catch { return undefined; }
}

function detectMarket() {
  const pathname = window.location.pathname.toLowerCase();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const languages = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
  if (pathname.includes('/locations/india/') || ['Asia/Kolkata', 'Asia/Calcutta'].includes(timeZone) || languages.some((language) => /-IN$/i.test(language))) return 'india';
  if (pathname.includes('/locations/usa/') || languages.some((language) => /-US$/i.test(language))) return 'united_states';
  return 'international';
}

export function getStoredAttribution() {
  return readStorage('localStorage', ATTRIBUTION_STORAGE_KEY);
}

export function captureAttribution() {
  if (typeof window === 'undefined') return {};
  if (window.devaciaTrackingConsent !== 'granted') return {};
  const now = Date.now();
  const { attribution, session } = advanceAttribution({
    existing: getStoredAttribution() || {},
    session: readStorage('sessionStorage', SESSION_STORAGE_KEY),
    touch: createTouch({ href: window.location.href, referrer: document.referrer, now }),
    now,
    gaClientId: readGaClientId(),
    market: detectMarket(),
  });
  writeStorage('localStorage', ATTRIBUTION_STORAGE_KEY, attribution);
  writeStorage('sessionStorage', SESSION_STORAGE_KEY, session);
  return attribution;
}

export function getAttributionEventParams() {
  return attributionEventParams(captureAttribution());
}

export function buildLeadAttribution(eventContext = {}) {
  return { ...captureAttribution(), eventContext: { ...eventContext, recordedAt: new Date().toISOString() } };
}
