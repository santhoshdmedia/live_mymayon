// Resolves high-resolution cover image for any package or district
const LOCATION_IMAGE_MAP = {
  madurai: '/images/madurai.jpg',
  rameswaram: '/images/rameswaram.jpg',
  ramanathapuram: '/images/rameswaram.jpg',
  kodaikanal: '/images/kodaikanal.jpg',
  dindigul: '/images/kodaikanal.jpg',
  thanjavur: '/images/thanjavur.jpg',
  kanyakumari: '/images/kanyakumari.jpg',
  nilgiris: '/images/ooty.jpg',
  ooty: '/images/ooty.jpg',
  chennai: '/images/chennai.jpg',
  kumbakonam: '/images/kumbakonam.jpg',
  tiruvannamalai: '/images/tiruvannamalai.jpg',
  chengalpattu: '/images/mahabalipuram.jpg',
  kanchipuram: '/images/thanjavur.jpg',
  coimbatore: '/images/ooty.jpg',
  trichy: '/images/thanjavur.jpg',
  tiruchirappalli: '/images/thanjavur.jpg',
  tirunelveli: '/images/kanyakumari.jpg',
  thoothukudi: '/images/rameswaram.jpg',
  tenkasi: '/images/kodaikanal.jpg',
  salem: '/images/kodaikanal.jpg',
  dharmapuri: '/images/kodaikanal.jpg',
  krishnagiri: '/images/chennai.jpg',
  vellore: '/images/thanjavur.jpg',
  cuddalore: '/images/rameswaram.jpg',
  nagapattinam: '/images/rameswaram.jpg',
  tiruvarur: '/images/thanjavur.jpg',
  ariyalur: '/images/thanjavur.jpg',
  perambalur: '/images/thanjavur.jpg',
  pudukottai: '/images/thanjavur.jpg',
  sivaganga: '/images/madurai.jpg',
  virudhunagar: '/images/madurai.jpg',
  theni: '/images/kodaikanal.jpg',
  namakkal: '/images/kodaikanal.jpg',
  karur: '/images/thanjavur.jpg',
  erode: '/images/ooty.jpg',
  tiruppur: '/images/ooty.jpg',
};

const CATEGORY_IMAGE_MAP = {
  Spiritual: '/images/madurai.jpg',
  Heritage: '/images/thanjavur.jpg',
  Nature: '/images/kodaikanal.jpg',
  Adventure: '/images/ooty.jpg',
  Honeymoon: '/images/kodaikanal.jpg',
  Family: '/images/kanyakumari.jpg',
  'Food & Culture': '/images/madurai.jpg',
  Culture: '/images/madurai.jpg',
  Coastal: '/images/rameswaram.jpg',
};

export function getCoverImage(item = {}) {
  // If item already has a non-empty heroImage or coverImage URL
  if (item.heroImage && typeof item.heroImage === 'string' && item.heroImage.trim() !== '') {
    return item.heroImage;
  }
  if (item.coverImage && typeof item.coverImage === 'string' && item.coverImage.trim() !== '') {
    return item.coverImage;
  }
  if (item.images && Array.isArray(item.images) && item.images.length > 0 && item.images[0]?.url) {
    return item.images[0].url;
  }

  // Lookup by locationLabel, name, slug, or district
  const candidates = [
    item.locationLabel,
    item.name,
    item.districtQuery,
    item.slug,
  ].filter(Boolean);

  for (const c of candidates) {
    const key = String(c).toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const [mapKey, imgUrl] of Object.entries(LOCATION_IMAGE_MAP)) {
      if (key.includes(mapKey) || mapKey.includes(key)) {
        return imgUrl;
      }
    }
  }

  // Lookup by category
  if (item.category && CATEGORY_IMAGE_MAP[item.category]) {
    return CATEGORY_IMAGE_MAP[item.category];
  }

  // Default fallback
  return '/images/madurai.jpg';
}
