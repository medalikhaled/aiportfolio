"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";

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
              filter: "drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor)",
              textShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            }}
            initial={{
              x: rowIndex % 2 === 0 ? 0 : `-${dimensions.width}px`
            }}
            animate={{
              x: rowIndex % 2 === 0 
                ? [0, -dimensions.width]
                : [-dimensions.width, 0]
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
                  marginRight: '32px',
                  width: '16px',
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

      {/* Top Row - ~10% height */}
      <div className="flex-[0.1] flex items-center justify-center relative z-10">
        <h1 className="text-white text-xl font-bold">Top Section</h1>
      </div>

      {/* Middle Row - ~70% height */}
      <div className="flex-[0.7] flex items-center justify-center relative z-10">
        <h2 className="text-foreground text-2xl font-bold">
          Main Content Area
        </h2>
      </div>

      {/* Bottom Row - ~20% height */}
      <div className="flex-[0.2] flex items-center justify-center relative z-10">
        <h3 className="text-white text-xl font-bold">Bottom Section</h3>
      </div>
    </div>
  );
}
