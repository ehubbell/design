import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const kit = new URL('../src/brand/brand-kit/', import.meta.url);
const output = new URL('exports/images/', kit);
await mkdir(output, { recursive: true });
for (const name of ['icon', 'eh-rounded-light', 'eh-full-bleed', 'eh-full-bleed-light']) {
  const source = fileURLToPath(new URL(`assets/${name}.svg`, kit));
  const raster = sharp(source, { density: 1152 }).resize(1024, 1024);
  await raster.clone().png().toFile(fileURLToPath(new URL(`${name}.png`, output)));
  // JPEG cannot preserve transparent rounded corners; match the logo background.
  await raster.clone().flatten({ background: name.endsWith('-light') ? '#fafafa' : '#202122' })
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toFile(fileURLToPath(new URL(`${name}.jpg`, output)));
}
console.log('Generated 1024 × 1024 PNG and JPG files for all four logos.');
