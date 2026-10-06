import sharp from 'sharp';
import path from 'path';

const userLogoPath = 'C:/Users/santh/.gemini/antigravity-ide/brain/56d1d1f2-4302-4bd0-96e0-7baf25361cc4/.user_uploaded/media_1791299121550.png';
const assetsDir = 'e:/mymayaon/live_mymayon/src/assets';
const publicDir = 'e:/mymayaon/live_mymayon/public';

async function run() {
  // Crop emblem from user logo
  const cropBox = { left: 230, top: 65, width: 564, height: 480 };
  const { data, info } = await sharp(userLogoPath)
    .extract(cropBox)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const isOuter = new Uint8Array(width * height);

  // A pixel is border/gold if R is relatively high and R > B
  function isGoldOrWhite(idx) {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Gold: r >= 80, g >= 60, r > b * 1.15
    // White/Ivory: r >= 160 && g >= 160 && b >= 140
    if (r >= 80 && g >= 60 && r > b * 1.15) return true;
    if (r >= 160 && g >= 160 && b >= 140) return true;
    return false;
  }

  // BFS flood fill from the borders
  const queue = [];
  function addPixel(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const pIdx = y * width + x;
    if (isOuter[pIdx] === 1) return;
    const byteIdx = pIdx * 4;
    if (isGoldOrWhite(byteIdx)) return; // Stop at gold border
    isOuter[pIdx] = 1;
    queue.push(x, y);
  }

  // Seed with all edge pixels
  for (let x = 0; x < width; x++) {
    addPixel(x, 0);
    addPixel(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    addPixel(0, y);
    addPixel(width - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    addPixel(cx + 1, cy);
    addPixel(cx - 1, cy);
    addPixel(cx, cy + 1);
    addPixel(cx, cy - 1);
  }

  // Set outer pixels to 0 alpha with antialiasing feather
  const result = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pIdx = y * width + x;
      const bIdx = pIdx * 4;
      if (isOuter[pIdx] === 1) {
        result[bIdx + 3] = 0; // Transparent outside
      }
    }
  }

  // Smooth feather edge by checking neighbor transparency
  const feathered = Buffer.from(result);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const pIdx = y * width + x;
      const bIdx = pIdx * 4;
      if (feathered[bIdx + 3] > 0) {
        // Count transparent neighbors
        let transCount = 0;
        if (result[((y - 1) * width + x) * 4 + 3] === 0) transCount++;
        if (result[((y + 1) * width + x) * 4 + 3] === 0) transCount++;
        if (result[(y * width + x - 1) * 4 + 3] === 0) transCount++;
        if (result[(y * width + x + 1) * 4 + 3] === 0) transCount++;

        if (transCount >= 2 && !isGoldOrWhite(bIdx)) {
          feathered[bIdx + 3] = 60;
        } else if (transCount === 1 && !isGoldOrWhite(bIdx)) {
          feathered[bIdx + 3] = 160;
        }
      }
    }
  }

  await sharp(feathered, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(path.join(assetsDir, 'logo-emblem.png'));

  await sharp(feathered, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(path.join(publicDir, 'logo-emblem.png'));

  // Create favicon
  await sharp(feathered, { raw: { width, height, channels: 4 } })
    .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  console.log('Saved logo-emblem.png and favicon.png');
}

run().catch(console.error);
