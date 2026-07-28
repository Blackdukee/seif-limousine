import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target production domain — strictly fallback to https://seif-limousine.online
// to prevent Vercel preview hostnames (e.g. vercel.app) from breaking GSC sitemap indexation.
const BASE_URL = 'https://seif-limousine.online';
const TODAY = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/fleet/jetour-x90-plus', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/mitsubishi-xpander-cross-25', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/chery-tiggo-8', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/toyota-hiace', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/soueast-s07', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/mercedes-e200', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/mercedes-viano', priority: '0.8', changefreq: 'weekly' },
];

function generateSitemap() {
  const xmlEntries = routes
    .map(
      (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

  console.log(`[Sitemap Generator] Successfully generated sitemap.xml & robots.txt using base URL: ${BASE_URL}`);
}

generateSitemap();
