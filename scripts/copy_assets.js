const fs = require('fs');
const path = require('path');

const MEDIA_DIR = '/Users/petercurrey/Desktop/ALKOTA Cycles/Media';
const PUBLIC_DIR = '/Users/petercurrey/Desktop/ALKOTA Cycles/public';
const BRAND_DIR = path.join(PUBLIC_DIR, 'brand');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

if (!fs.existsSync(BRAND_DIR)) fs.mkdirSync(BRAND_DIR, { recursive: true });
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

const LOGO_SRC = path.join(MEDIA_DIR, 'ChatGPT Image Aug 8, 2026, 04_46_07 PM (1).png');
const MONO_SRC = path.join(MEDIA_DIR, 'ChatGPT Image Aug 8, 2026, 04_46_08 PM (2).png');
const HERO_SRC = path.join(MEDIA_DIR, 'ChatGPT Image Aug 8, 2026, 04_46_08 PM (3).png');
const RIDE_SRC = path.join(MEDIA_DIR, 'ChatGPT Image Aug 8, 2026, 04_46_11 PM (6).png');

// Copy primary assets
fs.copyFileSync(LOGO_SRC, path.join(BRAND_DIR, 'alkota-logo-dark.png'));
fs.copyFileSync(LOGO_SRC, path.join(BRAND_DIR, 'alkota-logo-light.png'));
fs.copyFileSync(MONO_SRC, path.join(BRAND_DIR, 'alkota-monogram-dark.png'));
fs.copyFileSync(MONO_SRC, path.join(BRAND_DIR, 'alkota-monogram-light.png'));

fs.copyFileSync(MONO_SRC, path.join(PUBLIC_DIR, 'icon.png'));
fs.copyFileSync(MONO_SRC, path.join(PUBLIC_DIR, 'favicon.ico'));
fs.copyFileSync(MONO_SRC, path.join(PUBLIC_DIR, 'apple-icon.png'));

fs.copyFileSync(HERO_SRC, path.join(IMAGES_DIR, 'project01-glacier-white.png'));
fs.copyFileSync(HERO_SRC, path.join(IMAGES_DIR, 'project01-naked-carbon.png'));
fs.copyFileSync(RIDE_SRC, path.join(IMAGES_DIR, 'project01-alpine-testing.png'));
fs.copyFileSync(RIDE_SRC, path.join(IMAGES_DIR, 'engineering-workshop.png'));
fs.copyFileSync(HERO_SRC, path.join(PUBLIC_DIR, 'og-image.png'));

console.log('Node.js asset copy complete!');
