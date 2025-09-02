# BasedX - AI-Powered Content Generation

BasedX is an intelligent content creation assistant that helps builders and developers generate engaging content for X (Twitter) and create visual assets. Features AI-powered text generation and image creation tools.

## Features

### 💬 AI Content Generation

- **Text Generation**: Create engaging X (Twitter) posts using Google Gemini
- **Image Generation**: Generate image descriptions and concepts
- **Content Optimization**: AI-powered content tailored for builders and developers
- **Real-time Responses**: Instant content generation with @content and @image commands

### 🎨 Content Creation Tools

- **Social Media Content**: Generate tweets, threads, and social media posts
- **Visual Concepts**: Create detailed image descriptions for various platforms
- **Hashtag Suggestions**: Automatic hashtag generation for better reach
- **Content Templates**: Pre-built templates for different content types

### 🎯 Builder-Focused AI

- **Developer Content**: Content specifically tailored for tech builders
- **Project Promotion**: Help promote projects and ideas effectively
- **Community Engagement**: Generate content for community building
- **Professional Tone**: Maintain professional and engaging communication

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [MiniKit](https://docs.base.org/builderkits/minikit/overview) - Farcaster mini app framework
- [OnchainKit](https://www.base.org/builders/onchainkit) - Web3 components
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Vercel AI SDK](https://vercel.com/docs/ai) - AI integration
- [Google Gemini](https://ai.google.dev) - Text generation
- TypeScript - Type-safe development

## Getting Started

### Prerequisites

- Node.js 18+
- A Farcaster account (for frame deployment)
- Microphone access (for voice features)
- API keys for the following services:
  - [ElevenLabs API](https://elevenlabs.io/app/profile) (for high-quality voice synthesis)

### Installation

1. **Clone and install dependencies:**

```bash
git clone <your-repo-url>
cd basedx
npm install
```

2. **Set up environment variables:**

Copy the example environment file and fill in your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```bash
# Required API Keys
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Optional - for enhanced voice features
# NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

3. **Configure Frame metadata:**

Run the create-onchain manifest command to set up your frame:

```bash
npx create-onchain --manifest
```

This will generate the necessary environment variables for Farcaster frame integration.

4. **Start the development server:**

```bash
npm run dev
```

5. **Deploy your frame:**

Once your frame is ready, cast it on Farcaster to start using it!

### API Key Setup

#### Google Gemini

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
#### Google Gemini

1. Visit [Google AI Studio](https://makersuite
3. Add it to your `.env.local` as `NEXT_PUBLIC_GEMINI_API_KEY`

#### ElevenLabs

1. Visit [ElevenLabs](https://elevenlabs.io/app/profile)
2. Sign up and get your API key
3. Add it to your `.env.local` as `NEXT_PUBLIC_ELEVENLABS_API_KEY`

#### Nano Banana

1. Visit [Nano Banana](https://nanobanana.com/)
2. Get your API key
3. Add it to your `.env.local` as `NEXT_PUBLIC_NANOBANANA_API_KEY`

4. Verify environment variables, these will be set up by the `npx create-onchain --mini` command:

You can regenerate the FARCASTER Account Association environment variables by running `npx create-onchain --manifest` in your project directory.

The environment variables enable the following features:

- Frame metadata - Sets up the Frame Embed that will be shown when you cast your frame
- Account association - Allows users to add your frame to their account, enables notifications
- Redis API keys - Enable Webhooks and background notifications for your application by storing users notification details

```bash
# Shared/OnchainKit variables
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=
NEXT_PUBLIC_URL=
NEXT_PUBLIC_ICON_URL=
NEXT_PUBLIC_ONCHAINKIT_API_KEY=

# Frame metadata
FARCASTER_HEADER=
FARCASTER_PAYLOAD=
FARCASTER_SIGNATURE=
NEXT_PUBLIC_APP_ICON=
NEXT_PUBLIC_APP_SUBTITLE=
NEXT_PUBLIC_APP_DESCRIPTION=
NEXT_PUBLIC_APP_SPLASH_IMAGE=
NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR=
NEXT_PUBLIC_APP_PRIMARY_CATEGORY=
NEXT_PUBLIC_APP_HERO_IMAGE=
NEXT_PUBLIC_APP_TAGLINE=
NEXT_PUBLIC_APP_OG_TITLE=
NEXT_PUBLIC_APP_OG_DESCRIPTION=
NEXT_PUBLIC_APP_OG_IMAGE=

# Redis config
REDIS_URL=
REDIS_TOKEN=
```

3. Start the development server:

```bash
npm run dev
```

## How to Use BasedX

### Getting Started

1. **Choose Your Mode**: Select between Chat and Voice modes using the toggle at the top
2. **Grant Permissions**: Allow microphone access when using voice features
3. **Start Conversing**: Begin your conversation with the AI companion

### Conversation Modes

#### 💬 Chat Mode

- Type your thoughts, questions, or ideas
- Receive text responses from the AI companion
- Voice playback available for any response (click the speaker icon)
- Record your entire chat session for later review

#### 🎤 Voice Mode

- Click "Start Speaking" to begin voice input
- Speak naturally - the AI will transcribe your words
- Receive voice responses played back automatically
- Full conversation recording with both audio and transcript

### Recording Features

#### Session Recording

- **Start Recording**: Begin recording your conversation session
- **Real-time Transcription**: Your voice is automatically transcribed
- **Audio Capture**: All audio (your voice + AI responses) is recorded
- **Stop Recording**: End the session and prepare for download

#### Download Options

- **Audio Download**: Download the complete audio recording as a .webm file
- **Transcript Export**: Export the conversation as a .txt file
- **Organized Files**: Files are automatically named with timestamps

### Best Practices

#### For Pitch Development

- Start with your core idea or problem
- Ask specific questions about clarity and improvement
- Use voice mode for more natural, flowing conversations
- Record important sessions for later reference

#### For Problem Solving

- Break down complex issues into smaller parts
- Ask the AI to rephrase or clarify your thoughts
- Use the recording feature to capture solution processes
- Review transcripts to identify patterns in your thinking

#### Voice Tips

- Speak clearly and at a moderate pace
- Use the "Stop Recording" button to pause voice input
- Click "Replay Last" to hear the AI's last response again
- The AI will acknowledge what it heard before responding

## Architecture

### Core Components

- **`ChatInterface`**: AI-powered content generation interface
- **`ContentComponents`**: Reusable UI components (Icon, etc.)
- **Agent Tools**: @content and @image command processing
- **Theme System**: Dark/light mode with smooth transitions

### Key Features

#### Content Generation

- **AI Commands**: Use @content [topic] and @image [description] for instant generation
- **Real-time Responses**: Instant content creation with Google Gemini
- **Message History**: Persistent conversation history with timestamps
- **Content Optimization**: AI-tailored content for builders and developers

#### User Experience

- **Modern UI**: Glass morphism effects and smooth animations
- **Responsive Design**: Optimized for all screen sizes
- **Theme Support**: Dark and light mode with system preference detection
- **Wallet Integration**: OnchainKit wallet connection for Web3 features

### API Integrations

- **Google Gemini API**: Advanced text generation and content creation
- **Google Imagen API**: AI-powered image concept generation
- **Vercel AI SDK**: Streamlined AI integration and processing
- **OnchainKit**: Web3 wallet integration and transaction support

### File Structure

```
basedx/
├── app/
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── button.tsx          # Enhanced button component
│   │   │   └── theme-toggle.tsx    # Dark/light mode toggle
│   │   ├── ChatInterface.tsx       # AI content generation interface
│   │   └── ContentComponents.tsx   # Reusable UI components
│   ├── layout.tsx                  # App layout with theme provider
│   ├── page.tsx                    # Main app interface
│   └── providers.tsx               # Web3 and theme providers
├── lib/
│   ├── ai-config.ts                # AI SDK configuration
│   ├── agent-tools.ts              # @content and @image tools
│   ├── api/
│   │   ├── gemini.ts               # Google Gemini integration
│   │   └── client.ts               # API utilities
│   └── utils.ts                    # Utility functions
└── public/                         # Static assets
```

## Deployment

### Frame Deployment

1. **Build your frame:**

```bash
npm run build
```

2. **Deploy to Vercel/Netlify** or your preferred hosting platform

3. **Update environment variables** in your deployment platform

4. **Cast your frame** on Farcaster to start using it

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:

- `NEXT_PUBLIC_ELEVENLABS_API_KEY` (required for voice features)
- Frame metadata variables (generated by `npx create-onchain --manifest`)

### Browser Permissions

The app requires the following browser permissions for full functionality:

- **Microphone Access**: Required for voice input features
- **Audio Playback**: Required for voice responses
- **File Downloads**: Required for exporting recordings and transcripts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- 📧 Email: support@claritycompanion.xyz
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 📖 Docs: [Documentation](https://docs.claritycompanion.xyz)

## Roadmap

- [ ] Enhanced AI conversation models for deeper clarity assistance
- [ ] Conversation templates for specific use cases (pitching, problem-solving, etc.)
- [ ] Advanced recording features (video recording, multi-track audio)
- [ ] Conversation analytics and insights
- [ ] Collaborative conversation sessions
- [ ] Integration with external note-taking and productivity tools
- [ ] Mobile app version with offline capabilities
- [ ] Multi-language voice support

---

Built with ❤️ to help you gain clarity and communicate with confidence. Speak your mind, find your voice! 🎤✨

## Learn More

- [MiniKit Documentation](https://docs.base.org/builderkits/minikit/overview)
- [OnchainKit Documentation](https://docs.base.org/builderkits/onchainkit/getting-started)
- [ElevenLabs API](https://docs.elevenlabs.io/api-reference/text-to-speech)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
