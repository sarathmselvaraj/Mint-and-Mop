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
  'terms-of-service.html'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // 1. Remove the orphan leak block between scripts and privacyPolicyModal
  content = content.replace(
    /<script src="js\/main\.js"><\/script>\s*<h6 class="fw-bold text-primary mb-2">Hospital-Grade Antimicrobial Standards[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- Modal: Privacy Policy -->/g,
    '<script src="js/main.js"></script>\n\n  <!-- Modal: Privacy Policy -->'
  );

  // Alternative orphan matching if there's any whitespace variation
  content = content.replace(
    /\s*<h6 class="fw-bold text-primary mb-2">Hospital-Grade Antimicrobial Standards[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- Modal: Privacy Policy -->/g,
    '\n\n  <!-- Modal: Privacy Policy -->'
  );

  // 2. Remove the content from inside the EPA modal as requested
  content = content.replace(
    /\s*<h6 class="fw-bold text-primary mb-2">Hospital-Grade Antimicrobial Standards<\/h6>\s*<p class="text-muted small mb-3">All sanitizing formulations utilized in Mint & Mop ULV cold foggers are EPA List N registered, 100% biodegradable botanical solutions \(active ingredient: Thymol\)\. They achieve a 99\.99% kill rate against fungal spores, mold, bacteria, and rodent pathogens with zero harsh chemicals or synthetic scents\.<\/p>\s*<h6 class="fw-bold text-primary mb-2">Technician Training & PPE Verification<\/h6>\s*<p class="text-muted small mb-0">Every technician deployed to your home holds individual OSHA 30-Hour Construction Safety certification and carries NIOSH-certified P100 full-face respirators and Level C Tyvek protective gear\.<\/p>/g,
    ''
  );

  // Also in row g-3 inside epaLicenseModal, ensure mb-4 is removed if it was mb-4
  content = content.replace(
    /<div class="row g-3 mb-4">/g,
    '<div class="row g-3">'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`[OK] Cleaned antimicrobial content in ${file}`);
}

console.log('--- ALL ANTIMICROBIAL & PPE VERIFICATION CONTENT REMOVED ---');
