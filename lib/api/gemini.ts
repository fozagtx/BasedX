// Google Gemini API integration for AI text generation
export interface GeminiConfig {
  apiKey: string;
  model?: string;
}

export interface GeminiRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface GeminiResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class GeminiAPI {
  private apiKey: string;
  private model: string;
  private baseUrl = "https://generativelanguage.googleapis.com/v1beta";

  constructor(config: GeminiConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || "gemini-pro";
  }

  async generateText(request: GeminiRequest): Promise<GeminiResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: request.prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: request.temperature || 0.7,
              maxOutputTokens: request.maxTokens || 1024,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Gemini API error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content
      ) {
        throw new Error("Invalid response from Gemini API");
      }

      const generatedText = data.candidates[0].content.parts[0].text;

      return {
        text: generatedText,
        usage: data.usageMetadata
          ? {
              promptTokens: data.usageMetadata.promptTokenCount,
              completionTokens: data.usageMetadata.candidatesTokenCount,
              totalTokens: data.usageMetadata.totalTokenCount,
            }
          : undefined,
      };
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error(
        `Failed to generate text: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Specialized methods for different content types
  async generateMarketingCopy(
    product: string,
    targetAudience: string,
  ): Promise<string> {
    const prompt = `Write compelling marketing copy for "${product}" targeting ${targetAudience}. Make it engaging, persuasive, and suitable for social media or website content. Keep it under 200 words.`;

    const response = await this.generateText({ prompt });
    return response.text;
  }

  async generateSocialMediaPost(
    topic: string,
    platform: string,
  ): Promise<string> {
    const prompt = `Create an engaging ${platform} post about "${topic}". Include relevant hashtags, emojis, and make it shareable. Keep it concise and engaging.`;

    const response = await this.generateText({ prompt });
    return response.text;
  }

  async generateBlogPost(title: string, keywords: string[]): Promise<string> {
    const prompt = `Write a comprehensive blog post with the title "${title}". Include these keywords: ${keywords.join(", ")}. Make it informative, engaging, and SEO-friendly. Structure it with an introduction, main content sections, and conclusion.`;

    const response = await this.generateText({ prompt, maxTokens: 2048 });
    return response.text;
  }

  // Image generation using Gemini Flash (Nano Banana)
  async generateImage(
    prompt: string,
  ): Promise<{ images: string[]; seed?: number }> {
    try {
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate an image: ${prompt}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Gemini image generation error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content
      ) {
        throw new Error("Invalid response from Gemini image generation");
      }

      // Note: Gemini Flash image generation returns image data differently
      // This is a placeholder - actual implementation depends on Gemini's image generation API
      return {
        images: [], // Will be populated with actual image data
        seed: data.seed || Math.floor(Math.random() * 1000000),
      };
    } catch (error) {
      console.error("Gemini image generation error:", error);
      throw new Error(
        `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async generateMarketingImage(
    product: string,
    style: string = "modern",
  ): Promise<{ images: string[]; seed?: number }> {
    const prompt = `Professional marketing image for ${product}, ${style} style, high quality, commercial use, clean design, modern aesthetic`;

    return this.generateImage(prompt);
  }

  async generateSocialMediaImage(
    product: string,
    platform: string,
  ): Promise<{ images: string[]; seed?: number }> {
    const prompt = `Social media post image for ${product}, optimized for ${platform}, engaging, shareable, high quality, modern design`;

    return this.generateImage(prompt);
  }

  async generateProfilePicture(
    description: string,
  ): Promise<{ images: string[]; seed?: number }> {
    const prompt = `Professional profile picture, ${description}, headshot, modern, high quality, clean background, professional lighting`;

    return this.generateImage(prompt);
  }

  async generateThumbnail(
    title: string,
    category: string,
  ): Promise<{ images: string[]; seed?: number }> {
    const prompt = `YouTube thumbnail for "${title}", ${category} category, clickbait style, bold text, vibrant colors, high contrast, engaging`;

    return this.generateImage(prompt);
  }
}

// Factory function to create Gemini API instance
export function createGeminiAPI(apiKey: string): GeminiAPI {
  return new GeminiAPI({ apiKey });
}
