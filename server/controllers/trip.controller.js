// server/controllers/trip.controller.js
import { generateWithGemini, extractJSON } from "../config/gemini.js";
import Trip from "../models/trip.model.js";

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
      "hotelImageUrl": "",
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
          "placeImageUrl": "",
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
1. Provide at least 5 real hotels with actual names, addresses, coordinates, ratings, and public image URLs (no placeholders or example.com).
2. For each day, give exactly 3 real attractions (morning, afternoon, evening) with full details: name, description, exact coordinates, real image URL, realistic ticket pricing, best time, and time slots in HH:MM format.
3. Ensure the bestTimeVisit for each day is relevant to that day's plan.
4. All coordinates must be accurate and in decimal degrees format.
5. Estimated cost should match the chosen budget level and be realistic for the destination.
6. No markdown, code fences, or commentary — only raw JSON.
7. Currency for ticketPricing can be local, but estimatedCost.currency must be "USD".
8. Timings must be logical for the order of attractions.

Generate for:
${JSON.stringify({ location, days, budget, group })}
`;

    // Call Gemini
    const aiResponse = await generateWithGemini(prompt);

    // Clean & parse the AI output
    const parsedData = extractJSON(aiResponse);

    if (!parsedData) {
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    // Send the valid JSON
    res.status(200).json(parsedData);

  } catch (err) {
    console.error("Trip generation error:", err);
    res.status(500).json({ error: "Failed to generate trip" });
  }
};
