/* ===================================================================
   Mint & Mop - Main JavaScript
   Theme Switcher, RTL Controller, Components, Forms, and Interactive UI
   =================================================================== */

(function () {
  'use strict';

  // --- 1. THEME CONTROLLER (Dark / Light) ---
  const THEME_KEY = 'atticpro_theme';
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    themeToggles.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill text-warning';
          btn.setAttribute('title', 'Switch to Light Mode');
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('title', 'Switch to Dark Mode');
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
      }
    });
  }

  // --- 2. RTL CONTROLLER (LTR / RTL) ---
  const DIR_KEY = 'atticpro_direction';
  const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';
  applyDirection(savedDir);

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_KEY, dir);

    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    rtlToggles.forEach(btn => {
      const label = btn.querySelector('.toggle-label') || btn;
      if (dir === 'rtl') {
        label.textContent = 'LTR';
        btn.setAttribute('title', 'Switch to Left to Right');
      } else {
        label.textContent = 'RTL';
        btn.setAttribute('title', 'Switch to Right to Left');
      }
    });
  }

  // DOMContentLoaded Initializations
  document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle click handler
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    });

    // RTL toggle click handler
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDirection(nextDir);
      });
    });

    // --- 3. STICKY NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.site-navbar');
    if (navbar) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 30) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }

    // --- 4. BACK TO TOP BUTTON ---
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 350) {
          backToTopBtn.classList.add('show');
        } else {
          backToTopBtn.classList.remove('show');
        }
      });

      backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // --- 5. BEFORE & AFTER INTERACTIVE SLIDER ---
    const baContainers = document.querySelectorAll('.ba-comparison-container');
    baContainers.forEach(container => {
      const rangeInput = container.querySelector('.ba-range-input');
      const beforeWrapper = container.querySelector('.ba-before-wrapper');
      const handle = container.querySelector('.ba-slider-handle');

      if (rangeInput && beforeWrapper && handle) {
        const updateSlider = (val) => {
          const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
          beforeWrapper.style.width = val + '%';
          if (isRtl) {
            handle.style.right = val + '%';
            handle.style.left = 'auto';
          } else {
            handle.style.left = val + '%';
            handle.style.right = 'auto';
          }
        };

        rangeInput.addEventListener('input', function (e) {
          updateSlider(e.target.value);
        });

        // Initialize at 50%
        updateSlider(50);
      }
    });

    // --- 6. PASSWORD VISIBILITY TOGGLE ---
    const passwordToggles = document.querySelectorAll('.password-toggle-btn');
    passwordToggles.forEach(toggle => {
      toggle.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input) {
          const isPass = input.getAttribute('type') === 'password';
          input.setAttribute('type', isPass ? 'text' : 'password');
          const icon = this.querySelector('i');
          if (icon) {
            icon.className = isPass ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill';
          }
        }
      });
    });

    // --- 7. PASSWORD STRENGTH METER ---
    const regPasswordInput = document.getElementById('regPassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    if (regPasswordInput && strengthBar && strengthText) {
      regPasswordInput.addEventListener('input', function () {
        const val = this.value;
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        if (val.length === 0) {
          strengthBar.style.width = '0%';
          strengthBar.style.backgroundColor = 'transparent';
          strengthText.textContent = '';
        } else if (score <= 1) {
          strengthBar.style.width = '25%';
          strengthBar.style.backgroundColor = '#ef4444';
          strengthText.textContent = 'Weak password';
          strengthText.style.color = '#ef4444';
        } else if (score === 2 || score === 3) {
          strengthBar.style.width = '65%';
          strengthBar.style.backgroundColor = '#f59e0b';
          strengthText.textContent = 'Moderate password';
          strengthText.style.color = '#f59e0b';
        } else {
          strengthBar.style.width = '100%';
          strengthBar.style.backgroundColor = '#10b981';
          strengthText.textContent = 'Strong & secure';
          strengthText.style.color = '#10b981';
        }
      });
    }

    // --- 8. BLOG SEARCH AND CATEGORY FILTER ---
    const filterButtons = document.querySelectorAll('.btn-filter');
    const blogCards = document.querySelectorAll('.blog-item-col');
    const blogSearchInput = document.getElementById('blogSearchInput');

    function filterBlogPosts() {
      const activeFilter = document.querySelector('.btn-filter.active')?.getAttribute('data-filter') || 'all';
      const searchQuery = blogSearchInput ? blogSearchInput.value.toLowerCase().trim() : '';
      let visibleCount = 0;

      blogCards.forEach(col => {
        const category = col.getAttribute('data-category') || '';
        const title = col.querySelector('.blog-card-title')?.textContent.toLowerCase() || '';
        const summary = col.querySelector('p')?.textContent.toLowerCase() || '';

        const matchesCat = activeFilter === 'all' || category.includes(activeFilter);
        const matchesSearch = !searchQuery || title.includes(searchQuery) || summary.includes(searchQuery);

        if (matchesCat && matchesSearch) {
          col.style.display = 'block';
          visibleCount++;
        } else {
          col.style.display = 'none';
        }
      });

      const noResultsMsg = document.getElementById('noBlogResults');
      if (noResultsMsg) {
        noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    if (filterButtons.length > 0) {
      filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
          filterButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          filterBlogPosts();
        });
      });
    }

    if (blogSearchInput) {
      blogSearchInput.addEventListener('input', filterBlogPosts);
    }

    // --- 9. FREE INSPECTION MODAL / FORM HANDLER ---
    const inspectionForms = document.querySelectorAll('.inspection-form-ajax');
    inspectionForms.forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

        if (submitBtn) {
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';
          submitBtn.disabled = true;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }
          const successAlert = form.querySelector('.form-success-alert');
          if (successAlert) {
            successAlert.classList.remove('d-none');
            form.reset();
            setTimeout(() => {
              successAlert.classList.add('d-none');
            }, 6000);
          } else {
            alert('Thank you! Your inspection request has been scheduled. Our certified technician will contact you within 2 business hours.');
            form.reset();
          }
        }, 800);
      });
    });

    // --- 10. CONTACT FORM HANDLER ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const alertBox = document.getElementById('contactFormAlert');

        if (submitBtn) {
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Sending...';
          submitBtn.disabled = true;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = 'Send Message <i class="bi bi-send ms-2"></i>';
            submitBtn.disabled = false;
          }
          if (alertBox) {
            alertBox.className = 'alert alert-success mt-3';
            alertBox.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Thank you! Your message has been sent successfully. We will get back to you shortly.';
            alertBox.classList.remove('d-none');
            contactForm.reset();
            setTimeout(() => {
              alertBox.classList.add('d-none');
            }, 7000);
          }
        }, 800);
      });
    }

    // --- 11. COUNTDOWN TIMER (Coming Soon Page) ---
    const countdownEl = document.getElementById('countdownTimer');
    if (countdownEl) {
      const launchDate = new Date();
      launchDate.setDate(launchDate.getDate() + 24); // 24 days from now

      function updateCountdown() {
        const now = new Date().getTime();
        const diff = launchDate - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          const daysEl = document.getElementById('countDays');
          const hoursEl = document.getElementById('countHours');
          const minsEl = document.getElementById('countMins');
          const secsEl = document.getElementById('countSecs');

          if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
          if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
          if (minsEl) minsEl.innerText = String(minutes).padStart(2, '0');
          if (secsEl) secsEl.innerText = String(seconds).padStart(2, '0');
        }
      }
      setInterval(updateCountdown, 1000);
      updateCountdown();
    }

    // --- 12. DYNAMIC SERVICE DETAILS PAGE RENDERER ---
    const serviceDetailsContainer = document.getElementById('serviceDetailsDynamic');
    if (serviceDetailsContainer) {
      const urlParams = new URLSearchParams(window.location.search);
      const requestedService = urlParams.get('service') || 'attic-cleaning';

      const serviceData = {
        'attic-cleaning': {
          title: 'Attic Cleaning & Decontamination',
          subtitle: 'Complete removal of contaminated dust, rodent debris, allergen buildup, and deep antimicrobial sanitization.',
          heroImage: 'images/dyn-hero-attic.jpg',
          overview: 'Our comprehensive attic cleaning service is designed to eliminate hazardous airborne contaminants, rodent droppings, nesting materials, and mold spores that settle in your attic over time. Using commercial-grade HEPA negative air containment, we completely cleanse your attic space without contaminating your living areas.',
          problems: [
            { icon: 'bi-bug', title: 'Rodent Infestation & Droppings', desc: 'Rats, mice, and squirrels leave dangerous biohazards and urine stains.' },
            { icon: 'bi-droplet-half', title: 'Moisture & Condensation', desc: 'Poor ventilation leads to trapped humidity and wood rot.' },
            { icon: 'bi-wind', title: 'Foul Odors & Allergens', desc: 'Contaminated air circulates into bedrooms through gaps and recessed lights.' },
            { icon: 'bi-exclamation-triangle', title: 'Compromised R-Value', desc: 'Compressed or soiled insulation causes extreme energy spikes.' }
          ],
          steps: [
            { num: '01', title: 'Pre-Inspection & Containment', desc: 'Seal access hatches with plastic sheeting and set up negative HEPA air scrubbers.' },
            { num: '02', title: 'Debris & Rodent Removal', desc: 'Safely vacuum droppings, nesting material, and soiled debris into sealed containers.' },
            { num: '03', title: 'HEPA Negative Vacuuming', desc: 'Extract fine dust, dander, and biological particulates from ceiling joists.' },
            { num: '04', title: 'EPA Hospital-Grade Sanitization', desc: 'Apply non-toxic antimicrobial fogging to destroy 99.9% of bacteria and virus pathogens.' },
            { num: '05', title: 'Final Clearance Inspection', desc: 'Thermal imaging, air quality check, and comprehensive photo proof report.' }
          ],
          price: '$750 - $1,600',
          sqft: 'Up to 2,000 sq ft included'
        },
        'insulation-removal': {
          title: 'Insulation Removal & Replacement Prep',
          subtitle: 'Dustless high-powered vacuum extraction of old fiberglass, cellulose, or contaminated insulation.',
          heroImage: 'images/dyn-hero-insulation.jpg',
          overview: 'Damaged, old, or contaminated insulation wastes thousands in energy costs and harbors mold and rodents. Our powerful outside-mounted vacuum units extract all contaminated batt or blown-in insulation through 6-inch hoses straight into exterior disposal bags, ensuring zero dust or fiberglass fibers enter your living spaces.',
          problems: [
            { icon: 'bi-thermometer-half', title: 'Uneven House Temperatures', desc: 'Drafty rooms, cold floors in winter, and sweltering ceilings in summer.' },
            { icon: 'bi-cash-coin', title: 'High Energy Utility Bills', desc: 'HVAC runs continuously trying to compensate for degraded insulation.' },
            { icon: 'bi-shield-slash', title: 'Fiberglass Fiber Inhalation', desc: 'Aged fiberglass flakes and circulates through HVAC return ducts.' },
            { icon: 'bi-fire', title: 'Fire Hazards Near Cans', desc: 'Accumulated cellulose debris around unrated recessed lighting.' }
          ],
          steps: [
            { num: '01', title: 'Living Space Protection', desc: 'Floor runners, door seals, and plastic barriers protect your home interior.' },
            { num: '02', title: 'High-Volume Vacuum Setup', desc: 'Connect 150-ft heavy duty extraction hoses to exterior high-HP vacuum trucks.' },
            { num: '03', title: 'Controlled Extraction', desc: 'Vacuum out all blown cellulose, fiberglass batts, and deteriorated materials.' },
            { num: '04', title: 'Air Gap Sealing Prep', desc: 'Seal top plates, wire penetrations, and duct seams with expandable polyurethane foam.' },
            { num: '05', title: 'Clean Subfloor Verification', desc: 'Vacuum bare joists clean, ready for clean high-R new insulation.' }
          ],
          price: '$1,200 - $2,800',
          sqft: 'Dependent on insulation type & thickness'
        },
        'crawl-space': {
          title: 'Crawl Space Cleaning & Vapor Barrier',
          subtitle: 'Heavy-duty crawl space debris cleanup, drainage correction, and reinforced 20-mil vapor barrier encapsulation.',
          heroImage: 'images/dyn-hero-crawl.jpg',
          overview: 'Up to 50% of the air on your first floor comes directly from your crawl space due to the "Stack Effect". A dirty, damp crawl space introduces musty odors, wood rot, termites, and dangerous mold into your home. We clear all debris, grade the soil, treat wood components, and install seamless vapor encapsulation.',
          problems: [
            { icon: 'bi-water', title: 'Standing Water & Mud', desc: 'Groundwater seepage promotes structural floor joist rot and damp smell.' },
            { icon: 'bi-bug-fill', title: 'Termites, Centipedes & Pests', desc: 'Damp dark soil provides ideal habitat for wood-destroying insects.' },
            { icon: 'bi-virus', title: 'High Humidity & Black Mold', desc: 'Relative humidity over 60% rapidly generates toxic mold colonies.' },
            { icon: 'bi-snow', title: 'Freezing Cold Floors', desc: 'Uninsulated crawlspaces make winter floors uncomfortably cold.' }
          ],
          steps: [
            { num: '01', title: 'Debris & Trash Cleanout', desc: 'Remove construction trash, old rotting plastic, and organic matter.' },
            { num: '02', title: 'Soil Leveling & Trenching', desc: 'Grade dirt floor, install perimeter drainage or sump system if needed.' },
            { num: '03', title: 'Antimicrobial Wood Treatment', desc: 'Coat foundation walls and subfloor wood with mold inhibitor.' },
            { num: '04', title: 'Vapor Barrier Installation', desc: 'Lay down commercial-grade puncture-resistant 20-mil sealed membrane.' },
            { num: '05', title: 'Sealing & Dehumidification', desc: 'Tape all piers and perimeter walls, install energy-efficient crawl dehumidifier.' }
          ],
          price: '$1,400 - $3,500',
          sqft: 'Tailored to moisture levels & barrier thickness'
        },
        'sanitization': {
          title: 'Sanitization & Odor Neutralization',
          subtitle: 'Hospital-grade antimicrobial misting, enzymatic biological breakdown, and permanent odor neutralizers.',
          heroImage: 'images/dyn-hero-sanitization.jpg',
          overview: 'When animals, dampness, or rot invade crawl spaces and attics, standard surface cleaning is not enough. Our ULV ultra-low volume fogging atomizes hospital-safe disinfectants that penetrate deep into porous framing, killing virus pathogens, rodent-borne hantavirus, and biological enzymes at the microscopic root.',
          problems: [
            { icon: 'bi-virus2', title: 'Pest Biological Waste', desc: 'Pheromone trails from rats and mice attract repeat invaders if not neutralized.' },
            { icon: 'bi-cloud-haze2', title: 'Persistent Musty Smells', desc: 'Lingering damp odors penetrating carpet, drywall, and clothing.' },
            { icon: 'bi-shield-check', title: 'Airborne Spores', desc: 'Microscopic fungal spores drifting through the subfloor into bedrooms.' },
            { icon: 'bi-heart-pulse', title: 'Asthma & Respiratory Triggers', desc: 'Family members suffering unexplained allergy flair-ups indoors.' }
          ],
          steps: [
            { num: '01', title: 'Source Elimination', desc: 'Extract physical biological sources, nests, and contaminated porous matter.' },
            { num: '02', title: 'Enzymatic Pre-Wash', desc: 'Neutralize urine salts and pheromone markers on framing timbers.' },
            { num: '03', title: 'Ultra-Low Volume (ULV) Misting', desc: 'Saturate attic or crawl space volume with EPA-registered botanical sanitizers.' },
            { num: '04', title: 'Odor Neutralizing Sealant', desc: 'Apply clear antimicrobial barrier sealant over framing lumber.' },
            { num: '05', title: 'Fresh Air Purge', desc: 'High-velocity negative exhaust scrubbers ensure zero residual chemicals.' }
          ],
          price: '$650 - $1,400',
          sqft: 'Safe for pets and whole family'
        },
        'mold-inspection': {
          title: 'Moisture, Mold & Contamination Inspection',
          subtitle: 'Detailed multi-point diagnostic inspection using FLIR thermal cameras, pinless moisture meters, and certified reports.',
          heroImage: 'images/dyn-hero-flir.jpg',
          overview: 'Hidden moisture in attic rafters or crawl space subflooring causes severe structural rot and silent mold growth before visible signs appear inside your home. Our certified inspectors evaluate moisture mapping, roof leak infiltration, rodent activity, and insulation integrity, presenting a detailed photo report with prioritized action steps.',
          problems: [
            { icon: 'bi-search', title: 'Undetected Roof Leaks', desc: 'Slow pinhole roof leaks rotting attic decking out of sight.' },
            { icon: 'bi-moisture', title: 'High Relative Humidity', desc: 'Humid air condensing on cold ducts in crawl spaces.' },
            { icon: 'bi-building-exclamation', title: 'Sagging or Soft Floor Joists', desc: 'Wood moisture content exceeding 20% leading to fungal degradation.' },
            { icon: 'bi-patch-question', title: 'Home Sale Contingency Issues', desc: 'Buyers requiring certified crawl space clearance reports before closing.' }
          ],
          steps: [
            { num: '01', title: 'Thermal Imaging Scan', desc: 'Locate hidden moisture pockets behind walls and under attic insulation.' },
            { num: '02', title: 'Moisture Meter Probing', desc: 'Measure exact moisture percentage in joists, beams, and subfloor.' },
            { num: '03', title: 'Ventilation & Airflow Analysis', desc: 'Calculate Net Free Vent Area (NFVA) for soffit and ridge vents.' },
            { num: '04', title: 'Pest & Hazard Cataloging', desc: 'Identify pest entry points, chew marks, and wiring hazards.' },
            { num: '05', title: 'Comprehensive Digital Report', desc: 'Same-day full color PDF with HD photos, diagnosis, and transparent quote.' }
          ],
          price: 'Free with any service / $149 Standalone',
          sqft: 'Full property Attic + Crawl inspection'
        }
      };

      const selected = serviceData[requestedService] || serviceData['attic-cleaning'];

      // Populate elements
      const titleEl = document.getElementById('dynServiceTitle');
      const subtitleEl = document.getElementById('dynServiceSubtitle');
      const heroImgEl = document.getElementById('dynServiceHeroImg');
      const overviewEl = document.getElementById('dynServiceOverview');
      const priceEl = document.getElementById('dynServicePrice');
      const sqftEl = document.getElementById('dynServiceSqft');
      const problemsEl = document.getElementById('dynServiceProblems');
      const stepsEl = document.getElementById('dynServiceSteps');

      if (titleEl) titleEl.textContent = selected.title;
      if (subtitleEl) subtitleEl.textContent = selected.subtitle;
      if (heroImgEl) heroImgEl.src = selected.heroImage;
      if (overviewEl) overviewEl.textContent = selected.overview;
      if (priceEl) priceEl.textContent = selected.price;
      if (sqftEl) sqftEl.textContent = selected.sqft;

      if (problemsEl) {
        problemsEl.innerHTML = selected.problems.map(prob => `
          <div class="col-md-6 mb-4">
            <div class="hazard-card">
              <div class="hazard-icon"><i class="bi ${prob.icon}"></i></div>
              <h5 class="fw-bold mb-2">${prob.title}</h5>
              <p class="mb-0 text-muted small">${prob.desc}</p>
            </div>
          </div>
        `).join('');
      }

      if (stepsEl) {
        stepsEl.innerHTML = selected.steps.map(step => `
          <div class="col-md-4 mb-4">
            <div class="process-step-card">
              <div class="step-number">${step.num}</div>
              <h5 class="fw-bold mb-2 mt-2">${step.title}</h5>
              <p class="text-muted small mb-0">${step.desc}</p>
            </div>
          </div>
        `).join('');
      }

      // Highlight active service nav in sidebar if present
      document.querySelectorAll('.service-nav-link').forEach(link => {
        if (link.getAttribute('data-service') === requestedService) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
})();

/* Mint & Mop footer email updates: client-side demo only (no mailing API). */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.attic-footer-newsletter-form').forEach(form => {
    const input = form.querySelector('input[type="email"]');
    const feedback = form.closest('.attic-footer-newsletter-action')?.querySelector('.attic-footer-feedback');
    if (!input || !feedback) return;
    input.addEventListener('input', () => {
      input.removeAttribute('aria-invalid');
      if (feedback.dataset.state === 'error') {
        feedback.dataset.state = '';
        feedback.textContent = 'Front-end demo — no emails are sent.';
      }
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const address = input.value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
        input.setAttribute('aria-invalid', 'true');
        feedback.dataset.state = 'error';
        feedback.textContent = 'Enter a valid email address.';
        input.focus();
        return;
      }
      try {
        const key = 'atticpro_demo_email_updates';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        const emails = Array.isArray(existing) ? existing : [];
        if (!emails.includes(address)) emails.push(address);
        localStorage.setItem(key, JSON.stringify(emails));
        feedback.dataset.state = 'success';
        feedback.textContent = 'Saved in this browser (demo only). No email was sent.';
        form.reset();
      } catch {
        feedback.dataset.state = 'error';
        feedback.textContent = 'Could not save in this browser. Please try again.';
      }
    });
  });
});
