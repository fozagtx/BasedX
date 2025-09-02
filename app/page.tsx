"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "../components/ui/button";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { PlusIcon, Check, ArrowUp, Square } from "lucide-react"
import { 
    PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import { useInputHandler } from "@/hooks/useInputHandler";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const { 
     input,
    isLoading,
    handleSubmit,
    handleValueChange,
  } = useInputHandler();

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
        >
          <PlusIcon className="w-5 h-5" />
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Check className="w-5 h-5"/>
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Abstract blurred background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a23] via-[#1a1a2e] to-[#0a0a23] opacity-90" />
        {/* Add a blurred SVG or canvas for the abstract effect if desired */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-3xl opacity-60"
          style={{
            background: "radial-gradient(ellipse at center, #ff9900 0%, #0052ff 60%, transparent 100%)"
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <span className="px-4 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-white/80 shadow backdrop-blur-md">
              {/* App badge updated */}
              AI Content Generator
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Wallet className="z-10">
              <ConnectWallet>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Connect Wallet
                </Button>
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
            {saveFrameButton}
          </div>
        </header>

        {/* Main Card */}
        <main className="bg-white/10 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-xl p-8 flex flex-col items-center gap-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-white via-[#ff9900] to-[#0052ff] bg-clip-text text-transparent drop-shadow-lg mb-2">
            BasedX - AI-Powered Content Generation
          </h1>
          <div className="text-center text-white/80 mb-4 max-w-lg">
            <p className="text-lg font-medium text-white/60" >
              Your intelligent assistant for generating engaging X (Twitter) posts and visual assets.
            </p>
            {/* <p className="text-sm mt-1">
              Features AI-powered text and image creation tools, tailored for builders and developers. Try <span className="font-semibold text-[#ff9900]">@content</span> or <span className="font-semibold text-[#0052ff]">@image</span> commands for instant results!
            </p> */}
          </div>
          {/* Chatbot Input */}
          <PromptInput
            value={input}
            onValueChange={handleValueChange}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            className="w-full"
          >
            <PromptInputTextarea
              placeholder="Ask BasedX to generate a tweet, image concept, or content idea..."
              className="bg-black/40 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#ff9900] transition"
            />
            <PromptInputActions className="justify-end pt-2">
              <PromptInputAction
                tooltip={isLoading ? "Stop generation" : "Send message"}
              >
                <Button
                  variant="default"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4d81f0] to-[#0052ff] text-white shadow-lg hover:scale-105 transition"
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <Square className="size-5 fill-current" />
                  ) : (
                    <ArrowUp className="size-5" />
                  )}
                </Button>
              </PromptInputAction>
            </PromptInputActions>
          </PromptInput>
        </main>

        {/* Footer */}
        <footer className="mt-10 flex flex-col items-center gap-2">
          <div className="flex gap-3">
            {/* Social icons, */}
          </div>
          <div className="text-xs text-white/40 mt-2">
            {new Date().getFullYear()} BasedX. Built on Base with MiniKit.
          </div>
        </footer>
      </div>
    </div>
  );
}