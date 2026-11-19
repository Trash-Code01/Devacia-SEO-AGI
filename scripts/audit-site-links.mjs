import fs from 'node:fs/promises';
import { parseDocument } from 'htmlparser2';

const origin=process.argv[2]||'http://127.0.0.1:3106';
const output=process.argv[3]||'docs/seo/evidence/site-links-latest.json';
const walk=node=>[node,...(node.children||[]).flatMap(walk)];
const get=url=>fetch(url,{signal:AbortSignal.timeout(60000)});
const xml=await (await get(origin+'/sitemap.xml')).text();
const paths=[...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname).concat(['/onboarding','/faq','/privacy-policy','/terms','/accessibility']))];
const cache=new Map();
const inspect=pathname=>{
  if(!cache.has(pathname))cache.set(pathname,(async()=>{
    const response=await get(origin+pathname);
    const html=await response.text();
    const nodes=walk(parseDocument(html));
    return {status:response.status,path:new URL(response.url).pathname,ids:new Set(nodes.flatMap(n=>[n.attribs?.id,n.attribs?.name].filter(Boolean))),links:nodes.filter(n=>n.name==='a').map(n=>n.attribs.href).filter(Boolean)};
  })());
  return cache.get(pathname);
};
let index=0;
const issues=[];const targets=new Set();
await Promise.all(Array.from({length:3},async()=>{
  while(index<paths.length){
    const route=paths[index++];const page=await inspect(route);
    if(page.status!==200)issues.push({route,status:page.status});
    for(const href of page.links){
      const url=new URL(href,'https://www.devacia.com'+route);
      if(!['www.devacia.com','devacia.com'].includes(url.hostname)||!/^https?:$/.test(url.protocol)||url.pathname.startsWith('/api/'))continue;
      targets.add(url.pathname);
      if(href==='#'){issues.push({route,href,issue:'empty anchor'});continue;}
      const target=await inspect(url.pathname);
      if(target.status>=400)issues.push({route,href,issue:'broken destination',status:target.status});
      else if(url.hash&&!target.ids.has(decodeURIComponent(url.hash.slice(1))))issues.push({route,href,issue:'missing fragment target'});
    }
  }
}));
const report={checkedAt:new Date().toISOString(),origin,pagesChecked:paths.length,uniqueTargets:targets.size,issues};
await fs.mkdir('docs/seo/evidence',{recursive:true});await fs.writeFile(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
