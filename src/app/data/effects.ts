// src/data/effects.ts
export interface EffectPreset {
  id: string;
  name: string;
  // 使用宽松类型以兼容本地简化类型声明
  variant: Record<string, any>;
}

export const effectPresets: EffectPreset[] = [
  {
    id: "fadeIn",
    name: "淡入",
    variant: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.8 } },
    },
  },
  {
    id: "slideUp",
    name: "上滑出现",
    variant: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    },
  },
  {
    id: "zoomIn",
    name: "放大出现",
    variant: {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    },
  },
  {
    id: "windSway",
    name: "随风飘动",
    variant: {
      initial: {
        opacity: 1,
        x: 0,
        rotate: 0,
        skewY: 0,
        transformOrigin: "left bottom",
      },
      animate: {
        x: [0, 6, -4, 0],
        rotate: [0, 1.2, -1, 0],
        skewY: [0, 4, -3, 0],
        transformOrigin: "left bottom",
        transition: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
    },
  },
];
