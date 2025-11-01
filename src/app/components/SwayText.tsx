"use client";
import { motion } from "framer-motion";
import React from "react";

interface SwayTextProps {
  text: string;
  amplitudePx: number; // 摆动幅度
  durationSec: number; // 时长
  phaseStep: number;   // 相位步进
  direction: "ltr" | "rtl" | "alternate";
  gustEnabled?: boolean;
  gustStrength?: number;
  gustPeriodSec?: number;
  jitterEnabled?: boolean;
  jitterPx?: number;
  jitterSpeedSec?: number;
  className?: string;
}

// 将文本拆分为逐字符的随风摆动效果
const SwayText: React.FC<SwayTextProps> = ({ text, amplitudePx, durationSec, phaseStep, direction }) => {
  const chars = (text || "").split("");
  return (
    <div style={{ display: "inline-block", whiteSpace: "pre-wrap" }}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            transformOrigin: "left bottom",
          }}
          animate={{
            x: [0, (direction === "rtl" ? -1 : direction === "alternate" ? (i % 2 ? -1 : 1) : 1) * amplitudePx, (direction === "rtl" ? 1 : direction === "alternate" ? (i % 2 ? 1 : -1) : -1) * amplitudePx * 0.66, 0],
            rotate: [0, (direction === "rtl" ? -1 : direction === "alternate" ? (i % 2 ? -1 : 1) : 1) * amplitudePx * 0.35, (direction === "rtl" ? 1 : direction === "alternate" ? (i % 2 ? 1 : -1) : -1) * amplitudePx * 0.25, 0],
            skewY: [0, (direction === "rtl" ? -1 : direction === "alternate" ? (i % 2 ? -1 : 1) : 1) * amplitudePx, (direction === "rtl" ? 1 : direction === "alternate" ? (i % 2 ? 1 : -1) : -1) * amplitudePx * 0.66, 0],
          }}
          transition={{
            duration: durationSec,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * phaseStep,
          }}
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );
};

export default SwayText;


