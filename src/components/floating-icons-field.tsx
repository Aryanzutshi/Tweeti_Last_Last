"use client";

import { motion } from "framer-motion";
import { Icons } from "@/components/icons";

const iconSet = [
  Icons.github,
  Icons.twitter,
  Icons.radix,
  Icons.logo,
  Icons.npm,
  Icons.tailwind,
  Icons.pnpm,
  Icons.spinner,
  Icons.yarn,
];

function generateRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function FloatingIconField() {
  const iconCount = 30;
  const icons = Array.from({ length: iconCount }).map((_, i) => {
    const IconComponent = iconSet[i % iconSet.length];

    const size = generateRandomFloat(15, 30); // px
    const top = generateRandomFloat(0, 90); // vh
    const left = generateRandomFloat(0, 90); // vw
    const duration = generateRandomFloat(6, 15);
    const delay = generateRandomFloat(0, 5);
    const direction = Math.random() > 0.5 ? 1 : -1;

    return (
      <motion.div
        key={i}
        className="pointer-events-none fixed z-0 transition-colors"
        style={{
          top: `${top}vh`,
          left: `${left}vw`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0.15,
        }}
        animate={{
          x: [0, 10 * direction, -10 * direction, 0],
          y: [0, -10, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          duration,
          delay,
        }}
      >
        <IconComponent className="w-full h-full text-black dark:text-gray-600" />
      </motion.div>
    );
  });

  return <>{icons}</>;
}
