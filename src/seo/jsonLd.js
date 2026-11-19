// Keep JSON-LD inert even when an editorial field contains HTML/script text.
export function escapeJsonLd(serialized) {
  return String(serialized ?? '').replace(/</g, '\\u003c');
}
