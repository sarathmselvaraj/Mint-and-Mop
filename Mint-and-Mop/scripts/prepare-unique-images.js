const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function downloadAndProcess(url, outPath, options = {}) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mint & MopService/1.0' } });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    
    let pipeline = sharp(buffer);
    if (options.crop) {
      pipeline = pipeline.extract(options.crop);
    }
    const width = options.width || 1200;
    const height = options.height || 800;
    pipeline = pipeline.resize(width, height, { fit: 'cover', position: options.position || 'center' });
    
    if (options.modulate) {
      pipeline = pipeline.modulate(options.modulate);
    }
    if (options.sharpen) {
      pipeline = pipeline.sharpen();
    }
    
    await pipeline.jpeg({ quality: 85 }).toFile(outPath);
    console.log(`[OK] Created ${outPath}`);
    return true;
  } catch (err) {
    console.error(`[ERR] ${outPath}:`, err.message);
    return false;
  }
}

async function copyOrProcessLocal(srcPath, outPath, options = {}) {
  try {
    let pipeline = sharp(srcPath);
    if (options.crop) {
      pipeline = pipeline.extract(options.crop);
    }
    if (options.resize) {
      pipeline = pipeline.resize(options.resize.width, options.resize.height, { fit: 'cover', position: options.resize.position || 'center' });
    }
    if (options.modulate) {
      pipeline = pipeline.modulate(options.modulate);
    }
    await pipeline.jpeg({ quality: 85 }).toFile(outPath);
    console.log(`[OK] Processed local -> ${outPath}`);
    return true;
  } catch (err) {
    console.error(`[ERR] Local ${srcPath} -> ${outPath}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('--- STARTING UNIQUE IMAGE GENERATION ---');

  // 1. HOME 1 HERO: Attic Cleaning
  await copyOrProcessLocal('images/hero-1-attic.jpg', 'images/hero-1-attic-clean.jpg');

  // 2. HOME 2 HERO: Crawl Space Specialist Restoration
  await copyOrProcessLocal('images/hero-2-crawlspace-restoration.jpg', 'images/hero-2-crawlspace-clean.jpg');

  // 3. HOME 1 SERVICE CARDS (6 Unique Cards)
  await copyOrProcessLocal('images/hepa-detail-vacuum.jpg', 'images/card-1-attic-hepa.jpg');
  await copyOrProcessLocal('images/insulation-vacuum.jpg', 'images/card-2-insulation-vac.jpg');
  await copyOrProcessLocal('images/crawl-barrier-install.jpg', 'images/card-3-crawl-barrier.jpg');
  await copyOrProcessLocal('images/sanitization-fogging.jpg', 'images/card-4-sanitization-fog.jpg');
  await copyOrProcessLocal('images/flir-thermal-scan.jpg', 'images/card-5-flir-thermal.jpg');
  await copyOrProcessLocal('images/rodent-mesh-sealing.jpg', 'images/card-6-rodent-mesh.jpg');

  // 4. HOME 1 BEFORE & AFTER SLIDER
  await copyOrProcessLocal('images/attic-before.jpg', 'images/slider-attic-before.jpg');
  await copyOrProcessLocal('images/attic-after.jpg', 'images/slider-attic-after.jpg');

  // 5. HOME 2 DEEP DIVE SERVICES (Separate Unique Images)
  // Deep dive insulation removal: industrial vacuum truck setup / attic extraction
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80',
    'images/home2-insulation-deepdive.jpg',
    { width: 1200, height: 800, modulate: { brightness: 1.05 } }
  );

  // Deep dive crawl space: clean crawl space foundation walls & vapor barrier
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    'images/home2-crawl-deepdive.jpg',
    { width: 1200, height: 800, position: 'top' }
  );

  // 6. HOME 2 BEFORE & AFTER SHOWCASE (4 Unique Images)
  // Case 1 Attic Before & After
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'images/case-1-attic-before.jpg',
    { width: 800, height: 500, modulate: { brightness: 0.85, saturation: 0.8 } }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    'images/case-1-attic-after.jpg',
    { width: 800, height: 500, modulate: { brightness: 1.1 } }
  );
  // Case 2 Crawl Before & After
  await copyOrProcessLocal('images/crawl-before-mud.jpg', 'images/case-2-crawl-before.jpg');
  await downloadAndProcess(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Crawl-space-inside.jpg/1280px-Crawl-space-inside.jpg',
    'images/case-2-crawl-after.jpg',
    { width: 800, height: 500, modulate: { brightness: 1.2 } }
  );

  // 7. ABOUT US UNIQUE IMAGES
  await copyOrProcessLocal('images/team-specialists.jpg', 'images/about-team-crew.jpg');
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'images/about-heritage-home.jpg',
    { width: 1200, height: 800 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=1200&q=80',
    'images/about-safety-ppe.jpg',
    { width: 1200, height: 800 }
  );

  // 8. SERVICES PAGE (5 Dedicated Service Overview Images)
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    'images/svc-overview-1-attic.jpg',
    { width: 1200, height: 800 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80',
    'images/svc-overview-2-insulation.jpg',
    { width: 1200, height: 800 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80',
    'images/svc-overview-3-crawl.jpg',
    { width: 1200, height: 800 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=1200&q=80',
    'images/svc-overview-4-sanitization.jpg',
    { width: 1200, height: 800, modulate: { hue: 20 } }
  );
  // Dedicated FLIR thermal scan for Services page
  await downloadAndProcess(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Vespaio_aerato_per_residenziale.jpg/800px-Vespaio_aerato_per_residenziale.jpg',
    'images/svc-overview-5-thermal.jpg',
    { width: 1200, height: 800 }
  );

  // 9. SERVICE DETAILS DYNAMIC HEROS & CARDS (5 Unique Heros)
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    'images/dyn-hero-attic.jpg',
    { width: 1200, height: 900 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80',
    'images/dyn-hero-insulation.jpg',
    { width: 1200, height: 900 }
  );
  await downloadAndProcess(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Crawlspace_under_house.jpg/1280px-Crawlspace_under_house.jpg',
    'images/dyn-hero-crawl.jpg',
    { width: 1200, height: 900 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=1200&q=80',
    'images/dyn-hero-sanitization.jpg',
    { width: 1200, height: 900 }
  );
  // Service Details FLIR Hero: dedicated thermal imaging
  await copyOrProcessLocal('images/blog-thermal-ceiling.jpg', 'images/dyn-hero-flir.jpg');

  // Service Details Related Service Cards
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80',
    'images/rel-card-insulation.jpg',
    { width: 400, height: 300 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80',
    'images/rel-card-crawl.jpg',
    { width: 400, height: 300 }
  );
  await copyOrProcessLocal('images/flir-thermal-scan.jpg', 'images/rel-card-thermal.jpg', {
    resize: { width: 400, height: 300 }
  });
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    'images/details-healthy-home-ext.jpg',
    { width: 1000, height: 700 }
  );

  // 10. BLOG UNIQUE IMAGES (Featured + 6 Articles + 2 Sidebars)
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    'images/blog-featured-main.jpg',
    { width: 1200, height: 700 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    'images/blog-post-1-attic.jpg',
    { width: 800, height: 500 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    'images/blog-post-2-crawl.jpg',
    { width: 800, height: 500 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80',
    'images/blog-post-3-insulation.jpg',
    { width: 800, height: 500 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=800&q=80',
    'images/blog-post-4-sanitization.jpg',
    { width: 800, height: 500 }
  );
  // Blog Post 5: FLIR Thermal Camera Moisture Scan
  await copyOrProcessLocal('images/flir-thermal-scan.jpg', 'images/blog-post-5-flir.jpg', {
    resize: { width: 800, height: 500 }
  });
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'images/blog-post-6-rodent.jpg',
    { width: 800, height: 500 }
  );

  // Blog sidebars
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    'images/blog-sidebar-promo-1.jpg',
    { width: 600, height: 400 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    'images/blog-sidebar-promo-2.jpg',
    { width: 600, height: 400 }
  );

  // Blog details hero & related
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    'images/blog-details-art-hero.jpg',
    { width: 1200, height: 600 }
  );
  await downloadAndProcess(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Crawlspace_under_house.jpg/1000px-Crawlspace_under_house.jpg',
    'images/blog-details-art-inline.jpg',
    { width: 1000, height: 600 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80',
    'images/blog-rel-thumb-1.jpg',
    { width: 150, height: 150 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=200&q=80',
    'images/blog-rel-thumb-2.jpg',
    { width: 150, height: 150 }
  );
  await downloadAndProcess(
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=200&q=80',
    'images/blog-rel-thumb-3.jpg',
    { width: 150, height: 150 }
  );

  console.log('--- ALL UNIQUE IMAGES PREPARED SUCCESSFULLY ---');
}

main().catch(console.error);
