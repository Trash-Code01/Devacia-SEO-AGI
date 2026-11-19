import { websitePages } from '../content/websiteOffer.js';

export const serviceLandingPages = {
  websiteDevelopment: {
    path: websitePages.main.path,
    breadcrumbName: websitePages.main.breadcrumbName,
    metadata: websitePages.main.metadata,
    schema: {
      name: 'Custom Business Website Development',
      description: websitePages.main.metadata.description,
      serviceType: 'Website Development',
      catalogItems: [{ name: 'Custom website design and development' }, { name: 'CMS and admin tools' }, { name: 'Agreed booking and enquiry workflows' }],
    },
    content: {
      eyebrow: websitePages.main.eyebrow,
      title: websitePages.main.title,
      intro: websitePages.main.intro,
      faqs: websitePages.main.faqs,
      links: [{ href: '/onboarding', label: 'Book a Strategy Call', variant: 'primary' }],
    },
  },
  wordpressDevelopment: {
    path: '/services/wordpress-development',
    breadcrumbName: 'WordPress Development',
    metadata: {
      title: 'WordPress Development Company | SEO-Ready Business Websites | Devacia',
      description:
        'Devacia builds WordPress websites for businesses that need speed, easier content management, stronger trust, and cleaner lead generation without plugin-heavy chaos.',
      keywords: [
        'wordpress development company',
        'wordpress website development agency',
        'wordpress business website development',
        'seo ready wordpress website',
        'wordpress website for lead generation',
      ],
    },
    schema: {
      name: 'WordPress Development',
      description:
        'WordPress development for businesses that need a manageable CMS, strong SEO foundations, and conversion-focused website structure.',
      serviceType: 'WordPress Development',
      catalogItems: [
        { name: 'WordPress Website Development' },
        { name: 'Lead Generation WordPress Websites' },
        { name: 'WordPress Redesign and Cleanup' },
      ],
    },
    content: {
      eyebrow: 'WordPress Development',
      title: 'WordPress development for businesses that want control without plugin chaos.',
      intro:
        'WordPress is still a strong choice when the website needs a serious CMS, cleaner SEO structure, and easier day-to-day publishing without forcing the business into a custom stack too early.',
      directAnswer: {
        title: 'The right WordPress build should stay easy to manage and hard to break.',
        body: 'We use WordPress when the business needs editorial flexibility, service content depth, SEO-friendly architecture, and a platform that internal teams can actually use after launch. The goal is a lean system, not a plugin pile.',
      },
      bestFor: [
        'Service businesses, clinics, hospitality brands, consultants, and content-led companies',
        'Teams that need a manageable CMS for pages, blogs, and landing pages',
        'Brands replacing a slow or cluttered WordPress setup with a cleaner structure',
        'Businesses that need SEO-ready architecture and lead-generation clarity',
      ],
      notFit: [
        'Stores whose core complexity lives in ecommerce operations and checkout flows',
        'Products or workflows that need advanced custom software behavior beyond CMS needs',
        'Teams expecting WordPress to solve operational software problems by itself',
      ],
      highlights: [
        {
          title: 'Lean architecture',
          body: 'The build is scoped around maintainability, not around stacking unnecessary plugins just because they are available.',
        },
        {
          title: 'Lead-focused templates',
          body: 'Pages are structured to support service clarity, internal linking, trust blocks, and obvious next steps.',
        },
        {
          title: 'SEO-ready by design',
          body: 'Metadata, schema, content hierarchy, and crawlable structure are part of the website setup from the start.',
        },
        {
          title: 'Upgrade path',
          body: 'If the business later needs landing pages, automation, or custom modules, the site can evolve without losing its foundations.',
        },
      ],
      process: [
        {
          title: 'Clarify the content model',
          body: 'We define the page types, buyer questions, and content flows the CMS needs to support.',
        },
        {
          title: 'Build for speed and trust',
          body: 'The site is structured around performance, mobile clarity, and the trust elements that move a visitor toward enquiry.',
        },
        {
          title: 'Set up for ownership',
          body: 'We keep publishing and editing practical so the team can operate the website after launch without breaking the structure.',
        },
      ],
      proof: {
        title: 'WordPress works best when it stays focused on content, conversion, and operational simplicity.',
        body: 'Devacia uses WordPress when it is the right business decision, not as a default for every project. That keeps the stack practical and prevents the site from becoming harder to manage as the company grows.',
        points: [
          'Strong fit for lead-generation websites and service content structures',
          'Clean handoff for teams that need to manage pages after launch',
          'Can connect with landing pages, tracking, and broader growth systems',
        ],
      },
      faqs: [
        {
          question: 'Is WordPress still good for SEO?',
          answer:
            'Yes, when the website is built properly. Structure, speed, crawlability, metadata, and content hierarchy matter far more than the CMS label by itself.',
        },
        {
          question: 'Can Devacia redesign an old WordPress website?',
          answer:
            'Yes. We can rebuild old WordPress sites that are cluttered, slow, weak on conversion, or difficult to manage.',
        },
        {
          question: 'Should I choose WordPress over a custom website?',
          answer:
            'Choose WordPress when content management and speed to launch matter more than advanced custom application behavior. If your requirements are deeper, a custom build may fit better.',
        },
      ],
      links: [
        { href: '/onboarding', label: 'Talk about a WordPress build', variant: 'primary' },
        { href: '/services/website-development', label: 'See business website builds' },
        { href: '/compare/wordpress-vs-shopify-vs-custom', label: 'Compare WordPress vs other paths' },
      ],
    },
  },
  shopifyDevelopment: {
    path: '/services/shopify-development',
    breadcrumbName: 'Shopify Development',
    metadata: {
      title: 'Shopify Development Agency | Ecommerce Growth-Focused Stores | Devacia',
      description:
        'Devacia builds Shopify storefronts for D2C and ecommerce brands that need stronger product trust, cleaner mobile journeys, and better conversion from paid and organic traffic.',
      keywords: [
        'shopify development agency',
        'shopify development agency india',
        'shopify website development company',
        'shopify store conversion optimization',
        'd2c ecommerce website development',
      ],
    },
    schema: {
      name: 'Shopify Development',
      description:
        'Shopify development for D2C and ecommerce brands that need product clarity, better conversion, and a store built to support growth.',
      serviceType: 'Shopify Development',
      catalogItems: [
        { name: 'Shopify Store Development' },
        { name: 'Shopify Conversion Improvements' },
        { name: 'Shopify Growth Landing Pages' },
      ],
    },
    content: {
      eyebrow: 'Shopify Development',
      title: 'Shopify development for brands that need the store to sell, not just exist.',
      intro:
        'A Shopify store performs when product trust, merchandising, mobile UX, tracking, and checkout clarity work together. Devacia builds that full storefront system for D2C and ecommerce brands.',
      directAnswer: {
        title: 'This page is for teams that want a stronger storefront and cleaner revenue flow.',
        body: 'We handle the parts that usually hold a store back: weak product storytelling, unclear offers, slow mobile pages, fragile landing-to-product continuity, and checkout friction that quietly kills revenue.',
      },
      bestFor: [
        'D2C brands and ecommerce teams investing in paid traffic or catalog growth',
        'Merchants rebuilding an underperforming Shopify store',
        'Brands that need landing pages, collection logic, and trust-heavy product pages',
        'Teams that want store execution connected to funnels and tracking',
      ],
      notFit: [
        'Very early stores with no product-market clarity and no catalog strategy yet',
        'Projects where the business really needs custom software, not a storefront layer',
        'Teams looking only for cosmetic theme edits without fixing conversion issues',
      ],
      highlights: [
        {
          title: 'Product trust',
          body: 'We shape product pages, collection pages, and merchandising so the buyer gets confidence faster.',
        },
        {
          title: 'Mobile conversion',
          body: 'The store experience is designed around mobile browsing, tap targets, speed, and checkout momentum.',
        },
        {
          title: 'Post-click continuity',
          body: 'Landing pages and paid traffic are mapped to the product journey so the click promise matches the page experience.',
        },
        {
          title: 'Growth readiness',
          body: 'Analytics, automation, and campaign support can connect cleanly to the storefront instead of living in silos.',
        },
      ],
      process: [
        {
          title: 'Audit the revenue journey',
          body: 'We check the product page, collection logic, mobile UX, offer clarity, and ad-to-store continuity.',
        },
        {
          title: 'Fix the conversion layer',
          body: 'We improve trust, hierarchy, speed, and the journey into checkout so the store stops leaking intent.',
        },
        {
          title: 'Support growth after launch',
          body: 'The store can connect with campaigns, tracking, and testing so improvements continue after release.',
        },
      ],
      proof: {
        title: 'A premium store needs more than design taste. It needs commercial structure.',
        body: 'Devacia already works across fashion, fragrance, and growth-focused ecommerce experiences where storytelling and checkout both matter. That balance is what lifts store quality beyond a generic theme setup.',
        points: [
          'Relevant for D2C, premium catalog brands, and ecommerce teams',
          'Works well alongside landing pages and performance marketing support',
          'India, US, and select international delivery with one technical and growth-aware partner',
        ],
      },
      faqs: [
        {
          question: 'Can you work on an existing Shopify store instead of rebuilding from zero?',
          answer:
            'Yes. Some stores need a full rebuild, while others need a conversion, UX, speed, or landing-page cleanup. We audit before recommending scope.',
        },
        {
          question: 'Do you only work on Shopify, or can you advise on custom ecommerce too?',
          answer:
            'We can advise on Shopify versus custom when growth, operational, or performance requirements start outgrowing the platform.',
        },
        {
          question: 'Does Shopify development include landing pages and campaign support?',
          answer:
            'It can. Devacia can connect Shopify store work with landing pages, analytics, paid traffic, and funnel support when the business needs it.',
        },
      ],
      links: [
        { href: '/onboarding', label: 'Talk about your Shopify store', variant: 'primary' },
        { href: '/services/ecommerce-website-development', label: 'Explore ecommerce development' },
        { href: '/problems/how-to-increase-ecommerce-sales', label: 'Read the ecommerce growth guide' },
      ],
    },
  },
  customSoftwareDevelopment: {
    path: '/services/custom-software-development',
    breadcrumbName: 'Custom Software Development',
    metadata: {
      title: 'Enterprise Custom Software Development Company | CRM, Client Portals & Workflow Automation | Devacia',
      description:
        'Devacia designs and engineers custom business software, client portals, internal dashboards, and automated CRM workflows. Built for high-growth teams outgrowing spreadsheets and generic SaaS.',
      keywords: [
        'enterprise custom software development company',
        'custom business software development',
        'client portal development services',
        'custom crm development company',
        'workflow automation software development',
      ],
    },
    schema: {
      name: 'Custom Software Development',
      description:
        'Custom software development for startups and businesses that need dashboards, admin panels, workflows, internal tools, and scalable digital systems.',
      serviceType: 'Custom Software Development',
      catalogItems: [
        { name: 'Admin Panel Development' },
        { name: 'Dashboard Development' },
        { name: 'Custom Business Workflow Software' },
        { name: 'SaaS and Product Feature Development' },
      ],
    },
    content: {
      eyebrow: 'Custom Software Development',
      title: 'Custom software and admin panel development in India',
      intro:
        'When operations depend on spreadsheets, disconnected tools, or fragile workarounds, custom software becomes a business decision, not just a technical one. Devacia builds systems around the workflow you actually run so the team can move faster with fewer errors.',
      directAnswer: {
        title: 'What should your team be able to do in the first release?',
        body: 'We build dashboards, internal systems, operational tools, and web software when off-the-shelf tools create friction instead of solving it. The goal is cleaner execution, clearer data, and a system the team can actually use every day without manual patchwork.',
      },
      bestFor: [
        'Growing businesses that need lead, booking, or internal workflow software',
        'Founders building a product layer or SaaS-style feature set',
        'Teams that need dashboards, permissions, admin logic, or connected operations',
        'Companies that want software tied to the website and growth stack, not isolated from it',
      ],
      notFit: [
        'Businesses that only need a standard brochure website or simple CMS',
        'Teams that can already solve the problem cleanly with one proven off-the-shelf tool',
        'Projects that are still too vague to define users, workflows, or decisions',
      ],
      highlights: [
        {
          title: 'Workflow-first scoping',
          body: 'We start with the actual business process, user roles, and friction points so the software solves the right problem.',
        },
        {
          title: 'Operational clarity',
          body: 'Dashboards, permissions, lead states, booking flows, and team actions are mapped into the product instead of staying manual.',
        },
        {
          title: 'Growth connection',
          body: 'When needed, the software connects to websites, lead funnels, and analytics so operations and acquisition stay aligned.',
        },
        {
          title: 'Scalable foundation',
          body: 'The first version is built to work now without closing off the future expansion path.',
        },
      ],
      process: [
        {
          title: 'Define the workflow',
          body: 'We map users, roles, states, approvals, reports, and integrations before we touch features.',
        },
        {
          title: 'Build the essential version',
          body: 'We prioritize the system that actually removes friction instead of overbuilding every nice-to-have in version one.',
        },
        {
          title: 'Launch with visibility',
          body: 'Tracking, documentation, and iteration support help the software improve with the team instead of stalling after delivery.',
        },
      ],
      proof: {
        title: 'Custom software should reduce operational drag, not create a larger maintenance problem.',
        body: 'Devacia approaches software builds with the same discipline we use on revenue-facing websites: clear scope, practical interfaces, connected systems, and enough technical depth to support real growth.',
        points: [
          'Relevant for admin panels, dashboards, internal tools, and product layers',
          'Useful for both startups and established businesses with growing operational complexity',
          'Works well alongside website, landing page, and lead system execution',
        ],
      },
      faqs: [
        {
          question: 'What types of custom software does Devacia build?',
          answer:
            'Devacia builds internal tools, admin panels, dashboards, booking systems, lead management workflows, operational software, and product-style web applications.',
        },
        {
          question: 'Can you connect the software with our website or lead flow?',
          answer:
            'Yes. When the business needs it, Devacia can connect software with the public website, landing pages, CRM logic, and lead routing workflows.',
        },
        {
          question: 'How do I know if I need custom software instead of standard SaaS tools?',
          answer:
            'If your workflow depends on too many manual steps, workarounds, or role-based logic that standard tools handle poorly, custom software usually becomes worth considering.',
        },
      ],
      links: [
        { href: '/onboarding', label: 'Talk about custom software', variant: 'primary' },
        { href: '/services/startup-mvp-development', label: 'Explore startup MVP development' },
        { href: '/locations/usa/custom-software-development-team', label: 'See US software delivery page' },
      ],
    },
  },
  startupMvpDevelopment: {
    path: '/services/startup-mvp-development',
    breadcrumbName: 'Startup MVP Development',
    metadata: {
      title: 'Startup MVP Development Company | Serious Version One Builds | Devacia',
      description:
        'Devacia helps founders build startup MVPs, product workflows, admin tools, and launch-ready systems without overbuilding the first version.',
      keywords: [
        'startup mvp development company',
        'mvp development agency',
        'startup product development company',
        'saas mvp development',
        'version one startup build',
      ],
    },
    schema: {
      name: 'Startup MVP Development',
      description:
        'Startup MVP development for founders building a serious version one with product logic, admin tooling, and room to scale.',
      serviceType: 'Startup MVP Development',
      catalogItems: [
        { name: 'MVP Product Development' },
        { name: 'Startup Admin Panel Development' },
        { name: 'Pilot and Beta Launch Systems' },
      ],
    },
    content: {
      eyebrow: 'Startup MVP Development',
      title: 'Startup MVP development for founders who need a serious first version, not a demo that falls apart.',
      intro:
        'Version one should prove the product, support early users, and stay lean enough to move quickly. Devacia helps founders turn startup scope into a build that is credible with users, pilots, or investors.',
      directAnswer: {
        title: 'The goal is traction-ready execution, not feature overload.',
        body: 'We focus on the minimum system that still feels serious: core user flow, admin control, clean product logic, and enough structure to learn from real usage without overbuilding the roadmap.',
      },
      bestFor: [
        'Founders validating a new product or internal platform',
        'Teams moving from idea or prototype into a real pilot or beta',
        'Businesses launching a productized workflow, dashboard, or SaaS-style tool',
        'Operators who need one technical partner for version one planning and delivery',
      ],
      notFit: [
        'Projects that have not defined a core user, problem, or workflow yet',
        'Founders expecting the first version to include every long-term feature at once',
        'Businesses that really need a landing page or marketing site before a product layer',
      ],
      highlights: [
        {
          title: 'Version-one discipline',
          body: 'We keep the first release focused on what proves the product fastest without stripping it of credibility.',
        },
        {
          title: 'Founder clarity',
          body: 'The scope, tradeoffs, and launch path stay understandable so the founder can make better decisions under pressure.',
        },
        {
          title: 'Admin and ops layer',
          body: 'The internal management side gets the attention it needs so the product is operable after launch.',
        },
        {
          title: 'Scale-aware architecture',
          body: 'We avoid locking the product into a brittle first version that needs to be rebuilt immediately after early traction.',
        },
      ],
      process: [
        {
          title: 'Reduce the product scope',
          body: 'We identify the smallest serious version that still delivers value to a real user or buyer.',
        },
        {
          title: 'Build the launch system',
          body: 'Core workflows, internal controls, and supporting pages are built so the MVP can operate in the real world.',
        },
        {
          title: 'Prepare for iteration',
          body: 'After launch, the product has enough clarity and structure for the next decisions to come from actual use, not guesswork.',
        },
      ],
      proof: {
        title: 'A strong MVP is not about shipping the least code. It is about shipping the right first system.',
        body: 'Devacia treats MVP work as both product and business execution. That is why version one planning, admin logic, and real user outcomes matter as much as the interface.',
        points: [
          'Useful for pilots, private launches, early adoption, and founder-led product rollouts',
          'Can pair with brand websites, waitlists, landing pages, and growth systems',
          'Supports founders in India, the US, and select international markets with remote-first execution',
        ],
      },
      faqs: [
        {
          question: 'What makes an MVP serious enough to launch?',
          answer:
            'A serious MVP has a clear core user flow, enough internal control to operate, and enough product quality that early users can actually trust and use it.',
        },
        {
          question: 'Can Devacia help with both the product and the launch website?',
          answer:
            'Yes. Devacia can support both the product layer and the website, waitlist, or landing-page system that helps users discover it.',
        },
        {
          question: 'How do you stop version one from becoming too big?',
          answer:
            'We define what proves the product fastest, what must exist for operations, and what can wait until after initial learning.',
        },
      ],
      links: [
        { href: '/onboarding', label: 'Plan your MVP build', variant: 'primary' },
        { href: '/blog/fix-it-fast/startup-mvp-checklist', label: 'Use the startup MVP scope and launch checklist' },
        { href: '/services/custom-software-development', label: 'See custom software development' },
        { href: '/nexus-study', label: 'Review product-oriented proof' },
      ],
    },
  },
  businessAutomation: {
    path: '/services/business-automation',
    breadcrumbName: 'Business Automation',
    metadata: {
      title: 'Business Automation Systems for Service Teams | Lead Routing, Booking & Workflow | Devacia',
      description:
        'Devacia builds business automation systems that connect your website, enquiry forms, booking flow, and internal team workflow. Lead routing, notification pipelines, CRM-lite dashboards, and operational visibility for service businesses in India.',
      keywords: [
        'business automation systems india',
        'lead routing automation',
        'booking system automation',
        'business workflow automation company',
        'website to crm automation',
        'enquiry automation system',
        'service business workflow software',
      ],
    },
    schema: {
      name: 'Business Automation Systems',
      description:
        'Business automation systems for lead handling, booking flows, notification pipelines, CRM-lite dashboards, and connected website-to-team execution.',
      serviceType: 'Business Automation',
      catalogItems: [
        { name: 'Lead Routing & Qualification Automation' },
        { name: 'Booking Workflow & Reminder Systems' },
        { name: 'Operational Dashboard & Status Tracking' },
        { name: 'Website-to-Team Notification Pipelines' },
        { name: 'CRM-Lite Enquiry Pipeline Systems' },
      ],
    },
    content: {
      eyebrow: 'Business Automation',
      title: 'Business automation systems for teams losing time between the website, the lead, and the actual work.',
      intro:
        'A lot of businesses do not just need a better website. They need the lead, booking, follow-up, and team workflow after the website to stop breaking down. That is where Devacia\'s automation work fits.',
      directAnswer: {
        title: 'Automation works when it is tied to the real workflow, not bolted on as a gimmick.',
        body: 'We design systems for enquiry capture, qualification, booking, status changes, team handoff, and reporting so the business stops relying on fragmented manual follow-up. The result is cleaner execution and fewer missed opportunities.',
      },
      bestFor: [
        'Service businesses handling enquiries manually across forms, WhatsApp, and spreadsheets',
        'Teams that need booking, lead routing, or status-based workflow automation',
        'Businesses that want websites, funnels, and internal operations connected together',
        'Founders who need more visibility into what happens after the lead arrives',
      ],
      notFit: [
        'Businesses with very low lead volume and no defined process to automate yet',
        'Teams that only need marketing content without operational workflow changes',
        'Companies expecting automation to fix an unclear offer or broken sales process by itself',
      ],
      highlights: [
        {
          title: 'Lead handling',
          body: 'Capture, tagging, qualification, and routing logic can be structured around how your team actually closes work.',
        },
        {
          title: 'Booking systems',
          body: 'We help connect booking, follow-up, reminders, and internal visibility so appointments stop leaking between steps.',
        },
        {
          title: 'Operational dashboards',
          body: 'Status views, team actions, and decision visibility can be pulled into one internal system instead of scattered tools.',
        },
        {
          title: 'Website-to-team continuity',
          body: 'The public-facing pages and the internal workflow are treated as one growth system, not two separate projects.',
        },
        {
          title: 'Notification pipelines',
          body: 'Instant team alerts for new enquiries, booking confirmations, and status changes through email, Telegram, or integrated messaging — so no lead sits unacknowledged.',
        },
        {
          title: 'CRM-lite enquiry pipelines',
          body: 'For teams not ready for a full CRM, we build lightweight internal dashboards that capture enquiry details, track follow-up status, and surface priority leads without complex enterprise software.',
        },
      ],
      process: [
        {
          title: 'Map the current bottleneck',
          body: 'We identify which steps are slowing the team down or causing leads, bookings, or follow-up to get lost.',
        },
        {
          title: 'Build the right workflow',
          body: 'Forms, logic, dashboards, and actions are configured around the real business sequence instead of generic automation recipes.',
        },
        {
          title: 'Monitor adoption',
          body: 'A system only helps when the team uses it, so clarity, handoff, and practical visibility matter as much as the code.',
        },
      ],
      proof: {
        title: 'Automation should make the team calmer, faster, and more accountable.',
        body: 'Devacia builds automation as part of business infrastructure — not as isolated widgets. That means enquiry forms connect to routing logic, routing logic connects to team notifications, and team notifications connect to a trackable follow-up pipeline.',
        points: [
          'Relevant for service businesses, clinics, agencies, hospitality, and operations-heavy teams in India',
          'Can connect with your existing website, landing pages, forms, and business software layer',
          'Delivered as scoped, ownership-ready systems — not recurring lock-in dependencies',
          'Appropriate for teams handling 10–300 inbound enquiries or bookings per month',
        ],
      },
      faqs: [
        {
          question: 'What kinds of automation can Devacia build?',
          answer:
            'Devacia can build lead-routing flows, booking systems, internal workflow dashboards, team notification pipelines, operational status trackers, CRM-lite enquiry pipelines, and connected website-to-team processes. The scope is defined around your actual business sequence, not a generic template.',
        },
        {
          question: 'Do I need custom software for automation?',
          answer:
            'Not always. Some businesses need a lighter workflow layer — a form connected to a dashboard and a notification alert. Others need a more complete internal system with multi-stage routing, status management, and reporting. The right level depends on enquiry volume, process complexity, and the visibility you need.',
        },
        {
          question: 'Can automation improve lead quality too?',
          answer:
            'It can improve how leads are filtered, qualified, routed, and followed up. Automation will not fix a weak offer or poor traffic, but it will stop qualified leads from being lost after they arrive. If the offer and traffic quality are sound, automation reduces the gap between a lead arriving and a team member acting on it.',
        },
        {
          question: 'What integrations does Devacia support for automation?',
          answer:
            'The exact integrations depend on your current setup. Common layers include web forms (including custom Next.js and WordPress forms), notification delivery (email, Telegram, messaging APIs), database storage (MongoDB, PostgreSQL), booking tools (Calendly, custom booking flows), and basic CRM-lite pipelines. We work from what the business already uses rather than forcing a new software stack.',
        },
        {
          question: 'How long does it take to build a business automation system?',
          answer:
            'A focused automation layer — such as a lead-routing form connected to a notification pipeline and a tracking dashboard — typically takes 3–6 weeks depending on the integration points, approval loops, and data structure. Larger systems with multi-stage routing, CRM-lite features, or full booking flows take longer. We scope delivery before committing to a timeline.',
        },
        {
          question: 'What does a business automation project cost?',
          answer:
            'Scope and price depend on the number of integration points, the complexity of routing logic, and whether you need a full internal dashboard or a lighter notification layer. Devacia works on project-scoped engagements rather than hourly billing. Indicative ranges for international projects typically start around USD 2,000 for simpler flows and scale with complexity. India-first projects are priced separately based on scope.',
        },
        {
          question: 'Can you build automation into an existing website without rebuilding it?',
          answer:
            'In most cases, yes. Automation layers — such as form-to-notification pipelines, booking integrations, or internal dashboards — can connect to an existing website through APIs and webhook endpoints without requiring a full rebuild. We assess what the current site can support before recommending whether a change to the frontend is needed.',
        },
      ],
      links: [
        { href: '/onboarding', label: 'Talk about business automation', variant: 'primary' },
        { href: '/services/custom-software-development', label: 'Explore software systems' },
        { href: '/services/website-support-maintenance', label: 'See support and maintenance help' },
      ],
    },
  },
  landingPageDesign: {
    path: '/services/landing-page-design',
    breadcrumbName: 'Landing Page Design',
    metadata: {
      title: 'High-Converting Landing Page Design Agency | Next.js & Webflow | Devacia',
      description:
        'Devacia designs conversion-focused landing pages engineered for paid ads, launch funnels, and organic lead generation. Sub-second load speed, custom copywriting, server-side conversion tracking, and CRM routing.',
      keywords: [
        'high converting landing page design agency',
        'conversion focused landing page design',
        'lead generation landing page agency',
        'nextjs landing page development',
        'paid ads landing page design',
        'meta ads landing page optimization',
        'google ads landing page agency',
      ],
    },
    schema: {
      name: 'Conversion-Focused Landing Page Design',
      description:
        'Custom landing page design and development engineered for high conversion rates, fast Core Web Vitals, and verified tracking integration.',
      serviceType: 'Landing Page Design',
      catalogItems: [
        { name: 'Lead Generation Landing Page Systems' },
        { name: 'Ad Campaign & Funnel Landing Pages' },
        { name: 'D2C & Ecommerce Launch Landing Pages' },
        { name: 'Server-Side Conversion Tracking & CAPI Setup' },
        { name: 'Conversion Rate Optimization (CRO) & Testing' },
      ],
    },
    content: {
      eyebrow: 'Landing Page Design',
      title: 'Landing page design for campaigns that need the click to turn into action.',
      intro:
        'A landing page succeeds when the click promise, the message, the trust layer, and the CTA all stay aligned. Devacia builds pages that do that for leads, bookings, launches, and campaign traffic.',
      directAnswer: {
        title: 'This page is for teams paying for attention and wanting better conversion from it.',
        body: 'We design landing pages around one outcome at a time: lead capture, consultation booking, purchase intent, or waitlist action. That focus helps the page answer the real buyer objection faster and reduce wasted traffic.',
      },
      bestFor: [
        'Businesses running Meta Ads, Google Ads, or campaign-specific traffic',
        'Service companies needing lead-generation pages for one offer or funnel',
        'Ecommerce or D2C brands launching products or promotions',
        'Teams that need message-match between ad, page, proof, and CTA',
      ],
      notFit: [
        'Businesses that want the main website to act like every campaign page at once',
        'Offers that are still unclear, weak, or not ready for paid or launch traffic',
        'Teams looking only for design polish without fixing the conversion story',
      ],
      highlights: [
        {
          title: 'Message-match',
          body: 'The page answers the promise of the click so the visitor does not feel like they landed in the wrong place.',
        },
        {
          title: 'Trust-first flow',
          body: 'Proof, positioning, objection handling, and CTA clarity are shaped around one buyer decision.',
        },
        {
          title: 'Measurement-ready',
          body: 'Landing pages are set up with tracking and event logic so performance can be improved instead of guessed.',
        },
        {
          title: 'Funnel alignment',
          body: 'The landing page, follow-up, and campaign logic can work together instead of being optimized in isolation.',
        },
        {
          title: 'Sub-second mobile speed',
          body: 'Built using lightweight modern code (Next.js or clean block code) to pass Core Web Vitals, ensuring lower bounce rates and lower paid ad CPCs.',
        },
        {
          title: 'Server-side tracking & CAPI',
          body: 'Integrated with Meta Conversions API and Google Tag Manager to capture attribution accurately despite browser ad-blockers and privacy restrictions.',
        },
      ],
      process: [
        {
          title: 'Clarify the intent',
          body: 'We define what the visitor searched, clicked, or was promised before they hit the page.',
        },
        {
          title: 'Build the page around one action',
          body: 'The copy, proof, layout, and CTA all support one outcome so the page stays focused.',
        },
        {
          title: 'Launch and iterate',
          body: 'Tracking and post-launch review turn the page into a living conversion asset instead of a static design file.',
        },
      ],
      proof: {
        title: 'Landing pages convert when they reduce hesitation faster than they create it.',
        body: 'Devacia uses landing pages as part of larger systems: lead generation, ecommerce campaigns, coaching funnels, and ad-to-website journeys where buyer momentum matters.',
        points: [
          'Relevant for lead gen, launch funnels, ecommerce campaigns, and paid traffic systems',
          'Pairs well with performance marketing, automation, and broader website improvements',
          'Built for clarity, trust, speed, and measurable next steps',
          'Delivered with complete source code ownership and zero builder platform lock-in',
        ],
      },
      faqs: [
        {
          question: 'How is a landing page different from a normal website page?',
          answer:
            'A landing page is designed around one specific action and one targeted traffic source. It eliminates extraneous navigation menus, aligns tightly with the ad hook, and addresses buyer objections in a single continuous scroll.',
        },
        {
          question: 'What technology stack do you use to build landing pages?',
          answer:
            'We typically develop landing pages using Next.js and Tailwind CSS for custom codebases to deliver sub-second Core Web Vitals scores. For clients operating on WordPress, we build custom Gutenberg block landing pages that internal marketing teams can easily clone and adapt.',
        },
        {
          question: 'How do you handle conversion tracking and analytics?',
          answer:
            'Every landing page comes pre-wired with Google Tag Manager, GA4 custom event tracking (form start, step progression, calendar open, submission), and Meta Conversions API (CAPI) server-side tracking to ensure complete attribution integrity.',
        },
        {
          question: 'Do you provide conversion copywriting or only design?',
          answer:
            'We provide full conversion copywriting. Visual aesthetics without strategic messaging rarely convert. We analyze your competitors, define objection-handling frameworks, and write the headline, body, and micro-copy before laying out UI.',
        },
        {
          question: 'What is the typical turnaround time for a custom landing page?',
          answer:
            'A dedicated custom landing page project typically requires 7 to 14 business days from initial strategy alignment to final deployment, including responsive testing and conversion tracking verification.',
        },
        {
          question: 'Can the landing page connect directly to our CRM or team email?',
          answer:
            'Yes. Form submissions can route directly to HubSpot, Zoho, Google Sheets, or custom webhook endpoints, alongside automated real-time notification alerts sent to your team via email or Telegram.',
        },
        {
          question: 'Do landing pages work without rebuilding the entire website?',
          answer:
            'Yes. A high-converting campaign landing page can live on a dedicated subdomain or standalone route (e.g., devacia.com/onboarding or a promotional slug) to drive campaign revenue immediately without waiting for a full website overhaul.',
        },
      ],
      links: [
        { href: '/onboarding', label: 'Plan a landing page project', variant: 'primary' },
        { href: '/services/performance-marketing', label: 'See performance marketing support' },
        { href: '/problems/why-your-website-is-not-converting', label: 'Read the conversion problem guide' },
      ],
    },
  },
  websiteSupportMaintenance: {
    path: '/services/website-support-maintenance',
    breadcrumbName: 'Website Support and Maintenance',
    metadata: {
      title: 'Website Support & Maintenance Services in India | WordPress, Next.js & Shopify | Devacia',
      description:
        'Devacia provides proactive website support, maintenance, and performance optimization for WordPress, Shopify, and custom Next.js websites. Security patching, Core Web Vitals fixes, broken flow repair, and agreed SLAs.',
      keywords: [
        'website support and maintenance services',
        'wordpress maintenance company india',
        'website maintenance retainer',
        'fix broken website service',
        'website speed optimization service',
        'shopify store maintenance support',
        'core web vitals maintenance service',
      ],
    },
    schema: {
      name: 'Website Support and Maintenance Services',
      description:
        'Proactive website support, security patching, Core Web Vitals optimization, and maintenance retainers for WordPress, Shopify, and custom web applications.',
      serviceType: 'Website Support and Maintenance',
      catalogItems: [
        { name: 'Core Web Vitals & Speed Optimization' },
        { name: 'Security Patching & Offsite Cloud Backups' },
        { name: 'WordPress & Shopify Routine Maintenance' },
        { name: 'Broken Page & Form Conversion Rescue' },
        { name: 'Monthly Website Engineering Retainers' },
      ],
    },
    content: {
      eyebrow: 'Website Support and Maintenance',
      title: 'Website maintenance and management services in India',
      intro:
        'If the site is slow, unstable, outdated, or quietly leaking leads, you do not just have a technical issue. You have a business issue. Devacia helps teams stabilize the website layer before it keeps costing them trust and revenue.',
      directAnswer: {
        title: 'This service is for fixing the website before the damage becomes normal.',
        body: 'We support businesses dealing with downtime, broken pages, weak mobile experience, messy updates, declining performance, and websites that no longer match current business needs. The goal is stability first, then improvement.',
      },
      bestFor: [
        'Businesses with an existing website that keeps breaking, slowing down, or aging poorly',
        'Teams that need cleanup before investing in a full rebuild',
        'Operators who want one technical partner for fixes, updates, and performance improvements',
        'Brands that need website support connected to SEO, conversion, and growth priorities',
      ],
      notFit: [
        'Emergency server-only incidents where the hosting provider must act first',
        'Projects that need a full product build rather than support or maintenance',
        'Businesses unwilling to address the structural issues causing repeated failures',
      ],
      highlights: [
        {
          title: 'Stability first',
          body: 'We prioritize the issues hurting the business now: broken pages, weak forms, slow experiences, and risky setup problems.',
        },
        {
          title: 'Performance cleanup',
          body: 'Speed, mobile UX, and technical friction are addressed so the site stops losing trust before the message even lands.',
        },
        {
          title: 'Maintenance with context',
          body: 'Updates and support are handled with awareness of SEO, lead flow, and the wider business goals of the site.',
        },
        {
          title: 'Upgrade decisions',
          body: 'We help decide whether the site needs repair, restructuring, or a full rebuild instead of guessing.',
        },
        {
          title: 'Staging-first updates',
          body: 'All core CMS updates, plugin upgrades, and custom code modifications are rigorously tested on private staging servers before deployment to protect live business operations.',
        },
        {
          title: 'Offsite backups & rollback',
          body: 'Automated daily or weekly offsite backups ensure that if a hosting or server incident occurs, complete disaster recovery rollback is available within hours.',
        },
      ],
      process: [
        {
          title: 'Triage the risk',
          body: 'We separate urgent failures from deeper structural problems so the right work happens in the right order.',
        },
        {
          title: 'Stabilize the website layer',
          body: 'Broken, slow, or weak components are repaired with minimal disruption to the existing business flow.',
        },
        {
          title: 'Plan the next move',
          body: 'Once stable, we identify whether ongoing maintenance, conversion upgrades, or a larger rebuild makes the most sense.',
        },
      ],
      proof: {
        title: 'Support work matters most when it protects trust, not just uptime.',
        body: 'Devacia treats support as part of the commercial website layer. That means fixes are prioritized around user experience, lead flow, and business impact instead of only ticking technical boxes.',
        points: [
          'Useful when the current website is underperforming but not ready to be replaced immediately',
          'Can bridge into rebuilds, landing pages, SEO cleanup, or software work later',
          'Strong fit for service businesses, ecommerce teams, and growth-focused sites',
          'Supported by experienced engineers who understand both frontend code and business operations',
        ],
      },
      faqs: [
        {
          question: 'What platforms do you support for website maintenance?',
          answer:
            'We provide ongoing maintenance and support for WordPress (custom themes, WooCommerce, and standard builds), Shopify storefronts, and custom React / Next.js web applications.',
        },
        {
          question: 'What is your response time for emergency website issues?',
          answer:
            'For critical issues affecting checkout, form submissions, or total downtime, our retainer response SLA is within 2 to 4 hours. Non-urgent content changes or routine improvements are processed within 24 to 48 business hours.',
        },
        {
          question: 'Are updates tested before being applied to the live site?',
          answer:
            'Yes, always. We clone the environment to a staging URL to test plugin updates, theme patches, and database migrations. Live production deployments only happen after testing checkout, form flow, and layout integrity.',
        },
        {
          question: 'Can Devacia fix a website that is already live and broken?',
          answer:
            'Yes. We provide emergency triage to identify root causes: plugin conflicts, DNS misconfigurations, PHP memory exhaustion, broken SSL certificates, or broken payment webhooks.',
        },
        {
          question: 'What is typically included in a monthly maintenance retainer?',
          answer:
            'Retainers typically include routine core and security updates, automated offsite cloud backups, uptime and Core Web Vitals monitoring, form submission audits, small design or copy tweaks, and monthly health reports.',
        },
        {
          question: 'Do I need a full rebuild if the website is slow or unstable?',
          answer:
            'Not necessarily. Many slow websites can be significantly improved by removing bloated third-party scripts, optimizing image delivery, configuring CDN edge caching, and tuning database queries without rebuilding from scratch.',
        },
        {
          question: 'How do backups and disaster recovery rollbacks work?',
          answer:
            'We configure automated offsite backups stored independently of your primary web host. In the event of catastrophic server failure or security breach, we can restore the website to its last known healthy state rapidly.',
        },
      ],
      links: [
        { href: '/onboarding', label: 'Request website support', variant: 'primary' },
        { href: '/problems/website-is-broken-or-down', label: 'See the broken website guide' },
        { href: '/problems/website-is-slow-and-losing-sales', label: 'See the slow website guide' },
      ],
    },
  },
};

