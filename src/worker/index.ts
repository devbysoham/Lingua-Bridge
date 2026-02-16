import { Hono } from "hono";
import { cors } from "hono/cors";
import { GoogleGenAI } from "@google/genai";
import type { Env } from "@/shared/types";

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors());

interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

// Language code to full name mapping
const languageNames: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  zh: "Chinese",
  ko: "Korean",
  ar: "Arabic",
  hi: "Hindi",
};

app.post("/api/translate", async (c) => {
  try {
    const { text, sourceLang, targetLang } = await c.req.json<TranslationRequest>();

    // Validate input
    if (!text || !text.trim()) {
      return c.json({ error: "Text is required" }, 400);
    }

    if (!sourceLang || !targetLang) {
      return c.json({ error: "Source and target languages are required" }, 400);
    }

    if (sourceLang === targetLang) {
      return c.json({ translation: text });
    }

    // Initialize Gemini AI client
    const ai = new GoogleGenAI({
      apiKey: c.env.GEMINI_API_KEY,
    });

    const sourceLanguage = languageNames[sourceLang] || sourceLang;
    const targetLanguage = languageNames[targetLang] || targetLang;

    // Use Gemini Flash for fast, cost-efficient translation
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Provide ONLY the translation, without any additional explanation, commentary, or quotes. Maintain the original meaning, tone, and style.

Text to translate: ${text}`,
      config: {
        temperature: 1.0,
        maxOutputTokens: 2000,
      }
    });

    const translation = response.text?.trim() || "";

    return c.json({
      translation,
      sourceLang,
      targetLang,
    });
  } catch (error) {
    console.error("Translation error:", error);

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return c.json({
          error: "Invalid Gemini API key. Please add your API key in Settings → Secrets"
        }, 500);
      }
      if (error.message.includes("quota") || error.message.includes("rate")) {
        return c.json({
          error: "API quota exceeded. Please try again in a moment."
        }, 429);
      }
      return c.json({ error: `Translation error: ${error.message}` }, 500);
    }

    return c.json({ error: "Translation failed. Please try again." }, 500);
  }
});

// Health check endpoint
app.get("/api/health", (c) => {
  return c.json({ status: "ok" });
});

export default app;
