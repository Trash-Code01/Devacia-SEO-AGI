import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {parseDocument} from 'htmlparser2';
import {articleCorrections} from './content/indexing-article-corrections-2026-10-12.mjs';
import {canonicalIndustryPages} from '../src/seo/industryCatalog.js';
const origin=process.argv[2]||'http://127.0.0.1:3102';
const paths=process.argv.includes('--articles-only')?[]:[
 ['/services/website-development','Explore website development for your industry','/industries/education-coaching-website-development'],
 ['/locations/india/prayagraj/civil-lines-digital-marketing','Serving Civil Lines from our Kareli base.','/industries/education-coaching-website-development'],
 ['/services/lead-generation-websites','Acceptance checks and ownership','/industries/hvac-home-services-website-development'],
 ['/services/startup-mvp-development','MVP','/blog/fix-it-fast/startup-mvp-checklist'],
 ['/services/performance-marketing','Diagnose a High Bounce Rate in GA4','/blog/performance-marketing/high-website-bounce-rate-fix'],
 ['/problems/why-your-website-is-not-converting','Check the journey before commissioning a redesign','/services/lead-generation-websites'],
 ['/solutions/custom-booking-systems','Salon appointments','/industries/salon-spa-website-development'],
 ['/blog/performance-marketing','Find where traffic stops becoming business','/services/landing-page-design'],
];
const walk=n=>[n,...(n.children||[]).flatMap(walk)];
const content=n=>['script','style'].includes(n.name)?'':n.type==='text'?n.data:(n.children||[]).map(content).join(' ');
const clean=s=>s.replace(/\s+/g,' ').trim();
const evidence=[];
for(const [path,expected,href] of [...paths,...articleCorrections.map(p=>[`/blog/${p.category}/${p.slug}`,p.fields.title,p.fields.primaryServiceHref])]){
 const response=await fetch(origin+path,{signal:AbortSignal.timeout(60000)});assert.equal(response.status,200,path);
 const html=await response.text();const nodes=walk(parseDocument(html));const text=clean(content(parseDocument(html)));
 assert.equal(nodes.filter(n=>n.name==='h1').length,1,`${path}: H1`);
 assert.equal(nodes.filter(n=>n.name==='main').length,1,`${path}: main`);
 const canonicals=nodes.filter(n=>n.name==='link'&&n.attribs.rel==='canonical');assert.equal(canonicals.length,1,path);assert.equal(canonicals[0].attribs.href,'https://www.devacia.com'+path,path);
 assert.ok(!nodes.some(n=>n.name==='meta'&&n.attribs.name==='robots'&&n.attribs.content?.includes('noindex')),path);
 assert.ok(!response.headers.get('x-robots-tag')?.includes('noindex'),path);
 assert.ok(text.includes(expected),`${path}: updated visible copy`);
 assert.ok(nodes.some(n=>n.name==='a'&&n.attribs.href===href),`${path}: contextual link`);
 if(path==='/services/website-development') {
  for(const page of canonicalIndustryPages) assert.ok(nodes.some(n=>n.name==='a'&&n.attribs.href===page.path),`${page.path}: present before hydration`);
  assert.ok(nodes.some(n=>n.attribs?.id==='industries'),'Industry links have a working section anchor');
 }
 if(path.endsWith('/civil-lines-digital-marketing')) {
  assert.ok(!/rank #1|instant-loading|predictably fill|fills your batches/i.test(text),'No unsupported ranking or admissions promises');
  const calls=nodes.filter(n=>n.name==='a'&&clean(content(n)).includes('Book a Strategy Call'));
  assert.ok(calls.length>0&&calls.every(n=>n.attribs.href==='/onboarding'),'Strategy CTAs use the existing onboarding flow');
 }
 const schemas=nodes.filter(n=>n.name==='script'&&n.attribs.type==='application/ld+json').flatMap(n=>{const data=JSON.parse(n.children.map(c=>c.data||'').join(''));return data['@graph']||[data];});
 for(const q of schemas.filter(s=>s['@type']==='FAQPage').flatMap(s=>s.mainEntity||[])){assert.ok(text.includes(clean(q.name)),path);assert.ok(text.includes(clean(q.acceptedAnswer.text)),path);}
 evidence.push({path,status:response.status,canonical:canonicals[0].attribs.href,updatedCopy:true,contextualLink:true,faqMatches:true});
 console.log('PASS '+path);
}
const xml=await (await fetch(origin+'/sitemap.xml',{signal:AbortSignal.timeout(60000)})).text();
for(const p of articleCorrections){const url='https://www.devacia.com/blog/'+p.category+'/'+p.slug;const block=[...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>m[1]).find(s=>s.includes(url));assert.ok(block&&block.includes('2026-10-12'),`${url}: updated sitemap date`);}
await fs.mkdir('.tmp',{recursive:true});await fs.writeFile('.tmp/indexing-remediation-verification.json',JSON.stringify({origin,checkedAt:new Date().toISOString(),pages:evidence},null,2));
console.log('Updated article sitemap dates verified.');