export const problemLandingPages = {
  websiteBrokenOrDown: {
    path: '/problems/website-is-broken-or-down',
    breadcrumbName: 'Website Is Broken or Down',
    metadata: {
      title: 'Website Is Broken or Down? What to Check and What to Fix First | Devacia',
      description:
        'If your website is broken or down, the priority is to stop the damage, identify whether the issue is hosting, code, updates, or forms, and recover the site without making it worse.',
      keywords: [
        'website is broken',
        'website is down',
        'my website is not working',
        'fix broken website',
        'website down support',
      ],
    },
    schema: {
      name: 'Website Is Broken or Down',
      description:
        'A problem page for businesses dealing with broken, down, or unstable websites and needing the right recovery and support path.',
      about: [
        'website is broken',
        'website is down',
        'website support',
        'website maintenance',
        'fix website issues',
      ],
      keywords: [
        'website is broken',
        'website is down',
        'my website is not working',
        'fix broken website',
      ],
    },
    content: {
      eyebrow: 'Urgent Website Problem',
      title: 'If your website is broken or down, fix the damage path first, not just the symptom.',
      intro:
        'A broken website usually hurts trust long before someone reports it. If the form is dead, the mobile experience is broken, or the site is completely down, the first job is to recover stability and identify what actually caused the failure.',
      directAnswer: {
        title: 'Most website failures trace back to one of four layers.',
        body: 'The issue is usually hosting or infrastructure, a bad update, broken page logic, or a neglected website that has been slowly getting weaker until the failure becomes visible. The response changes depending on which layer failed.',
      },
      bestFor: [
        'Businesses whose live website is down, unstable, or visibly broken',
        'Teams that need help understanding whether they need support, maintenance, or a full rebuild',
        'Founders who cannot afford to let forms, bookings, or key landing pages stay unreliable',
      ],
      notFit: [
        'Pure hosting emergencies that require server-provider action before application work can begin',
        'Cases where the only requirement is a one-off content edit with no technical issue',
        'Teams expecting speed fixes without addressing the underlying technical debt',
      ],
      highlights: [
        {
          title: 'Stabilize first',
          body: 'Identify whether the failure is downtime, a broken customer path, or a broader code and update issue.',
        },
        {
          title: 'Protect conversions',
          body: 'Forms, calls, bookings, and core landing pages usually matter more than fixing every small issue first.',
        },
        {
          title: 'Find the root cause',
          body: 'If the same class of issue can happen again, the site needs more than a patch. It needs a cleaner support plan.',
        },
        {
          title: 'Decide the next layer',
          body: 'After recovery, the right answer may be support, maintenance, speed work, or a deeper website rebuild.',
        },
      ],
      process: [
        {
          title: 'Triage the business risk',
          body: 'We identify what is broken, what buyers are seeing, and which failure is costing the business most right now.',
        },
        {
          title: 'Recover stability',
          body: 'The next step is to restore the key website path without introducing riskier changes than the problem requires.',
        },
        {
          title: 'Plan prevention',
          body: 'Once stable, the website needs a cleaner maintenance, support, or rebuild path so the same issue does not return.',
        },
      ],
      proof: {
        title: 'The best recovery plan is not the fastest patch. It is the fix that stops repeat damage.',
        body: 'Devacia approaches broken-website work with a commercial lens. The website needs to become dependable again, but it also needs to stop quietly damaging trust, SEO, and lead flow after the visible issue is patched.',
        points: [
          'Useful for websites affecting calls, forms, bookings, sales, or brand trust',
          'Can connect directly into support, maintenance, or rebuild work',
          'Especially relevant for businesses relying on the site for real enquiries or revenue',
        ],
      },
      faqs: [
        {
          question: 'What should I check first if my website is down?',
          answer:
            'Start by checking whether the site is completely unreachable, whether only some pages are broken, whether forms or checkout are failing, and whether a recent update or hosting issue triggered it.',
        },
        {
          question: 'Can Devacia help if the website is not fully down but key pages are broken?',
          answer:
            'Yes. A website can still be commercially broken even when it technically loads. Dead forms, broken mobile sections, and unstable landing pages still need urgent attention.',
        },
        {
          question: 'Should I rebuild the site if it keeps breaking?',
          answer:
            'If the failures come from deeper structural problems, repeated patches may cost more than a planned cleanup or rebuild. The right answer depends on the underlying cause and how central the site is to growth.',
        },
      ],
      links: [
        { href: '/onboarding', label: 'Request support now', variant: 'primary' },
        { href: '/services/website-support-maintenance', label: 'See support and maintenance' },
        { href: '/services/website-development', label: 'Plan a stronger rebuild path' },
      ],
    },
  },
  websiteSlowAndLosingSales: {
    path: '/problems/website-is-slow-and-losing-sales',
    breadcrumbName: 'Website Is Slow and Losing Sales',
    metadata: {
      title: 'Website Is Slow and Losing Sales? Fix Speed, UX, and Trust Leaks | Devacia',
      description:
        'If your website is slow and hurting leads or sales, the problem usually touches performance, mobile UX, page weight, code quality, and the buyer path itself.',
      keywords: [
        'website is slow and losing sales',
        'slow website losing leads',
        'website speed optimization service',
        'slow ecommerce website',
        'slow website conversion problems',
      ],
    },
    schema: {
      name: 'Website Is Slow and Losing Sales',
      description:
        'A problem page for businesses dealing with slow websites, poor mobile experience, and revenue loss caused by performance friction.',
      about: [
        'slow website',
        'website speed optimization',
        'slow ecommerce website',
        'website conversion problems',
      ],
      keywords: [
        'website is slow and losing sales',
        'slow website losing leads',
        'slow ecommerce website',
      ],
    },
    content: {
      eyebrow: 'Performance Problem',
      title: 'If your website is slow and losing sales, speed is usually only half the problem.',
      intro:
        'A slow website does not just hurt load time. It makes trust weaker, breaks the buyer rhythm, and causes people to leave before the offer, the proof, or the CTA have a chance to do their job.',
      directAnswer: {
        title: 'Website speed problems usually sit inside a bigger conversion problem.',
        body: 'Heavy pages, unstable code, oversized media, weak mobile structure, and cluttered templates all slow the experience down. But the revenue loss gets worse when the page also has weak clarity, weak trust, or a weak next step.',
      },
      bestFor: [
        'Ecommerce and lead-generation websites with weak mobile speed or high bounce behaviour',
        'Businesses noticing that landing pages feel heavy, unstable, or inconsistent',
        'Teams that need a clearer answer on whether to optimize the current site or rebuild it properly',
      ],
      notFit: [
        'Projects where the main issue is purely hosting downtime rather than page performance',
        'Sites with no meaningful traffic or conversion path yet',
        'Teams that want cosmetic tweaks without addressing the page architecture causing the weight',
      ],
      highlights: [
        {
          title: 'Page-weight problems',
          body: 'Images, video, scripts, fonts, and overloaded sections can silently make the page harder to use than it looks in a design review.',
        },
        {
          title: 'Mobile friction',
          body: 'A page can feel acceptable on desktop and still lose most of its buyers on mobile because of heavy layout or delayed interactivity.',
        },
        {
          title: 'Speed-to-conversion link',
          body: 'Performance matters because it shapes trust, attention, and how quickly the user reaches the decision point.',
        },
        {
          title: 'Repair versus rebuild',
          body: 'Some sites need optimization. Others are so structurally heavy that a smarter rebuild is the better commercial decision.',
        },
      ],
      process: [
        {
          title: 'Find the bottlenecks',
          body: 'We identify whether the problem comes from assets, rendering, page structure, integrations, or the template system itself.',
        },
        {
          title: 'Fix what hurts the buyer first',
          body: 'The goal is not just a better technical score. It is a page that feels faster, clearer, and easier to trust.',
        },
        {
          title: 'Decide the long-term path',
          body: 'If the performance gains are limited by the current architecture, the next step may be a more intentional rebuild.',
        },
      ],
      proof: {
        title: 'Fast pages win because they protect momentum.',
        body: 'Devacia treats speed as part of the full website system. That means improving performance while also protecting structure, trust, messaging, and the conversion path the business depends on.',
        points: [
          'Relevant for ecommerce stores, service websites, funnels, and campaign landing pages',
          'Pairs naturally with website support, landing pages, and full rebuild work',
          'Helpful for both SEO and conversion performance instead of treating them separately',
        ],
      },
      faqs: [
        {
          question: 'Can a slow website affect SEO and conversions at the same time?',
          answer:
            'Yes. A slow site can make crawling, engagement, and buyer confidence weaker, which often affects both search performance and lead or sales performance.',
        },
        {
          question: 'How do I know if I need optimization or a rebuild?',
          answer:
            'If the site is structurally bloated, held together by too many patches, or impossible to simplify cleanly, a rebuild can be a better long-term decision than endless optimization work.',
        },
        {
          question: 'Does Devacia work on speed for WordPress, Shopify, and custom websites?',
          answer:
            'Yes. The exact approach changes by stack, but the business problem around slow pages and lost intent exists across all three.',
        },
      ],
      links: [
        { href: '/onboarding', label: 'Get a speed and conversion review', variant: 'primary' },
        { href: '/services/website-support-maintenance', label: 'See maintenance support' },
        { href: '/services/landing-page-design', label: 'Improve landing-page conversion' },
      ],
    },
  },
};

