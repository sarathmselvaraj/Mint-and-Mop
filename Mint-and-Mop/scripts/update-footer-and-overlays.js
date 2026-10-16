const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const oldClientStaffRegex = /<h5>Client & Staff Access<\/h5>\s*<ul class="footer-links">[\s\S]*?<\/ul>/g;

const newContactHtml = `<h5>Contact & Support</h5>
          <ul class="footer-contact-list">
            <li>
              <div class="footer-contact-item">
                <i class="bi bi-telephone-fill"></i>
                <div>
                  <span class="footer-contact-label">24/7 Phone & Emergency</span>
                  <a href="tel:18005550168" class="footer-contact-value">(800) 555-0168</a>
                </div>
              </div>
            </li>
            <li>
              <div class="footer-contact-item">
                <i class="bi bi-envelope-fill"></i>
                <div>
                  <span class="footer-contact-label">Direct Mail & Estimates</span>
                  <a href="mailto:support@mintandmop.example" class="footer-contact-value">support@mintandmop.example</a>
                </div>
              </div>
            </li>
            <li>
              <div class="footer-contact-item">
                <i class="bi bi-clock-fill"></i>
                <div>
                  <span class="footer-contact-label">Dispatch Hours</span>
                  <span class="footer-contact-text">Mon – Sat: 7:00 AM – 8:00 PM<br><small class="text-primary fw-semibold">Emergency: 24/7 Available</small></span>
                </div>
              </div>
            </li>
            <li>
              <div class="footer-contact-item">
                <i class="bi bi-geo-alt-fill"></i>
                <div>
                  <span class="footer-contact-label">Service Headquarters</span>
                  <span class="footer-contact-text">All Metro Areas & Counties</span>
                </div>
              </div>
            </li>
          </ul>`;

let updatedCount = 0;
let overlayUpdatedCount = 0;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Replace Client & Staff Access in footer
  if (oldClientStaffRegex.test(content)) {
    content = content.replace(oldClientStaffRegex, newContactHtml);
    changed = true;
    updatedCount++;
    console.log(`Updated footer Contact column in: ${file}`);
  }

  // 2. Improve contrast of overlay text: replace text-white-50 in banner lead text
  const leadOverlayRegex = /<p class="lead text-white-50([^"]*)">([\s\S]*?)<\/p>/g;
  if (leadOverlayRegex.test(content)) {
    content = content.replace(leadOverlayRegex, '<p class="lead cta-muted-text$1">$2</p>');
    changed = true;
    overlayUpdatedCount++;
    console.log(`Improved banner overlay contrast in: ${file}`);
  }

  // 3. Ensure banner section has cta-banner-section class for consistent styling
  const bannerSectionRegex = /<section class="section-py" style="background: linear-gradient\(135deg, var\(--primary\), var\(--secondary\)\); color: #fff;">/g;
  if (bannerSectionRegex.test(content)) {
    content = content.replace(bannerSectionRegex, '<section class="section-py cta-banner-section" style="background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #fff;">');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log(`\nDone! Updated footer in ${updatedCount} files, improved overlay contrast in ${overlayUpdatedCount} files.`);
