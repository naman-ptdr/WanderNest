import { generateWithGemini, extractJSON } from "../config/gemini.js";
import { fetchImage, fetchLocationImages } from "../utils/imageFetcher.js";

// GET endpoint to just fetch images
export const getTripImages = async (req, res) => {
  try {
    const { location } = req.query;
    const images = await fetchLocationImages(location);
    res.json({ images });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

// Main Trip Generator
export const generateTrip = async (req, res) => {
  try {
    const { location, days, budget, group } = req.body;

    const prompt = `
You are a travel planner AI that must return STRICTLY valid JSON only — no explanations, no markdown, no extra text.
Generate a realistic, detailed trip plan following EXACTLY this schema and rules:

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

    // 1️⃣ Generate plan with Gemini
    const aiResponse = await generateWithGemini(prompt);
    const parsedData = extractJSON(aiResponse);
    if (!parsedData) {
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    // 2️⃣ Add hotel images
    if (Array.isArray(parsedData.hotelOptions)) {
      for (const hotel of parsedData.hotelOptions) {
        hotel.hotelImageUrl = await fetchImage(
          hotel.hotelName || "",
          parsedData.location?.name || "",
          "hotel",
          hotel.hotelAddress || ""
        );
      }
    }

    // 3️⃣ Add place images
    if (Array.isArray(parsedData.itinerary)) {
      for (const day of parsedData.itinerary) {
        if (Array.isArray(day.plan)) {
          for (const place of day.plan) {
            place.placeImageUrl = await fetchImage(
              place.placeName || "",
              parsedData.location?.name || "",
              "place"
            );
          }
        }
      }
    }

    // 4️⃣ Send final enriched JSON
    res.status(200).json(parsedData);
  } catch (err) {
    console.error("Trip generation error:", err);
    res.status(500).json({ error: "Failed to generate trip" });
  }
};
