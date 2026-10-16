const fs = require('fs');

const files = [
  'index.html',
  'index-2.html',
  'about.html',
  'services.html',
  'service-details.html',
  'pricing.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  '404.html',
  'privacy-policy.html',
  'terms-of-service.html',
  'login.html',
  'register.html',
  'admin-dashboard.html',
  'coming-soon.html'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Remove top-bar block including comments
  content = content.replace(
    /\s*<!--\s*Top Bar\s*-->\s*<div class="top-bar[^"]*">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g,
    ''
  );

  // In case of slightly different closing structure
  content = content.replace(
    /\s*<div class="top-bar[^"]*">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g,
    ''
  );

  // Clean stray </div> right after <body> if present
  content = content.replace(
    /<body>\s*<\/div>/g,
    '<body>'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`[OK] Checked & cleaned top-bar in ${file}`);
}

console.log('--- ALL TOP-BAR BANNERS REMOVED ---');
