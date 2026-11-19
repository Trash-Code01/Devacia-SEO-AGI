import {
  BUSINESS_HOURS,
  CORE_SERVICES,
  DEFAULT_OG_IMAGE,
  DISCOVERY_TOPICS,
  FOUNDED_AT,
  FOUNDER,
  KNOWN_LOCATIONS,
  ORGANIZATION_SAME_AS,
  PRIMARY_EMAIL,
  PRIMARY_LOCATION_ID,
  PRIMARY_PHONE,
  SERVICE_AREAS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  getKnownLocationById,
} from './site';

export const ORGANIZATION_ID = absoluteUrl('/#organization');
export const WEBSITE_ID = absoluteUrl('/#website');
export const FOUNDER_ID = absoluteUrl('/#founder');

function toPostalAddress(location) {
  const address = {
    '@type': 'PostalAddress',
    addressCountry: location.addressCountry,
  };

  if (location.streetAddress) address.streetAddress = location.streetAddress;
  if (location.addressLocality) address.addressLocality = location.addressLocality;
  if (location.addressRegion) address.addressRegion = location.addressRegion;
  if (location.postalCode) address.postalCode = location.postalCode;

  return address;
}

function toAreaServed(areas = SERVICE_AREAS) {
  return areas.map((area) => ({
    '@type': 'Place',
    name: area,
  }));
}

function toOpeningHoursSpecification(openingHours = BUSINESS_HOURS.openingHours) {
  return openingHours
    .filter(
      (window) =>
        Array.isArray(window?.daysOfWeek) &&
        window.daysOfWeek.length > 0 &&
        window.opens &&
        window.closes,
    )
    .map((window) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: window.daysOfWeek.map((day) => `https://schema.org/${day}`),
      opens: window.opens,
      closes: window.closes,
    }));
}

function toOfferCatalogItems(services = CORE_SERVICES) {
  return services.map((service) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: service.name,
      description: service.description,
    },
  }));
}

export function createFounderSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: FOUNDER.name,
    jobTitle: FOUNDER.jobTitle,
    description: FOUNDER.description,
    url: absoluteUrl(FOUNDER.path),
    email: FOUNDER.email,
    sameAs: FOUNDER.sameAs,
    worksFor: {
      '@id': ORGANIZATION_ID,
    },
    knowsAbout: DISCOVERY_TOPICS,
  };
}

export function createOrganizationSchema() {
  const primaryOffice =
    getKnownLocationById(PRIMARY_LOCATION_ID) ??
    KNOWN_LOCATIONS.find((location) => location.type === 'head-office') ??
    KNOWN_LOCATIONS.find((location) => location.type === 'office');

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    foundingDate: FOUNDED_AT,
    description: SITE_DESCRIPTION,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo-clean.png'),
    },
    image: absoluteUrl('/logo-clean.png'),
    founder: {
      '@id': FOUNDER_ID,
    },
    email: PRIMARY_EMAIL,
    telephone: PRIMARY_PHONE,
    sameAs: ORGANIZATION_SAME_AS,
    knowsAbout: DISCOVERY_TOPICS,
    address: primaryOffice ? toPostalAddress(primaryOffice) : undefined,
    location: KNOWN_LOCATIONS.filter(
      (location) => location.type === 'head-office' || location.type === 'office',
    ).map((location) => ({
      '@type': 'Place',
      name: location.label,
      address: toPostalAddress(location),
    })),
    areaServed: toAreaServed(),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: PRIMARY_EMAIL,
        telephone: PRIMARY_PHONE,
        areaServed: SERVICE_AREAS,
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Devacia Services',
      itemListElement: toOfferCatalogItems(),
    },
  };
}

export function createWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: {
      '@id': ORGANIZATION_ID,
    },
    about: {
      '@id': ORGANIZATION_ID,
    },
    inLanguage: 'en-IN',
  };
}

