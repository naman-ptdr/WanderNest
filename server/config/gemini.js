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

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: genCfg,
    });

    // Gemini SDK returns text like result.response.text()
    return result?.response?.text() ?? "";
  } catch (err) {
    console.error("Gemini API error:", err);
    throw new Error("Failed to generate content from Gemini");
  }
}

/**
 * Extract valid JSON from AI response text
 * @param {string} text - Raw AI response
 * @returns {object|null} - Parsed JSON object or null if failed
 */
export function extractJSON(text) {
  if (!text || typeof text !== "string") return null;

  // Remove triple backticks and possible "json" hint
  const cleaned = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    // Try fallback regex extraction if extra text exists
    const match = cleaned.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}
