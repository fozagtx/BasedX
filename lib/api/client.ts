// Unified API client for all external services
import { createGeminiAPI, GeminiAPI } from "./gemini";
import { createElevenLabsAPI, ElevenLabsAPI } from "./elevenlabs";

export interface APIConfig {
  geminiApiKey?: string;
  elevenLabsApiKey?: string;
}

export class PolarbaseAPI {
  private gemini?: GeminiAPI;
  private elevenLabs?: ElevenLabsAPI;

  constructor(config: APIConfig) {
    if (config.geminiApiKey) {
      this.gemini = createGeminiAPI(config.geminiApiKey);
    }

    if (config.elevenLabsApiKey) {
      this.elevenLabs = createElevenLabsAPI(config.elevenLabsApiKey);
    }
  }

  // Text generation methods
  async generateMarketingCopy(
    product: string,
    targetAudience: string,
  ): Promise<string> {
    if (!this.gemini) {
      throw new Error("Gemini API not configured");
    }

    return this.gemini.generateMarketingCopy(product, targetAudience);
  }

  async generateSocialMediaPost(
    topic: string,
    platform: string,
  ): Promise<string> {
    if (!this.gemini) {
      throw new Error("Gemini API not configured");
    }

    return this.gemini.generateSocialMediaPost(topic, platform);
  }

  async generateBlogPost(title: string, keywords: string[]): Promise<string> {
    if (!this.gemini) {
      throw new Error("Gemini API not configured");
    }

    return this.gemini.generateBlogPost(title, keywords);
  }

  async generateGenericText(prompt: string): Promise<string> {
    if (!this.gemini) {
      throw new Error("Gemini API not configured");
    }

    const response = await this.gemini.generateText({ prompt });
    return response.text;
  }

  // Image generation methods (using Gemini Flash)
  async generateMarketingImage(product: string, style: string = "modern") {
    if (!this.gemini) {
      throw new Error("Gemini API not configured");
    }

    return this.gemini.generateMarketingImage(product, style);
  }

  async generateSocialMediaImage(product: string, platform: string) {
    if (!this.gemini) {
      throw new Error("Gemini API not configured");
    }

    return this.gemini.generateSocialMediaImage(product, platform);
  }

  async generateProfilePicture(description: string) {
    if (!this.gemini) {
      throw new Error("Gemini API not configured");
    }

    return this.gemini.generateProfilePicture(description);
  }

  async generateThumbnail(title: string, category: string) {
    if (!this.gemini) {
      throw new Error("Gemini API not configured");
    }

    return this.gemini.generateThumbnail(title, category);
  }

  async generateCustomImage(prompt: string) {
    if (!this.gemini) {
      throw new Error("Gemini API not configured");
    }

    return this.gemini.generateImage(prompt);
  }

  // Audio generation methods
  async generateSpeech(text: string, voiceId?: string) {
    if (!this.elevenLabs) {
      throw new Error("ElevenLabs API not configured");
    }

    return this.elevenLabs.generateSpeech({ text, voiceId });
  }

  async generateMarketingNarration(text: string, voiceId?: string) {
    if (!this.elevenLabs) {
      throw new Error("ElevenLabs API not configured");
    }

    return this.elevenLabs.generateMarketingNarration(text, voiceId);
  }

  async generatePodcastScript(script: string, voiceId?: string) {
    if (!this.elevenLabs) {
      throw new Error("ElevenLabs API not configured");
    }

    return this.elevenLabs.generatePodcastScript(script, voiceId);
  }

  // Utility methods
  getAvailableServices(): {
    gemini: boolean;
    elevenLabs: boolean;
    images: boolean;
  } {
    return {
      gemini: !!this.gemini,
      elevenLabs: !!this.elevenLabs,
      images: !!this.gemini, // Images are now handled by Gemini
    };
  }

  // Cleanup method for audio URLs
  cleanupAudioUrl(url: string): void {
    if (this.elevenLabs) {
      this.elevenLabs.cleanupAudioUrl(url);
    }
  }
}

// Factory function to create API client
export function createPolarbaseAPI(config: APIConfig): PolarbaseAPI {
  return new PolarbaseAPI(config);
}

// Environment-based API client creation
export function createAPIFromEnv(): PolarbaseAPI {
  return new PolarbaseAPI({
    geminiApiKey:
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    elevenLabsApiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
  });
}
