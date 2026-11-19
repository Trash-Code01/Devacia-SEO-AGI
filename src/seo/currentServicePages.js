import { wordpressDevelopmentData } from '../content/wordpressDevelopmentData.js';
import { ecommerceServiceData } from '../content/ecommerceServiceData.js';
import { websiteRedesignData } from '../content/websiteRedesignData.js';
import { performanceMarketingData } from '../content/performanceMarketingData.js';
import { customSoftwareData } from '../content/customSoftwareData.js';
import { geoServiceData } from '../content/geoServiceData.js';

// Designed service pages own their metadata and FAQ copy; legacy guides must not
// override them. Also used to verify the current rendered release, not old copy.
export const currentServicePages = [wordpressDevelopmentData, ecommerceServiceData, websiteRedesignData, performanceMarketingData, customSoftwareData, geoServiceData];
