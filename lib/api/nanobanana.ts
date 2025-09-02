// Nano Banana API integration for image generation
export interface NanoBananaConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface ImageGenerationRequest {
  prompt: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
  seed?: number;
  style?: string;
}

export interface ImageGenerationResponse {
  images: string[]; // Base64 encoded images
  seed: number;
  prompt: string;
  model: string;
}

export interface ImageStyle {
  id: string;
  name: string;
  description: string;
  preview?: string;
}

export class NanoBananaAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: NanoBananaConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://api.nanobanana.com/v1";
  }

  async generateImage(
    request: ImageGenerationRequest,
  ): Promise<ImageGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/images/generations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          prompt: request.prompt,
          negative_prompt: request.negative_prompt || "",
          width: request.width || 512,
          height: request.height || 512,
          num_inference_steps: request.num_inference_steps || 20,
          guidance_scale: request.guidance_scale || 7.5,
          seed: request.seed,
          style: request.style,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Nano Banana API error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      return {
        images: data.images || [],
        seed: data.seed || 0,
        prompt: data.prompt || request.prompt,
        model: data.model || "unknown",
      };
    } catch (error) {
      console.error("Nano Banana API error:", error);
      throw new Error(
        `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Specialized methods for different use cases
  async generateMarketingImage(
    product: string,
    style: string = "modern",
  ): Promise<ImageGenerationResponse> {
    const prompt = `Professional marketing image for ${product}, ${style} style, high quality, commercial use, clean design, modern aesthetic`;

    return this.generateImage({
      prompt,
      width: 1024,
      height: 1024,
      num_inference_steps: 25,
      guidance_scale: 8.0,
    });
  }

  async generateSocialMediaPost(
    product: string,
    platform: string,
  ): Promise<ImageGenerationResponse> {
    const dimensions = this.getPlatformDimensions(platform);

    const prompt = `Social media post image for ${product}, optimized for ${platform}, engaging, shareable, high quality, modern design`;

    return this.generateImage({
      prompt,
      width: dimensions.width,
      height: dimensions.height,
      num_inference_steps: 20,
      guidance_scale: 7.5,
    });
  }

  async generateProfilePicture(
    description: string,
  ): Promise<ImageGenerationResponse> {
    const prompt = `Professional profile picture, ${description}, headshot, modern, high quality, clean background, professional lighting`;

    return this.generateImage({
      prompt,
      width: 512,
      height: 512,
      num_inference_steps: 20,
      guidance_scale: 7.0,
    });
  }

  async generateThumbnail(
    title: string,
    category: string,
  ): Promise<ImageGenerationResponse> {
    const prompt = `YouTube thumbnail for "${title}", ${category} category, clickbait style, bold text, vibrant colors, high contrast, engaging`;

    return this.generateImage({
      prompt,
      width: 1280,
      height: 720,
      num_inference_steps: 20,
      guidance_scale: 8.0,
    });
  }

  // Utility method to get optimal dimensions for different platforms
  private getPlatformDimensions(platform: string): {
    width: number;
    height: number;
  } {
    switch (platform.toLowerCase()) {
      case "instagram":
      case "facebook":
        return { width: 1080, height: 1080 };
      case "twitter":
      case "x":
        return { width: 1200, height: 675 };
      case "linkedin":
        return { width: 1200, height: 627 };
      case "tiktok":
        return { width: 1080, height: 1920 };
      case "youtube":
        return { width: 1280, height: 720 };
      default:
        return { width: 1024, height: 1024 };
    }
  }

  // Get available styles
  async getStyles(): Promise<ImageStyle[]> {
    // This would typically fetch from the API
    // For now, return predefined styles
    return [
      {
        id: "modern",
        name: "Modern",
        description: "Clean, contemporary design with minimal elements",
      },
      {
        id: "vibrant",
        name: "Vibrant",
        description: "Bold colors and dynamic compositions",
      },
      {
        id: "minimalist",
        name: "Minimalist",
        description: "Simple, elegant designs with plenty of white space",
      },
      {
        id: "professional",
        name: "Professional",
        description: "Corporate-style imagery for business use",
      },
      {
        id: "artistic",
        name: "Artistic",
        description: "Creative, painterly style with artistic flair",
      },
    ];
  }

  // Utility method to convert base64 to blob
  base64ToBlob(base64: string, mimeType: string = "image/png"): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  // Utility method to download image
  downloadImage(
    base64: string,
    filename: string = "generated-image.png",
  ): void {
    const blob = this.base64ToBlob(base64);
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }
}

// Factory function to create Nano Banana API instance
export function createNanoBananaAPI(
  apiKey: string,
  baseUrl?: string,
): NanoBananaAPI {
  return new NanoBananaAPI({ apiKey, baseUrl });
}
