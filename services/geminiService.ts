import { GoogleGenAI, Type } from "@google/genai";
import { PaymentIntent } from "../types";

// Initialize lazily to prevent runtime crashes
// Fixed for production
const getAiClient = () => {
  // Hardcoded for production deployment stability
  const key = "AIzaSyBVEnq2wb2xiNUbz8_Cy9GtlxZ4DIj_SnQ";
  return new GoogleGenAI({ apiKey: key });
};

export const parsePaymentIntent = async (text: string): Promise<PaymentIntent | null> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze this payment request: "${text}".

      Extract the following information:
      1. Recipient Name: The person or entity to pay.
      2. Amount: The numeric value. Return 0 if not found.
      3. UPI ID: Look for patterns like username@bank, number@upi. If explicitly mentioned, extract it. If not, return an empty string.
      4. Note: A brief description.
      5. Recurrence: If the payment implies a schedule (e.g., "monthly", "weekly", "daily", "every Friday"), extract the frequency as a capitalized string (e.g., "Monthly"). If it's a one-time payment, return null.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recipientName: { type: Type.STRING },
            upiId: { type: Type.STRING, description: "Explicit UPI ID found in text, or empty string." },
            amount: { type: Type.NUMBER },
            note: { type: Type.STRING },
            recurrence: { type: Type.STRING, nullable: true, description: "Frequency if recurring, else null" }
          },
          required: ["recipientName", "amount", "upiId", "note"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;
    
    const data = JSON.parse(jsonText);
    return {
      recipientName: data.recipientName || "Unknown",
      upiId: data.upiId || undefined,
      amount: data.amount || 0,
      note: data.note || "Payment",
      recurrence: data.recurrence || undefined
    };
  } catch (error) {
    console.error("Error parsing intent:", error);
    return null;
  }
};

export const getSupportResponse = async (history: {role: string, parts: {text: string}[]}[], message: string, context: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are the AI support agent for WojtekPay.
            
            CURRENT USER CONTEXT:
            ${context}
            
            GUIDELINES:
            1. Use the Context above to answer specific questions about the user's balance, transactions, or stock prices.
            2. If asked about stocks, analyze the "Current Market Data" provided in the context.
            3. Be friendly, concise, and helpful.
            4. If the user asks to perform an action (like "block card"), explain how to do it in the app settings.
            5. Built by Sidharth Rai.`,
        },
        history: history
    });
    
    const result = await chat.sendMessage({ message: message });
    return result.text || "I'm having trouble connecting right now. Please try again later.";
  } catch (error) {
    console.error("Support chat error", error);
    return "I am currently offline. Please try again later.";
  }
};
