export const SITE_URL = 'https://www.devacia.com';
export const SITE_NAME = 'Devacia';
export const SITE_TAGLINE = 'High-Performance Websites, Custom Software & Growth Systems';
export const SITE_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  'Devacia builds high-performance websites, custom software, and connected growth systems for startups, ecommerce brands, and growing businesses across India, the United States, and select international markets.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og`;

const normalizePublicUrl = (value) => {
  const url = String(value || '').trim();
  return url || '';
};

const normalizeCoordinate = (value) => {
  const coordinate = Number(value);
  return Number.isFinite(coordinate) ? coordinate : undefined;
};

const PRAYAGRAJ_LATITUDE = normalizeCoordinate(
  process.env.NEXT_PUBLIC_DEVACIA_PRAYAGRAJ_LATITUDE,
);
const PRAYAGRAJ_LONGITUDE = normalizeCoordinate(
  process.env.NEXT_PUBLIC_DEVACIA_PRAYAGRAJ_LONGITUDE,
);

export const PRIMARY_EMAIL = 'hello@devacia.com';
export const PARTNERSHIPS_EMAIL = 'partnerships@devacia.com';
export const PRIMARY_PHONE = '+916306940734';
export const PRIMARY_PHONE_DISPLAY = '+91 63069 40734';
export const FOUNDED_AT = '2025-06';
export const SITE_UPDATED_AT = '2026-09-28T00:00:00.000Z';
export const FOUNDER_PATH = '/author/laraib-asjad';
export const PRIMARY_LOCATION_ID = 'prayagraj';

