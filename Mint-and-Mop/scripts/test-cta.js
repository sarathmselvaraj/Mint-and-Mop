const sharp = require('sharp');
const svg = `
<svg width='800' height='300' xmlns='http://www.w3.org/2000/svg'>
  <defs>
    <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#0284c7'/>
      <stop offset='100%' stop-color='#06b6d4'/>
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' fill='url(#grad)'/>
  <text x='400' y='60' text-anchor='middle' fill='#ffffff' font-family='sans-serif' font-size='14' font-weight='bold'>LIMITED TIME OFFER</text>
  <text x='400' y='110' text-anchor='middle' fill='#ffffff' font-family='sans-serif' font-size='28' font-weight='bold'>Ready For A Cleaner, Healthier Home?</text>
  <text x='400' y='160' text-anchor='middle' fill='rgba(255,255,255,0.5)' font-family='sans-serif' font-size='16'>Option A (original white-50): Book your 100% free attic &amp; crawl space inspection.</text>
  <text x='400' y='200' text-anchor='middle' fill='#082f49' font-family='sans-serif' font-size='16' font-weight='600'>Option B (darker navy #082f49): Book your 100% free attic &amp; crawl space inspection.</text>
  <text x='400' y='240' text-anchor='middle' fill='#0f172a' font-family='sans-serif' font-size='16' font-weight='700'>Option C (darker slate #0f172a): Book your 100% free attic &amp; crawl space inspection.</text>
</svg>
`;
sharp(Buffer.from(svg)).png().toFile('images/test-cta-contrast.png').then(() => console.log('Rendered test-cta-contrast.png'));
