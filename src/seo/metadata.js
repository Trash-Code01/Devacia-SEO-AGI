import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from './site';

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  noindex = false,
  type = 'website',
  openGraphTitle,
  openGraphDescription,
  twitterTitle,
  twitterDescription,
  twitterCardType = 'summary_large_image',
}) {
  const canonicalUrl = absoluteUrl(path);
  const resolvedOgTitle = openGraphTitle ?? title;
  const resolvedOgDescription = openGraphDescription ?? description;
  const resolvedTwitterTitle = twitterTitle ?? resolvedOgTitle;
  const resolvedTwitterDescription = twitterDescription ?? resolvedOgDescription;
  const resolvedImageAlt = imageAlt ?? resolvedOgTitle;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      url: canonicalUrl,
      type,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: resolvedImageAlt,
        },
      ],
    },
    twitter: {
      card: twitterCardType,
      title: resolvedTwitterTitle,
      description: resolvedTwitterDescription,
      images: [image],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    metadataBase: new URL(SITE_URL),
  };
}
