import OpenAI from "openai";

export const DEFAULT_OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

// Server-side factory to keep secrets out of client bundles.
export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY. Add it to .env.local (see env.example).");
  }

  return new OpenAI({ apiKey });
}
