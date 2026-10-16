const fs = require('fs');
const path = require('path');

console.log('--- UPDATING HTML AND JS FILES ---');

// 1. UPDATE index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Remove top-bar
indexHtml = indexHtml.replace(/<!-- Top Announcement Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');

// Ensure header is sticky
indexHtml = indexHtml.replace(/<header>/g, '<header class="sticky-top">');

// Update Hero 1 image
indexHtml = indexHtml.replace('images/hero-1-attic.jpg', 'images/hero-1-attic-clean.jpg');

// Update 6 Service Cards images
indexHtml = indexHtml.replace('images/hepa-detail-vacuum.jpg', 'images/card-1-attic-hepa.jpg');
indexHtml = indexHtml.replace('images/insulation-vacuum.jpg', 'images/card-2-insulation-vac.jpg');
indexHtml = indexHtml.replace('images/crawl-barrier-install.jpg', 'images/card-3-crawl-barrier.jpg');
indexHtml = indexHtml.replace('images/sanitization-fogging.jpg', 'images/card-4-sanitization-fog.jpg');
indexHtml = indexHtml.replace('images/flir-thermal-scan.jpg', 'images/card-5-flir-thermal.jpg');
indexHtml = indexHtml.replace('images/rodent-mesh-sealing.jpg', 'images/card-6-rodent-mesh.jpg');

// Update Slider images
indexHtml = indexHtml.replace('images/attic-after.jpg', 'images/slider-attic-after.jpg');
indexHtml = indexHtml.replace('images/attic-before.jpg', 'images/slider-attic-before.jpg');

// Update Footer Brand to match Navbar exactly & fix contrast
indexHtml = indexHtml.replace(
  /<a class="navbar-brand text-white mb-3 d-inline-flex" href="index\.html">[\s\S]*?<\/span><\/span>\s*<\/a>/,
  `<a class="navbar-brand footer-brand mb-3" href="index.html">
            <div class="brand-icon"><i class="bi bi-house-gear-fill"></i></div>
            <span>Mint <span class="brand-badge">&amp; Mop</span></span>
          </a>`
);

// Remove extra subtext in Footer Client & Staff Access so columns align evenly
indexHtml = indexHtml.replace(
  /<h5>Client & Staff Access<\/h5>\s*<p class="small text-secondary">[^<]*<\/p>/,
  '<h5>Client & Staff Access</h5>'
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('[OK] Updated index.html');


// 2. UPDATE index-2.html
let index2Html = fs.readFileSync('index-2.html', 'utf8');

// Remove top-bar
index2Html = index2Html.replace(/<!-- Top Announcement Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');

// Ensure header is sticky
index2Html = index2Html.replace(/<header>/g, '<header class="sticky-top">');

// Update Hero 2 image
index2Html = index2Html.replace('images/hero-2-crawlspace.jpg', 'images/hero-2-crawlspace-clean.jpg');

// Update deep dive section images
index2Html = index2Html.replace('images/insulation-vacuum.jpg', 'images/home2-insulation-deepdive.jpg');
index2Html = index2Html.replace('images/crawl-barrier-install.jpg', 'images/home2-crawl-deepdive.jpg');

// Update Showcase Case 1 & 2
index2Html = index2Html.replace('images/attic-before.jpg', 'images/case-1-attic-before.jpg');
index2Html = index2Html.replace('images/attic-after.jpg', 'images/case-1-attic-after.jpg');
index2Html = index2Html.replace('images/crawl-before-mud.jpg', 'images/case-2-crawl-before.jpg');
index2Html = index2Html.replace('images/crawl-barrier-install.jpg', 'images/case-2-crawl-after.jpg');

// Update Footer Brand
index2Html = index2Html.replace(
  /<a class="navbar-brand text-white mb-3 d-inline-flex" href="index\.html">[\s\S]*?<\/span><\/span>\s*<\/a>/,
  `<a class="navbar-brand footer-brand mb-3" href="index.html">
            <div class="brand-icon"><i class="bi bi-house-gear-fill"></i></div>
            <span>Mint <span class="brand-badge">&amp; Mop</span></span>
          </a>`
);
index2Html = index2Html.replace(
  /<h5>Client & Staff Access<\/h5>\s*<p class="small text-secondary">[^<]*<\/p>/,
  '<h5>Client & Staff Access</h5>'
);

fs.writeFileSync('index-2.html', index2Html, 'utf8');
console.log('[OK] Updated index-2.html');


// 3. UPDATE about.html
let aboutHtml = fs.readFileSync('about.html', 'utf8');
aboutHtml = aboutHtml.replace(/<!-- Top Announcement Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
aboutHtml = aboutHtml.replace(/<header>/g, '<header class="sticky-top">');
aboutHtml = aboutHtml.replace('images/team-specialists.jpg', 'images/about-team-crew.jpg');
aboutHtml = aboutHtml.replace('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', 'images/about-heritage-home.jpg');
aboutHtml = aboutHtml.replace('images/sanitization-fogging.jpg', 'images/about-safety-ppe.jpg');

aboutHtml = aboutHtml.replace(
  /<a class="navbar-brand text-white mb-3 d-inline-flex" href="index\.html">[\s\S]*?<\/span><\/span>\s*<\/a>/,
  `<a class="navbar-brand footer-brand mb-3" href="index.html">
            <div class="brand-icon"><i class="bi bi-house-gear-fill"></i></div>
            <span>Mint <span class="brand-badge">&amp; Mop</span></span>
          </a>`
);
aboutHtml = aboutHtml.replace(
  /<h5>Client & Staff Access<\/h5>\s*<p class="small text-secondary">[^<]*<\/p>/,
  '<h5>Client & Staff Access</h5>'
);
fs.writeFileSync('about.html', aboutHtml, 'utf8');
console.log('[OK] Updated about.html');


// 4. UPDATE services.html
let servicesHtml = fs.readFileSync('services.html', 'utf8');
servicesHtml = servicesHtml.replace(/<!-- Top Announcement Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
servicesHtml = servicesHtml.replace(/<header>/g, '<header class="sticky-top">');

servicesHtml = servicesHtml.replace('images/hepa-detail-vacuum.jpg', 'images/svc-overview-1-attic.jpg');
servicesHtml = servicesHtml.replace('images/insulation-vacuum.jpg', 'images/svc-overview-2-insulation.jpg');
servicesHtml = servicesHtml.replace('images/crawl-barrier-install.jpg', 'images/svc-overview-3-crawl.jpg');
servicesHtml = servicesHtml.replace('images/sanitization-fogging.jpg', 'images/svc-overview-4-sanitization.jpg');
servicesHtml = servicesHtml.replace('images/flir-thermal-scan.jpg', 'images/svc-overview-5-thermal.jpg');

servicesHtml = servicesHtml.replace(
  /<a class="navbar-brand text-white mb-3 d-inline-flex" href="index\.html">[\s\S]*?<\/span><\/span>\s*<\/a>/,
  `<a class="navbar-brand footer-brand mb-3" href="index.html">
            <div class="brand-icon"><i class="bi bi-house-gear-fill"></i></div>
            <span>Mint <span class="brand-badge">&amp; Mop</span></span>
          </a>`
);
servicesHtml = servicesHtml.replace(
  /<h5>Client & Staff Access<\/h5>\s*<p class="small text-secondary">[^<]*<\/p>/,
  '<h5>Client & Staff Access</h5>'
);
fs.writeFileSync('services.html', servicesHtml, 'utf8');
console.log('[OK] Updated services.html');


// 5. UPDATE service-details.html
let sDetailsHtml = fs.readFileSync('service-details.html', 'utf8');
sDetailsHtml = sDetailsHtml.replace(/<!-- Top Announcement Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
sDetailsHtml = sDetailsHtml.replace(/<header>/g, '<header class="sticky-top">');

sDetailsHtml = sDetailsHtml.replace('images/hepa-detail-vacuum.jpg', 'images/dyn-hero-attic.jpg');
sDetailsHtml = sDetailsHtml.replace('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', 'images/details-healthy-home-ext.jpg');
sDetailsHtml = sDetailsHtml.replace('images/insulation-vacuum.jpg', 'images/rel-card-insulation.jpg');
sDetailsHtml = sDetailsHtml.replace('images/crawl-barrier-install.jpg', 'images/rel-card-crawl.jpg');
sDetailsHtml = sDetailsHtml.replace('images/flir-thermal-scan.jpg', 'images/rel-card-thermal.jpg');

sDetailsHtml = sDetailsHtml.replace(
  /<a class="navbar-brand text-white mb-3 d-inline-flex" href="index\.html">[\s\S]*?<\/span><\/span>\s*<\/a>/,
  `<a class="navbar-brand footer-brand mb-3" href="index.html">
            <div class="brand-icon"><i class="bi bi-house-gear-fill"></i></div>
            <span>Mint <span class="brand-badge">&amp; Mop</span></span>
          </a>`
);
sDetailsHtml = sDetailsHtml.replace(
  /<h5>Client & Staff Access<\/h5>\s*<p class="small text-secondary">[^<]*<\/p>/,
  '<h5>Client & Staff Access</h5>'
);
fs.writeFileSync('service-details.html', sDetailsHtml, 'utf8');
console.log('[OK] Updated service-details.html');


// 6. UPDATE pricing.html
let pricingHtml = fs.readFileSync('pricing.html', 'utf8');
pricingHtml = pricingHtml.replace(/<!-- Top Announcement Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
pricingHtml = pricingHtml.replace(/<header>/g, '<header class="sticky-top">');
pricingHtml = pricingHtml.replace(
  /<a class="navbar-brand text-white mb-3 d-inline-flex" href="index\.html">[\s\S]*?<\/span><\/span>\s*<\/a>/,
  `<a class="navbar-brand footer-brand mb-3" href="index.html">
            <div class="brand-icon"><i class="bi bi-house-gear-fill"></i></div>
            <span>Mint <span class="brand-badge">&amp; Mop</span></span>
          </a>`
);
pricingHtml = pricingHtml.replace(
  /<h5>Client & Staff Access<\/h5>\s*<p class="small text-secondary">[^<]*<\/p>/,
  '<h5>Client & Staff Access</h5>'
);
fs.writeFileSync('pricing.html', pricingHtml, 'utf8');
console.log('[OK] Updated pricing.html');


// 7. UPDATE blog.html
let blogHtml = fs.readFileSync('blog.html', 'utf8');
blogHtml = blogHtml.replace(/<!-- Top Announcement Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
blogHtml = blogHtml.replace(/<header>/g, '<header class="sticky-top">');

blogHtml = blogHtml.replace('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', 'images/blog-featured-main.jpg');
blogHtml = blogHtml.replace('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80', 'images/blog-post-1-attic.jpg');
blogHtml = blogHtml.replace('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', 'images/blog-post-2-crawl.jpg');
blogHtml = blogHtml.replace('https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=600&q=80', 'images/blog-post-3-insulation.jpg');
blogHtml = blogHtml.replace('https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=600&q=80', 'images/blog-post-4-sanitization.jpg');
blogHtml = blogHtml.replace('https://images.unsplash.com/photo-1541888946425-d0fbb1861563?auto=format&fit=crop&w=600&q=80', 'images/blog-post-5-flir.jpg');
blogHtml = blogHtml.replace('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', 'images/blog-post-6-rodent.jpg');
blogHtml = blogHtml.replace('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80', 'images/blog-sidebar-promo-1.jpg');
blogHtml = blogHtml.replace('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80', 'images/blog-sidebar-promo-2.jpg');

blogHtml = blogHtml.replace(
  /<a class="navbar-brand text-white mb-3 d-inline-flex" href="index\.html">[\s\S]*?<\/span><\/span>\s*<\/a>/,
  `<a class="navbar-brand footer-brand mb-3" href="index.html">
            <div class="brand-icon"><i class="bi bi-house-gear-fill"></i></div>
            <span>Mint <span class="brand-badge">&amp; Mop</span></span>
          </a>`
);
blogHtml = blogHtml.replace(
  /<h5>Client & Staff Access<\/h5>\s*<p class="small text-secondary">[^<]*<\/p>/,
  '<h5>Client & Staff Access</h5>'
);
fs.writeFileSync('blog.html', blogHtml, 'utf8');
console.log('[OK] Updated blog.html');


// 8. UPDATE blog-details.html
let bDetailsHtml = fs.readFileSync('blog-details.html', 'utf8');
bDetailsHtml = bDetailsHtml.replace(/<!-- Top Announcement Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
bDetailsHtml = bDetailsHtml.replace(/<header>/g, '<header class="sticky-top">');

bDetailsHtml = bDetailsHtml.replace('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', 'images/blog-details-art-hero.jpg');
bDetailsHtml = bDetailsHtml.replace('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80', 'images/blog-details-art-inline.jpg');
bDetailsHtml = bDetailsHtml.replace('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=160&q=80', 'images/blog-rel-thumb-1.jpg');
bDetailsHtml = bDetailsHtml.replace('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=160&q=80', 'images/blog-rel-thumb-2.jpg');
bDetailsHtml = bDetailsHtml.replace('https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=160&q=80', 'images/blog-rel-thumb-3.jpg');

bDetailsHtml = bDetailsHtml.replace(
  /<a class="navbar-brand text-white mb-3 d-inline-flex" href="index\.html">[\s\S]*?<\/span><\/span>\s*<\/a>/,
  `<a class="navbar-brand footer-brand mb-3" href="index.html">
            <div class="brand-icon"><i class="bi bi-house-gear-fill"></i></div>
            <span>Mint <span class="brand-badge">&amp; Mop</span></span>
          </a>`
);
bDetailsHtml = bDetailsHtml.replace(
  /<h5>Client & Staff Access<\/h5>\s*<p class="small text-secondary">[^<]*<\/p>/,
  '<h5>Client & Staff Access</h5>'
);
fs.writeFileSync('blog-details.html', bDetailsHtml, 'utf8');
console.log('[OK] Updated blog-details.html');


// 9. UPDATE contact.html
let contactHtml = fs.readFileSync('contact.html', 'utf8');
contactHtml = contactHtml.replace(/<!-- Top Announcement Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
contactHtml = contactHtml.replace(/<header>/g, '<header class="sticky-top">');
contactHtml = contactHtml.replace(
  /<a class="navbar-brand text-white mb-3 d-inline-flex" href="index\.html">[\s\S]*?<\/span><\/span>\s*<\/a>/,
  `<a class="navbar-brand footer-brand mb-3" href="index.html">
            <div class="brand-icon"><i class="bi bi-house-gear-fill"></i></div>
            <span>Mint <span class="brand-badge">&amp; Mop</span></span>
          </a>`
);
contactHtml = contactHtml.replace(
  /<h5>Client & Staff Access<\/h5>\s*<p class="small text-secondary">[^<]*<\/p>/,
  '<h5>Client & Staff Access</h5>'
);
fs.writeFileSync('contact.html', contactHtml, 'utf8');
console.log('[OK] Updated contact.html');


// 10. UPDATE 404.html
let p404Html = fs.readFileSync('404.html', 'utf8');
p404Html = p404Html.replace(/<!-- Top Announcement Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
p404Html = p404Html.replace(/<header>/g, '<header class="sticky-top">');
p404Html = p404Html.replace(
  /<a class="navbar-brand text-white mb-3 d-inline-flex" href="index\.html">[\s\S]*?<\/span><\/span>\s*<\/a>/,
  `<a class="navbar-brand footer-brand mb-3" href="index.html">
            <div class="brand-icon"><i class="bi bi-house-gear-fill"></i></div>
            <span>Mint <span class="brand-badge">&amp; Mop</span></span>
          </a>`
);
p404Html = p404Html.replace(
  /<h5>Client & Staff Access<\/h5>\s*<p class="small text-secondary">[^<]*<\/p>/,
  '<h5>Client & Staff Access</h5>'
);
fs.writeFileSync('404.html', p404Html, 'utf8');
console.log('[OK] Updated 404.html');


// 11. UPDATE js/main.js for dynamic service hero images
let mainJs = fs.readFileSync('js/main.js', 'utf8');
mainJs = mainJs.replace("heroImage: 'images/hepa-detail-vacuum.jpg'", "heroImage: 'images/dyn-hero-attic.jpg'");
mainJs = mainJs.replace("heroImage: 'images/insulation-vacuum.jpg'", "heroImage: 'images/dyn-hero-insulation.jpg'");
mainJs = mainJs.replace("heroImage: 'images/crawl-barrier-install.jpg'", "heroImage: 'images/dyn-hero-crawl.jpg'");
mainJs = mainJs.replace("heroImage: 'images/sanitization-fogging.jpg'", "heroImage: 'images/dyn-hero-sanitization.jpg'");
mainJs = mainJs.replace("heroImage: 'images/flir-thermal-scan.jpg'", "heroImage: 'images/dyn-hero-flir.jpg'");
fs.writeFileSync('js/main.js', mainJs, 'utf8');
console.log('[OK] Updated js/main.js');

console.log('--- ALL FILES UPDATED CLEANLY ---');
