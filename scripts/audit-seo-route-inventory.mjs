import fs from 'node:fs/promises';
import path from 'node:path';
import { parseDocument } from 'htmlparser2';

// Read-only audit of the current production build, including links and schema parity.
const root = '.next/server/app';
const output = process.argv[2] || 'docs/seo/evidence/route-inventory-latest.json';
const walk = node => [node, ...(node.children || []).flatMap(walk)];
const content = node => node.type === 'text' ? node.data : ['script', 'style'].includes(node.name) ? '' : (node.children || []).map(content).join(' ');
const normalize = value => String(value || '').replace(/\s+/g, ' ').trim();
const hidden = node => {
  for (let current = node; current; current = current.parent) {
    const a = current.attribs || {};
    if ('hidden' in a || /(?:^|;)\s*(?:opacity\s*:\s*0(?:[;\s]|$)|display\s*:\s*none|visibility\s*:\s*hidden)/i.test(a.style || '')) return true;
  }
  return false;
};
async function files(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const routes = [];
for (const file of (await files(root)).filter(file => file.endsWith('.html'))) {
  const route = '/' + path.relative(root, file).replaceAll('\\', '/').replace(/\.html$/, '').replace(/^index$/, '');
  if (route.startsWith('/_')) continue;
  const html = await fs.readFile(file, 'utf8');
  const nodes = walk(parseDocument(html));
  const tag = name => nodes.filter(node => node.name === name);
  const meta = name => tag('meta').find(node => node.attribs.name === name || node.attribs.property === name)?.attribs.content || '';
  const text = normalize(content(nodes.find(node => node.name === 'body') || nodes[0]));
  const canonical = tag('link').filter(node => node.attribs.rel === 'canonical').map(node => node.attribs.href);
  const blocks = [];
  const issues = [];
  for (const script of tag('script').filter(node => node.attribs.type === 'application/ld+json')) {
    try { const block = JSON.parse((script.children || []).map(child => child.data || '').join('')); blocks.push(...(block['@graph'] || [block])); }
    catch { issues.push('invalid JSON-LD'); }
  }
  for (const faq of blocks.filter(block => block['@type'] === 'FAQPage')) {
    for (const q of faq.mainEntity || []) {
      if (!text.includes(normalize(q.name))) issues.push('FAQ question absent from initial HTML: ' + q.name);
      if (!text.includes(normalize(q.acceptedAnswer?.text))) issues.push('FAQ answer absent from initial HTML: ' + q.name);
    }
  }
  const h1 = tag('h1').map(node => ({ text: normalize(content(node)), hidden: hidden(node) }));
  const noindex = /noindex/.test(meta('robots'));
  if (!noindex) {
    if (h1.length !== 1) issues.push(`${h1.length} H1 elements`);
    if (tag('main').length !== 1) issues.push(`${tag('main').length} main landmarks`);
    if (canonical.length !== 1) issues.push(`${canonical.length} canonical tags`);
    if (h1.some(node => node.hidden)) issues.push('H1 hidden before hydration');
    if (!meta('description')) issues.push('missing description');
  }
  const links = [...new Set(tag('a').map(node => node.attribs.href).filter(Boolean).filter(href => href.startsWith('/') || href.startsWith('https://www.devacia.com/')).map(href => new URL(href, 'https://www.devacia.com').pathname.replace(/\/$/, '') || '/'))];
  routes.push({route,file,title:normalize(content(tag('title')[0] || {})),description:meta('description'),canonical,robots:meta('robots'),noindex,h1,mainCount:tag('main').length,schemaTypes:blocks.map(block => block['@type']),faqCount:blocks.filter(block => block['@type']==='FAQPage').reduce((count,block)=>count+(block.mainEntity?.length || 0),0),links,issues});
}
const indexable = routes.filter(route => !route.noindex);
for (const route of indexable) {
  route.incoming = indexable.filter(other => other.route !== route.route && other.links.includes(route.route)).map(other => other.route);
  route.duplicateTitles = indexable.filter(other => other.route !== route.route && other.title === route.title).map(other => other.route);
  route.duplicateDescriptions = indexable.filter(other => other.route !== route.route && other.description === route.description).map(other => other.route);
}
const report = {checkedAt:new Date().toISOString(),source:'Current local production HTML. Not proof of public deployment or Google indexing.',count:routes.length,indexableCount:indexable.length,routes};
await fs.mkdir(path.dirname(output),{recursive:true});
await fs.writeFile(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({output,count:report.count,indexableCount:report.indexableCount,issues:indexable.filter(route=>route.issues.length).map(({route,issues})=>({route,issues})),duplicateTitles:indexable.filter(route=>route.duplicateTitles.length).map(({route,duplicateTitles})=>({route,duplicateTitles})),withoutIncoming:indexable.filter(route=>!route.incoming.length).map(route=>route.route)},null,2));
