
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const aiService = {
    analyzeLeaveReason: async (reason: string) => {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Analyze this student leave reason: "${reason}". Output a JSON object with category (Medical, Personal, Academic, or Unknown), a validity score (0-100), and a short suggestion (Approve/Reject).`,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            category: { type: Type.STRING },
                            score: { type: Type.NUMBER },
                            suggestion: { type: Type.STRING }
                        },
                        required: ['category', 'score', 'suggestion']
                    }
                }
            });
            return JSON.parse(response.text || '{}');
        } catch (error) {
            console.error("AI Analysis failed:", error);
            return { category: 'Unknown', score: 50, suggestion: 'Manual Review Needed' };
        }
    }
};

export const voiceService = {
    speak: (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        }
    }
};
