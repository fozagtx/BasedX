import { google } from "@ai-sdk/google";

// Configure Google AI providers
// Note: API key should be set as GOOGLE_GENERATIVE_AI_API_KEY in environment
export const geminiModel = google("models/gemini-1.5-pro-latest");
// export const imagenModel = google("models/imagen-3.0-generate-001"); // Imagen not directly supported yet

// API key validation function (for manual validation if needed)
export const validateApiKey = () => {
  const apiKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_google_ai_api_key_here") {
    throw new Error(
      "Google AI API key is missing or not configured. Please:\n1. Get your API key from: https://makersuite.google.com/app/apikey\n2. Add it to .env.local as: GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here\n3. Restart the development server",
    );
  }
  if (apiKey.length < 10) {
    throw new Error(
      "API key appears to be invalid (too short). Please check your API key from Google AI Studio.",
    );
  }
  return apiKey;
};
