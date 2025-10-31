// src/store/useStore.ts
import { create } from "zustand";

interface AppState {
  text: string;
  selectedEffect: string;
  showSafeLines: boolean;
  bgMode: "gradient" | "transparent";
  canvas: {
    preset: "9:16" | "16:9" | "1:1";
    width: number; // px
  };
  writingMode: "horizontal" | "vertical";
  fontSize: "sm" | "md" | "lg";
  wind: {
    amplitudePx: number; // 2-12
    durationSec: number; // 2-6
    phaseStep: number;   // 0.02-0.08
    direction: "ltr" | "rtl" | "alternate";
    gustEnabled: boolean;
    gustStrength: number;   // 0-0.8, 作为幅度乘子
    gustPeriodSec: number;  // 4-12s，一轮阵风周期
    jitterEnabled: boolean;
    jitterPx: number;       // 0-2px 随机抖动幅度
    jitterSpeedSec: number; // 0.6-1.6s 抖动周期
  };
  setText: (text: string) => void;
  setSelectedEffect: (id: string) => void;
  setShowSafeLines: (v: boolean) => void;
  setBgMode: (m: "gradient" | "transparent") => void;
  setCanvas: (u: Partial<AppState["canvas"]>) => void;
  setWritingMode: (m: "horizontal" | "vertical") => void;
  setFontSize: (s: "sm" | "md" | "lg") => void;
  setWind: (u: Partial<AppState["wind"]>) => void;
}

const useStore = create<AppState>((set) => ({
  text: "Hello, World!",
  selectedEffect: "fadeIn",
  showSafeLines: false,
  bgMode: "gradient",
  canvas: { preset: "9:16", width: 480 },
  writingMode: "horizontal",
  fontSize: "md",
  wind: {
    amplitudePx: 6,
    durationSec: 3,
    phaseStep: 0.05,
    direction: "ltr",
    gustEnabled: false,
    gustStrength: 0.35,
    gustPeriodSec: 8,
    jitterEnabled: false,
    jitterPx: 1,
    jitterSpeedSec: 1.0,
  },
  setText: (text) => set({ text }),
  setSelectedEffect: (id) => set({ selectedEffect: id }),
  setShowSafeLines: (v) => set({ showSafeLines: v }),
  setBgMode: (m) => set({ bgMode: m }),
  setCanvas: (u) => set((s) => ({ canvas: { ...s.canvas, ...u } })),
  setWritingMode: (m) => set({ writingMode: m }),
  setFontSize: (s) => set({ fontSize: s }),
  setWind: (u) => set((s) => ({ wind: { ...s.wind, ...u } })),
}));

export default useStore;
