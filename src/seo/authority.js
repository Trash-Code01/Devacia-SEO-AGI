import {
  COMPANY_PROFILE_LINKS,
  PRIMARY_LOCATION_ID,
  getKnownLocationById,
  getLocationMapUrl,
} from './site';

function getCompanyProfileByKey(key) {
  return COMPANY_PROFILE_LINKS.find((profile) => profile.key === key) ?? null;
}

function buildProfileLink(key, description) {
  const profile = getCompanyProfileByKey(key);

  if (!profile) {
    return null;
  }

  return {
    label: profile.label,
    href: profile.url,
    description,
  };
}

export function getFooterAuthorityLinks() {
  const location = getKnownLocationById(PRIMARY_LOCATION_ID);
  const mapUrl = getLocationMapUrl(PRIMARY_LOCATION_ID);

  return [
    {
      label: 'About Devacia',
      href: '/about',
      description: 'Company information, founder background and public references.',
    },
    location
      ? {
          label: `${location.addressLocality} office page`,
          href: '/locations/india/prayagraj/web-development-company',
          description: 'Local office page with NAP, business hours, service links, and review paths.',
        }
      : null,
    mapUrl
      ? {
          label: 'Google Maps reference',
          href: mapUrl,
          description: 'Search Google Maps for the address published on our Prayagraj page.',
        }
      : null,
    buildProfileLink(
      'googleBusinessProfile',
      'Primary local listing for reviews, office details, business hours, and local trust.',
    ),
    buildProfileLink(
      'clutch',
      'Independent company profile supporting service credibility and buyer research.',
    ),
  ].filter(Boolean);
}

export function getContactAuthorityLinks() {
  const location = getKnownLocationById(PRIMARY_LOCATION_ID);
  const mapUrl = getLocationMapUrl(PRIMARY_LOCATION_ID);

  return [
    {
      label: 'About Devacia',
      href: '/about',
      description: 'Use this page when you want the clearest summary of who Devacia is and how the company is represented publicly.',
    },
    {
      label: 'Case studies',
      href: '/case-study',
      description: 'Proof-led project examples for buyers comparing service quality and business fit.',
    },
    location
      ? {
          label: `${location.addressLocality} office page`,
          href: '/locations/india/prayagraj/web-development-company',
          description: 'Verified local office page with NAP, map, review CTA, and commercial service paths.',
        }
      : null,
    mapUrl
      ? {
          label: 'Google Maps reference',
          href: mapUrl,
          description: 'Open the Prayagraj head office map result buyers can use to validate the business.',
        }
      : null,
    buildProfileLink(
      'googleBusinessProfile',
      'Google-facing business profile for office corroboration, business hours, and local review actions.',
    ),
    buildProfileLink(
      'clutch',
      'Independent buyer platform profile for company validation and service proof.',
    ),
    buildProfileLink(
      'goodFirms',
      'Third-party directory signal that supports brand consistency across trusted business listings.',
    ),
    buildProfileLink(
      'linkedin',
      'Official company LinkedIn profile used as a branded corroboration point for the business.',
    ),
  ].filter(Boolean);
}

export function getEntityAuthorityLinks() {
  const location = getKnownLocationById(PRIMARY_LOCATION_ID);
  const mapUrl = getLocationMapUrl(PRIMARY_LOCATION_ID);

  return [
    location
      ? {
          label: `${location.addressLocality} office page`,
          href: '/locations/india/prayagraj/web-development-company',
          description: 'The only location page that carries the full office details and LocalBusiness markup in phase 1.',
        }
      : null,
    mapUrl
      ? {
          label: 'Google Maps reference',
          href: mapUrl,
          description: 'Map search result for the verified head office address used in the local entity layer.',
        }
      : null,
    buildProfileLink(
      'googleBusinessProfile',
      'Primary local-business corroboration point for business details, reviews, and discovery actions.',
    ),
    buildProfileLink(
      'clutch',
      'Third-party service profile that supports brand, service, and trust consistency.',
    ),
    buildProfileLink(
      'goodFirms',
      'External directory proof reinforcing the business identity and offering category signals.',
    ),
    buildProfileLink(
      'linkedin',
      'Official company identity reference used for brand recognition and entity corroboration.',
    ),
    buildProfileLink(
      'instagram',
      'Official social profile that can reinforce brand consistency and support social-to-search discovery.',
    ),
  ].filter(Boolean);
}

