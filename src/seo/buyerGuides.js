import { currentServicePages } from './currentServicePages.js';
import { websitePages, industryPages } from '../content/websiteOffer.js';

// Buyer questions and scope details shared by visible content and FAQ schema.
export const serviceBuyerGuides = {
  wordpressDevelopment: {
    path: '/services/wordpress-development',
    metadata: {
      title: 'WordPress Development Company in India | Devacia',
      description: 'Custom WordPress websites, Gutenberg themes, integrations, redesign and maintenance for Indian businesses. Compare standard and headless WordPress scopes.',
    },
    title: 'What your WordPress development project includes',
    intro: 'Choose the CMS around the people who will maintain it. We discuss publishing, enquiries, integrations and support before recommending a theme build or headless architecture.',
    sections: [
      { title: 'Editing and content structure', body: 'Plan the page templates, reusable blocks, navigation and content types your team needs. The scope should include an editing walkthrough so routine changes do not require a developer.' },
      { title: 'Forms, integrations and ownership', body: 'Agree the enquiry fields, spam controls and CRM handoff. The handover identifies administrator access, custom deliverables and third-party licences; paid plugins, hosting and renewal costs remain visible.' },
      { title: 'Enterprise and headless WordPress', body: 'Headless WordPress can support a separate application frontend or several publishing destinations. It also adds preview, deployment and maintenance work. We assess those tradeoffs before recommending it over a conventional WordPress build.' },
      { title: 'Redesign, performance and ongoing care', body: 'For an existing site, review URLs, plugins, hosting and content before deciding whether to repair or rebuild. Test changes on staging and agree backup, rollback and maintenance responsibilities. Performance results depend on the actual site and test conditions.' },
    ],
    links: [
      { href: '/services/ecommerce-website-development', label: 'WooCommerce and ecommerce development' },
      { href: '/services/website-support-maintenance', label: 'WordPress maintenance and website management' },
      { href: '/services/website-redesign', label: 'Website redesign and migration' },
      { href: '/locations/india/delhi/web-development-company', label: 'Delivery for Delhi NCR businesses' },
    ],
    faqs: [{ question: 'Do you provide WordPress development for Delhi NCR and other Indian businesses?', answer: 'Yes. Devacia delivers remotely from its Prayagraj head office, including for teams in Delhi NCR, Mumbai, Bengaluru and other Indian cities. Scope, review sessions, editing access and support arrangements are agreed for each engagement.' }],
  },
  ecommerce: {
    path: '/services/ecommerce-website-development',
    metadata: {
      title: 'Ecommerce Website Development Company in India | Devacia',
      description: 'Shopify, WooCommerce and custom ecommerce websites for D2C and B2B businesses. Plan catalogue, checkout, payment integrations, admin tools and support.',
    },
    title: 'Plan the store and the work behind each order',
    intro: 'Your catalogue, checkout and staff workflows determine the right ecommerce scope. Choose the platform after identifying how products, payments, shipping and customer enquiries will be handled.',
    sections: [
      { title: 'D2C storefront and checkout', body: 'Define product variants, collections, offers, shipping rules and payment methods. Acceptance checks cover mobile browsing, checkout success and failure, confirmation messages and the order information received by your team.' },
      { title: 'B2B catalogues and quotation requests', body: 'A wholesaler may need specifications, minimum order quantities and RFQ routing before online checkout. Dealer pricing, credit terms, ERP connections and account approvals add separate requirements; a catalogue is not a full procurement platform.' },
      { title: 'Inventory and admin tools', body: 'Agree who can edit products, fulfil orders and view reports. Map imports, stock updates and returns before choosing native platform features, apps or a custom admin panel.' },
      { title: 'Build cost and running costs', body: 'The estimate separates storefront work, catalogue migration and integrations. Platform plans, payment-provider charges, paid apps, hosting and ongoing management are recurring costs. A custom feature or Shopify Plus requirement needs its own estimate.' },
    ],
    links: [
      { href: '/almina-study', label: 'Almina: custom storefront and admin functionality' },
      { href: '/services/shopify-development', label: 'Shopify store development' },
      { href: '/services/custom-software-development', label: 'B2B ordering and custom admin systems' },
      { href: '/services/website-support-maintenance', label: 'Ecommerce support and maintenance' },
    ],
    faqs: [{ question: 'Can you build a B2B ecommerce website or a catalogue with RFQ forms?', answer: 'Yes. A first phase can cover product specifications, catalogue browsing and quotation requests. Dealer pricing, online ordering, ERP integrations and credit workflows are scoped separately according to the business process.' }],
  },
  shopifyDevelopment: {
    path: '/services/shopify-development',
    metadata: {
      title: 'Shopify Development Company in India | Devacia',
      description: 'Shopify store setup, custom themes, redesign and migration for Indian ecommerce businesses. Scope products, apps, payments, shipping and ongoing support.',
    },
    title: 'Scope your Shopify launch, redesign or migration',
    intro: 'A store brief should cover catalogue operations as well as design. We separate the theme build, app configuration and custom integrations so you can compare the full cost.',
    sections: [
      { title: 'Products, themes and content', body: 'Confirm product count, variants, collections and who prepares images and descriptions. Agree which theme sections the team can edit and whether a paid theme licence is needed.' },
      { title: 'Payments, shipping and apps', body: 'Check the required payment providers, delivery rules and app permissions against the selected Shopify plan. Third-party subscriptions and transaction-related charges are separate from development fees.' },
      { title: 'Migration and launch checks', body: 'Inventory existing URLs, product data and customer/order data eligibility. Plan redirects and test checkout, analytics and order notifications. Search traffic can fluctuate after a migration; ranking preservation is not guaranteed.' },
      { title: 'Support after handover', body: 'Agree staff training, account access, the initial support window and responsibility for apps and future changes. Shopify platform hosting does not remove the need to maintain theme code and integrations.' },
    ],
    links: [
      { href: '/compare/wordpress-vs-shopify-vs-custom', label: 'Compare Shopify, WooCommerce and custom development' },
      { href: '/services/website-support-maintenance', label: 'Store management and support' },
      { href: '/locations/india/bangalore/web-development-company', label: 'Website delivery for Bengaluru businesses' },
      { href: '/pricing/website-development-cost-india', label: 'Development costs and inclusions' },
    ],
    faqs: [{ question: 'Are Shopify subscriptions, paid themes and apps included in the build fee?', answer: 'They are itemized separately in the proposal unless explicitly included. Confirm platform subscriptions, theme licences, app renewals, payment-provider charges and ongoing support when comparing store-development quotes.' }],
  },
  customSoftwareDevelopment: {
    path: '/services/custom-software-development',
    metadata: {
      title: 'Custom Software & Admin Panel Development in India | Devacia',
      description: 'Custom admin panels, business dashboards, B2B portals and web applications. Scope roles, workflows, integrations and a practical first release with Devacia.',
    },
    title: 'B2B portals, admin panels and software built around a workflow',
    intro: 'Begin with the work people need to complete: record an enquiry, approve a quote, fulfil an order or review a report. Define the first usable workflow before adding modules.',
    sections: [
      { title: 'Admin panels and dashboards', body: 'Specify the records users can view or change, permissions, approval steps and activity history. A dashboard should lead to an action, with agreed definitions for every report and metric.' },
      { title: 'Catalogue, RFQ and dealer workflows', body: 'Map a product enquiry through qualification, quotation and follow-up. Dealer accounts, negotiated prices and order tracking can follow in later phases. ERP data, credit and procurement rules need separate discovery.' },
      { title: 'Integrations and data migration', body: 'Check source data quality, API access, error handling and retries. Acceptance includes what happens when an integration is unavailable, a record is duplicated or an unauthorized user attempts an action.' },
      { title: 'Budget and delivery boundaries', body: 'A ₹1–3 lakh planning budget may suit a bounded workflow or initial module. A full ERP, complex marketplace or multi-tenant SaaS needs a separate estimate. We compare configuring an existing product with building custom software before recommending a route.' },
    ],
    links: [
      { href: '/almina-study', label: 'Explore custom commerce and admin functionality' },
      { href: '/services/business-automation', label: 'Workflow automation and integrations' },
      { href: '/services/ecommerce-website-development', label: 'B2B catalogue and ecommerce options' },
      { href: '/locations/india/delhi/web-development-company', label: 'Web and software delivery for Delhi NCR' },
    ],
    faqs: [{ question: 'What do you need to estimate an admin panel or B2B portal?', answer: 'Share the users and roles, sample records without confidential data, key workflow steps, reports and systems to integrate. We then define a bounded first release, acceptance checks and the work that should remain outside that phase.' }],
  },
  businessAutomation: {
    path: '/services/business-automation',
    metadata: {
      title: 'Business Workflow Automation Services in India | Devacia',
      description: 'Connect website enquiries, CRM records, booking and order workflows. Plan integrations, approvals, retries and reporting around how your team works.',
    },
    title: 'Start with one repeatable business process',
    intro: 'Automation works best when the trigger, responsible person and successful outcome are clear. We review your current tools before recommending an integration or custom module.',
    sections: [
      { title: 'Enquiry routing and follow-up', body: 'Map form submissions to the correct team and CRM stage. Keep duplicate detection, consent requirements, failed deliveries and human follow-up visible rather than treating every form attempt as a qualified lead.' },
      { title: 'Bookings, quotes and orders', body: 'Define the changes that should create a task or notification. Price approvals, cancellations and exceptions need an owner, especially when money or stock is involved.' },
      { title: 'Reliability and operating cost', body: 'Agree API access, retries, logs and recovery steps. List usage charges, integration subscriptions and maintenance responsibilities before launch. Start with existing product features when they meet the requirement.' },
    ],
    links: [
      { href: '/services/custom-software-development', label: 'Custom dashboards and internal tools' },
      { href: '/solutions/custom-booking-systems', label: 'Booking workflows' },
      { href: '/services/performance-marketing', label: 'Lead qualification and campaign reporting' },
    ],
    faqs: [{ question: 'Do we need to replace our CRM to automate website enquiries?', answer: 'Not necessarily. We first check whether the existing CRM supports the required fields, integrations and permissions. A focused integration can be sufficient; custom software is considered when the workflow cannot be handled reliably by existing tools.' }],
  },
  websiteSupportMaintenance: {
    path: '/services/website-support-maintenance',
    metadata: {
      title: 'Website Maintenance & Management Services in India | Devacia',
      description: 'WordPress, ecommerce and custom website maintenance, content updates and technical support. Define care scope, response terms and monthly or annual costs.',
    },
    title: 'Website management with clear responsibilities',
    intro: 'A maintenance agreement should state which website is covered, what work is included and how incidents are handled. We review the current platform before proposing monthly or annual care.',
    sections: [
      { title: 'WordPress care', body: 'Agree update checks for core, themes and plugins, backups and restore verification. Establish a staging or rollback process for changes that could affect forms, checkout or publishing.' },
      { title: 'Ecommerce and custom website support', body: 'Identify checkout, payment notifications, catalogue updates and integrations that need checking. Hosting responsibilities differ between a managed platform and a custom application; name the owner of each dependency.' },
      { title: 'Content changes and improvement hours', body: 'List included edits, development hours and approval steps. New page designs, features, bulk product entry and incident recovery may require additional scope. A change log and periodic report make completed work visible.' },
      { title: 'Maintenance charges and response terms', body: 'Price depends on platform condition, included hours and coverage. Agree response targets separately from resolution targets, with escalation and out-of-hours terms written into the proposal. Initial cleanup, licences and hosting are itemized; 24/7 cover is not assumed.' },
    ],
    links: [
      { href: '/services/wordpress-development', label: 'WordPress development' },
      { href: '/services/ecommerce-website-development', label: 'Ecommerce websites and integrations' },
      { href: '/services/website-redesign', label: 'When a redesign is the better option' },
      { href: '/problems/website-is-broken-or-down', label: 'Broken website diagnosis and recovery' },
    ],
    faqs: [{ question: 'How are monthly or annual website maintenance charges calculated?', answer: 'We assess the platform, current condition, included change hours, integrations and support coverage. The proposal separates initial repair work, recurring care, third-party costs and additional requests, with response and escalation terms agreed in writing.' }],
  },
  rebranding: {
    path: '/services/rebranding',
    metadata: {
      title: 'Brand Positioning & Digital Rebranding Services | Devacia',
      description: 'Clarify your positioning, service messaging and digital identity as your business grows. Define the brand direction before scoping a website rebuild.',
    },
    title: 'Make the brand reflect the business you are now',
    intro: 'When your customers, services or market position change, your message and visual identity may need to change with them. We define that direction before deciding which website work is necessary.',
    sections: [
      { title: 'Positioning and audience', body: 'Define the buyers you serve, the problems you solve and the reasons they should consider your business. Separate verified differentiation from claims that need evidence.' },
      { title: 'Service and offer messaging', body: 'Agree how services are named and explained, which proof supports them and what a qualified prospect should do next. Use that message consistently across the website and sales materials.' },
      { title: 'Digital identity direction', body: 'Define typography, colour, imagery and reusable design guidance around the approved positioning. The proposal identifies the assets and review rounds included.' },
      { title: 'Website rollout and handover', body: 'A brand refresh may require content updates or a separately scoped website redesign. Agree deliverables, ownership and implementation responsibilities before rollout; a new identity alone does not guarantee more enquiries.' },
    ],
    links: [
      { href: '/services/website-redesign', label: 'Website redesign and migration scope' },
      { href: '/industries/professional-services-website-development', label: 'Professional services website development' },
      { href: '/services/website-support-maintenance', label: 'Website repair and ongoing care' },
      { href: '/pricing/website-development-cost-india', label: 'Compare development scope and costs' },
    ],
    faqs: [{ question: 'Do we need a rebrand or a website redesign?', answer: 'Choose rebranding when your positioning, messaging or identity no longer represents the business. Choose a redesign when the website structure, usability or technology needs work. Some projects need both, but the scope and deliverables are defined separately.' }],
  },
  performanceMarketing: {
    path: '/services/performance-marketing',
    metadata: {
      title: 'Performance Marketing Agency in India | Google & Meta Ads',
      description: 'Google Ads and Meta Ads management with landing pages, conversion tracking and qualified-lead reporting. Separate media spend, management and creative costs.',
    },
    title: 'Connect advertising spend to qualified enquiries',
    intro: 'Agree what makes an enquiry useful before optimizing campaigns. Google Ads, Meta Ads, landing pages and sales follow-up should share the same measurement definitions.',
    sections: [
      { title: 'Google Ads management', body: 'Match search intent to the offer and landing page. Review targeting, search terms, exclusions and conversion actions. A button click or form attempt should not be reported as a confirmed sales opportunity.' },
      { title: 'Meta Ads for ecommerce and lead generation', body: 'Plan audience tests, creative responsibilities and the page people reach after the ad. For ecommerce, check purchase measurement and returns; for services, assess lead quality with the sales team.' },
      { title: 'Fees, ad spend and account access', body: 'Management fees, media spend, creative production, software and landing-page work are separate cost items unless explicitly bundled. Agree account ownership, access permissions and reporting before launch.' },
      { title: 'Reporting and expectations', body: 'Review spend, accepted inquiries, qualified opportunities and sales outcomes using a stated attribution window. Set budgets and testing periods around the offer and available demand. CPL, ROAS, rankings and sales are not guaranteed.' },
    ],
    links: [
      { href: '/services/landing-page-design', label: 'Landing pages for paid campaigns' },
      { href: '/services/business-automation', label: 'Lead routing and follow-up workflows' },
      { href: '/services/ecommerce-website-development', label: 'Ecommerce store and checkout development' },
      { href: '/locations/india/delhi/gurgaon-performance-marketing', label: 'Performance marketing for Gurugram teams' },
    ],
    faqs: [{ question: 'Is advertising spend included in your management fee?', answer: 'No, media spend is separate unless the written proposal explicitly states otherwise. Creative production, landing-page development, tools and additional integrations are also itemized so the total monthly commitment is clear.' }],
  },
};

