import { GoogleGenAI, Chat, Content } from "@google/genai";
import { MODEL_NAME, SYSTEM_INSTRUCTION } from "../constants";

// Initialize the client
// The API key is guaranteed to be in process.env.API_KEY per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class GeminiChatService {
  private chatSession: Chat | null = null;

  /**
   * Initializes or resets the chat session with the system instruction.
   */
  public initializeChat() {
    this.chatSession = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Slightly lower temperature for more consistent/reliable answers
      },
    });
  }

  /**
   * Sends a message to the Gemini model and returns the response text.
   */
  public async sendMessage(message: string): Promise<string> {
    if (!this.chatSession) {
      this.initializeChat();
    }

    if (!this.chatSession) {
      throw new Error("Failed to initialize chat session.");
    }

    try {
      const result = await this.chatSession.sendMessage({
        message: message
      });
      
      return result.text || "I apologize, but I could not generate a response at this time.";
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  }
  
  /**
   * Resets the chat history.
   */
  public resetChat() {
    this.initializeChat();
  }
}

export const geminiService = new GeminiChatService();
