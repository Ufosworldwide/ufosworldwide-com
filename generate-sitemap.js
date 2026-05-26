const fs = require('fs');
const path = require('path');

const baseUrl = 'https://ufosworldwide.com';
const basePath = __dirname;

const routes = {
    '/': ['weekly', '1.0'],
    '/about.html': ['monthly', '0.6'],
    '/contact.html': ['monthly', '0.5'],
    '/blog.html': ['weekly', '0.7'],
    '/presignal.html': ['weekly', '0.9'],
    '/privacy.html': ['yearly', '0.3'],
    '/terms.html': ['yearly', '0.3'],
    '/park/': ['weekly', '1.0'],
    '/park/guestbook.html': ['daily', '0.9'],
    '/preprint/': ['weekly', '0.9'],
    '/aquasignal/': ['daily', '0.9'],
    '/aquasignal/exceedances_ontario.json': ['weekly', '0.7'],
    '/aquasignal/full_baseline_ontario.json': ['weekly', '0.7'],
    '/aquasignal/grand_river_baseline.json': ['weekly', '0.7'],
    '/geometry-garden/': ['weekly', '0.8'],
    '/universe/': ['weekly', '0.8'],
    '/niagaranode/': ['daily', '0.8'],
    '/niagaranode/collector.html': ['daily', '0.7'],
    '/neweden/': ['weekly', '0.7'],
    '/ghost/': ['weekly', '0.7'],
    '/goodkarma/': ['weekly', '0.6'],
    '/mathfun/': ['weekly', '0.7'],
    '/mathfun/adelic.html': ['weekly', '0.6'],
    '/safekey/': ['monthly', '0.6'],
    '/appdetector/': ['monthly', '0.6'],
    '/Shield/': ['monthly', '0.6'],
    '/catgame/': ['weekly', '0.5'],
    '/catgame2/': ['weekly', '0.5'],
    '/masterarchitect/': ['daily', '0.8'],
    '/moodring/': ['weekly', '0.6'],
    '/subbass/': ['weekly', '0.6'],
    '/treasurechest/': ['weekly', '0.6'],
    '/api/': ['hourly', '0.8'],
    '/data/feed.json': ['daily', '0.7'],
    '/resonance-city.html': ['monthly', '0.6'],
    '/ethos-mythos-unity.html': ['monthly', '0.6'],
    '/portal.html': ['weekly', '0.7'],
    '/database.html': ['weekly', '0.7'],
    '/prep.html': ['monthly', '0.5'],
    '/lights.html': ['monthly', '0.5'],
    '/ecogpt-blueprint.html': ['monthly', '0.6'],
    '/glitter.html': ['monthly', '0.5'],
};

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (const [route, [changefreq, priority]] of Object.entries(routes)) {
    let filePath = path.join(basePath, route);
    if (route.endsWith('/')) {
        filePath = path.join(filePath, 'index.html');
    }
    
    const lastmod = fs.existsSync(filePath) 
        ? new Date(fs.statSync(filePath).mtime).toISOString() 
        : new Date().toISOString();
    
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
}

xml += '</urlset>\n';

fs.writeFileSync(path.join(basePath, 'sitemap.xml'), xml);
console.log(`Sitemap generated: ${Object.keys(routes).length} URLs at ${new Date().toISOString(
  
)}`);
