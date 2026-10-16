const fs = require('fs');

let about = fs.readFileSync('about.html', 'utf8');
about = about.replace('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=120&q=80');
about = about.replace('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80');
fs.writeFileSync('about.html', about, 'utf8');

let bDet = fs.readFileSync('blog-details.html', 'utf8');
bDet = bDet.replace('id="artAuthorImg" src="https://images.unsplash.com/photo-1560250097-0b93528c311a', 'id="artAuthorImg" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e');
fs.writeFileSync('blog-details.html', bDet, 'utf8');

console.log('Avatars made unique!');
