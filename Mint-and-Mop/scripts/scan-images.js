const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const imgUsages = {};

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const src = m[1];
    if (!imgUsages[src]) imgUsages[src] = [];
    imgUsages[src].push({ file, tag: m[0].substring(0, 100) });
  }
}

console.log('=== MULTI-USE IMAGES ACROSS HTML FILES ===');
for (const [src, usages] of Object.entries(imgUsages)) {
  if (usages.length > 1) {
    console.log(`\nIMAGE: ${src} (Used ${usages.length} times)`);
    usages.forEach(u => console.log(`  - ${u.file}`));
  }
}

console.log('\n=== ALL UNIQUE IMAGES COUNT ===', Object.keys(imgUsages).length);
