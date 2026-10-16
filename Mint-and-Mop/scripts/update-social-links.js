const fs = require('fs');

const updatedFooterSocial = `<div class="mt-4 d-flex social-links-wrapper">
            <a href="https://www.facebook.com/atticpro" target="_blank" rel="noopener noreferrer" class="social-icon-btn btn-facebook" aria-label="Mint & Mop on Facebook" title="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="https://x.com/atticpro" target="_blank" rel="noopener noreferrer" class="social-icon-btn btn-x" aria-label="Mint & Mop on X (Twitter)" title="X (Twitter)"><i class="bi bi-twitter-x"></i></a>
            <a href="https://www.instagram.com/atticpro" target="_blank" rel="noopener noreferrer" class="social-icon-btn btn-instagram" aria-label="Mint & Mop on Instagram" title="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="https://www.linkedin.com/company/atticpro" target="_blank" rel="noopener noreferrer" class="social-icon-btn btn-linkedin" aria-label="Mint & Mop on LinkedIn" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
          </div>`;

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

  // Match and replace any container with the 4 social-icon-btns in the footer
  content = content.replace(
    /<div class="(?:mt-4|d-flex)[^"]*">\s*<a href="[^"]*" class="social-icon-btn[^"]*"[\s\S]*?<\/div>/,
    updatedFooterSocial
  );

  // In contact.html, also update the team follow social links
  if (file === 'contact.html') {
    const contactTeamSocial = `<div class="pt-3 border-top border-white-50 mt-4 d-flex align-items-center gap-3">
                <span class="small text-white-50">Follow our team:</span>
                <a href="https://www.facebook.com/atticpro" target="_blank" rel="noopener noreferrer" class="social-icon-btn bg-white text-primary btn-facebook" aria-label="Mint & Mop on Facebook" title="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="https://x.com/atticpro" target="_blank" rel="noopener noreferrer" class="social-icon-btn bg-white text-primary btn-x" aria-label="Mint & Mop on X (Twitter)" title="X (Twitter)"><i class="bi bi-twitter-x"></i></a>
                <a href="https://www.instagram.com/atticpro" target="_blank" rel="noopener noreferrer" class="social-icon-btn bg-white text-primary btn-instagram" aria-label="Mint & Mop on Instagram" title="Instagram"><i class="bi bi-instagram"></i></a>
                <a href="https://www.linkedin.com/company/atticpro" target="_blank" rel="noopener noreferrer" class="social-icon-btn bg-white text-primary btn-linkedin" aria-label="Mint & Mop on LinkedIn" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
              </div>`;

    content = content.replace(
      /<div class="pt-3 border-top border-white-50 mt-4 d-flex align-items-center gap-3">[\s\S]*?<\/div>/,
      contactTeamSocial
    );
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`[OK] Updated social media links in ${file}`);
}

console.log('--- ALL SOCIAL MEDIA LINKS UPDATED TO PROPER FUNCTIONAL URLS ---');
