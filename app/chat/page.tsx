"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Sparkles, Bot, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { formatTime } from "@/utils/formatDate";
import ComingSoonModal from "@/components/ui/ComingSoonModal";
import FullPageSpinner from "@/components/ui/FullPageSpinner";

/* ─── Suggested prompts ──────────────────────────────────────────── */
const SUGGESTED_PROMPTS = [
  "Review my resume and suggest improvements",
  "What skills should I learn for a backend role?",
  "Help me prepare for a technical interview",
  "What is the average salary for a React developer?",
];

/* ─── Page ───────────────────────────────────────────────────────── */
export default function ChatPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { messages, isSending, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(true);

  // Auth guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/login");
  }, [isLoading, isAuthenticated, router]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  // const handleSend = () => {
  //   const trimmed = input.trim();
  //   if (!trimmed || isSending) return;
  //   setInput("");
  //   sendMessage(trimmed);
  // };

  const handleSend = () => {
  const trimmed = input.trim();
  if (!trimmed || isSending) return;
  
  // Show coming soon modal
  setIsComingSoonModalOpen(true);
  setInput("");
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading || !isAuthenticated) {
    return <FullPageSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#C2E8FF] flex flex-col">
      {/* <Navbar /> */}

      <div className="flex flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 gap-6 py-6 min-h-0">
        {/* <Sidebar /> */}

        {/* Chat panel */}
        <main className="flex-1 min-w-0 flex flex-col bg-white rounded-lg border border-[#7A9BC4]/20 shadow-card overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#7A9BC4]/20 flex-shrink-0">
            <div className="w-9 h-9 bg-[#000F22] rounded-md flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-[#000F22] text-sm">
                AI Career Coach
              </p>
              <p className="text-xs text-[#537FAF]">
                Ask anything about your career
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs text-[#537FAF]">Online</span>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4 min-h-0">
            {/* Empty state */}
            {messages.length === 0 && !isSending && (
              <div className="flex flex-col items-center justify-center h-full gap-6 py-12">
                <div className="w-16 h-16 bg-[#C2E8FF] rounded-full flex items-center justify-center">
                  <Bot size={28} className="text-[#557EB2]" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-[#000F22] mb-1">
                    How can I help you today?
                  </p>
                  <p className="text-sm text-[#537FAF] max-w-xs">
                    Ask me about career advice, resume tips, job prep, or skill
                    development.
                  </p>
                </div>

                {/* Suggested prompts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        setInput(prompt);
                      }}
                      className="text-left px-3.5 py-3 rounded-md border border-[#7A9BC4]/30 bg-white text-xs text-[#537FAF] font-medium hover:border-[#557EB2] hover:text-[#042558] hover:bg-[#C2E8FF]/30 transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message bubbles */}
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 animate-fade-up ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isUser ? "bg-[#000F22]" : "bg-[#C2E8FF]"
                    }`}
                  >
                    {isUser ? (
                      <User size={13} className="text-white" />
                    ) : (
                      <Bot size={13} className="text-[#557EB2]" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                        isUser
                          ? "bg-[#000F22] text-white rounded-tr-sm"
                          : "bg-[#C2E8FF] text-[#042558] rounded-tl-sm border border-[#7A9BC4]/20"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-[#7A9BC4] px-1">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isSending && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-7 h-7 rounded-full bg-[#C2E8FF] flex items-center justify-center flex-shrink-0">
                  <Bot size={13} className="text-[#557EB2]" />
                </div>
                <div className="bg-[#C2E8FF] border border-[#7A9BC4]/20 px-4 py-3 rounded-xl rounded-tl-sm">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-[#557EB2] rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="flex-shrink-0 px-4 py-3 border-t border-[#7A9BC4]/20 bg-white">
            <div className="flex items-end gap-2 bg-[#C2E8FF]/40 rounded-lg border border-[#7A9BC4]/30 px-3 py-2 focus-within:border-[#557EB2] focus-within:ring-2 focus-within:ring-[#557EB2]/15 transition-all">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI career coach anything..."
                className="flex-1 bg-transparent text-sm text-[#000F22] placeholder:text-[#7A9BC4] resize-none outline-none py-1 max-h-32 font-body leading-relaxed"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isSending}
                className="w-8 h-8 bg-[#000F22] rounded-md flex items-center justify-center flex-shrink-0 transition-all hover:bg-[#042558] disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
            <p className="text-[10px] text-[#7A9BC4] text-center mt-2">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </main>
      </div>
      <ComingSoonModal
        isOpen={isComingSoonModalOpen}
        onClose={() => setIsComingSoonModalOpen(false)}
        featureName="AI Chat Assistant"
      />
    </div>
  );
}
