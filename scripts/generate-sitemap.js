import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://seif-limousine.online';
const TODAY = new Date().toISOString().split('T')[0];

const routePaths = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/fleet/jetour-x90-plus', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/mitsubishi-xpander-cross-25', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/chery-tiggo-8', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/toyota-hiace', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/soueast-s07', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/mercedes-e200', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/mercedes-viano', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/cairo-airport-limousine', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/sharm-el-sheikh-limousine', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/hurghada-limousine', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/intercity-limousine-egypt', priority: '0.9', changefreq: 'weekly' },
];

function generateSitemap() {
  const languages = ['en', 'ar'];
  let xmlEntries = '';

  for (const item of routePaths) {
    for (const lang of languages) {
      const locUrl = `${BASE_URL}/${lang}${item.path}`;
      xmlEntries += `  <url>
    <loc>${locUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en${item.path}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/ar${item.path}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${item.path}"/>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>\n`;
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlEntries}</urlset>
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

  console.log(`[Sitemap Generator] Successfully generated multilingual sitemap.xml & robots.txt using base URL: ${BASE_URL}`);
}

generateSitemap();
