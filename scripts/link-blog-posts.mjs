import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export const postLinksMapping = {
  'core-web-vitals-2026-fix-slow-website': {
    primaryServiceHref: '/services/website-support-maintenance',
    primaryServiceLabel: 'Website Speed & Core Web Vitals Support',
    relatedCaseStudyHref: '/almina-study',
    relatedCaseStudyLabel: 'Almina Performance Architecture Case Study',
    internalLinks: [
      { href: '/services/website-support-maintenance', label: 'Website Support & Maintenance Services' },
      { href: '/blog/fix-it-fast/google-pagespeed-score-low-fix', label: 'Google PageSpeed Score Low: What to Fix First' },
      { href: '/services/website-redesign', label: 'Performance-First Website Redesign' },
    ],
    cta: {
      eyebrow: 'Failing Core Web Vitals?',
      title: 'Get your website scoring 90+ on mobile without breaking functionality.',
      body: 'Devacia diagnoses render-blocking scripts, unoptimized assets, and layout shifts to achieve green Core Web Vitals across your entire domain.',
      primaryHref: '/contact',
      primaryLabel: 'Request a Speed Audit',
      secondaryHref: '/services/website-support-maintenance',
      secondaryLabel: 'Explore Maintenance Plans',
    },
  },
  'wordpress-vs-nextjs-for-enterprise-websites-2026': {
    primaryServiceHref: '/services/wordpress-development',
    primaryServiceLabel: 'Enterprise WordPress Development',
    relatedCaseStudyHref: '/nexus-study',
    relatedCaseStudyLabel: 'Nexus Enterprise Web Platform',
    internalLinks: [
      { href: '/services/wordpress-development', label: 'Custom Gutenberg & Headless WordPress Development' },
      { href: '/services/custom-software-development', label: 'Custom Web Application & Next.js Engineering' },
      { href: '/pricing/website-development-cost-india', label: 'Compare Development Scopes and Costs' },
    ],
    cta: {
      eyebrow: 'Planning an Enterprise Website?',
      title: 'Build an architecture your marketing team loves and engineers respect.',
      body: 'Whether you need custom Gutenberg blocks or a decoupled headless Next.js frontend, we scope the right CMS architecture around your business workflows.',
      primaryHref: '/onboarding',
      primaryLabel: 'Discuss Your Architecture',
      secondaryHref: '/services/wordpress-development',
      secondaryLabel: 'View WordPress Capabilities',
    },
  },
  'why-is-my-website-not-showing-up-in-chatgpt': {
    primaryServiceHref: '/services/generative-engine-optimization',
    primaryServiceLabel: 'Generative Engine Optimization (GEO)',
    relatedCaseStudyHref: '/nexus-study',
    relatedCaseStudyLabel: 'Nexus Entity & Information Architecture',
    internalLinks: [
      { href: '/services/generative-engine-optimization', label: 'Generative Engine Optimization (GEO) Services' },
      { href: '/services/custom-software-development', label: 'Structured Data & Enterprise Knowledge Systems' },
      { href: '/services/wordpress-development', label: 'Semantic Enterprise Web Architecture' },
    ],
    cta: {
      eyebrow: 'Invisible to AI Search?',
      title: 'Make your brand the default cited source in ChatGPT and Perplexity.',
      body: 'We implement entity-rich JSON-LD schema, high-information-gain content islands, and semantic architecture to win AI search engine citations.',
      primaryHref: '/contact',
      primaryLabel: 'Get an AI Visibility Audit',
      secondaryHref: '/services/generative-engine-optimization',
      secondaryLabel: 'Explore GEO Services',
    },
  },
  'website-development-cost-india-2026': {
    primaryServiceHref: '/pricing/website-development-cost-india',
    primaryServiceLabel: 'Website Development Cost & Scope Guide',
    relatedCaseStudyHref: '/fitniya-study',
    relatedCaseStudyLabel: 'Fitniya Platform Build & Commercial Results',
    internalLinks: [
      { href: '/services/wordpress-development', label: 'Enterprise WordPress Development Scopes' },
      { href: '/services/custom-software-development', label: 'Custom Business Software & MVP Development' },
      { href: '/services/ecommerce-website-development', label: 'D2C & B2B Ecommerce Development' },
    ],
    cta: {
      eyebrow: 'Need a Transparent Quote?',
      title: 'Get a clear, milestone-based proposal with zero hidden fees.',
      body: 'Stop guessing what your website will cost. We provide transparent technical scopes, milestone deliverables, and full IP ownership.',
      primaryHref: '/onboarding',
      primaryLabel: 'Plan Your Project Scope',
      secondaryHref: '/pricing/website-development-cost-india',
      secondaryLabel: 'Review Pricing Guide',
    },
  },
  'why-your-shopify-store-is-not-converting': {
    primaryServiceHref: '/services/ecommerce-website-development',
    primaryServiceLabel: 'Ecommerce Website Development',
    relatedCaseStudyHref: '/almina-study',
    relatedCaseStudyLabel: 'Almina D2C Custom Ecommerce Architecture',
    internalLinks: [
      { href: '/services/ecommerce-website-development', label: 'Shopify & Custom Ecommerce Development' },
      { href: '/services/landing-page-design', label: 'High-Converting Landing Page Design' },
      { href: '/services/business-automation', label: 'Automated Abandoned Cart & CRM Workflows' },
    ],
    cta: {
      eyebrow: 'Traffic But No Sales?',
      title: 'Turn your Shopify store into a high-converting sales machine.',
      body: 'We eliminate app bloat, streamline checkout UX, and build high-trust mobile product pages that convert ad traffic into paying customers.',
      primaryHref: '/contact',
      primaryLabel: 'Book a Conversion Audit',
      secondaryHref: '/services/ecommerce-website-development',
      secondaryLabel: 'Explore Ecommerce Services',
    },
  },
  'how-to-choose-web-development-agency': {
    primaryServiceHref: '/services/website-development',
    primaryServiceLabel: 'Full-Service Website Development',
    relatedCaseStudyHref: '/nexus-study',
    relatedCaseStudyLabel: 'Nexus Verified Commercial Case Study',
    internalLinks: [
      { href: '/services/custom-software-development', label: 'Custom Software & Dashboard Engineering' },
      { href: '/services/wordpress-development', label: 'Enterprise WordPress & CMS Solutions' },
      { href: '/locations/india/delhi/web-development-company', label: 'Web Development Services for Delhi NCR' },
    ],
    cta: {
      eyebrow: 'Looking for a Proven Partner?',
      title: 'Work with a technical engineering team that builds for business ROI.',
      body: 'Devacia combines business strategy, senior engineering, and technical SEO into websites that actually drive revenue.',
      primaryHref: '/contact',
      primaryLabel: 'Book a Strategy Call',
      secondaryHref: '/services/website-development',
      secondaryLabel: 'Explore Our Services',
    },
  },
  'startup-mvp-checklist': {
    primaryServiceHref: '/services/custom-software-development',
    primaryServiceLabel: 'Custom Software & MVP Development',
    relatedCaseStudyHref: '/fitniya-study',
    relatedCaseStudyLabel: 'Fitniya MVP Build & Launch',
    internalLinks: [
      { href: '/services/custom-software-development', label: 'Custom Software & SaaS MVP Development' },
      { href: '/services/business-automation', label: 'Business Process & Workflow Automation' },
      { href: '/services/landing-page-design', label: 'High-Converting MVP Waitlist Landing Pages' },
    ],
    cta: {
      eyebrow: 'Building an MVP?',
      title: 'Launch your minimum viable product in 4 to 8 weeks.',
      body: 'We build scalable, clean software architectures using Next.js, Node, and MongoDB so you can validate demand without technical debt.',
      primaryHref: '/onboarding',
      primaryLabel: 'Scope Your MVP Build',
      secondaryHref: '/services/custom-software-development',
      secondaryLabel: 'Custom Software Capabilities',
    },
  },
  'google-pagespeed-score-low-fix': {
    primaryServiceHref: '/services/website-support-maintenance',
    primaryServiceLabel: 'Website Maintenance & Speed Optimization',
    relatedCaseStudyHref: '/almina-study',
    relatedCaseStudyLabel: 'Almina 99/100 Mobile Speed Benchmark',
    internalLinks: [
      { href: '/services/website-support-maintenance', label: 'Website Care & Core Web Vitals Optimization' },
      { href: '/blog/web-development/core-web-vitals-2026-fix-slow-website', label: 'Core Web Vitals Enterprise Guide' },
      { href: '/services/website-redesign', label: 'Performance-First Website Redesign' },
    ],
    cta: {
      eyebrow: 'Need a PageSpeed Fix?',
      title: 'Get a sub-second load time and pass Google Core Web Vitals.',
      body: 'Our engineers diagnose and fix render-blocking scripts, server TTFB delays, and image bloat to get your site into the 90+ green zone.',
      primaryHref: '/contact',
      primaryLabel: 'Request a Speed Audit',
      secondaryHref: '/services/website-support-maintenance',
      secondaryLabel: 'Review Maintenance Plans',
    },
  },
  'how-to-make-ecommerce-website-load-faster': {
    primaryServiceHref: '/services/ecommerce-website-development',
    primaryServiceLabel: 'Ecommerce Website Development',
    relatedCaseStudyHref: '/almina-study',
    relatedCaseStudyLabel: 'Almina High-Performance Storefront',
    internalLinks: [
      { href: '/services/ecommerce-website-development', label: 'Shopify & Headless Ecommerce Development' },
      { href: '/services/website-support-maintenance', label: 'Ecommerce Maintenance & Uptime Care' },
      { href: '/blog/d2c-ecommerce-growth/why-your-shopify-store-is-not-converting', label: 'Why Your Shopify Store Is Not Converting' },
    ],
    cta: {
      eyebrow: 'Slow Store Killing Revenue?',
      title: 'Upgrade your ecommerce architecture for sub-second mobile speeds.',
      body: 'We implement headless frontends, dynamic image CDNs, and server-side tracking to make your store lightning-fast.',
      primaryHref: '/contact',
      primaryLabel: 'Discuss Store Optimization',
      secondaryHref: '/services/ecommerce-website-development',
      secondaryLabel: 'Explore Ecommerce Services',
    },
  },
  'shopify-checkout-abandonment-fix': {
    primaryServiceHref: '/services/ecommerce-website-development',
    primaryServiceLabel: 'Shopify & Ecommerce Development',
    relatedCaseStudyHref: '/almina-study',
    relatedCaseStudyLabel: 'Almina Frictionless Checkout UX',
    internalLinks: [
      { href: '/services/ecommerce-website-development', label: 'Shopify Custom Themes & Checkout Optimization' },
      { href: '/services/landing-page-design', label: 'High-Converting Product Landing Pages' },
      { href: '/services/business-automation', label: 'Automated CRM & Abandoned Cart Recovery' },
    ],
    cta: {
      eyebrow: 'Losing Customers at Checkout?',
      title: 'Recover lost revenue with a streamlined, high-trust checkout flow.',
      body: 'We eliminate hidden fees, optimize UPI intent flows, and add trust signals that stop shoppers from abandoning their carts.',
      primaryHref: '/contact',
      primaryLabel: 'Fix Your Checkout Funnel',
      secondaryHref: '/services/ecommerce-website-development',
      secondaryLabel: 'Shopify Development Services',
    },
  },
  'd2c-website-cost-india-2026': {
    primaryServiceHref: '/services/ecommerce-website-development',
    primaryServiceLabel: 'Ecommerce Website Development',
    relatedCaseStudyHref: '/almina-study',
    relatedCaseStudyLabel: 'Almina D2C Build & ROI',
    internalLinks: [
      { href: '/pricing/website-development-cost-india', label: 'Website Development Cost Breakdown' },
      { href: '/services/ecommerce-website-development', label: 'Shopify vs Custom Ecommerce Development' },
      { href: '/services/performance-marketing', label: 'Performance Marketing & Ad Scaling' },
    ],
    cta: {
      eyebrow: 'Planning a D2C Storefront?',
      title: 'Build an ecommerce website engineered for customer conversion.',
      body: 'From bespoke Shopify themes to full headless commerce builds, we build storefronts designed to maximize average order value.',
      primaryHref: '/onboarding',
      primaryLabel: 'Plan Your D2C Website',
      secondaryHref: '/services/ecommerce-website-development',
      secondaryLabel: 'View Ecommerce Services',
    },
  },
  'shopify-vs-custom-website-d2c-india': {
    primaryServiceHref: '/services/ecommerce-website-development',
    primaryServiceLabel: 'Ecommerce Website Development',
    relatedCaseStudyHref: '/almina-study',
    relatedCaseStudyLabel: 'Almina Custom Storefront Case Study',
    internalLinks: [
      { href: '/services/ecommerce-website-development', label: 'Custom Ecommerce & Shopify Plus Development' },
      { href: '/services/custom-software-development', label: 'Custom Web Applications & Operations' },
      { href: '/pricing/website-development-cost-india', label: 'Compare Development Scopes & Pricing' },
    ],
    cta: {
      eyebrow: 'Unsure Which Platform to Choose?',
      title: 'Get an honest technical evaluation for your brand.',
      body: 'We evaluate your product catalog, operational workflows, and budget to recommend the exact platform architecture that delivers the highest ROI.',
      primaryHref: '/contact',
      primaryLabel: 'Book a Platform Consultation',
      secondaryHref: '/services/ecommerce-website-development',
      secondaryLabel: 'Explore Ecommerce Solutions',
    },
  },
  'high-website-bounce-rate-fix': {
    primaryServiceHref: '/services/landing-page-design',
    primaryServiceLabel: 'Landing Page Design & CRO',
    relatedCaseStudyHref: '/fitniya-study',
    relatedCaseStudyLabel: 'Fitniya High-Conversion Architecture',
    internalLinks: [
      { href: '/services/landing-page-design', label: 'High-Converting Landing Page Design' },
      { href: '/services/website-redesign', label: 'Website Redesign & User Experience Overhaul' },
      { href: '/services/performance-marketing', label: 'Performance Marketing & Funnel Optimization' },
    ],
    cta: {
      eyebrow: 'High Bounce Rate?',
      title: 'Stop losing paid traffic to confusing landing pages.',
      body: 'We engineer message-matched landing pages with clear value propositions, fast load times, and frictionless conversion paths.',
      primaryHref: '/contact',
      primaryLabel: 'Request a Landing Page Audit',
      secondaryHref: '/services/landing-page-design',
      secondaryLabel: 'Explore Landing Page Services',
    },
  },
};

