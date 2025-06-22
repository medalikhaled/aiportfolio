"use client";

import { motion } from "framer-motion";
import { User, Briefcase, Zap, MessageCircle, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FloatingNavigation() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <motion.div
      className="fixed left-8 top-1/2 -translate-y-1/2 z-30"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <div className="flex flex-col gap-4">
        {[
          { icon: User, label: "Me", color: "from-cyan-500 to-blue-500", path: "/me" },
          {
            icon: Briefcase,
            label: "Projects",
            color: "from-green-500 to-emerald-500",
            path: "/projects"
          },
          {
            icon: Zap,
            label: "Skills",
            color: "from-purple-500 to-violet-500",
            path: "/skills"
          },
          { icon: MessageCircle, label: "Chat", color: "from-pink-500 to-rose-500", path: "/" },
          {
            icon: Mail,
            label: "Contact",
            color: "from-orange-500 to-yellow-500",
            path: "/contact"
          },
        ].map((item, index) => (
          <motion.button
            key={item.label}
            onClick={() => handleNavigation(item.path)}
            className="group cursor-pointer relative flex flex-col items-center justify-center w-18 h-18 bg-background/10 backdrop-blur-lg border border-foreground/20 rounded-2xl hover:border-foreground/40 transition-all duration-300 px-2 py-2"
            style={{
              boxShadow: "0 0 15px rgba(100, 186, 206, 0.1)",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(100, 186, 206, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background gradient on hover */}
            <motion.div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              initial={false}
            />

            {/* Icon */}
            <motion.div
              className="mb-1.5"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <item.icon
                size={18}
                className="text-foreground/90 group-hover:text-foreground transition-colors duration-300"
              />
            </motion.div>

            {/* Label */}
            <span className="text-xs text-foreground/80 group-hover:text-foreground transition-colors duration-300 font-medium text-center leading-tight">
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
      </div>
    </motion.div>
  );
}
