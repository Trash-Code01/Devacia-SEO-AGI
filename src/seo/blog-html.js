import { parseDocument, DomUtils } from 'htmlparser2';

// The article template owns the H1. This transforms trusted CMS markup;
// it is not a security sanitizer for untrusted HTML.
export function normalizeArticleHtml(html = '') {
  const document = parseDocument(String(html));
  function visit(node, inLiteral = false) {
    const literal = inLiteral || ['pre', 'code', 'script', 'style'].includes(node.name);
    if (!literal && node.name === 'h1') node.name = 'h2';
    if (!literal && node.name === 'img') {
      node.attribs.loading ||= 'lazy';
      node.attribs.decoding ||= 'async';
    }
    for (const child of node.children || []) visit(child, literal);
  }
  visit(document);
  return DomUtils.getOuterHTML(document);
}
