// server/controllers/trip.controller.js
import { generateWithGemini, extractJSON } from "../config/gemini.js";
import Trip from "../models/trip.model.js";
import axios from "axios";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// --- Helpers ---
const sanitizeQuery = (text) => {
  if (!text) return "";
  return text.replace(/[^a-zA-Z0-9\s]/g, "").trim();
};

const usedImages = new Set();

// Fetch random image from Pexels API
const fetchImageFromPexels = async (query) => {
  try {
    const res = await axios.get("https://api.pexels.com/v1/search", {
      params: { query, per_page: 5, orientation: "landscape" },
      headers: { Authorization: PEXELS_API_KEY },
    });
    const photos = res.data.photos;
    if (photos.length > 0) {
      const randomPhoto =
        photos[Math.floor(Math.random() * photos.length)]?.src?.landscape;
      return randomPhoto || "";
    }
    return "";
  } catch (err) {
    console.error(`Pexels fetch error for ${query}:`, err.message);
    return "";
  }
};

// Fallback: random image from Unsplash API
const fetchImageFromUnsplash = async (query) => {
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, per_page: 5, orientation: "landscape" },
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    });
    const results = res.data.results;
    if (results.length > 0) {
      const randomPhoto =
        results[Math.floor(Math.random() * results.length)]?.urls?.regular;
      return randomPhoto || "";
    }
    return "";
  } catch (err) {
    console.error(`Unsplash fetch error for ${query}:`, err.message);
    return "";
  }
};

// Main fetch function with duplicate prevention
const fetchUniqueImage = async (query) => {
  let image = await fetchImageFromPexels(query);
  if (!image) {
    image = await fetchImageFromUnsplash(query);
  }

  let attempt = 1;
  while (image && usedImages.has(image) && attempt < 5) {
    // Try again with slightly modified query
    const altQuery = `${query} ${attempt}`;
    image = await fetchImageFromPexels(altQuery);
    if (!image) {
      image = await fetchImageFromUnsplash(altQuery);
    }
    attempt++;
  }

  if (image) usedImages.add(image);
  return image || "";
};

export const generateTrip = async (req, res) => {
  try {
    const { location, days, budget, group } = req.body;

    const prompt = `
You are a travel planner AI that must return STRICTLY valid JSON only — no explanations, no markdown, no extra text.  
Generate a realistic, detailed trip plan following EXACTLY this schema and rules.

Schema:
{
  "location": { "name": "", "lat": number, "lng": number },
  "days": number,
  "budget": "Cheap|Moderate|Luxury",
  "group": "solo|couple|family|friends",
  "hotelOptions": [
    {
      "hotelName": "",
      "hotelAddress": "",
      "price": "",
      "geoCoordinates": { "latitude": number, "longitude": number },
      "rating": "",
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": number,
      "plan": [
        {
          "placeName": "",
          "placeDetails": "",
          "geoCoordinates": { "latitude": number, "longitude": number },
          "ticketPricing": "",
          "bestTime": "",
          "startTime": "HH:MM",
          "endTime": "HH:MM"
        }
      ],
      "bestTimeVisit": ""
    }
  ],
  "estimatedCost": {
    "total": number,
    "currency": "USD",
    "breakdown": { "hotels": number, "tickets": number, "food": number }
  }
}

Rules for generation:
1. Provide at least 5 real hotels with actual names, addresses, coordinates, ratings, and realistic descriptions.
2. For each day, give exactly 3 real attractions (morning, afternoon, evening) with full details: name, description, exact coordinates, realistic ticket pricing, best time, and time slots in HH:MM format.
3. Ensure the bestTimeVisit for each day is relevant to that day's plan.
4. All coordinates must be accurate and in decimal degrees format.
5. Estimated cost should match the chosen budget level and be realistic for the destination.
6. No markdown, code fences, or commentary — only raw JSON.
7. Currency for ticketPricing can be local, but estimatedCost.currency must be "USD".
8. Timings must be logical for the order of attractions.

Generate for:
${JSON.stringify({ location, days, budget, group })}
`;

    // Step 1: Call Gemini
    const aiResponse = await generateWithGemini(prompt);

    // Step 2: Clean & parse AI output
    const parsedData = extractJSON(aiResponse);
    if (!parsedData) {
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    // Step 3: Add images safely
    if (Array.isArray(parsedData.hotelOptions)) {
      for (const hotel of parsedData.hotelOptions) {
        try {
          hotel.hotelImageUrl =
            (await fetchUniqueImage(
              `${sanitizeQuery(hotel.hotelName)} ${sanitizeQuery(parsedData.location?.name)} hotel exterior`
            )) || "";
        } catch (e) {
          console.error("Hotel image fetch failed:", e.message);
          hotel.hotelImageUrl = "";
        }
      }
    }

    if (Array.isArray(parsedData.itinerary)) {
      for (const day of parsedData.itinerary) {
        if (Array.isArray(day.plan)) {
          for (const place of day.plan) {
            try {
              place.placeImageUrl =
                (await fetchUniqueImage(
                  `${sanitizeQuery(place.placeName)} ${sanitizeQuery(parsedData.location?.name)} tourist attraction`
                )) || "";
            } catch (e) {
              console.error("Place image fetch failed:", e.message);
              place.placeImageUrl = "";
            }
          }
        }
      }
    }

    // Step 4: Send final enriched JSON
    res.status(200).json(parsedData);

  } catch (err) {
    console.error("Trip generation error:", err);
    res.status(500).json({ error: "Failed to generate trip" });
  }
};