export const compareLandingPages = {
  chooseWebDevelopmentAgency: {
    path: '/compare/how-to-choose-a-web-development-agency',
    breadcrumbName: 'How to Choose a Web Development Agency',
    metadata: {
      title: 'How to Choose a Web Development Agency | What to Check Before You Hire | Devacia',
      description:
        'Learn how to choose a web development agency by checking proof, process, platform fit, communication quality, technical depth, and whether the team can support real business outcomes.',
      keywords: [
        'how to choose a web development agency',
        'best web development agency for startups',
        'what to ask a web development agency',
        'how to hire website development company',
        'agency selection for website development',
      ],
    },
    schema: {
      name: 'How to Choose a Web Development Agency',
      description:
        'A decision-stage guide for businesses choosing a web development agency for websites, ecommerce, software, and growth systems.',
      about: [
        'how to choose a web development agency',
        'agency evaluation',
        'website development company selection',
        'startup agency partner',
      ],
      keywords: [
        'how to choose a web development agency',
        'what to ask a web development agency',
        'how to hire website development company',
      ],
    },
    content: {
      eyebrow: 'Agency Comparison Guide',
      title: 'How to choose a web development agency when the real risk is hiring the wrong kind of team.',
      intro:
        'The decision is not just about portfolio aesthetics. It is about whether the agency understands your buyer journey, technical constraints, future growth path, and the business outcome the website or system needs to support.',
      directAnswer: {
        title: 'A good agency matches scope, stack, and business intent without hiding behind vague process language.',
        body: 'The strongest agency partner can explain what should be built, what should not be built yet, how the project will be delivered, and what evidence supports their recommendations. That clarity matters more than flashy promises.',
      },
      bestFor: [
        'Founders choosing a partner for a business-critical website or product build',
        'Brands comparing agencies for ecommerce, landing pages, or software work',
        'Teams that need a web partner with both technical depth and commercial awareness',
      ],
      notFit: [
        'Businesses shopping only on the cheapest possible quote',
        'Teams that want an agency to say yes to every feature without challenging the scope',
        'Projects where no one has defined the core business objective yet',
      ],
      highlights: [
        {
          title: 'Relevant proof',
          body: 'Look for case studies that show similar business problems, not just generic design screenshots.',
        },
        {
          title: 'Platform honesty',
          body: 'A strong partner explains why WordPress, Shopify, or custom is right instead of forcing every project into one stack.',
        },
        {
          title: 'Delivery clarity',
          body: 'Ask how feedback, timelines, revisions, testing, and launch responsibility are handled before you sign.',
        },
        {
          title: 'Growth readiness',
          body: 'The website should support SEO, landing pages, analytics, and future systems instead of getting replaced too soon.',
        },
      ],
      process: [
        {
          title: 'Define the business outcome',
          body: 'Know whether the website needs to generate leads, support sales, run ecommerce, or enable operations before you compare agencies.',
        },
        {
          title: 'Test their thinking',
          body: 'Ask what they would challenge, what they would simplify, and what they would prioritise first. Good agencies do not hide behind jargon.',
        },
        {
          title: 'Check the long-term fit',
          body: 'The right partner can still support you when the project grows into landing pages, software, automation, or post-launch optimization.',
        },
      ],
      proof: {
        title: 'The best agency choice usually comes from clarity, not from hype.',
        body: 'Devacia positions itself as a partner for high-performance websites, custom software, and connected growth systems. That helps businesses who need one team to think across the website, the system behind it, and the commercial outcome it supports.',
        points: [
          'Useful for businesses comparing design-only agencies against more technical partners',
          'Relevant for India-first buyers and remote US engagements alike',
          'Strong fit when the project touches website, software, and growth together',
        ],
      },
      faqs: [
        {
          question: 'What should I ask a web development agency before hiring them?',
          answer:
            'Ask how they define scope, what platform they would recommend and why, what proof they have for similar problems, how launch and revisions work, and what happens after the site goes live.',
        },
        {
          question: 'How do I know if an agency understands business outcomes and not just design?',
          answer:
            'A strong agency talks about buyer intent, conversions, trust, performance, content structure, measurement, and operational impact instead of only talking about visuals.',
        },
        {
          question: 'Is it better to hire one partner for website, software, and growth systems?',
          answer:
            'It often is when those layers need to work together. The more tightly connected the website, funnel, and internal workflow are, the more valuable integrated thinking becomes.',
        },
      ],
      links: [
        { href: '/onboarding', label: 'Talk through your project fit', variant: 'primary' },
        { href: '/service', label: 'Explore Devacia services' },
        { href: '/case-study', label: 'Review case studies and proof' },
      ],
    },
  },
};

