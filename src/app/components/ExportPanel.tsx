"use client";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import gifshot from "gifshot";
import Button from "@/components/Button";

interface ExportPanelProps {
  cardRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLElement | null>;
  bgMode: "gradient" | "transparent";
}

const ExportPanel: React.FC<ExportPanelProps> = ({ cardRef, contentRef, bgMode }) => {
  const [duration, setDuration] = useState<number>(3); // 秒
  const [fps, setFps] = useState<number>(12);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const aborting = useRef<boolean>(false);

  const handleExport = async () => {
    const target = bgMode === "transparent" ? contentRef.current : cardRef.current;
    if (!target || isExporting) return;
    setIsExporting(true);
    aborting.current = false;
    try {
      const totalFrames = Math.max(1, Math.floor(duration * fps));
      const frameDelayMs = 1000 / fps;
      const images: string[] = [];
      // 纯透明通道：不修改 DOM 背景
      for (let i = 0; i < totalFrames; i++) {
        if (aborting.current) break;
        await new Promise((r) => setTimeout(r, frameDelayMs));
        const canvas = await html2canvas(target!, {
          useCORS: true,
          backgroundColor: bgMode === "transparent" ? null : undefined,
          scale: 1,
        });
        images.push(canvas.toDataURL("image/png"));
      }
      
      
      if (images.length === 0) return;
      await new Promise<void>((resolve, reject) => {
        gifshot.createGIF(
          {
            images,
            interval: 1 / fps,
            gifWidth: Math.round(target!.clientWidth),
            gifHeight: Math.round(target!.clientHeight),
            numWorkers: 2,
            sampleInterval: 2,
            // 透明背景（alpha）
            transparent: bgMode === "transparent" ? "rgba(0,0,0,0)" : undefined,
            progressCallback: () => {},
          },
          (obj: any) => {
            if (!obj.error) {
              const link = document.createElement("a");
              link.href = obj.image;
              link.download = `text-animator-${Date.now()}.gif`;
              document.body.appendChild(link);
              link.click();
              link.remove();
              resolve();
            } else {
              reject(obj.error);
            }
          }
        );
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="glass-card p-3 space-y-3">
      <div className="text-sm font-medium text-[var(--text-primary)]">导出</div>
      <div className="text-sm text-[var(--text-secondary)]">格式：GIF</div>
      <label className="text-sm block text-[var(--text-secondary)]">时长（秒）：{duration.toFixed(1)}</label>
      <input
        type="range"
        min={1}
        max={10}
        step={0.5}
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />
      <label className="text-sm block text-[var(--text-secondary)]">帧率（FPS）：{fps}</label>
      <input
        type="range"
        min={6}
        max={24}
        step={1}
        value={fps}
        onChange={(e) => setFps(Number(e.target.value))}
      />
      <div className="flex gap-2">
        <Button variant="primary" onClick={handleExport} disabled={isExporting}>
          {isExporting ? "导出中…" : "导出 GIF"}
        </Button>
        {isExporting && (
          <Button onClick={() => (aborting.current = true)}>中止</Button>
        )}
      </div>
      <div className="text-xs text-[var(--text-tertiary)]">提示：导出时会按设定时长与 FPS 连续截图合成 GIF，复杂动效可能需要数秒。</div>
    </div>
  );
};

export default ExportPanel;


