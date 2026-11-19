export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
export const CAMPAIGN_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
const touchKeys = [...CAMPAIGN_KEYS, 'landing_page', 'referrer', 'captured_at', 'source', 'medium'];

export function cleanTouch(value = {}) {
  return Object.fromEntries(touchKeys.flatMap((key) => {
    const text = typeof value?.[key] === 'string' ? value[key].trim().slice(0, 500) : '';
    return text ? [[key, text]] : [];
  }));
}

export function createTouch({ href, referrer = '', now = Date.now() }) {
  const url = new URL(href);
  const campaign = Object.fromEntries(CAMPAIGN_KEYS.flatMap((key) => {
    const value = url.searchParams.get(key)?.trim().slice(0, 200);
    return value ? [[key, value]] : [];
  }));
  let external;
  try {
    const candidate = new URL(referrer);
    const host = (value) => value.toLowerCase().replace(/^www\./, '');
    if (['http:', 'https:'].includes(candidate.protocol) && host(candidate.hostname) !== host(url.hostname)) external = candidate;
  } catch { /* Missing or invalid referrers are direct visits. */ }
  const searchHost = external?.hostname.replace(/^www\./, '') || '';
  const searchEngine = /^(?:[\w-]+\.)?google\.[a-z.]+$/.test(searchHost) ? 'google'
    : /^(?:[\w-]+\.)?bing\.com$/.test(searchHost) ? 'bing'
      : /^(?:[\w-]+\.)?duckduckgo\.com$/.test(searchHost) ? 'duckduckgo'
        : /^(?:[\w-]+\.)?search\.yahoo\.[a-z.]+$/.test(searchHost) ? 'yahoo' : null;
  const source = campaign.utm_source || (campaign.gclid ? 'google' : searchEngine || external?.hostname || (campaign.fbclid ? 'facebook' : '(direct)'));
  const medium = campaign.utm_medium || (campaign.gclid ? 'cpc' : searchEngine ? 'organic' : external || campaign.fbclid ? 'referral' : campaign.utm_source ? '(not set)' : '(none)');
  return cleanTouch({ ...campaign, landing_page: url.pathname, referrer: external?.origin, captured_at: new Date(now).toISOString(), source, medium });
}

export function advanceAttribution({ existing = {}, session, touch, now = Date.now(), gaClientId, market }) {
  const clean = cleanTouch(touch);
  const currentSession = session && typeof session.touch?.landing_page === 'string' && session.touch.landing_page && Number.isFinite(session.lastSeen) && now - session.lastSeen < SESSION_TIMEOUT_MS && now >= session.lastSeen;
  const campaignSignature = (value) => JSON.stringify(CAMPAIGN_KEYS.map((key) => value?.[key] || ''));
  const changedCampaign = CAMPAIGN_KEYS.some((key) => clean[key]) && campaignSignature(clean) !== campaignSignature(session?.touch);
  const newSession = !currentSession || changedCampaign;
  const sessionTouch = newSession ? clean : cleanTouch(session.touch);
  const previousFirst = cleanTouch(existing.firstTouch);
  const firstTouch = previousFirst.landing_page ? previousFirst : sessionTouch;
  const lastNonDirectTouch = sessionTouch.source !== '(direct)'
    ? sessionTouch
    : cleanTouch(existing.lastNonDirectTouch || (existing.latestTouch?.source && existing.latestTouch.source !== '(direct)' ? existing.latestTouch : {}));
  return {
    attribution: {
      version: 2,
      firstTouch,
      latestTouch: sessionTouch,
      lastNonDirectTouch,
      ...(gaClientId || existing.gaClientId ? { gaClientId: gaClientId || existing.gaClientId } : {}),
      market: market || existing.market || 'international',
    },
    session: { touch: sessionTouch, startedAt: newSession ? now : session.startedAt, lastSeen: now },
  };
}

export function attributionEventParams(attribution = {}) {
  // Select one complete touch; never combine campaign fields from different visits.
  const touch = cleanTouch(attribution.latestTouch || attribution.firstTouch);
  return {
    ...Object.fromEntries(CAMPAIGN_KEYS.map((key) => [key, touch[key] || ''])),
    landing_page: touch.landing_page || '',
    referrer: touch.referrer || '',
    source: touch.source || '(direct)',
    medium: touch.medium || '(none)',
    ga_client_id: attribution.gaClientId || '',
    market: attribution.market || 'international',
  };
}
