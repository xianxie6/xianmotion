"use client";
import { motion } from "framer-motion";
import useStore from "@/store/useStore";
import { effectPresets } from "@/data/effects";
import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";
import Input from "@/components/Input";
import SwayText from "@/components/SwayText";
import ExportPanel from "@/components/ExportPanel";
import React, { useRef } from "react";

export default function HomePage() {
  const previewCardRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const {
    text,
    setText,
    selectedEffect,
    setSelectedEffect,
    showSafeLines,
    setShowSafeLines,
    bgMode,
    setBgMode,
    wind,
    setWind,
    canvas,
    setCanvas,
    writingMode,
    setWritingMode,
    fontSize,
    setFontSize,
  } = useStore();
  const currentEffect =
    effectPresets.find((e) => e.id === selectedEffect) || effectPresets[0];
  const fontPx = fontSize === "sm" ? 24 : fontSize === "lg" ? 44 : 32;

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航 */}
      <header className="glass-card h-12 flex items-center justify-between px-4 mx-4 mt-2">
        <div className="flex items-center gap-3">
          <img src="/xianlogo.png" alt="XianMotion" className="w-8 h-8 rounded-lg object-cover" />
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">XianMotion</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass">模板库</Button>
          <Button variant="glass">帮助</Button>
          <Button variant="primary">导出</Button>
        </div>
      </header>

      {/* 主工作区：左面板 + 画布 + 右面板 */}
      <main className="flex-1 grid grid-cols-12 gap-4 p-4 pt-2">
        {/* 左：模板/预设面板 288px ≈ 3列 */}
        <aside className="col-span-3 glass-card p-3">
          <h2 className="text-lg font-semibold mb-3 text-[var(--text-primary)]">动画预设</h2>
          <div className="space-y-2">
            {effectPresets.map((effect) => (
              <Button
                key={effect.id}
                variant={selectedEffect === effect.id ? "primary" : "glass"}
                onClick={() => setSelectedEffect(effect.id)}
                className="w-full"
              >
                {effect.name}
              </Button>
            ))}
          </div>
        </aside>

        {/* 中：画布预览 6列，居中 */}
        <section className="col-span-6 flex items-start justify-center pt-2">
          {(() => {
            const ratioMap: Record<string, number> = { "9:16": 16 / 9, "16:9": 9 / 16, "1:1": 1 };
            const h = Math.round(canvas.width * ratioMap[canvas.preset]);
            return (
              <GlassCard
                ref={previewCardRef}
                className="relative overflow-hidden flex justify-center items-start pt-10"
                id="preview-card"
                style={{ width: `${canvas.width}px`, height: `${h}px` }}
              >
            {/* 画布背景：透明棋盘格 or 渐变 */}
            <div
              className="absolute inset-0"
              style={
                bgMode === "transparent"
                  ? {
                      backgroundImage:
                        "linear-gradient(45deg, rgba(0,0,0,.06) 25%, transparent 25%), linear-gradient(-45deg, rgba(0,0,0,.06) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0,0,0,.06) 75%), linear-gradient(-45deg, transparent 75%, rgba(0,0,0,.06) 75%)",
                      backgroundSize: "16px 16px",
                      backgroundPosition:
                        "0 0, 0 8px, 8px -8px, -8px 0",
                    }
                  : {
                      background:
                        "linear-gradient(135deg, var(--brand-50) 0%, #E6FFFB 100%)",
                    }
              }
            />
            {/* 安全线 */}
            {showSafeLines && (
              <div
                className="pointer-events-none absolute inset-12 rounded-lg"
                style={{
                  border: "2px dashed rgba(99,102,241,0.35)",
                }}
              />
            )}
            {selectedEffect === "windSway" ? (
              <div
                ref={previewContentRef}
                className="w-full px-4 pt-2 text-left"
                style={
                  writingMode === "vertical"
                    ? { writingMode: "vertical-lr", textOrientation: "upright", fontSize: `${fontPx}px` }
                    : { fontSize: `${fontPx}px` }
                }
              >
                <SwayText
                  text={text || "输入文字…"}
                  amplitudePx={wind.amplitudePx}
                  durationSec={wind.durationSec}
                  phaseStep={wind.phaseStep}
                  direction={wind.direction}
                  gustEnabled={wind.gustEnabled}
                  gustStrength={wind.gustStrength}
                  gustPeriodSec={wind.gustPeriodSec}
                  jitterEnabled={wind.jitterEnabled}
                  jitterPx={wind.jitterPx}
                  jitterSpeedSec={wind.jitterSpeedSec}
                  className={`whitespace-pre-wrap break-words text-[var(--text-primary)] leading-[1.5] tracking-normal font-medium drop-shadow-lg`}
                />
              </div>
            ) : (
              <motion.div
                key={selectedEffect}
                variants={currentEffect.variant}
                initial="initial"
                animate="animate"
                className={`w-full px-4 pt-2 whitespace-pre-wrap break-words text-left text-[var(--text-primary)] leading-[1.5] tracking-normal font-medium drop-shadow-lg`}
                style={
                  writingMode === "vertical"
                    ? { writingMode: "vertical-lr", textOrientation: "upright", fontSize: `${fontPx}px` }
                    : { fontSize: `${fontPx}px` }
                }
              >
                <div ref={previewContentRef}>{text || "输入文字…"}</div>
              </motion.div>
            )}
              </GlassCard>
            );
          })()}
        </section>

        {/* 右：属性面板 360px ≈ 3列 */}
        <aside className="col-span-3 glass-card p-3">
          <h2 className="text-lg font-semibold mb-3 text-[var(--text-primary)]">文本设置</h2>
          <div className="space-y-4">
            <Input
              multiline
              rows={5}
              value={text}
              onChange={(e) => setText((e.target as unknown as HTMLTextAreaElement).value)}
              placeholder="输入文字，可回车换行..."
            />
            <div className="glass-card p-3">
              <label className="text-sm block mb-2 text-[var(--text-secondary)]">画布背景</label>
              <div className="flex gap-2">
                <Button
                  variant={bgMode === "gradient" ? "primary" : "glass"}
                  onClick={() => setBgMode("gradient")}
                >
                  渐变
                </Button>
                <Button
                  variant={bgMode === "transparent" ? "primary" : "glass"}
                  onClick={() => setBgMode("transparent")}
                >
                  透明
                </Button>
              </div>
            </div>
            <div className="glass-card p-3 space-y-2">
              <label className="text-sm block text-[var(--text-secondary)]">画布比例</label>
              <div className="flex gap-2">
                {(["9:16","16:9","1:1"] as const).map((p)=> (
                  <Button key={p} variant={canvas.preset===p?"primary":"glass"} onClick={()=>setCanvas({preset:p})}>{p}</Button>
                ))}
              </div>
              <label className="text-sm block text-[var(--text-secondary)]">画布宽度（320–1080px）：{canvas.width}px</label>
              <input type="range" min={320} max={1080} step={10} value={canvas.width} onChange={(e)=>setCanvas({width:Number(e.target.value)})} />
            </div>
            <div className="glass-card p-3 space-y-2">
              <label className="text-sm block text-[var(--text-secondary)]">文本方向</label>
              <div className="flex gap-2">
                <Button variant={writingMode === "horizontal" ? "primary" : "glass"} onClick={()=>setWritingMode("horizontal")}>横排</Button>
                <Button variant={writingMode === "vertical" ? "primary" : "glass"} onClick={()=>setWritingMode("vertical")}>竖排</Button>
              </div>
              <label className="text-sm block text-[var(--text-secondary)] mt-2">字号</label>
              <div className="flex gap-2">
                <Button variant={fontSize === "sm" ? "primary" : "glass"} onClick={()=>setFontSize("sm")}>小</Button>
                <Button variant={fontSize === "md" ? "primary" : "glass"} onClick={()=>setFontSize("md")}>中</Button>
                <Button variant={fontSize === "lg" ? "primary" : "glass"} onClick={()=>setFontSize("lg")}>大</Button>
              </div>
            </div>
            <div className="glass-card p-3 flex items-center justify-between">
              <div className="text-sm text-[var(--text-secondary)]">显示安全线</div>
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showSafeLines}
                  onChange={(e) => setShowSafeLines(e.target.checked)}
                />
              </label>
            </div>
            {selectedEffect === "windSway" && (
              <div className="glass-card p-3 space-y-3">
                <label className="text-sm block text-[var(--text-secondary)]">风力（幅度 2–12px）: {wind.amplitudePx.toFixed(0)}px</label>
                <input
                  type="range"
                  min={2}
                  max={12}
                  step={1}
                  value={wind.amplitudePx}
                  onChange={(e) => setWind({ amplitudePx: Number(e.target.value) })}
                />
                <label className="text-sm block text-[var(--text-secondary)]">时长（2–6s）: {wind.durationSec.toFixed(1)}s</label>
                <input
                  type="range"
                  min={2}
                  max={6}
                  step={0.1}
                  value={wind.durationSec}
                  onChange={(e) => setWind({ durationSec: Number(e.target.value) })}
                />
                <label className="text-sm block text-[var(--text-secondary)]">相位（0.02–0.08）: {wind.phaseStep.toFixed(2)}</label>
                <input
                  type="range"
                  min={0.02}
                  max={0.08}
                  step={0.01}
                  value={wind.phaseStep}
                  onChange={(e) => setWind({ phaseStep: Number(e.target.value) })}
                />
                <label className="text-sm block text-[var(--text-secondary)]">风向</label>
                <div className="flex gap-2">
                  <Button
                    variant={wind.direction === "ltr" ? "primary" : "glass"}
                    onClick={() => setWind({ direction: "ltr" })}
                  >
                    左→右
                  </Button>
                  <Button
                    variant={wind.direction === "rtl" ? "primary" : "glass"}
                    onClick={() => setWind({ direction: "rtl" })}
                  >
                    右→左
                  </Button>
                  <Button
                    variant={wind.direction === "alternate" ? "primary" : "glass"}
                    onClick={() => setWind({ direction: "alternate" })}
                  >
                    交替
                  </Button>
                </div>
              </div>
            )}
            {selectedEffect === "windSway" && (
              <div className="glass-card p-3 space-y-3 mt-3">
                <div className="h-px bg-white/30" />
                <label className="text-sm block text-[var(--text-secondary)]">阵风</label>
                <div className="flex gap-2 mb-1">
                  <Button variant={wind.gustEnabled ? "primary" : "glass"} onClick={() => setWind({ gustEnabled: !wind.gustEnabled })}>
                    {wind.gustEnabled ? "开" : "关"}
                  </Button>
                </div>
                {wind.gustEnabled && (
                  <>
                    <label className="text-sm block text-[var(--text-secondary)]">阵风强度（0–0.8）: {wind.gustStrength.toFixed(2)}</label>
                    <input
                      type="range"
                      min={0}
                      max={0.8}
                      step={0.02}
                      value={wind.gustStrength}
                      onChange={(e) => setWind({ gustStrength: Number(e.target.value) })}
                    />
                    <label className="text-sm block text-[var(--text-secondary)]">阵风周期（4–12s）: {wind.gustPeriodSec.toFixed(1)}s</label>
                    <input
                      type="range"
                      min={4}
                      max={12}
                      step={0.5}
                      value={wind.gustPeriodSec}
                      onChange={(e) => setWind({ gustPeriodSec: Number(e.target.value) })}
                    />
                  </>
                )}
                <div className="h-px bg-white/30" />
                <label className="text-sm block text-[var(--text-secondary)]">随机扰动</label>
                <div className="flex gap-2 mb-1">
                  <Button variant={wind.jitterEnabled ? "primary" : "glass"} onClick={() => setWind({ jitterEnabled: !wind.jitterEnabled })}>
                    {wind.jitterEnabled ? "开" : "关"}
                  </Button>
                </div>
                {wind.jitterEnabled && (
                  <>
                    <label className="text-sm block text-[var(--text-secondary)]">扰动幅度（0–2px）: {wind.jitterPx.toFixed(1)}px</label>
                    <input
                      type="range"
                      min={0}
                      max={2}
                      step={0.1}
                      value={wind.jitterPx}
                      onChange={(e) => setWind({ jitterPx: Number(e.target.value) })}
                    />
                    <label className="text-sm block text-[var(--text-secondary)]">扰动速度（0.6–1.6s）: {wind.jitterSpeedSec.toFixed(1)}s</label>
                    <input
                      type="range"
                      min={0.6}
                      max={1.6}
                      step={0.1}
                      value={wind.jitterSpeedSec}
                      onChange={(e) => setWind({ jitterSpeedSec: Number(e.target.value) })}
                    />
                  </>
                )}
              </div>
            )}
            {/* 导出面板 */}
            <ExportPanel cardRef={previewCardRef} contentRef={previewContentRef} bgMode={bgMode} />
          </div>
        </aside>
    </main>
    </div>
  );
}
