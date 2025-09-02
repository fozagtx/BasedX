import React, { useState } from "react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Loader } from "./ui/loader";

// Simple mock AI response for demo
const mockAIResponse = async (input: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`AI: ${input.split('').reverse().join('')}`);
    }, 1200);
  });
};

export function ChatInterface() {
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    setLoading(true);
    const aiReply = await mockAIResponse(input);
    setMessages((msgs) => [...msgs, { sender: "ai", text: aiReply }]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 dark:text-slate-500 py-8">
            Start a conversation with your AI companion.
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "ai" && <Avatar className="mr-2" />}
            <div
              className={`rounded-2xl px-4 py-2 max-w-xs shadow text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200/50 dark:border-slate-700/50"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && <Avatar className="ml-2 opacity-0" />}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start items-center mt-2">
            <Loader variant="typing" className="mr-2" />
            <span className="text-slate-400 text-xs">AI is typing...</span>
          </div>
        )}
      </div>
      <form
        className="flex items-end gap-2 mt-4"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 min-h-[40px] max-h-32 resize-none"
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
