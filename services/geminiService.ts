
import { GoogleGenAI, Type } from "@google/genai";

// Standardizing initialization to strictly follow the provided guidelines
export const getInvestmentInsights = async () => {
  try {
    // Guidelines: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a brief, sophisticated 2-sentence market insight for a premium investment app. Focus on high-level trends. Format as JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            sentiment: { 
              type: Type.STRING,
              description: "Must be bullish, bearish, or neutral" 
            }
          },
          required: ["title", "summary", "sentiment"]
        }
      }
    });

    // Guidelines: Access the .text property directly (not a method)
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return {
      title: "Market Resilience",
      summary: "Volatility remains low as indices consolidate near all-time highs. Focus on defensive sectors and long-term yield generation.",
      sentiment: "bullish"
    };
  }
};

export const getChatResponse = async (history: {role: 'user' | 'model', parts: {text: string}[]}[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history,
      config: {
        systemInstruction: "You are the CapitalNest AI Assistant. You help users with investment queries, platform navigation, and general financial education. Be professional, concise, and helpful. CapitalNest offers institutional-grade wealth management, automated vesting, and high-yield private assets. If asked about specific user data, remind them you are an AI and they should check their dashboard for real-time account specifics.",
      }
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to the support servers. Please try again later.";
  }
};
