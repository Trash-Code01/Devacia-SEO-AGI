import { industryPages } from '../content/industriesData.js';
import { industrySolutionPages } from './industryPages.js';

export const canonicalIndustryPages = Object.values(industryPages);
export const industryAliases = Object.fromEntries(
  Object.entries(industryPages).flatMap(([key, page]) => [...new Set([
    page.alternatePath,
    `/industries/${page.industry}/${page.solution}`,
    `/industries/${page.slug}`,
    `/industries/${key}`,
  ])].filter(path => path && path !== page.path).map(path => [path, page.path])),
);
industryAliases['/industries/restaurants/booking-ordering-system'] = industryPages.restaurants.path;
export const legacyIndustryPages = industrySolutionPages.filter(page => !industryAliases[page.path]);
