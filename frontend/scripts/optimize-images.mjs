/**
 * One-shot (and reusable) photo optimizer for public/images.
 *
 * - Converts every .jpg/.jpeg/.png in public/images to WebP (max width 1600px,
 *   quality 80, auto-rotated from EXIF) and deletes the original.
 * - Regenerates public/images/og.jpg (1200x630) from me.webp for social cards
 *   (kept as JPEG for maximum crawler compatibility).
 *
 * Usage: node scripts/optimize-images.mjs
 * After adding new photos, run this again and reference the .webp file.
 */
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = path.join(import.meta.dirname, '..', 'public', 'images');
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;
const CONVERTIBLE = /\.(jpe?g|png)$/i;

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function convertToWebp(file) {
  const src = path.join(IMAGES_DIR, file);
  const dest = path.join(
    IMAGES_DIR,
    file.replace(CONVERTIBLE, '').toLowerCase() + '.webp'
  );

  const before = (await stat(src)).size;
  await sharp(src)
    .rotate() // bake in EXIF orientation before stripping metadata
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(dest);
  const after = (await stat(dest)).size;
  await unlink(src);

  console.log(
    `${file} -> ${path.basename(dest)}  ${kb(before)} -> ${kb(after)}`
  );
}

async function generateOgImage() {
  const src = path.join(IMAGES_DIR, 'me.webp');
  const dest = path.join(IMAGES_DIR, 'og.jpg');
  await sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 80 })
    .toFile(dest);
  console.log(`og.jpg generated (1200x630) — ${kb((await stat(dest)).size)}`);
}

const files = (await readdir(IMAGES_DIR)).filter(
  (f) => CONVERTIBLE.test(f) && f !== 'og.jpg'
);
for (const file of files) {
  await convertToWebp(file);
}
await generateOgImage();
