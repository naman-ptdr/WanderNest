// server/config/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ Missing GOOGLE_GEMINI_API_KEY in .env file");
  process.exit(1);
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generate text using Gemini
 * @param {string} prompt - The prompt to send to Gemini
 * @param {object} generationConfig - Optional config overrides
 * @returns {Promise<string>} - Raw Gemini output as string
 */
export async function generateWithGemini(prompt, generationConfig = {}) {
  const genCfg = {
    temperature: 0.25,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 4096,
    ...generationConfig,
  };

  let attempts = 0;
  const maxRetries = 3;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  while (attempts < maxRetries) {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: genCfg,
      });

      return result?.response?.text() ?? "";
    } catch (err) {
      attempts++;
      console.error(`❌ Gemini API error (attempt ${attempts}):`, err.message);

      // If it's a 503 or network issue, retry after delay
      if (err.message.includes("503") || err.message.includes("overloaded")) {
        console.log("🔄 Retrying in 2 seconds...");
        await delay(2000);
        continue;
      }

      // Other errors → don't retry
      throw new Error("Failed to generate content from Gemini");
    }
  }

  // Fallback response if Gemini is completely down
  console.warn("⚠️ Gemini API unreachable after retries, using fallback.");
  return JSON.stringify({
    destination: "Unknown",
    duration: "N/A",
    plan: [],
    note: "AI service temporarily unavailable. Please try again later."
  });
}


/**
 * Extract valid JSON from AI response text with fallbacks
 * @param {string} text - Raw AI response
 * @returns {object|null} - Parsed JSON object or null if failed
 */
export function extractJSON(text) {
  if (!text || typeof text !== "string") return null;

  // Remove markdown code fences if present
  let cleaned = text.replace(/```json|```/g, "").trim();

  // 1️⃣ Direct parse attempt
  try {
    return JSON.parse(cleaned);
  } catch {}

  // 2️⃣ Try regex to capture JSON object or array
  const match = cleaned.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {}
  }

  // 3️⃣ Try repairing common issues like trailing commas
  try {
    cleaned = cleaned
      .replace(/,\s*}/g, "}") // Remove trailing commas in objects
      .replace(/,\s*]/g, "]"); // Remove trailing commas in arrays
    return JSON.parse(cleaned);
  } catch {}

  // 4️⃣ If all fails
  console.warn("⚠️ Failed to parse Gemini JSON response. Raw output:", text);
  return null;
}
