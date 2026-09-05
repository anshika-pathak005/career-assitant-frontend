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
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* <Navbar /> */}

      <div className="flex flex-1 max-w-5xl mx-auto w-full px-3 sm:px-6 gap-6 py-3 sm:py-6 h-[calc(100vh-4.5rem)] sm:h-auto min-h-[calc(100vh-5rem)]">
        {/* <Sidebar /> */}

        {/* Chat panel */}
        <main className="flex-1 min-w-0 flex flex-col bg-white rounded-lg border border-brand-accent-lt/20 shadow-card overflow-hidden h-full">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-accent-lt/20 flex-shrink-0">
            <div className="w-9 h-9 bg-brand-primary rounded-md flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-brand-primary text-sm">
                AI Career Coach
              </p>
              <p className="meta-text">
                Ask anything about your career
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="meta-text">Online</span>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4 min-h-0">
            {/* Empty state */}
            {messages.length === 0 && !isSending && (
              <div className="flex flex-col items-center justify-center h-full gap-6 py-12">
                <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center">
                  <Bot size={28} className="text-brand-accent" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-brand-primary mb-1">
                    How can I help you today?
                  </p>
                  <p className="text-sm text-brand-muted max-w-xs">
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
                      className="text-left px-3.5 py-3 rounded-md border border-brand-accent-lt/30 bg-white text-xs text-brand-muted font-medium hover:border-brand-accent hover:text-brand-secondary hover:bg-brand-bg/30 transition-all"
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
                      isUser ? "bg-brand-primary" : "bg-brand-bg"
                    }`}
                  >
                    {isUser ? (
                      <User size={13} className="text-white" />
                    ) : (
                      <Bot size={13} className="text-brand-accent" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                        isUser
                          ? "bg-brand-primary text-white rounded-tr-sm"
                          : "bg-brand-bg text-brand-secondary rounded-tl-sm border border-brand-accent-lt/20"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-2xs text-brand-accent-lt px-1">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isSending && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-7 h-7 rounded-full bg-brand-bg flex items-center justify-center flex-shrink-0">
                  <Bot size={13} className="text-brand-accent" />
                </div>
                <div className="bg-brand-bg border border-brand-accent-lt/20 px-4 py-3 rounded-xl rounded-tl-sm">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce"
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
          <div className="flex-shrink-0 px-4 py-3 border-t border-brand-accent-lt/20 bg-white">
            <div className="flex items-end gap-2 bg-brand-bg/40 rounded-lg border border-brand-accent-lt/30 px-3 py-2 focus-within:border-brand-accent focus-within:ring-2 focus-within:ring-brand-accent/15 transition-all">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI career coach anything..."
                className="flex-1 bg-transparent text-sm text-brand-primary placeholder:text-brand-accent-lt resize-none outline-none py-1 max-h-32 font-body leading-relaxed"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isSending}
                className="w-8 h-8 bg-brand-primary rounded-md flex items-center justify-center flex-shrink-0 transition-all hover:bg-brand-secondary disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
            <p className="text-2xs text-brand-accent-lt text-center mt-2">
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
