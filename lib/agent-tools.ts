import { generateText } from "ai";
import { geminiModel, validateApiKey } from "./ai-config";

export interface ToolResult {
  type: "content" | "image";
  content: string;
  imageUrl?: string;
}

// Content generation tool using Gemini
export async function generateContent(prompt: string): Promise<ToolResult> {
  try {
    if (!prompt || prompt.trim().length === 0) {
      throw new Error("Please provide a topic for content generation");
    }

    // Validate API key before attempting generation
    validateApiKey();

    const result = await generateText({
      model: geminiModel,
      prompt: `Generate a viral tweet using NEGATIVE FRAMING strategy based on: "${prompt}". Use the psychology of rejection and controversy to drive engagement. Frame it as what you're NOT doing, what you refuse to do, or what platforms/content you avoid. Make it controversial but not offensive. Include relevant hashtags and keep under 280 characters. Examples: "Why I'm not on TikTok anymore", "Apps I refuse to use in 2024", "Content I stopped creating". Focus on the "why I'm NOT" or "what I refuse" angle for maximum virality. Make it ready to post immediately.`,
    });

    if (!result.text || result.text.trim().length === 0) {
      throw new Error("No content was generated. Please try again.");
    }

    return {
      type: "content",
      content: result.text,
    };
  } catch (error) {
    console.error("Content generation error:", error);
    if (error instanceof Error) {
      throw new Error(`Content generation failed: ${error.message}`);
    }
    throw new Error(
      "Failed to generate content. Please check your API key and try again.",
    );
  }
}

// Image generation tool using Google Imagen
export async function generateImage(prompt: string): Promise<ToolResult> {
  try {
    if (!prompt || prompt.trim().length === 0) {
      throw new Error("Please provide a description for image generation");
    }

    // Note: Google Imagen integration with Vercel AI SDK
    // This is a placeholder - actual implementation may require Vertex AI setup
    const result = await generateText({
      model: geminiModel, // Using Gemini for now, as Imagen may need different setup
      prompt: `Describe an image for: ${prompt}. Provide a detailed prompt that could be used with an image generation AI.`,
    });

    if (!result.text || result.text.trim().length === 0) {
      throw new Error("No image description was generated. Please try again.");
    }

    // In a real implementation, you'd call the Imagen API here
    // For now, return a placeholder
    return {
      type: "image",
      content: `Generated image description: ${result.text}`,
      imageUrl: "https://via.placeholder.com/512x512?text=Generated+Image", // Placeholder
    };
  } catch (error) {
    console.error("Image generation error:", error);
    if (error instanceof Error) {
      throw new Error(`Image generation failed: ${error.message}`);
    }
    throw new Error(
      "Failed to generate image. Please check your API key and try again.",
    );
  }
}

// Agent function to handle tweet generation
export async function handleToolCall(
  input: string,
): Promise<ToolResult | null> {
  try {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      throw new Error("Please provide a topic for tweet generation");
    }

    // Generate tweet directly from any input
    return await generateContent(trimmedInput);
  } catch (error) {
    console.error("Tweet generation error:", error);
    throw error; // Re-throw to be handled by the caller
  }
}
