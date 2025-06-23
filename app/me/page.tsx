"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  // Users,
} from "lucide-react";

export default function MePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const halEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getEyePosition = () => {
    if (!halEyeRef.current) return { x: 0, y: 0 };

    const rect = halEyeRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(
      mousePosition.y - eyeCenterY,
      mousePosition.x - eyeCenterX
    );
    const distance = Math.min(
      8,
      Math.sqrt(
        Math.pow(mousePosition.x - eyeCenterX, 2) +
          Math.pow(mousePosition.y - eyeCenterY, 2)
      ) / 20
    );

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };

  const eyePosition = getEyePosition();

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 flex flex-col relative">
      <div className="flex-1 flex items-center justify-center relative z-10 overflow-hidden py-8 sm:py-12 lg:py-0">
        <div className="w-full max-w-6xl mx-auto">
          {/* Main Content Container */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Side - Profile Image */}
            <motion.div
              className="lg:col-span-2 flex justify-center lg:justify-end order-1 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative group">
                {/* Animated Background Shapes */}
                <div className="absolute inset-0 -z-10">
                  {/* Large rotating gradient circle */}
                  <motion.div
                    className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-xl"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />

                  {/* Medium floating shape */}
                  <motion.div
                    className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-2xl blur-lg"
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      rotate: {
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  />

                  {/* Small accent shapes */}
                  <motion.div
                    className="absolute top-1/4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400/50 to-emerald-500/50 rounded-full blur-md"
                    animate={{
                      x: [0, 15, 0],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className="absolute bottom-1/3 -left-6 w-20 h-20 bg-gradient-to-br from-yellow-400/40 to-orange-500/40 rounded-xl blur-lg"
                    animate={{
                      rotate: [0, -180, -360],
                      y: [0, -20, 0],
                    }}
                    transition={{
                      rotate: {
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    }}
                  />
                </div>

                {/* Profile Image Container */}
                <motion.div
                  className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Glowing border effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Image with rounded corners and border */}
                  <motion.div
                    className="relative w-full h-full rounded-3xl bg-gradient-to-br from-foreground/10 to-foreground/5 border border-foreground/20 overflow-hidden shadow-2xl group-hover:shadow-cyan-500/25 transition-all duration-500"
                    whileHover={{
                      borderColor: "rgba(100, 186, 206, 0.5)",
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(100, 186, 206, 0.3)",
                    }}
                  >
                    {/* Actual Profile Image */}
                    <Image
                      src="/me.jpeg"
                      alt="Dali Profile"
                      fill
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      priority
                    />

                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>

                  {/* Available Status Indicator */}
                  <motion.div
                    className="absolute bottom-6 left-6 flex items-center gap-2 bg-green-500/20 backdrop-blur-lg border border-green-500/30 rounded-full px-4 py-2 group-hover:bg-green-500/30 group-hover:border-green-400/50 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="text-sm font-medium text-green-400 group-hover:text-green-300 transition-colors duration-300">
                      Online
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              className="lg:col-span-3 space-y-8 text-center lg:text-left order-2 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-foreground/10 backdrop-blur-lg border border-foreground/20 rounded-full px-4 py-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="text-yellow-400">✨</span>
                <span className="text-sm font-medium text-foreground/80">
                  Software Engineer
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  Hello, I am{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    Dali
                  </span>{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    . ⴷⴰⵍⵉ
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div
                className="text-lg text-foreground/80 leading-relaxed max-w-2xl font-mono"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <p>
                  I am a software developer from Tunisia 🇹🇳 based in Italy 🇮🇹,
                  with over 2 years of experience in dev and DevOps. In my free
                  time, I enjoy sharing my experiences through my{" "}
                  <span className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                    blog
                  </span>{" "}
                  and
                  <span className="text-green-400 hover:text-green-300 transition-colors cursor-pointer">
                    {" "}
                    camping 🏕️
                  </span>{" "}
                  {/* community. I am the creator of the{" "}
                  <span className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer">
                    Hell
                  </span>{" "} */}
                  .
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <button
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                >
                  <ExternalLink size={18} />
                  Ask DALI 9000 about me
                </button>

                {/* <button className="flex items-center gap-2 bg-foreground/10 backdrop-blur-lg border border-foreground/20 hover:border-foreground/40 text-foreground px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:bg-foreground/20">
                  <Users size={18} />
                  Join the forum
                </button> */}

                <button className="flex items-center gap-2 bg-foreground/10 backdrop-blur-lg border border-foreground/20 hover:border-foreground/40 text-foreground px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:bg-foreground/20">
                  <Download size={18} />
                  Download Resume
                </button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <p className="text-sm text-foreground/60 mb-4">
                  Connect with me:
                </p>
                <div className="flex gap-4 justify-center lg:justify-start">
                  {[
                    {
                      icon: Github,
                      label: "GitHub",
                      color: "hover:text-gray-400",
                    },
                    {
                      icon: Twitter,
                      label: "Twitter",
                      color: "hover:text-blue-400",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      color: "hover:text-blue-500",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      color: "hover:text-green-400",
                    },
                  ].map((social, index) => (
                    <motion.button
                      key={social.label}
                      className={`p-3 bg-foreground/10 backdrop-blur-lg border border-foreground/20 rounded-xl text-foreground/70 ${social.color} transition-all duration-300 hover:scale-110 hover:border-foreground/40`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    >
                      <social.icon size={20} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* HAL Eye - Floating (Desktop Only) */}
          <motion.div
            ref={halEyeRef}
            className="hidden lg:block fixed bottom-8 right-8 z-20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500 shadow-2xl border-2 border-slate-400 transition-all duration-300">
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700 shadow-inner">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-900/80 via-black to-purple-900/60 shadow-inner overflow-hidden">
                  <div
                    className={`absolute inset-1 rounded-full transition-all duration-300 ${
                      isHoveringButton
                        ? "bg-gradient-to-br from-violet-500/60 via-black to-violet-500/40"
                        : "bg-gradient-to-br from-red-900/40 via-black to-red-900/20"
                    } shadow-inner flex items-center justify-center`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full relative transition-all duration-300`}
                      style={{
                        background: isHoveringButton
                          ? "radial-gradient(circle, #8b5cf6 0%, #7c3aed 30%, #6d28d9 60%, #5b21b6 100%)"
                          : "radial-gradient(circle, #ff6b6b 0%, #ff4757 30%, #c44569 60%, #8b0000 100%)",
                        boxShadow: isHoveringButton
                          ? "0 0 20px #8b5cf6, 0 0 40px #7c3aed, inset 0 0 10px #5b21b6"
                          : "0 0 15px #ff4757, 0 0 30px #ff3838, inset 0 0 8px #8b0000",
                        transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                      }}
                    >
                      <div
                        className={`absolute top-1 left-1 w-2 h-2 rounded-full transition-all duration-300 ${
                          isHoveringButton ? "bg-white/90" : "bg-white/80"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