export function withBuyerGuide(page, key) {
  const guide = serviceBuyerGuides[key];
  if (!guide || currentServicePages.some(service => service.path === guide.path)) return page;
  return {
    ...page,
    metadata: { ...page.metadata, ...guide.metadata },
    content: { ...page.content, buyerGuide: guide, faqs: [...page.content.faqs, ...guide.faqs] },
  };
}

// Only pages with substantive content changes receive a new sitemap timestamp.
export const SEO_PAGE_UPDATES = Object.fromEntries([
  ['/', '2026-10-02'],
  ['/locations/india/mumbai/web-development-company', '2026-10-02'],
  ['/locations/india/bangalore/web-development-company', '2026-10-02'],
  ...Object.values(serviceBuyerGuides).map(({ path }) => [path, '2026-10-01']),
  ...currentServicePages.map(({ path }) => [path, '2026-10-09']),
  ['/services/rebranding', '2026-10-08'],
  ['/plans', '2026-10-15'],
  [websitePages.main.path, '2026-10-09'],
  ...Object.values(industryPages).map(({ path, lastModified }) => [path, lastModified]),
  ['/locations/india/delhi/web-development-company', '2026-10-01'],
  ['/pricing/website-development-cost-india', '2026-10-01'],
  ...['/services/lead-generation-websites', '/services/startup-mvp-development', '/services/performance-marketing', '/problems/why-your-website-is-not-converting', '/solutions/custom-booking-systems'].map(path => [path, '2026-10-12']),
  ['/locations/india/prayagraj/civil-lines-digital-marketing', '2026-10-14'],
  ['/services/wordpress-development', '2026-10-18'],
  ['/services/business-automation', '2026-10-18'],
  ['/services/landing-page-design', '2026-10-18'],
  ['/services/website-support-maintenance', '2026-10-18'],
  ['/services/custom-software-development', '2026-10-18'],
]);