export function getPrayagrajAuthorityLinks() {
  const location = getKnownLocationById(PRIMARY_LOCATION_ID);
  const mapUrl = getLocationMapUrl(PRIMARY_LOCATION_ID);

  return [
    {
      label: 'About Devacia',
      href: '/about',
      description: 'Canonical company entity page that explains brand facts, founder proof, and service positioning.',
    },
    location
      ? {
          label: `${location.addressLocality} office page`,
          href: '/locations/india/prayagraj/web-development-company',
          description: 'Internal local authority page aligned with the verified office location.',
        }
      : null,
    mapUrl
      ? {
          label: 'Google Maps reference',
          href: mapUrl,
          description: 'Direct map-search reference for validating the head office location.',
        }
      : null,
    {
      label: 'Civil Lines Digital Marketing & Local SEO Hub',
      href: '/locations/india/prayagraj/civil-lines-digital-marketing',
      description: 'Local student lead generation and digital marketing agency hub in Civil Lines, Prayagraj.',
    },
    buildProfileLink(
      'googleBusinessProfile',
      'Best review and local-action destination for searchers validating the Prayagraj business presence.',
    ),
    buildProfileLink(
      'clutch',
      'Independent service proof page supporting buyer confidence beyond the website itself.',
    ),
    buildProfileLink(
      'goodFirms',
      'Additional citation and service corroboration source for local and commercial trust.',
    ),
  ].filter(Boolean);
}

export function getDelhiAuthorityLinks() {
  const location = getKnownLocationById(PRIMARY_LOCATION_ID);

  return [
    {
      label: 'About Devacia & Entity Proof',
      href: '/about',
      description: 'Official company background, founder credentials, and verified client case studies.',
    },
    {
      label: 'Gurgaon Performance Marketing & Dev Hub',
      href: '/locations/india/delhi/gurgaon-performance-marketing',
      description: 'Dedicated NCR landing page for high-growth tech startups and venture-backed teams.',
    },
    {
      label: 'Website Development Cost Guide',
      href: '/pricing/website-development-cost-india',
      description: 'Transparent pricing breakdown for custom React, Next.js, and Shopify engineering.',
    },
    location
      ? {
          label: `${location.addressLocality} Head Office`,
          href: '/locations/india/prayagraj/web-development-company',
          description: 'Official company headquarters and primary operational base.',
        }
      : null,
    buildProfileLink(
      'clutch',
      'Independent B2B agency review and verified project ratings on Clutch.',
    ),
    buildProfileLink(
      'linkedin',
      'Corporate LinkedIn profile with verified team, founder, and company updates.',
    ),
  ].filter(Boolean);
}

export function getBangaloreAuthorityLinks() {
  const location = getKnownLocationById(PRIMARY_LOCATION_ID);

  return [
    {
      label: 'About Devacia',
      href: '/about',
      description: 'Canonical brand entity, engineering standards, and founder credentials.',
    },
    {
      label: 'Custom Software & SaaS MVP Development',
      href: '/services/custom-software-development',
      description: '0-to-1 rapid engineering for VC-funded startups and early-stage SaaS ventures.',
    },
    {
      label: 'Shopify Plus & Next.js Architecture',
      href: '/services/ecommerce-website-development',
      description: 'High-conversion headless storefronts engineered for sub-second page loads.',
    },
    location
      ? {
          label: `${location.addressLocality} Head Office`,
          href: '/locations/india/prayagraj/web-development-company',
          description: 'Primary verified company headquarters and engineering hub.',
        }
      : null,
    buildProfileLink(
      'clutch',
      'Verified client reviews and independent agency rating on Clutch.',
    ),
  ].filter(Boolean);
}

export function getMumbaiAuthorityLinks() {
  const location = getKnownLocationById(PRIMARY_LOCATION_ID);

  return [
    {
      label: 'About Devacia & Entity Proof',
      href: '/about',
      description: 'Canonical company background, founder credentials, and verified client case studies.',
    },
    {
      label: 'Ecommerce & D2C Storefront Engineering',
      href: '/services/ecommerce-website-development',
      description: 'High-throughput retail catalogs, checkout optimization, and Shopify/WooCommerce builds.',
    },
    {
      label: 'WordPress & CMS Architecture',
      href: '/services/wordpress-development',
      description: 'Fast, secure WordPress setups for distributors, media firms, and corporate teams.',
    },
    {
      label: 'India Website Development Cost Guide',
      href: '/pricing/website-development-cost-india',
      description: 'Transparent pricing breakdown for custom React, Next.js, and ecommerce engineering.',
    },
    location
      ? {
          label: `${location.addressLocality} Head Office`,
          href: '/locations/india/prayagraj/web-development-company',
          description: 'Primary verified company headquarters and remote delivery engineering base.',
        }
      : null,
    buildProfileLink(
      'clutch',
      'Verified client reviews and independent agency rating on Clutch.',
    ),
  ].filter(Boolean);
}

