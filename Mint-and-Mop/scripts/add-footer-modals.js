const fs = require('fs');

const modalsHtml = `
  <!-- Modal: Privacy Policy -->
  <div class="modal fade" id="privacyPolicyModal" tabindex="-1" aria-labelledby="privacyPolicyModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
      <div class="modal-content border-0 shadow-xl" style="background-color: var(--bg-card); border-radius: var(--radius-lg);">
        <div class="modal-header border-bottom border-color p-4">
          <div class="d-flex align-items-center gap-2">
            <div class="brand-icon" style="width: 38px; height: 38px; font-size: 1.1rem;"><i class="bi bi-shield-lock-fill"></i></div>
            <div>
              <h5 class="modal-title fw-bold mb-0" id="privacyPolicyModalLabel">Mint & Mop Privacy Policy</h5>
              <small class="text-muted">Effective Date: October 2026 • CCPA & GDPR Compliant</small>
            </div>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4" style="color: var(--text-main); font-size: 0.95rem; line-height: 1.65;">
          <h6 class="fw-bold text-primary mb-2">1. Information We Collect</h6>
          <p class="text-muted small mb-3">When you request an inspection or remediation estimate, Mint & Mop collects your name, property address, contact phone, email, and diagnostic findings including thermal infrared imaging scan photos, moisture meter percentage readouts, and attic/crawl space condition photos.</p>

          <h6 class="fw-bold text-primary mb-2">2. How Inspection Data & Photos Are Used</h6>
          <p class="text-muted small mb-3">Diagnostic photos and sensor data are collected solely to generate your itemized 25-point inspection report, calculate upfront remediation pricing, and maintain our lifetime seal warranty database. We never sell, rent, or lease your personal information or property photos to any third-party marketing firms.</p>

          <h6 class="fw-bold text-primary mb-2">3. Digital Photo Storage & Encryption</h6>
          <p class="text-muted small mb-3">All property assessment records, FLIR thermal photos, and before/after verification photos are stored in secure AES-256 encrypted cloud storage accessible only by your certified remediation crew and project supervisor.</p>

          <h6 class="fw-bold text-primary mb-2">4. Your Privacy Rights</h6>
          <p class="text-muted small mb-3">You retain the right to request access to your full inspection file, obtain copies of your digital diagnostic reports, or request complete removal of your property records from our cloud database by contacting our Data Protection Officer.</p>

          <div class="bg-surface p-3 rounded-3 border border-color mt-3">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <span class="small text-muted"><i class="bi bi-envelope me-1 text-primary"></i> Data Protection Office: <strong>privacy@mintandmop.example</strong></span>
              <span class="small text-muted"><i class="bi bi-telephone me-1 text-primary"></i> Direct: <strong>(800) 555-0168</strong></span>
            </div>
          </div>
        </div>
        <div class="modal-footer border-top border-color p-3 d-flex justify-content-between align-items-center">
          <a href="privacy-policy.html" class="btn btn-outline-primary py-2 px-3 small"><i class="bi bi-box-arrow-up-right me-1"></i> Open Dedicated Full Page</a>
          <button type="button" class="btn btn-secondary-custom py-2 px-4" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: Terms of Service -->
  <div class="modal fade" id="termsOfServiceModal" tabindex="-1" aria-labelledby="termsOfServiceModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
      <div class="modal-content border-0 shadow-xl" style="background-color: var(--bg-card); border-radius: var(--radius-lg);">
        <div class="modal-header border-bottom border-color p-4">
          <div class="d-flex align-items-center gap-2">
            <div class="brand-icon" style="width: 38px; height: 38px; font-size: 1.1rem;"><i class="bi bi-file-earmark-text-fill"></i></div>
            <div>
              <h5 class="modal-title fw-bold mb-0" id="termsOfServiceModalLabel">Mint & Mop Terms of Service</h5>
              <small class="text-muted">Standard Customer Service Agreement • Updated October 2026</small>
            </div>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4" style="color: var(--text-main); font-size: 0.95rem; line-height: 1.65;">
          <h6 class="fw-bold text-primary mb-2">1. Diagnostic Inspection & Scope of Work</h6>
          <p class="text-muted small mb-3">Our 25-point attic and crawl space inspection is 100% complimentary with zero booking obligation. Upfront written quotes remain guaranteed for 30 calendar days from the date of initial diagnostic inspection.</p>

          <h6 class="fw-bold text-primary mb-2">2. Safety Containment & Negative Pressure Protocol</h6>
          <p class="text-muted small mb-3">Remediation crews operate strictly under OSHA 29 CFR containment regulations. Living quarters are isolated with magnetic zipper airlocks, and negative air HEPA machines are vented to the exterior to guarantee zero indoor cross-contamination.</p>

          <h6 class="fw-bold text-primary mb-2">3. Lifetime Rodent Seal & Workmanship Warranty</h6>
          <p class="text-muted small mb-3">All exclusion repairs executed with 1/4" galvanized steel mesh and fire-rated expanding foam carry a transferable Lifetime Rodent-Free Seal Warranty. Botanical antimicrobial treatments carry an unconditional 1-year odor and mold neutralization guarantee.</p>

          <h6 class="fw-bold text-primary mb-2">4. Payment & Cancellation Policy</h6>
          <p class="text-muted small mb-3">Residential services do not require upfront deposits for jobs under $2,500. Payment is due upon completion and review of your digital photo clearance report. Rescheduling requests must be submitted at least 24 hours prior to service arrival.</p>
        </div>
        <div class="modal-footer border-top border-color p-3 d-flex justify-content-between align-items-center">
          <a href="terms-of-service.html" class="btn btn-outline-primary py-2 px-3 small"><i class="bi bi-box-arrow-up-right me-1"></i> Open Dedicated Full Page</a>
          <button type="button" class="btn btn-secondary-custom py-2 px-4" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: EPA License & Certification Verification -->
  <div class="modal fade" id="epaLicenseModal" tabindex="-1" aria-labelledby="epaLicenseModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
      <div class="modal-content border-0 shadow-xl" style="background-color: var(--bg-card); border-radius: var(--radius-lg);">
        <div class="modal-header border-bottom border-color p-4">
          <div class="d-flex align-items-center gap-2">
            <div class="brand-icon bg-success text-white" style="width: 38px; height: 38px; font-size: 1.1rem; background: linear-gradient(135deg, #10b981, #059669);"><i class="bi bi-patch-check-fill"></i></div>
            <div>
              <h5 class="modal-title fw-bold mb-0" id="epaLicenseModalLabel">EPA & OSHA Compliance Verification</h5>
              <small class="text-muted">Federal EPA Lead-Safe & Environmental Certification</small>
            </div>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4" style="color: var(--text-main); font-size: 0.95rem; line-height: 1.65;">
          <div class="alert alert-success d-flex align-items-center gap-3 mb-4 py-3">
            <i class="bi bi-shield-check fs-2 text-success"></i>
            <div>
              <div class="fw-bold">License #982410-NAT-RRP: Verified Active</div>
              <small>Certified Environmental Remediation Firm • In Good Standing for 2026</small>
            </div>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-sm-6">
              <div class="p-3 rounded-3 border bg-surface">
                <span class="text-muted small">Issuing Authority</span>
                <h6 class="fw-bold mb-0">U.S. Environmental Protection Agency</h6>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="p-3 rounded-3 border bg-surface">
                <span class="text-muted small">Federal Regulation</span>
                <h6 class="fw-bold mb-0">40 CFR Part 745 / RRP Rule</h6>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="p-3 rounded-3 border bg-surface">
                <span class="text-muted small">OSHA Standard</span>
                <h6 class="fw-bold mb-0">29 CFR 1910.134 / 1926.1101</h6>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="p-3 rounded-3 border bg-surface">
                <span class="text-muted small">Restoration Standards</span>
                <h6 class="fw-bold mb-0">IICRC S500 / S520 Certified</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-top border-color p-3 d-flex justify-content-between align-items-center">
          <span class="small text-muted"><i class="bi bi-shield-check text-success me-1"></i> EPA Firm ID: #982410-NAT-RRP</span>
          <button type="button" class="btn btn-secondary-custom py-2 px-4" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
`;

