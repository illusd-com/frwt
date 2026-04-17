import { useState, useRef } from "react";

function ImageSearch() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("請上傳圖片檔案");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const searchOn = (engine: "google" | "bing" | "yandex" | "tineye") => {
    if (!preview) return;
    // 開新分頁直接前往各家以圖搜圖上傳頁，使用者貼上即可
    const urls = {
      google: "https://lens.google.com/uploadbyurl",
      bing: "https://www.bing.com/visualsearch",
      yandex: "https://yandex.com/images/",
      tineye: "https://tineye.com/",
    };
    // 將圖片複製到剪貼簿（PNG），再開啟搜尋頁，方便使用者貼上
    fetch(preview)
      .then(r => r.blob())
      .then(async blob => {
        try {
          const item = new ClipboardItem({ [blob.type]: blob });
          await navigator.clipboard.write([item]);
        } catch {
          // 忽略剪貼簿失敗（瀏覽器不支援），仍開啟搜尋頁
        }
        window.open(urls[engine], "_blank", "noopener,noreferrer");
      });
  };

  const clear = () => {
    setPreview(null);
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <div className="text-5xl mb-3">🔍🖼️</div>
          <p className="text-sm font-medium">點擊或拖曳上傳圖片</p>
          <p className="text-xs text-muted-foreground mt-2">支援 JPG / PNG / WebP / GIF</p>
          <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="hidden" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-3 space-y-2">
            <img src={preview} alt={fileName} className="max-h-64 mx-auto rounded-lg" />
            <p className="text-xs text-center text-muted-foreground truncate">{fileName}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => searchOn("google")} className="tool-btn">🔍 Google Lens</button>
            <button onClick={() => searchOn("bing")} className="tool-btn">🅱️ Bing 視覺搜尋</button>
            <button onClick={() => searchOn("yandex")} className="tool-btn">🇷🇺 Yandex 圖片</button>
            <button onClick={() => searchOn("tineye")} className="tool-btn">👁️ TinEye</button>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
            <p>💡 點擊搜尋後，圖片會自動複製到剪貼簿。</p>
            <p>📋 在新開的搜尋頁面按 <kbd className="px-1 py-0.5 rounded bg-card border">Ctrl/Cmd + V</kbd> 貼上即可搜尋。</p>
            <p>🔒 圖片完全在你的瀏覽器處理，不會上傳到我們的伺服器。</p>
          </div>
          <button onClick={clear} className="w-full tool-btn-secondary">重新上傳</button>
        </div>
      )}
    </div>
  );
}

export const ImageToolsExtra = {
  ImageSearch,
};
