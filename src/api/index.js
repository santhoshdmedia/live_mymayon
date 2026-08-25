const BASE = import.meta.env.VITE_API_URL || 'https://api.mymayon.com/api';

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json();
}

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `API ${path} → ${res.status}`);
  return json;
}

// Districts
export const fetchDistricts = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return get(`/districts${q ? `?${q}` : ''}`);
};
export const fetchDistrict = (slug) => get(`/districts/${slug}`);

// Packages
export const fetchPackages = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return get(`/packages${q ? `?${q}` : ''}`);
};
export const fetchPackage = (slug) => get(`/packages/${slug}`);

// Enquiries
export const submitEnquiry = (body) => post('/enquiries', body);

// Hero slider (homepage)
export const fetchHeroSlides = () => get('/hero-slides');