const newFooterLinks = `<div class="d-flex gap-3 small text-secondary flex-wrap">
          <a href="#privacyPolicyModal" data-bs-toggle="modal" data-bs-target="#privacyPolicyModal">Privacy Policy</a>
          <span>•</span>
          <a href="#termsOfServiceModal" data-bs-toggle="modal" data-bs-target="#termsOfServiceModal">Terms of Service</a>
          <span>•</span>
          <a href="#epaLicenseModal" data-bs-toggle="modal" data-bs-target="#epaLicenseModal"><i class="bi bi-shield-check text-success me-1"></i> EPA Lic #982410</a>
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
  
  // Replace the footer links
  content = content.replace(
    /<div class="d-flex gap-3 small text-secondary(?: flex-wrap)?">[\s\S]*?<\/div>/,
    newFooterLinks
  );
  
  // If modals already existed, remove previous injected block
  if (content.includes('id="privacyPolicyModal"')) {
    content = content.replace(/<!-- Modal: Privacy Policy -->[\s\S]*?<!-- Modal: EPA License & Certification Verification -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
  }
  
  // Cleanly insert before </body>
  content = content.replace('</body>', modalsHtml.trim() + '\n</body>');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`[OK] Updated footer links & modals in ${file}`);
}

console.log('--- ALL FOOTER MODALS UPDATED CLEANLY ---');