export function createProfessionalServiceSchema({
  path = '/',
  name = SITE_NAME,
  description = SITE_DESCRIPTION,
  services = CORE_SERVICES,
  areaServed = SERVICE_AREAS,
  knowsLanguage = ['English'],
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${absoluteUrl(path)}#professional-service`,
    name,
    url: absoluteUrl(path),
    description,
    provider: {
      '@id': ORGANIZATION_ID,
    },
    email: PRIMARY_EMAIL,
    telephone: PRIMARY_PHONE,
    areaServed: toAreaServed(areaServed),
    knowsLanguage,
    knowsAbout: DISCOVERY_TOPICS,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${SITE_NAME} Services`,
      itemListElement: toOfferCatalogItems(services),
    },
  };
}

export function createLocalBusinessSchema({
  path = '/',
  name = SITE_NAME,
  description = SITE_DESCRIPTION,
  locationId = PRIMARY_LOCATION_ID,
  openingHours = BUSINESS_HOURS.openingHours,
  geo,
  sameAs = ORGANIZATION_SAME_AS,
  knowsLanguage = ['English'],
} = {}) {
  const location = getKnownLocationById(locationId);
  const resolvedGeo = geo ?? location?.geo;
  const mapUrl = location?.mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${absoluteUrl(path)}#local-business`,
    name,
    url: absoluteUrl(path),
    description,
    image: absoluteUrl('/logo-clean.png'),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo-clean.png'),
    },
    email: PRIMARY_EMAIL,
    telephone: PRIMARY_PHONE,
    address: location ? toPostalAddress(location) : undefined,
    knowsLanguage,
    geo:
      resolvedGeo?.latitude !== undefined && resolvedGeo?.longitude !== undefined
        ? {
            '@type': 'GeoCoordinates',
            latitude: resolvedGeo.latitude,
            longitude: resolvedGeo.longitude,
          }
        : undefined,
    openingHoursSpecification: toOpeningHoursSpecification(openingHours),
    sameAs,
    hasMap: mapUrl,
    areaServed: toAreaServed(location?.areaServed?.length ? location.areaServed : SERVICE_AREAS),
    parentOrganization: {
      '@id': ORGANIZATION_ID,
    },
  };
}

export function createWebPageSchema({
  name,
  description,
  path,
  type = 'WebPage',
  about = [],
  keywords = [],
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${absoluteUrl(path)}#page`,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    publisher: {
      '@id': ORGANIZATION_ID,
    },
    about: about.map((item) => ({
      '@type': 'Thing',
      name: item,
    })),
    ...(keywords.length ? { keywords: keywords.join(', ') } : {}),
  };
}

export function createServiceSchema({
  name,
  description,
  path,
  serviceType = name,
  areaServed = SERVICE_AREAS,
  catalogItems = [],
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: {
      '@id': ORGANIZATION_ID,
    },
    areaServed: toAreaServed(areaServed),
    ...(catalogItems.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${name} Services`,
            itemListElement: catalogItems.map((item) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: item.name,
                ...(item.description ? { description: item.description } : {}),
              },
            })),
          },
        }
      : {}),
  };
}

export function createFaqSchema(faqs, id = absoluteUrl('/#faq')) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema(items, id = absoluteUrl('/#breadcrumb')) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createCollectionPageSchema({
  name,
  description,
  path,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(path)}#collection`,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    about: {
      '@id': ORGANIZATION_ID,
    },
  };
}

export function createItemListSchema({
  name,
  description,
  path,
  items = [],
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#item-list`,
    name,
    description,
    url: absoluteUrl(path),
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url:
        item.url ??
        (item.path
          ? item.path.startsWith('http')
            ? item.path
            : absoluteUrl(item.path)
          : undefined),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function createCaseStudySchema({
  headline,
  description,
  path,
  clientName,
  industry,
  service,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
}) {
  const about = [clientName, industry, service].filter(Boolean).map((name) => ({
    '@type': 'Thing',
    name,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#case-study`,
    headline,
    description,
    url: absoluteUrl(path),
    image,
    mainEntityOfPage: absoluteUrl(path),
    publisher: { '@id': ORGANIZATION_ID },
    author: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
    },
    ...(about.length ? { about } : {}),
    ...(keywords.length ? { keywords } : {}),
  };
}

export function createBlogPostingSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  authorName = FOUNDER.name,
  image = DEFAULT_OG_IMAGE,
  keywords = [],
  articleSection,
}) {
  const author =
    authorName === FOUNDER.name
      ? {
          '@type': 'Person',
          '@id': FOUNDER_ID,
          name: authorName,
          jobTitle: FOUNDER.jobTitle,
          url: absoluteUrl(FOUNDER.path),
          sameAs: FOUNDER.sameAs,
          worksFor: {
            '@id': ORGANIZATION_ID,
          },
        }
      : {
          '@type': 'Person',
          name: authorName,
        };

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${absoluteUrl(path)}#post`,
    headline,
    description,
    url: absoluteUrl(path),
    image,
    datePublished,
    dateModified,
    author,
    publisher: {
      '@id': ORGANIZATION_ID,
    },
    mainEntityOfPage: absoluteUrl(path),
    ...(articleSection ? { articleSection } : {}),
    ...(keywords.length ? { keywords } : {}),
  };
}
