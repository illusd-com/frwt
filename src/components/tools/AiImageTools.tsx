import { useState, useRef } from "react";
import { analyzeImage } from "@/server/analyze-image";

type Mode = "all" | "describe" | "ocr" | "objects";

const MODES: { value: Mode; label: string; emoji: string; desc: string }[] = [
  { value: "all", label: "完整分析", emoji: "✨", desc: "場景＋物件＋OCR＋洞察" },
  { value: "describe", label: "場景描述", emoji: "📝", desc: "氛圍與構圖描述" },
  { value: "objects", label: "物件辨識", emoji: "🔍", desc: "列出畫面中所有元素" },
  { value: "ocr", label: "文字辨識", emoji: "📃", desc: "提取圖片文字 (OCR)" },
];

function AiImageAnalyze() {
  const [preview, setPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("all");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("請上傳圖片檔案");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("圖片大小不可超過 8MB");
      return;
    }
    setError("");
    setResult("");
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const analyze = async () => {
    if (!preview) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await analyzeImage({ data: { imageBase64: preview, mode } });
      setResult(res.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "分析失敗");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setResult("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <div className="text-5xl mb-3">🤖🖼️</div>
          <p className="text-sm font-medium">點擊或拖曳上傳圖片</p>
          <p className="text-xs text-muted-foreground mt-2">由 AI 視覺模型分析（最大 8MB）</p>
          <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="hidden" />
        </div>
      ) : (
        <>
          <div className="rounded-xl border bg-card p-3">
            <img src={preview} alt="待分析" className="max-h-64 mx-auto rounded-lg" />
          </div>

          <div>
            <label className="tool-label">選擇分析模式</label>
            <div className="grid grid-cols-2 gap-2">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  className={`p-2 rounded-lg border text-left transition-colors ${
                    mode === m.value ? "border-primary bg-primary/10" : "hover:border-primary/50"
                  }`}
                >
                  <div className="text-sm font-medium">
                    {m.emoji} {m.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={analyze} disabled={loading} className="tool-btn disabled:opacity-50">
              {loading ? "🧠 分析中..." : "🚀 開始分析"}
            </button>
            <button onClick={reset} className="tool-btn-secondary">🔄 重新上傳</button>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 text-destructive p-3 text-sm">{error}</div>
          )}

          {loading && (
            <div className="rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
              <div className="animate-pulse">AI 正在仔細觀察這張圖片...</div>
            </div>
          )}

          {result && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="tool-label mb-0">分析結果</label>
                <button onClick={copy} className="text-xs text-primary hover:underline">📋 複製</button>
              </div>
              <pre className="tool-result whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}

          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
            🔒 圖片只用於本次分析，不會被儲存。⚡ 由 Lovable AI 提供（Gemini 視覺模型）。
          </div>
        </>
      )}
    </div>
  );
}

export const AiImageTools = { AiImageAnalyze };
