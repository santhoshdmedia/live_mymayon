import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGES = [
  {
    name: 'thanjavur.jpg',
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'kodaikanal.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'kanyakumari.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'ooty.jpg',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'chennai.jpg',
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'kumbakonam.jpg',
    url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'tiruvannamalai.jpg',
    url: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'mahabalipuram.jpg',
    url: 'https://images.unsplash.com/photo-1600100397608-f010e421d4a6?auto=format&fit=crop&w=1200&q=80',
  },
];

const destDir = path.resolve('public/images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const img of IMAGES) {
    const filePath = path.join(destDir, img.name);
    try {
      console.log(`Downloading ${img.name}...`);
      await download(img.url, filePath);
      console.log(`✓ Saved ${img.name}`);
    } catch (err) {
      console.error(`✗ Failed ${img.name}:`, err.message);
    }
  }
}

run();
