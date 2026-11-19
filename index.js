/**
 * Devacia SEO AGI — Autonomous Search Engine Optimization & Intelligence Engine
 * 
 * Programmatic Node.js API Exports:
 * Enables importing any or all subsystems in external scripts, tools, and workflows:
 * 
 * ```javascript
 * import { gkp, gsc, ga4, gbp, brain, localGeo, serpArchitect } from 'devacia-seo-agi';
 * ```
 */

import './scripts/env-loader.js';

export { default as runMcpServer } from './scripts/mcp-server.js';
export * as gkp from './scripts/gkp-cli.js';
export * as gsc from './scripts/gsc-cli.js';
export * as ga4 from './scripts/ga4-cli.js';
export * as gbp from './scripts/gbp-cli.js';
export * as brain from './scripts/agi-brain.js';
export * as localGeo from './scripts/local-geo-intelligence.js';
export * as serpArchitect from './scripts/serp-architect.js';
export * as kdChecker from './src/seo/keyword-density-checker.js';
export { startGuiServer } from './scripts/gui-server.js';
export { loadEnv } from './scripts/env-loader.js';
