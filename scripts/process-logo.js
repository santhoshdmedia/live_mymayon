import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userLogoPath = 'C:/Users/santh/.gemini/antigravity-ide/brain/56d1d1f2-4302-4bd0-96e0-7baf25361cc4/.user_uploaded/media_1791299121550.png';
const assetsDir = 'e:/mymayaon/live_mymayon/src/assets';
const publicDir = 'e:/mymayaon/live_mymayon/public';

async function process() {
  const meta = await sharp(userLogoPath).metadata();
  console.log('Source logo dimensions:', meta.width, 'x', meta.height);

  // 1. Copy the full pristine high-res logo as logo-full.png and logo.png
  await sharp(userLogoPath).toFile(path.join(assetsDir, 'logo-full.png'));
  await sharp(userLogoPath).toFile(path.join(assetsDir, 'logo.png'));
  await sharp(userLogoPath).toFile(path.join(publicDir, 'logo.png'));
  console.log('Saved logo.png and logo-full.png');

  // 2. Crop the Emblem only (Triangle with stupa, elephant, and lotus)
  // Let's find the bounding box of the emblem in 1024x778:
  // Top stupa tip is around y = 80, bottom lotus ends around y = 520
  // Left side around x = 240, right side around x = 784 (width approx 550, height approx 460)
  // Let's extract emblem region centered:
  // x: 230, y: 70, width: 564, height: 470
  await sharp(userLogoPath)
    .extract({ left: 230, top: 65, width: 564, height: 475 })
    .toFile(path.join(assetsDir, 'logo-emblem-box.png'));

  // 3. Create a transparent emblem version (removing the dark blue background #041e4c / #052358)
  // Let's read raw pixels of the emblem crop and compute alpha based on color distance from blue
  const { data, info } = await sharp(userLogoPath)
    .extract({ left: 230, top: 65, width: 564, height: 475 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Blue background is approximately R ~ 4-15, G ~ 25-45, B ~ 65-100 (where B > R + 30 and B > G + 15)
  // Let's create a transparent PNG where the deep blue background becomes transparent
  const transparentBuffer = Buffer.from(data);
  for (let i = 0; i < transparentBuffer.length; i += 4) {
    const r = transparentBuffer[i];
    const g = transparentBuffer[i + 1];
    const b = transparentBuffer[i + 2];

    // Check if pixel is part of the dark blue background
    // Gold elements: R > 120, G > 90, B < 150 (R > B)
    // Ivory elephant: R > 180, G > 180, B > 180
    // Shaded ivory: R > 120, G > 120, B > 120
    // Dark blue background: R < 40, G < 60, B between 40 and 120
    const isBlueBg = (r < 50 && g < 75 && b < 130 && (b > r + 15));
    if (isBlueBg) {
      // Smooth fade for edge pixels
      const brightness = Math.max(r, g, b);
      if (b < 70 && r < 25 && g < 40) {
        transparentBuffer[i + 3] = 0; // Fully transparent
      } else {
        // Edge feathering
        const diff = (b - 40) / 70;
        transparentBuffer[i + 3] = Math.max(0, Math.min(255, Math.round((1 - diff) * 255)));
      }
    }
  }

  await sharp(transparentBuffer, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    }
  }).png().toFile(path.join(assetsDir, 'logo-emblem-transparent.png'));
  await sharp(transparentBuffer, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    }
  }).png().toFile(path.join(publicDir, 'logo-emblem-transparent.png'));

  // Also create a square emblem with rounded-soft corners or transparent background for favicon
  await sharp(transparentBuffer, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    }
  }).resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  console.log('All logo assets generated successfully!');
}

process().catch(console.error);
