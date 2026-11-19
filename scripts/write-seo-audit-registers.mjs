import fs from 'node:fs/promises';
import { industryPages } from '../src/content/industriesData.js';

const read = async name => JSON.parse(await fs.readFile(`docs/seo/evidence/${name}`,'utf8'));
const inventory = await read('route-inventory-before-2026-10-07.json');
const local = await read('url-http-local-2026-10-07.json');
const live = await read('url-http-production-2026-10-07.json');
const research = await read('industry-intent-research-2026-10-07.json');
const localBy = new Map(local.reports.map(row=>[row.route,row]));
const liveBy = new Map(live.reports.map(row=>[row.route,row]));
const escape = value => String(value || '').replaceAll('|','\\|').replaceAll('\n',' ');
const register = ['# Devacia URL register — 7 October 2026','','Current local build and HTTP evidence. Production checks cover 25 priority endpoints only; “not checked” is not a failure. Static incoming counts include shared navigation and alias artifacts, not unique editorial endorsements. Redirect artifacts are excluded from content-issue interpretation.','','| URL | Local HTTP | Production HTTP | Canonical or redirect destination | Static incoming sources | Title | Findings |','| --- | --- | --- | --- | ---: | --- | --- |'];
for (const row of inventory.routes.sort((a,b)=>a.route.localeCompare(b.route))) {
  const l=localBy.get(row.route);const p=liveBy.get(row.route);
  const redirected=l?.status>=300&&l?.status<400;
  const issues=redirected?'Redirect; ignore static artifact content warnings':row.issues.length?row.issues.join('; '):'No issue in audited static checks';
  register.push(`| ${row.route} | ${l?.status || l?.error || 'not checked'} | ${p?.status || p?.error || 'not checked'} | ${escape(l?.location || row.canonical.join(', '))} | ${row.incoming?.length ?? '—'} | ${escape(row.title)} | ${escape(issues)} |`);
}
register.push('','## Additional URLs checked over HTTP','','| URL | Status | Redirect |','| --- | --- | --- |');
const built = new Set(inventory.routes.map(row=>row.route));
for (const row of local.reports.filter(row=>!built.has(row.route)).sort((a,b)=>a.route.localeCompare(b.route))) register.push(`| ${row.route} | ${row.status || row.error} | ${row.location || '—'} |`);
register.push('','## Main intent ownership','','| Intent | Primary destination | Boundary |','| --- | --- | --- |',
'| Custom business website | /services/website-development | Parent offer; link to specific industries |',
'| Industry selection | /industries | Navigational directory, not twelve repeated service descriptions |',
'| Ecommerce transactions | /services/ecommerce-website-development | Declared new canonical; reconcile old /services/ecommerce migration |',
'| Website redesign and migration | /services/website-redesign | Clarify competing /services/rebranding promise |',
'| Brand positioning and identity | /services/rebranding | Keep separately only if the actual service is distinct from redesign |',
'| WordPress/CMS procurement | /services/wordpress-development | Platform decision, not a second corporate/industry page |',
'| Shopify procurement | /services/shopify-development | Platform-specific evidence required |',
'| Software and operational portals | /services/custom-software-development | Complex workflows, not automatically included in a website quote |',
'| Google/Meta paid acquisition | /services/performance-marketing | Paid-media offer; organic traffic is not ad performance proof |',
'| AI search visibility services | /services/generative-engine-optimization | No guaranteed citations or proprietary ranking metric claims |');
await fs.writeFile('docs/seo/URL_REGISTER_2026-10-07.md',register.join('\n')+'\n');

const map=['# Devacia industry intent map — 7 October 2026','','Thirty-six analyst-selected keyword candidates across twelve existing industry pages. These are not measured volume, difficulty or ranking data. Semrush returned no_api_units. Search results were not collected in a controlled Google locale, so no Google position is claimed. All local industry URLs returned 200; all twelve returned public 404 at this audit.','','Provider pages substantiate their published positioning only; their outcome, price and superiority claims have not been independently verified. Competitor claims are not copied into Devacia promises.','','| Industry | Canonical route | Current title | Current search focus |','| --- | --- | --- | --- |'];
for(const item of research.industries){const page=industryPages[item.key];map.push(`| ${escape(page.name)} | ${page.path} | ${escape(page.meta.title)} | ${escape(page.searchFocus)} |`);}
let counter=1;
for(const item of research.industries){
  const page=industryPages[item.key];
  map.push('',`## ${page.name}`,'',`Primary destination: ${page.path}`,'',`Buyer decision: ${item.intent}`,'','| Research ID | Candidate | Intent hypothesis | Volume / organic difficulty |','| --- | --- | --- | --- |');
  for(const cluster of item.clusters){const intent=cluster.intent==='cost-or-comparison'&&!/cost|price|vs|comparison/i.test(cluster.candidate)?'hire-variant':cluster.intent;map.push(`| N${String(counter++).padStart(3,'0')} | ${cluster.candidate} | ${intent} | Unknown / unknown |`);}
  map.push('',`Source: [provider page](${item.source}). Access: ${item.sourceStatus}. Observed on 7 October 2026.`,'',`Published offer observation: ${item.observation}`,'',`Recommended improvement: ${item.recommendation}`,'',`Exclude or separate: ${item.exclude}.`,'',`Internal links: main website-development offer → ${page.path}; this page → /onboarding, its verified project evidence (${page.evidence.workHref}), and the relevant scope/service page. Retain the existing related-industry links when useful.`);
  if(item.previousKeywordIds.length)map.push('',`Related original research IDs: ${item.previousKeywordIds.join(', ')}. These are cross-references, not exact-match or demand claims. K071 concerns white-label fulfilment and must remain a separate buying intent from an agency's own website.`.replace(item.key==='agencies'?'__NONE__':' K071 concerns white-label fulfilment and must remain a separate buying intent from an agency\'s own website.',''));
  map.push('','Page decision: improve the existing page; do not create extra keyword slugs from these candidates. Add cost/integration/ownership answers to this page when useful. A separate comparison article requires a distinct decision and substantive evidence.');
}
map.push('','## Semrush validation queue','','When API units are available, query the India database for the retained hiring and cost candidates first. Preserve database, date, exact phrase, provider-reported volume, KD, intent and source report. Zero/missing coverage must not be relabelled zero customer demand. Inspect competing URLs for the strongest candidates before committing new pages. Separate estimates from Devacia GSC observations and avoid summing overlapping keyword variants.');
await fs.writeFile('docs/seo/INDUSTRY_INTENT_MAP_2026-10-07.md',map.join('\n')+'\n');
console.log(JSON.stringify({staticRoutes:inventory.count,localUrls:local.count,productionUrls:live.count,industries:research.industries.length,candidates:counter-1}));
