"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./components/ui/button";
import { Icon } from "./components/ContentComponents";
import { ThemeToggle } from "./components/ui/theme-toggle";
import { ChatInterface } from "./components/ChatInterface";
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

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeMode, setActiveMode] = useState("chat");

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
          variant="text"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
        >
          <Icon name="plus" size="sm" />
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  const modes: Array<{
    id: string;
    label: string;
    icon: "plus" | "star";
  }> = [{ id: "chat", label: "Tweets", icon: "plus" }];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="w-full max-w-md mx-auto px-4 py-3 relative z-10">
        <header className="flex justify-between items-center mb-6 h-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-xl border border-slate-200/50 dark:border-slate-700/50 animate-slide-up">
          <div className="flex items-center space-x-2">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Tweet Virality Generator
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Negative Framing for 6x Engagement
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Wallet className="z-10">
              <ConnectWallet>
                <Button variant="outline" size="sm">
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

        {/* Mode Navigation */}
        <nav className="flex space-x-2 mb-8 glass-effect p-2 rounded-2xl shadow-lg animate-bounce-in">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 hover-lift ${
                activeMode === mode.id
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg animate-glow"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <Icon name={mode.icon} size="sm" />
              <span>{mode.label}</span>
            </button>
          ))}
        </nav>

        <main className="flex-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
          {activeMode === "chat" && <ChatInterface />}
        </main>

        <footer className="mt-8 pt-6 flex justify-center">
          <div className="glass-effect rounded-2xl px-6 py-3 shadow-lg animate-fade-in">
            <Button
              variant="text"
              size="sm"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 text-xs"
              onClick={() => openUrl("https://base.org/builders/minikit")}
            >
              Built on Base with MiniKit
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
