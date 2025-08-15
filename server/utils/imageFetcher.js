import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_CX;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// --- Format query ---
const formatPlaceQuery = (name, location = "") =>
  `${name}${location ? `, ${location}` : ""}`.trim();

// --- Google Custom Search ---
const fetchFromGoogle = async (query, count = 1) => {
  if (!GOOGLE_API_KEY || !GOOGLE_CX) return null;
  if (!query || !query.trim()) return null;

  try {
    const url = "https://www.googleapis.com/customsearch/v1";
    const { data } = await axios.get(url, {
      params: {
        q: query,
        cx: GOOGLE_CX,
        searchType: "image",
        num: Math.min(count, 10),
        key: GOOGLE_API_KEY,
      },
    });
    return data.items?.map((item) => item.link) || null;
  } catch (err) {
    console.error("Google API error:", err.response?.data?.error?.message || err.message);
    return null;
  }
};

// --- Wikimedia Commons ---
const fetchFromWikimedia = async (query, count = 1) => {
  if (!query || !query.trim()) return null;
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      query
    )}&gsrlimit=${count}&prop=imageinfo&iiprop=url&format=json&origin=*`;
    const { data } = await axios.get(url);
    const pages = data?.query?.pages;
    if (!pages) return null;
    return Object.values(pages).map((page) => page.imageinfo?.[0]?.url);
  } catch (err) {
    console.error("Wikimedia API error:", err.message);
    return null;
  }
};

// --- Unsplash ---
const fetchFromUnsplash = async (query, count = 1) => {
  if (!UNSPLASH_ACCESS_KEY || !query) return null;
  try {
    const { data } = await axios.get(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
    );
    return data.results?.map((r) => r.urls.regular) || null;
  } catch (err) {
    console.error("Unsplash API error:", err.message);
    return null;
  }
};

// --- Pexels ---
const fetchFromPexels = async (query, count = 1) => {
  if (!PEXELS_API_KEY || !query) return null;
  try {
    const { data } = await axios.get(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );
    return data.photos?.map((p) => p.src.original) || null;
  } catch (err) {
    console.error("Pexels API error:", err.message);
    return null;
  }
};

// --- Pixabay ---
const fetchFromPixabay = async (query, count = 1) => {
  if (!PIXABAY_API_KEY || !query) return null;
  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${count}`
    );
    return data.hits?.map((h) => h.largeImageURL) || null;
  } catch (err) {
    console.error("Pixabay API error:", err.message);
    return null;
  }
};

// --- Fetch single image ---
export const fetchImage = async (name, location = "") => {
  if (!name) return "/default.jpg";
  const query = formatPlaceQuery(name, location);

  const image =
    (await fetchFromUnsplash(query, 5))?.[Math.floor(Math.random() * 5)] ||
    (await fetchFromPexels(query, 5))?.[Math.floor(Math.random() * 5)] ||
    (await fetchFromPixabay(query, 5))?.[Math.floor(Math.random() * 5)] ||
    (await fetchFromWikimedia(query, 5))?.[Math.floor(Math.random() * 5)];

  return image || "/default.jpg";
};


// --- Fetch multiple images ---
export const fetchLocationImages = async (name, location = "", count = 5) => {
  if (!name) return ["/default-place.jpg"];
  const query = formatPlaceQuery(name, location);

  let images =
    (await fetchFromGoogle(query, count)) ||
    (await fetchFromWikimedia(query, count)) ||
    (await fetchFromUnsplash(query, count)) ||
    (await fetchFromPexels(query, count)) ||
    (await fetchFromPixabay(query, count));

  images = images?.filter((url) => url && !url.match(/\.(svg|pdf)$/i));
  return images && images.length ? images : ["/default-place.jpg"];
};
