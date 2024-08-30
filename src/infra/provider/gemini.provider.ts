import {
    GenerateContentResult,
    GenerativeModel,
    GoogleGenerativeAI,
  } from "@google/generative-ai";
  import { GeminiProvider } from "../../domain/contracts/provider/gemini.interface";
  
  export class Gemini implements GeminiProvider {
    instance: GoogleGenerativeAI;
  
    constructor() {
      this.instance = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
  
    async getContentByDescription(
      mimeType: string,
      fileData: string,
      description: string
    ): Promise<string> {
      const model: GenerativeModel = this.instance.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
  
      const result: GenerateContentResult = await model.generateContent([
        description,
        {
          inlineData: {
            data: fileData,
            mimeType: mimeType,
          },
        },
      ]);
  
      return result.response.text();
    }
  }