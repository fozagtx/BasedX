"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Icon } from "./ContentComponents";
import { handleToolCall } from "../../lib/agent-tools";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
} from "@/components/ui/prompt-input";
import { Message, MessageAvatar } from "@/components/ui/message";
import { Loader } from "@/components/ui/loader";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🚀 Welcome to Tweet Virality Generator! I create viral tweets using NEGATIVE FRAMING - the secret to 6x engagement. Just type any topic and I'll generate a controversial tweet like 'Why I'm not on TikTok' or 'Apps I refuse to use'. Controversy drives views! 🔥",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Generate tweet directly from input
      const toolResult = await handleToolCall(inputText);

      if (toolResult) {
        // Handle tweet result
        let responseText = "";
        if (toolResult.type === "content") {
          responseText = `🔥 Viral Tweet Generated:\n\n${toolResult.content}\n\n💡 Pro tip: Negative framing gets 6x more engagement than positive content!`;
        }

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${error instanceof Error ? error.message : "Something went wrong"}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-full max-h-[500px] animate-slide-up transition-all duration-300 ${
        isLoading ? "opacity-95" : ""
      }`}
    >
      {/* Chat Messages */}
      <div className="flex-1 glass-effect rounded-2xl shadow-lg overflow-hidden mb-6 hover-lift border border-slate-200/50 dark:border-slate-700/50">
        <div className="h-full overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {messages.map((message) => (
            <Message
              key={message.id}
              className={message.isUser ? "justify-end" : "justify-start"}
            >
              {!message.isUser && (
                <MessageAvatar
                  src="/logo.png"
                  alt="Tweet Virality Generator"
                  fallback="TVG"
                />
              )}
              <div
                className={`max-w-[85%] p-4 rounded-2xl shadow-md transition-all duration-300 hover-lift ${
                  message.isUser
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
                }`}
              >
                <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100">
                  {message.text}
                </p>
                <span
                  className={`text-xs mt-2 block ${
                    message.isUser
                      ? "text-purple-100"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </Message>
          ))}

          {isLoading && (
            <Message className="justify-start animate-fade-in">
              <MessageAvatar
                src="/logo.png"
                alt="Tweet Virality Generator"
                fallback="TVG"
              />
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 p-4 rounded-2xl shadow-lg ring-1 ring-purple-300/30 dark:ring-purple-600/30">
                <div className="flex items-center space-x-3">
                  <Loader variant="typing" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Crafting viral tweet...
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Using negative framing for maximum engagement
                    </span>
                  </div>
                </div>
              </div>
            </Message>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Chat Input with PromptInput */}
      <PromptInput
        value={inputText}
        onValueChange={setInputText}
        onSubmit={handleSendMessage}
        isLoading={isLoading}
        className={`glass-effect shadow-lg border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 ${
          isLoading
            ? "ring-2 ring-purple-300 dark:ring-purple-600 ring-opacity-50"
            : ""
        }`}
      >
        <PromptInputTextarea
          placeholder={
            isLoading
              ? "Generating tweet..."
              : "Type any topic for viral negative framing..."
          }
          className="text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
          disabled={isLoading}
        />
        <PromptInputActions>
          <PromptInputAction
            tooltip={isLoading ? "Generating..." : "Generate Viral Tweet"}
          >
            <Button
              disabled={!inputText.trim() || isLoading}
              className={`bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white disabled:opacity-50 transition-all duration-200 ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader variant="dots" />
                  <span>Generating...</span>
                </div>
              ) : (
                <>
                  <Icon name="arrow-right" size="sm" />
                  Generate
                </>
              )}
            </Button>
          </PromptInputAction>
        </PromptInputActions>
      </PromptInput>
    </div>
  );
}
