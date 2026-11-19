import fs from 'node:fs/promises';
import { parseDocument } from 'htmlparser2';
import { canonicalIndustryPages, industryAliases } from '../src/seo/industryCatalog.js';

const origin = process.argv[2] || 'http://127.0.0.1:3102';
const output = process.argv[3] || 'docs/seo/evidence/url-http-latest.json';
const publicMode = new URL(origin).hostname === 'www.devacia.com';
if (!['127.0.0.1', 'localhost', 'www.devacia.com'].includes(new URL(origin).hostname)) throw new Error('Use local preview or the Devacia production host');
const inventory = JSON.parse(await fs.readFile('docs/seo/evidence/route-inventory-before-2026-10-07.json','utf8'));
const walk = node => [node,...(node.children || []).flatMap(walk)];
const text = node => node.type === 'text' ? node.data : (node.children || []).map(text).join(' ');
const reports = [];
async function inspect(route) {
  try {
    const response = await fetch(origin + route,{redirect:'manual',signal:AbortSignal.timeout(20000)});
    const body = await response.text();
    const nodes = walk(parseDocument(body));
    const meta = name => nodes.find(node=>node.name==='meta' && node.attribs.name===name)?.attribs.content || '';
    const canonical = nodes.find(node=>node.name==='link' && node.attribs.rel==='canonical')?.attribs.href || '';
    return {route,status:response.status,location:response.headers.get('location'),canonical,title:text(nodes.find(node=>node.name==='title')||{}).trim(),description:meta('description'),robots:meta('robots'),xRobotsTag:response.headers.get('x-robots-tag'),...(route==='/sitemap.xml'?{urls:[...body.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]),dates:[...body.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map(match=>match[1])}:{})};
  } catch(error) { return {route,error:error.message}; }
}
const sitemap = await inspect('/sitemap.xml');
reports.push(sitemap);
const sitemapPaths = (sitemap.urls || []).map(url=>new URL(url).pathname);
const linkedPaths = inventory.routes.flatMap(route=>route.links).filter(route=>!/^\/(?:api|admin|_next)(?:\/|$)/.test(route)&&! /\.(?:png|jpg|jpeg|webp|svg|pdf|ico)$/.test(route));
const priority = ['/services/website-development','/industries',...canonicalIndustryPages.map(page=>page.path),'/services/ecommerce','/services/ecommerce-website-development','/services/website-redesign','/services/rebranding','/services/wordpress-development','/services/custom-software-development','/services/performance-marketing','/services/generative-engine-optimization','/onboarding','/robots.txt'];
const routes = [...new Set(publicMode ? priority : [...inventory.routes.map(route=>route.route),...Object.keys(industryAliases),...sitemapPaths,...linkedPaths,...priority])];
let index=0;
await Promise.all(Array.from({length:4},async()=>{while(index<routes.length){const route=routes[index++];reports.push(await inspect(route));}}));
const byRoute = new Map(reports.map(row=>[row.route,row]));
const sitemapIssues = sitemapPaths.flatMap(route=>{
  const row=byRoute.get(route); if(!row)return [];
  return [...(row.status!==200?[`${route}: sitemap URL status ${row.status || row.error}`]:[]),...(row.canonical && new URL(row.canonical).pathname.replace(/\/$/,'')!==route.replace(/\/$/,'')?[`${route}: sitemap URL canonicalises to ${row.canonical}`]:[])];
});
const report={checkedAt:new Date().toISOString(),origin,scope:publicMode?'Priority production URLs, not a full production crawl':'Local build routes, internal page links, industry aliases and sitemap inventory',count:reports.length,sitemapIssues,reports};
await fs.writeFile(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({output,count:reports.length,sitemapIssues,statuses:reports.reduce((acc,row)=>{const key=row.status||'error';acc[key]=(acc[key]||0)+1;return acc;},{}),failures:reports.filter(row=>row.error||row.status>=400).map(({route,status,error})=>({route,status,error})),redirects:reports.filter(row=>row.status>=300&&row.status<400).length},null,2));
