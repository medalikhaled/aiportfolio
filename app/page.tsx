"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";

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
                    background: "radial-gradient(circle, #ff6b6b 0%, #ff4757 30%, #c44569 60%, #8b0000 100%)",
                    boxShadow: "0 0 40px #ff4757, 0 0 80px #ff3838, 0 0 120px #ff1744, inset 0 0 20px #8b0000",
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
                      background: "radial-gradient(circle, #ffffff 0%, #ffaaaa 40%, #ff6b6b 100%)",
                      boxShadow: "0 0 15px #ffffff, 0 0 25px #ff6b6b",
                    }}
                  />
                </motion.div>
              </div>

              {/* Large curved reflection - top left */}
              <div 
                className="absolute top-8 left-12 w-16 h-32 rounded-full opacity-40"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                  transform: "rotate(-15deg)",
                  filter: "blur(1px)",
                }}
              />
              
              {/* Secondary reflection - top right */}
              <div 
                className="absolute top-12 right-16 w-8 h-16 rounded-full opacity-30"
                style={{
                  background: "linear-gradient(45deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 70%, transparent 100%)",
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
                  background: "conic-gradient(from 45deg, transparent 0%, rgba(255,255,255,0.1) 25%, transparent 50%, rgba(255,255,255,0.05) 75%, transparent 100%)",
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

      <div className="flex-[0.1] flex items-center justify-center relative z-10 backdrop-blur-lg bg-foreground/10 border-b border-foreground/20 rounded-b-md">
        <h1 className="text-white text-xl font-bold italic font-scriptorama">
          dali khaled - ⴷⴰⵍⵉ
        </h1>
      </div>

      {/* Middle Row - ~70% height */}
      <div className="flex-[0.7] flex items-center justify-center relative z-10">
        <HALEye />
      </div>

      {/* Bottom Row - ~20% height */}
      <div className="flex-[0.2] flex items-center justify-center relative z-10">
        <h3 className="text-white text-xl font-bold">Bottom Section</h3>
      </div>
    </div>
  );
}
