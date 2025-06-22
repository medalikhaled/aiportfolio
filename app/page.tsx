"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Zap, Target, Mail } from "lucide-react";

const HALEye = memo(function HALEye() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer chrome bezel */}
      <div className="relative w-96 h-96 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500 shadow-2xl border-4 border-slate-400">
        {/* Inner chrome ring */}
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700 shadow-inner">
          {/* Deep lens housing */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-purple-900/80 via-black to-purple-900/60 shadow-inner">
            {/* Glass lens surface */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-900/40 via-black to-red-900/20 shadow-inner overflow-hidden">
              {/* Central red eye core */}
              <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="w-full h-full rounded-full relative"
                  style={{
                    background:
                      "radial-gradient(circle, #ff6b6b 0%, #ff4757 30%, #c44569 60%, #8b0000 100%)",
                    boxShadow:
                      "0 0 40px #ff4757, 0 0 80px #ff3838, 0 0 120px #ff1744, inset 0 0 20px #8b0000",
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Bright center core */}
                  <div
                    className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, #ffffff 0%, #ffaaaa 40%, #ff6b6b 100%)",
                      boxShadow: "0 0 15px #ffffff, 0 0 25px #ff6b6b",
                    }}
                  />
                </motion.div>
              </div>

              {/* Large curved reflection - top left */}
              <div
                className="absolute top-8 left-12 w-16 h-32 rounded-full opacity-40"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                  transform: "rotate(-15deg)",
                  filter: "blur(1px)",
                }}
              />

              {/* Secondary reflection - top right */}
              <div
                className="absolute top-12 right-16 w-8 h-16 rounded-full opacity-30"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 70%, transparent 100%)",
                  transform: "rotate(25deg)",
                  filter: "blur(0.5px)",
                }}
              />

              {/* Small highlight reflections */}
              <div className="absolute top-6 left-20 w-3 h-6 bg-white/50 rounded-full blur-sm opacity-60" />
              <div className="absolute top-16 right-12 w-2 h-4 bg-white/40 rounded-full blur-sm opacity-50" />

              {/* Lens edge highlight */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 45deg, transparent 0%, rgba(255,255,255,0.1) 25%, transparent 50%, rgba(255,255,255,0.05) 75%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const AnimatedNumbersOverlay = memo(function AnimatedNumbersOverlay() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const generateRandomNumbers = useCallback((width: number, height: number) => {
    const rows = [];
    const charSpacing = 40;
    const rowHeight = 35;
    const rowCount = Math.ceil(height / rowHeight);
    const numbersPerRow = Math.ceil(width / charSpacing);

    for (let i = 0; i < rowCount; i++) {
      const row = [];
      for (let j = 0; j < numbersPerRow * 2; j++) {
        const chars = "0123456789ABCDEF";
        row.push(chars[Math.floor(Math.random() * chars.length)]);
      }
      rows.push(row);
    }
    return rows;
  }, []);

  const numberRows = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];
    return generateRandomNumbers(dimensions.width, dimensions.height);
  }, [dimensions.width, dimensions.height, generateRandomNumbers]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 w-full h-full opacity-20">
        {numberRows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="absolute whitespace-nowrap text-foreground text-sm font-mono"
            style={{
              top: `${rowIndex * 35}px`,
              filter:
                "drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor)",
              textShadow:
                "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            }}
            initial={{
              x: rowIndex % 2 === 0 ? 0 : `-${dimensions.width}px`,
            }}
            animate={{
              x:
                rowIndex % 2 === 0
                  ? [0, -dimensions.width]
                  : [-dimensions.width, 0],
            }}
            transition={{
              duration: 80 + (rowIndex % 6) * 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {row.map((char, charIndex) => (
              <span
                key={charIndex}
                className="inline-block text-center"
                style={{
                  marginRight: "32px",
                  width: "16px",
                }}
              >
                {char}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
});

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col relative">
      <AnimatedNumbersOverlay />

      {/* <div className="flex-[0.1] flex items-center justify-center relative z-10 backdrop-blur-lg bg-foreground/10 border-b border-foreground/20 rounded-b-md">
        <h1 className="text-white text-xl font-bold italic font-scriptorama">
          dali khaled - ⴷⴰⵍⵉ
        </h1>
      </div> */}

      {/* Middle Row - ~70% height */}
      <div className="flex-[0.7] flex items-center justify-center relative z-10">
        <HALEye />
      </div>

      {/* Bottom Row - ~30% height */}
      <div className="flex-[0.3] flex flex-col items-center justify-center relative z-10 px-8 pb-8">
        {/* Enhanced Input Section */}
        <motion.div
          className="w-full max-w-4xl mb-8 relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative group">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            
            <div className="relative bg-background/15 backdrop-blur-xl border border-foreground/30 rounded-3xl p-1 shadow-2xl">
              <textarea
                placeholder="Ask DALI 9000 anything... Share your thoughts, questions, or ideas..."
                className="w-full h-32 px-8 py-6 pr-20 bg-transparent text-foreground placeholder-foreground/50 focus:outline-none resize-none text-lg leading-relaxed relative z-10"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              />
              
              {/* Enhanced Send Button */}
              <button
                className="absolute right-4 bottom-4 w-14 h-14 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 z-10"
                style={{
                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(59, 130, 246, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.3)";
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </button>
              
              {/* Character count or status indicator */}
              <div className="absolute left-8 bottom-4 text-xs text-foreground/40 font-medium pointer-events-none">
                Ready to assist
              </div>
            </div>
            
            {/* Subtle animated border */}
            <div
              className="absolute inset-0 rounded-3xl border border-foreground/10 pointer-events-none"
              style={{
                animation: "borderPulse 4s ease-in-out infinite",
              }}
            />
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          className="flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {[
            { icon: User, label: "Me", color: "from-cyan-500 to-blue-500" },
            {
              icon: Briefcase,
              label: "Projects",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: Zap,
              label: "Skills",
              color: "from-purple-500 to-violet-500",
            },
            { icon: Target, label: "Fun", color: "from-pink-500 to-rose-500" },
            {
              icon: Mail,
              label: "Contact",
              color: "from-orange-500 to-yellow-500",
            },
          ].map((item, index) => (
            <motion.button
              key={item.label}
              className="group cursor-pointer relative flex flex-col items-center justify-center w-20 h-20 bg-background/10 backdrop-blur-lg border border-foreground/20 rounded-2xl hover:border-foreground/40 transition-all duration-300"
              style={{
                boxShadow: "0 0 15px rgba(100, 186, 206, 0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(100, 186, 206, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background gradient on hover */}
              <motion.div
                className={`absolute  inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                initial={false}
              />

              {/* Icon */}
              <motion.div
                className="mb-1"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <item.icon
                  size={24}
                  className="text-foreground/90 group-hover:text-foreground transition-colors duration-300"
                />
              </motion.div>

              {/* Label */}
              <span className="text-xs text-foreground/80 group-hover:text-foreground transition-colors duration-300 font-medium">
                {item.label}
              </span>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, rgba(100, 186, 206, 0.1) 0%, transparent 70%)`,
                }}
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
