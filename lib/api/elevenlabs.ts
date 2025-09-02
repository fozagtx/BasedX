// ElevenLabs API integration for text-to-speech
export interface ElevenLabsConfig {
  apiKey: string;
  voiceId?: string;
}

export interface TTSRequest {
  text: string;
  voiceId?: string;
  model?: string;
  voiceSettings?: {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

export interface TTSResponse {
  audioUrl: string;
  duration: number;
  size: number;
}

export interface Voice {
  voice_id: string;
  name: string;
  category: string;
  labels: Record<string, string>;
  preview_url: string;
  available_for_tiers: string[];
  settings: {
    stability: number;
    similarity_boost: number;
  };
}

export class ElevenLabsAPI {
  private apiKey: string;
  private defaultVoiceId: string;
  private baseUrl = "https://api.elevenlabs.io/v1";

  constructor(config: ElevenLabsConfig) {
    this.apiKey = config.apiKey;
    this.defaultVoiceId = config.voiceId || "21m00Tcm4TlvDq8ikWAM"; // Default voice ID
  }

  async getVoices(): Promise<Voice[]> {
    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          Accept: "application/json",
          "xi-api-key": this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(
          `ElevenLabs API error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error("ElevenLabs get voices error:", error);
      throw new Error(
        `Failed to get voices: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async generateSpeech(request: TTSRequest): Promise<TTSResponse> {
    try {
      const voiceId = request.voiceId || this.defaultVoiceId;

      const response = await fetch(
        `${this.baseUrl}/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            Accept: "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": this.apiKey,
          },
          body: JSON.stringify({
            text: request.text,
            model_id: request.model || "eleven_monolingual_v1",
            voice_settings: request.voiceSettings || {
              stability: 0.5,
              similarity_boost: 0.5,
              style: 0.0,
              use_speaker_boost: true,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `ElevenLabs TTS error: ${response.status} ${response.statusText}`,
        );
      }

      // Get audio data as blob
      const audioBlob = await response.blob();

      // Create object URL for the audio
      const audioUrl = URL.createObjectURL(audioBlob);

      return {
        audioUrl,
        duration: 0, // Would need to calculate from audio metadata
        size: audioBlob.size,
      };
    } catch (error) {
      console.error("ElevenLabs TTS error:", error);
      throw new Error(
        `Failed to generate speech: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async generateMarketingNarration(
    text: string,
    voiceId?: string,
  ): Promise<TTSResponse> {
    // Use a more engaging voice setting for marketing content
    const voiceSettings = {
      stability: 0.7,
      similarity_boost: 0.8,
      style: 0.3,
      use_speaker_boost: true,
    };

    return this.generateSpeech({
      text,
      voiceId,
      voiceSettings,
    });
  }

  async generatePodcastScript(
    script: string,
    voiceId?: string,
  ): Promise<TTSResponse> {
    // Use settings optimized for podcast/narrative content
    const voiceSettings = {
      stability: 0.6,
      similarity_boost: 0.7,
      style: 0.2,
      use_speaker_boost: true,
    };

    return this.generateSpeech({
      text: script,
      voiceId,
      voiceSettings,
    });
  }

  // Utility method to clean up object URLs
  cleanupAudioUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}

// Factory function to create ElevenLabs API instance
export function createElevenLabsAPI(
  apiKey: string,
  voiceId?: string,
): ElevenLabsAPI {
  return new ElevenLabsAPI({ apiKey, voiceId });
}
