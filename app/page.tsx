"use client";

import { useState, memo } from "react";
import { motion } from "framer-motion";
import { readStreamableValue } from "ai/rsc";
import { generateAIResponse } from "./actions";
  
const HALEye = memo(function HALEye() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer chrome bezel */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500 shadow-2xl border-2 sm:border-4 border-slate-400 transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(138,43,226,0.4)]">
        {/* Inner chrome ring */}
        <div className="absolute inset-1.5 sm:inset-3 rounded-full bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700 shadow-inner">
          {/* Deep lens housing */}
          <div className="absolute inset-3 sm:inset-6 rounded-full bg-gradient-to-br from-purple-900/80 via-black to-purple-900/60 shadow-inner">
            {/* Glass lens surface */}
            <div className="absolute inset-1 sm:inset-2 rounded-full bg-gradient-to-br from-purple-900/40 via-black to-red-900/20 shadow-inner overflow-hidden group-hover:bg-gradient-to-br group-hover:from-violet-900/60 group-hover:via-black group-hover:to-violet-900/40 transition-all duration-500">
              {/* Central eye core */}
              <div className="absolute top-1/2 left-1/2 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="w-full h-full rounded-full relative transition-all duration-500"
                  style={{
                    background: isHovered
                      ? "radial-gradient(circle, #9d4edd 0%, #7b2cbf 30%, #5a189a 60%, #240046 100%)"
                      : "radial-gradient(circle, #ff6b6b 0%, #ff4757 30%, #c44569 60%, #8b0000 100%)",
                    boxShadow: isHovered
                      ? "0 0 60px #9d4edd, 0 0 120px #7b2cbf, 0 0 180px #5a189a, inset 0 0 30px #240046"
                      : "0 0 40px #ff4757, 0 0 80px #ff3838, 0 0 120px #ff1744, inset 0 0 20px #8b0000",
                  }}
                  animate={{
                    scale: isHovered ? [1, 1.08, 1] : [1, 1.05, 1],
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: isHovered ? 2 : 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Bright center core */}
                  <div
                    className="absolute top-1/2 left-1/2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
                    style={{
                      background: isHovered
                        ? "radial-gradient(circle, #ffffff 0%, #e0aaff 40%, #9d4edd 100%)"
                        : "radial-gradient(circle, #ffffff 0%, #ffaaaa 40%, #ff6b6b 100%)",
                      boxShadow: isHovered
                        ? "0 0 25px #ffffff, 0 0 40px #9d4edd, 0 0 60px #7b2cbf"
                        : "0 0 15px #ffffff, 0 0 25px #ff6b6b",
                    }}
                  />

                  {/* Intense glow effect on hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, transparent 30%, rgba(157, 78, 221, 0.3) 70%, rgba(123, 44, 191, 0.6) 100%)",
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Large curved reflection - top left */}
              <div
                className="absolute top-4 left-6 w-8 h-16 sm:top-6 sm:left-8 sm:w-12 sm:h-24 md:top-8 md:left-12 md:w-16 md:h-32 rounded-full opacity-40 transition-all duration-500"
                style={{
                  background: isHovered
                    ? "linear-gradient(135deg, rgba(224,170,255,0.9) 0%, rgba(157,78,221,0.4) 50%, transparent 100%)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                  transform: "rotate(-15deg)",
                  filter: "blur(1px)",
                }}
              />

              {/* Secondary reflection - top right */}
              <div
                className="absolute top-6 right-8 w-4 h-8 sm:top-8 sm:right-12 sm:w-6 sm:h-12 md:top-12 md:right-16 md:w-8 md:h-16 rounded-full opacity-30 transition-all duration-500"
                style={{
                  background: isHovered
                    ? "linear-gradient(45deg, rgba(224,170,255,0.7) 0%, rgba(157,78,221,0.3) 70%, transparent 100%)"
                    : "linear-gradient(45deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 70%, transparent 100%)",
                  transform: "rotate(25deg)",
                  filter: "blur(0.5px)",
                }}
              />

              {/* Small highlight reflections */}
              <div
                className={`absolute top-3 left-10 w-1.5 h-3 sm:top-4 sm:left-14 sm:w-2 sm:h-4 md:top-6 md:left-20 md:w-3 md:h-6 rounded-full blur-sm opacity-60 transition-all duration-500 ${
                  isHovered ? "bg-violet-300/60" : "bg-white/50"
                }`}
              />
              <div
                className={`absolute top-8 right-6 w-1 h-2 sm:top-12 sm:right-8 sm:w-1.5 sm:h-3 md:top-16 md:right-12 md:w-2 md:h-4 rounded-full blur-sm opacity-50 transition-all duration-500 ${
                  isHovered ? "bg-violet-300/50" : "bg-white/40"
                }`}
              />

              {/* Lens edge highlight */}
              <div
                className="absolute inset-0 rounded-full transition-all duration-500"
                style={{
                  background: isHovered
                    ? "conic-gradient(from 45deg, transparent 0%, rgba(157,78,221,0.15) 25%, transparent 50%, rgba(157,78,221,0.08) 75%, transparent 100%)"
                    : "conic-gradient(from 45deg, transparent 0%, rgba(255,255,255,0.1) 25%, transparent 50%, rgba(255,255,255,0.05) 75%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const SmallHALIcon = memo(function SmallHALIcon() {
  return (
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 shadow-lg border border-slate-400 flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 shadow-inner flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-red-900/40 via-black to-red-900/20 shadow-inner flex items-center justify-center">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #ff6b6b 0%, #ff4757 30%, #c44569 60%, #8b0000 100%)",
              boxShadow:
                "0 0 4px #ff4757, 0 0 8px #ff3838, inset 0 0 2px #8b0000",
            }}
          >
            <div className="w-0.5 h-0.5 rounded-full bg-white/80 ml-0.5 mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    setIsChatMode(true);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const { output } = await generateAIResponse(userMessage);
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      for await (const delta of readStreamableValue(output)) {
        assistantMessage += delta;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: assistantMessage,
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full px-2 sm:px-4 flex flex-col relative">
      {/* Middle Row - ~70% height */}
      <div className="flex-[0.8] flex items-center justify-center relative z-10 overflow-hidden py-4 sm:py-0">
        {!isChatMode ? (
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <HALEye />
          </motion.div>
        ) : (
          /* Full width chat when in chat mode */
          <motion.div
            className="w-full h-full flex flex-col justify-center px-2 sm:px-4 md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-64 sm:h-80 md:h-96 flex flex-col max-w-4xl mx-auto w-full">
              <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-1 sm:pr-2">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
                        message.role === "user"
                          ? "bg-blue-500/20 text-foreground"
                          : "bg-foreground/10 text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-medium mb-1 opacity-70">
                        {message.role === "assistant" && <SmallHALIcon />}
                        {message.role === "user" ? "You" : "DALI 9000"}
                      </div>
                      <div className="whitespace-pre-wrap text-xs sm:text-sm">
                        {message.content}
                        {message.role === "assistant" &&
                          message.content === "" && (
                            <motion.div
                              className="inline-block w-2 h-4 bg-foreground/60 ml-1"
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Row - ~30% height */}
      <div className="flex-[0.2] flex flex-col items-center justify-center relative z-10 px-2 sm:px-4 md:px-8 pb-4 sm:pb-8">
        {/* Enhanced Input Section */}
        <motion.div
          className="w-full max-w-4xl relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="relative group">
            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

            <div className="relative bg-background/15 backdrop-blur-xl border border-foreground/30 rounded-2xl sm:rounded-3xl p-0.5 sm:p-1 shadow-2xl">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask DALI 9000 anything... Share your thoughts, questions, or ideas..."
                className="w-full h-20 sm:h-24 md:h-32 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 pr-16 sm:pr-20 bg-transparent text-foreground placeholder-foreground/50 focus:outline-none resize-none text-sm sm:text-base md:text-lg leading-relaxed relative z-10"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />

              {/* Enhanced Send Button */}
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 sm:right-3 md:right-4 bottom-2 sm:bottom-3 md:bottom-4 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading && input.trim()) {
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(59, 130, 246, 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(59, 130, 246, 0.3)";
                }}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg
                    width="16"
                    height="16"
                    className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}

                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </button>

              {/* Character count or status indicator */}
              <div className="absolute left-4 sm:left-6 md:left-8 bottom-2 sm:bottom-3 md:bottom-4 text-xs text-foreground/40 font-medium pointer-events-none">
                {isLoading ? "Processing..." : "Ready to assist"}
              </div>
            </div>

            {/* Subtle animated border */}
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-foreground/10 pointer-events-none"
              style={{
                animation: "borderPulse 4s ease-in-out infinite",
              }}
            />
          </form>
        </motion.div>
      </div>
    </div>
  );
}
