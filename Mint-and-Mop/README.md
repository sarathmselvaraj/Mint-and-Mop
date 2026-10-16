# Mint & Mop - Attic & Crawl Space Cleaning Service Website Template

A modern, responsive, multipurpose HTML5 website template designed specifically for **Attic & Crawl Space Cleaning, Insulation Removal, Rodent Proofing, and Biohazard Decontamination Services**. Built for professional service businesses, digital marketing agencies, and commercial sales on ThemeForest / TemplateMonster.

---

## 🌟 Key Features

- **14 Complete, Ready-To-Use Pages**:
  1. `index.html` - Home Page 1 (General Cleaning & Remediation Landing Page, 7 sections)
  2. `index-2.html` - Home Page 2 (Niche Attic & Crawl Space Landing Page with Quick Estimate Form, 7 sections)
  3. `about.html` - About Us (Company history, team, safety standards, IICRC/OSHA compliance, 7 sections)
  4. `services.html` - Services Overview (5 core services with deep descriptions and links, 7 sections)
  5. `service-details.html` - Dynamic Service Details (Interactive multi-service switcher for all 5 services, 7 sections)
  6. `pricing.html` - Pricing Plans (Basic, Standard, Premium packages + Feature Comparison Matrix + FAQs, 7 sections)
  7. `blog.html` - Blog Listing (Live search, interactive category filters, functional pagination, 7 sections)
  8. `blog-details.html` - Blog Article Details (TOC, author bio, supporting figures, related posts, 7 sections)
  9. `contact.html` - Contact Us (Validated contact form, on-page 25-point inspection scheduler, Google Map embed, 7 sections)
  10. `login.html` - Customer Portal Login (Show/hide password, client-side validation, forgot password modal)
  11. `register.html` - Customer Registration (Real-time password strength meter, password confirmation, validation)
  12. `admin-dashboard.html` - Dedicated Staff Admin Dashboard (KPI metrics, inspection requests table with search/filters, customer profiles, interactive revenue chart, active job trackers)
  13. `404.html` - Custom 404 Error Page (Branded graphic, search input, return home CTA)
  14. `coming-soon.html` - Maintenance / Coming Soon Page (Live countdown timer, newsletter signup, emergency hotline)

- **Interactive Before & After Image Slider**: Smooth drag-and-swipe comparison divider demonstrating attic/crawl space transformation.
- **Dark Mode & Light Mode**: Seamless 1-click theme switching, persisted across page views via `localStorage`.
- **Full RTL (Right-to-Left) Support**: Native RTL toggle switching layout direction, text alignment, and icons.
- **Strict, Professional Public Navbar**: Exactly 9 items in mandated order:
  `Home` (dropdown with only Home 1 and Home 2) • `About Us` • `Services` • `Pricing` • `Blog` • `Contact Us` • `RTL Toggle` • `Theme Toggle` • `Get a Free Inspection CTA`.
- **Reusable "Free Inspection" Modal**: Integrated on all public pages for maximum lead capture.
- **Modern Tech Stack**: Semantic HTML5, CSS3 with CSS Variables, Bootstrap 5.3.3, Bootstrap Icons, Vanilla JS.

---

## 📁 File Structure

```text
├── index.html              # Home Page 1 (General Landing)
├── index-2.html            # Home Page 2 (Niche-Specific Landing)
├── about.html              # About Us
├── services.html           # Services Directory
├── service-details.html    # Dynamic Service Details (5-in-1)
├── pricing.html            # Pricing & Comparison Matrix
├── blog.html               # Blog Listing (Search & Filters)
├── blog-details.html       # Blog Article Details
├── contact.html            # Contact & Free Inspection Scheduler
├── login.html              # Customer Login
├── register.html           # Customer Registration
├── admin-dashboard.html    # Dedicated Staff Admin Dashboard
├── 404.html                # Custom 404 Error
├── coming-soon.html        # Maintenance with Countdown
├── css/
│   ├── style.css           # Core Design System, Themes & RTL
│   └── dashboard.css       # Admin Dashboard Stylesheet
├── js/
│   ├── main.js             # Theme, RTL, Slider, Validation & Filters
│   └── dashboard.js        # Dashboard Interactivity, Charts & Tables
└── README.md               # Documentation & Setup Guide
```

---

## 🎨 Customization Guide

### 1. Changing Brand Colors
Open `css/style.css` and modify the CSS variables in the `:root` and `[data-theme="dark"]` selectors:

```css
:root {
  --primary: #0284c7;        /* Primary clean sky blue */
  --primary-hover: #0369a1;
  --secondary: #0d9488;      /* Accent teal */
  --accent: #f59e0b;         /* Warning amber */
}
```

### 2. Changing Typography
Google Fonts (`Plus Jakarta Sans` and `Outfit`) are imported at the top of `css/style.css`. To use different fonts:
```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;600;700&display=swap');

:root {
  --font-primary: 'YOUR_FONT', sans-serif;
  --font-heading: 'YOUR_FONT', sans-serif;
}
```

### 3. Connecting Contact & Inspection Forms to Backend
The template forms include client-side validation and visual feedback in `js/main.js`. To route submissions to an email inbox or backend CRM (e.g., Formspree, EmailJS, Node.js, PHP, Zapier):
1. Locate the form in `contact.html` or the `#freeInspectionModal`.
2. Add your `action="https://formspree.io/f/YOUR_ID"` and `method="POST"`.
3. Alternatively, update the `fetch()` call inside `js/main.js` under section 9 and 10.

### 4. Replacing Images
All image URLs use high-resolution Unsplash CDNs. Replace the `src="..."` attributes with your company's own project photos or assets inside an `images/` directory.

---

## 📱 Browser & Device Support

- **Browsers**: Chrome, Edge, Safari, Firefox, Opera (latest modern versions)
- **Viewports Tested**: 320px, 360px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px+
- **Responsive Framework**: Bootstrap 5.3.3 Grid + Flexbox with CSS custom properties

---

## 📄 License & Credits
- Design & Code: Developed for Mint & Mop Cleaning Services Template.
- Icons: [Bootstrap Icons](https://icons.getbootstrap.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- Royalty-Free Imagery: [Unsplash](https://unsplash.com/)