export const BUSINESS_HOURS = {
  display: 'Monday to Friday, 9:00 AM to 6:00 PM IST',
  openingHours: [
    {
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
};

export const PUBLIC_EMAILS = [
  'hello@devacia.com',
  'contact@devacia.com',
  'support@devacia.com',
  'laraib@devacia.com',
  'growth@devacia.com',
  'founder@devacia.com',
  'partnerships@devacia.com',
  'collabs@devacia.com',
  'team@devacia.com',
  'projects@devacia.com',
  'billing@devacia.com',
];

export const FOUNDER = {
  name: 'Laraib Asjad',
  jobTitle: 'Founder',
  email: 'laraib@devacia.com',
  path: FOUNDER_PATH,
  description:
    'Founder at Devacia. Laraib writes about the website, funnel, and systems problems that actually block growth for startups, ecommerce brands, and service businesses.',
  sameAs: ['https://www.linkedin.com/in/laraib-asjad/'],
};

export const KNOWN_LOCATIONS = [
  {
    id: 'prayagraj',
    type: 'head-office',
    label: 'Prayagraj head office',
    streetAddress: '22/2N Rehmat Nagar, Kareli',
    addressLocality: 'Prayagraj',
    addressRegion: 'Uttar Pradesh',
    postalCode: '211016',
    addressCountry: 'IN',
    mapQuery: '22/2N Rehmat Nagar, Kareli, Prayagraj, Uttar Pradesh 211016, India',
    geo:
      PRAYAGRAJ_LATITUDE !== undefined && PRAYAGRAJ_LONGITUDE !== undefined
        ? {
            latitude: PRAYAGRAJ_LATITUDE,
            longitude: PRAYAGRAJ_LONGITUDE,
          }
        : undefined,
    areaServed: ['Prayagraj', 'Uttar Pradesh', 'India'],
  },
  {
    id: 'delhi',
    type: 'service-area',
    label: 'Delhi service area',
    addressLocality: 'Delhi',
    addressRegion: 'Delhi',
    addressCountry: 'IN',
    areaServed: ['Delhi', 'India'],
  },
  {
    id: 'lucknow',
    type: 'service-area',
    label: 'Lucknow service area',
    addressLocality: 'Lucknow',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
    areaServed: ['Lucknow', 'India'],
  },
  {
    id: 'bangalore',
    type: 'service-area',
    label: 'Bangalore service area',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
    areaServed: ['Bangalore', 'Karnataka', 'India'],
  },
  {
    id: 'mumbai',
    type: 'service-area',
    label: 'Mumbai service area',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
    areaServed: ['Mumbai', 'Maharashtra', 'India'],
  },
];

export const SERVICE_AREAS = ['India', 'United States'];

export const COMPANY_PROFILE_URLS = {
  linkedin: 'https://www.linkedin.com/company/devacia',
  instagram: 'https://www.instagram.com/devaciaofficial/',
  clutch: 'https://clutch.co/profile/devacia',
  goodFirms: normalizePublicUrl(process.env.NEXT_PUBLIC_DEVACIA_GOODFIRMS_URL),
  googleBusinessProfile: normalizePublicUrl(
    process.env.NEXT_PUBLIC_DEVACIA_GOOGLE_BUSINESS_PROFILE_URL,
  ),
  facebook: normalizePublicUrl(process.env.NEXT_PUBLIC_DEVACIA_FACEBOOK_URL),
  bingPlaces: normalizePublicUrl(process.env.NEXT_PUBLIC_DEVACIA_BING_PLACES_URL),
  appleBusinessConnect: normalizePublicUrl(
    process.env.NEXT_PUBLIC_DEVACIA_APPLE_BUSINESS_CONNECT_URL,
  ),
};

export const COMPANY_PROFILE_LINKS = [
  { key: 'linkedin', label: 'LinkedIn', url: COMPANY_PROFILE_URLS.linkedin },
  { key: 'instagram', label: 'Instagram', url: COMPANY_PROFILE_URLS.instagram },
  { key: 'clutch', label: 'Clutch', url: COMPANY_PROFILE_URLS.clutch },
  { key: 'goodFirms', label: 'GoodFirms', url: COMPANY_PROFILE_URLS.goodFirms },
  {
    key: 'googleBusinessProfile',
    label: 'Google Business Profile',
    url: COMPANY_PROFILE_URLS.googleBusinessProfile,
  },
  { key: 'facebook', label: 'Facebook', url: COMPANY_PROFILE_URLS.facebook },
  { key: 'bingPlaces', label: 'Bing Places', url: COMPANY_PROFILE_URLS.bingPlaces },
  {
    key: 'appleBusinessConnect',
    label: 'Apple Business Connect',
    url: COMPANY_PROFILE_URLS.appleBusinessConnect,
  },
].filter((profile) => profile.url);

export const ORGANIZATION_SAME_AS = COMPANY_PROFILE_LINKS.map((profile) => profile.url);

export const DISCOVERY_TOPICS = [
  'web development agency',
  'website development company',
  'website development agency for startups',
  'wordpress development',
  'shopify development',
  'custom web development',
  'custom software development',
  'landing page design',
  'lead generation websites',
  'conversion rate optimization',
  'ecommerce conversion rescue',
  'custom booking systems',
  'clinic website lead generation',
  'startup MVP development',
  'SaaS development',
  'business automation systems',
  'website support and maintenance',
  'lead management systems',
  'booking systems',
  'performance marketing',
  'meta ads',
  'google ads',
  'whatsapp automation',
  'website is broken',
  'website is down',
  'website is slow',
  'website not driving leads',
  'website traffic is going down',
  'website not converting',
  'website is not driving ROI',
  'website is not showing up on Google',
  'how to choose a web development agency',
  'agency is not driving results',
];

export const CORE_SERVICES = [
  {
    name: 'Website Development',
    description:
      'High-performance websites for brands, startups, and growing businesses across WordPress, Shopify, and custom builds.',
  },
  {
    name: 'WordPress Development',
    description:
      'WordPress websites built for speed, clarity, lead generation, and easier day-to-day management.',
  },
  {
    name: 'Shopify Development',
    description:
      'Shopify stores and ecommerce builds designed for trust, conversion, and smoother customer journeys.',
  },
  {
    name: 'Custom Web Development',
    description:
      'Custom-coded web builds for businesses that need performance, flexibility, and long-term scalability.',
  },
  {
    name: 'Custom Software Development',
    description:
      'Business software, admin panels, CRM workflows, and semi-SaaS systems built around real operational needs.',
  },
  {
    name: 'Landing Page Design',
    description:
      'Conversion-focused landing pages for lead generation, ecommerce campaigns, and launch funnels.',
  },
  {
    name: 'Lead Generation Websites',
    description:
      'Lead-generation websites designed to turn search, ads, and referrals into qualified calls, forms, and booked conversations.',
  },
  {
    name: 'Conversion Rate Optimization',
    description:
      'Conversion-focused improvements across websites, landing pages, and storefront journeys to increase lead and sales action.',
  },
  {
    name: 'Business Automation Systems',
    description:
      'Lead routing, booking workflows, dashboards, and website-connected operational automation.',
  },
  {
    name: 'Lead Management and Booking Systems',
    description:
      'Lead handling, qualification, booking, and operational workflows connected to the website and business process.',
  },
  {
    name: 'Startup MVP Development',
    description:
      'End-to-end startup and product development for teams that need a serious first version built to scale.',
  },
  {
    name: 'Website Support and Maintenance',
    description:
      'Stability, cleanup, performance support, and practical maintenance for websites that are broken, slow, or underperforming.',
  },
  {
    name: 'Performance Marketing',
    description:
      'Meta Ads, Google Ads, WhatsApp automation, and connected funnel management for brands that need growth systems, not isolated campaigns.',
  },
];

export function getKnownLocationById(locationId) {
  return KNOWN_LOCATIONS.find((location) => location.id === locationId) ?? null;
}

export function getLocationMapUrl(locationId = PRIMARY_LOCATION_ID) {
  const location = getKnownLocationById(locationId);

  if (!location?.mapQuery) {
    return '';
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`;
}

export function absoluteUrl(path = '/') {
  if (!path || path === '/') {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