async function syncMongo() {
  try {
    const { default: clientPromise } = await import('../src/server/api/_utils/database.js');
    const client = await clientPromise;
    const db = client.db('lead-cluster');
    const postsCollection = db.collection('blog_posts');

    console.log('Syncing blog posts in MongoDB...');
    let updatedCount = 0;
    for (const [slug, links] of Object.entries(postLinksMapping)) {
      const res = await postsCollection.updateOne(
        { slug },
        {
          $set: {
            primaryServiceHref: links.primaryServiceHref,
            primaryServiceLabel: links.primaryServiceLabel,
            relatedCaseStudyHref: links.relatedCaseStudyHref,
            relatedCaseStudyLabel: links.relatedCaseStudyLabel,
            internalLinks: links.internalLinks,
            cta: links.cta,
            updatedAt: new Date().toISOString(),
          },
        }
      );
      if (res.matchedCount > 0) {
        updatedCount++;
      }
    }
    console.log(`Updated ${updatedCount} posts in MongoDB blog_posts.`);
  } catch (err) {
    console.warn('MongoDB sync skipped or failed:', err.message);
  }
}

async function updateBlogJs() {
  const blogJsPath = path.join(rootDir, 'src', 'content', 'blog.js');
  let content = fs.readFileSync(blogJsPath, 'utf-8');

  for (const [slug, links] of Object.entries(postLinksMapping)) {
    const slugRegex = new RegExp(`slug:\\s*['"]${slug}['"],`);
    const match = content.match(slugRegex);
    if (!match) {
      console.warn(`Could not find post with slug ${slug} in blog.js`);
      continue;
    }

    const injection = `    primaryServiceHref: '${links.primaryServiceHref}',\n    primaryServiceLabel: '${links.primaryServiceLabel}',\n    relatedCaseStudyHref: '${links.relatedCaseStudyHref}',\n    relatedCaseStudyLabel: '${links.relatedCaseStudyLabel}',\n    internalLinks: ${JSON.stringify(links.internalLinks, null, 6)},\n    cta: ${JSON.stringify(links.cta, null, 6)},`;

    // Only inject if primaryServiceHref isn't already there for this slug
    const postChunkRegex = new RegExp(`slug:\\s*['"]${slug}['"][\\s\\S]*?(?=publishedAt:)`);
    const chunkMatch = content.match(postChunkRegex);
    if (chunkMatch && !chunkMatch[0].includes('primaryServiceHref')) {
      content = content.replace(
        chunkMatch[0],
        `${chunkMatch[0]}${injection}\n    `
      );
    }
  }

  fs.writeFileSync(blogJsPath, content, 'utf-8');
  console.log('Successfully updated src/content/blog.js with internal links and CTAs.');
}

async function run() {
  await updateBlogJs();
  await syncMongo();
  console.log('Blog linking update complete!');
  process.exit(0);
}

run();
