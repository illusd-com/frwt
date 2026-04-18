import { useState, useRef } from "react";

/* ───────────────── EXIF 資訊檢視 ───────────────── */
function ImageExif() {
  const [info, setInfo] = useState<Record<string, string> | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 簡易 EXIF parser：解析 JPEG APP1 (Exif) 區塊主要 IFD 標籤
  const TAGS: Record<number, string> = {
    0x010f: "製造商",
    0x0110: "型號",
    0x0112: "方向",
    0x011a: "X 解析度",
    0x011b: "Y 解析度",
    0x0131: "軟體",
    0x0132: "拍攝時間",
    0x829a: "曝光時間",
    0x829d: "光圈值",
    0x8827: "ISO 感光度",
    0x9003: "原始拍攝時間",
    0x920a: "焦距",
    0xa002: "影像寬度",
    0xa003: "影像高度",
    0x8825: "GPS 資訊",
  };

  const parseExif = (buf: ArrayBuffer): Record<string, string> => {
    const view = new DataView(buf);
    if (view.getUint16(0) !== 0xffd8) return { 提示: "非 JPEG，無法讀取 EXIF" };
    let offset = 2;
    while (offset < view.byteLength) {
      const marker = view.getUint16(offset);
      const size = view.getUint16(offset + 2);
      if (marker === 0xffe1) {
        // APP1
        const start = offset + 4;
        const exifId = String.fromCharCode(
          view.getUint8(start), view.getUint8(start + 1), view.getUint8(start + 2), view.getUint8(start + 3)
        );
        if (exifId !== "Exif") return { 提示: "找不到 Exif 標頭" };
        const tiff = start + 6;
        const little = view.getUint16(tiff) === 0x4949;
        const ifd0 = tiff + view.getUint32(tiff + 4, little);
        const entries = view.getUint16(ifd0, little);
        const out: Record<string, string> = {};
        for (let i = 0; i < entries; i++) {
          const e = ifd0 + 2 + i * 12;
          const tag = view.getUint16(e, little);
          const type = view.getUint16(e + 2, little);
          const count = view.getUint32(e + 4, little);
          if (!TAGS[tag]) continue;
          const valOff = e + 8;
          let value = "";
          if (type === 2) {
            // ASCII
            const off = count > 4 ? tiff + view.getUint32(valOff, little) : valOff;
            for (let j = 0; j < count - 1; j++) value += String.fromCharCode(view.getUint8(off + j));
          } else if (type === 3) {
            value = String(view.getUint16(valOff, little));
          } else if (type === 4) {
            value = String(view.getUint32(valOff, little));
          } else if (type === 5) {
            const off = tiff + view.getUint32(valOff, little);
            value = `${view.getUint32(off, little)}/${view.getUint32(off + 4, little)}`;
          }
          out[TAGS[tag]] = value;
        }
        return Object.keys(out).length ? out : { 提示: "未找到常見 EXIF 標籤" };
      }
      offset += 2 + size;
    }
    return { 提示: "無 EXIF 區塊" };
  };

  const handleFile = (file: File) => {
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      const buf = e.target?.result as ArrayBuffer;
      try {
        setInfo(parseExif(buf));
        const blob = new Blob([buf], { type: file.type });
        setPreview(URL.createObjectURL(blob));
      } catch {
        setError("解析失敗");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const stripExif = async () => {
    if (!preview) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext("2d")!.drawImage(img, 0, 0);
      c.toBlob((blob) => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "no-exif.jpg";
        a.click();
      }, "image/jpeg", 0.95);
    };
    img.src = preview;
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
      />
      <button onClick={() => inputRef.current?.click()} className="tool-btn w-full">
        📷 上傳 JPEG 圖片檢視 EXIF
      </button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {preview && <img src={preview} alt="preview" className="max-h-48 mx-auto rounded-lg border" />}
      {info && (
        <div className="rounded-xl border bg-card p-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(info).map(([k, v]) => (
              <div key={k} className="flex flex-col rounded bg-muted/40 p-2">
                <span className="text-xs text-muted-foreground">{k}</span>
                <span className="font-mono break-all">{v}</span>
              </div>
            ))}
          </div>
          {preview && (
            <button onClick={stripExif} className="tool-btn-secondary w-full mt-3">
              🧹 移除 EXIF 並下載
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ───────────────── 像素畫產生器 ───────────────── */
function PixelArt() {
  const [src, setSrc] = useState<string | null>(null);
  const [pixelSize, setPixelSize] = useState(10);
  const [output, setOutput] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const generate = () => {
    if (!src) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      const w = (c.width = img.naturalWidth);
      const h = (c.height = img.naturalHeight);
      const ctx = c.getContext("2d")!;
      const small = Math.max(8, Math.floor(w / pixelSize));
      const ratio = small / w;
      const sh = Math.floor(h * ratio);
      const tmp = document.createElement("canvas");
      tmp.width = small;
      tmp.height = sh;
      const tctx = tmp.getContext("2d")!;
      tctx.imageSmoothingEnabled = false;
      tctx.drawImage(img, 0, 0, small, sh);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(tmp, 0, 0, w, h);
      setOutput(c.toDataURL("image/png"));
    };
    img.src = src;
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
      />
      <button onClick={() => inputRef.current?.click()} className="tool-btn w-full">
        🎨 上傳圖片
      </button>
      {src && (
        <>
          <div>
            <label className="tool-label">像素大小：{pixelSize}</label>
            <input
              type="range"
              min={20}
              max={200}
              value={pixelSize}
              onChange={(e) => setPixelSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <button onClick={generate} className="tool-btn w-full">✨ 產生像素畫</button>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">原圖</p>
              <img src={src} alt="原圖" className="rounded-lg border w-full" />
            </div>
            {output && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">像素畫</p>
                <img src={output} alt="像素" className="rounded-lg border w-full" />
              </div>
            )}
          </div>
          {output && (
            <a href={output} download="pixel-art.png" className="tool-btn-secondary block text-center">
              ⬇️ 下載像素畫
            </a>
          )}
        </>
      )}
    </div>
  );
}

/* ───────────────── 精靈圖合併 ───────────────── */
function SpriteSheet() {
  const [files, setFiles] = useState<{ src: string; name: string }[]>([]);
  const [cols, setCols] = useState(4);
  const [tile, setTile] = useState(64);
  const [result, setResult] = useState<string | null>(null);
  const [css, setCss] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files || []);
    Promise.all(
      list.map(
        (f) =>
          new Promise<{ src: string; name: string }>((res) => {
            const r = new FileReader();
            r.onload = (ev) => res({ src: ev.target?.result as string, name: f.name });
            r.readAsDataURL(f);
          })
      )
    ).then(setFiles);
  };

  const generate = async () => {
    if (!files.length) return;
    const imgs = await Promise.all(
      files.map(
        (f) =>
          new Promise<HTMLImageElement>((res) => {
            const i = new Image();
            i.onload = () => res(i);
            i.src = f.src;
          })
      )
    );
    const rows = Math.ceil(files.length / cols);
    const c = document.createElement("canvas");
    c.width = cols * tile;
    c.height = rows * tile;
    const ctx = c.getContext("2d")!;
    let cssOut = `.sprite { background-image: url('sprite.png'); width: ${tile}px; height: ${tile}px; }\n`;
    imgs.forEach((img, i) => {
      const x = (i % cols) * tile;
      const y = Math.floor(i / cols) * tile;
      ctx.drawImage(img, x, y, tile, tile);
      const cls = files[i].name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9]/gi, "-").toLowerCase();
      cssOut += `.sprite-${cls} { background-position: -${x}px -${y}px; }\n`;
    });
    setResult(c.toDataURL("image/png"));
    setCss(cssOut);
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onPick}
        className="hidden"
      />
      <button onClick={() => inputRef.current?.click()} className="tool-btn w-full">
        🧩 選擇多張圖片（已選 {files.length} 張）
      </button>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="tool-label">每列張數</label>
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(Math.max(1, Number(e.target.value)))}
            className="tool-input"
          />
        </div>
        <div>
          <label className="tool-label">單格尺寸 (px)</label>
          <input
            type="number"
            value={tile}
            onChange={(e) => setTile(Math.max(16, Number(e.target.value)))}
            className="tool-input"
          />
        </div>
      </div>
      <button onClick={generate} disabled={!files.length} className="tool-btn w-full disabled:opacity-50">
        ✨ 合併產生精靈圖
      </button>
      {result && (
        <>
          <img src={result} alt="sprite" className="border rounded-lg max-w-full mx-auto" />
          <div className="flex gap-2">
            <a href={result} download="sprite.png" className="tool-btn-secondary flex-1 text-center">⬇️ 下載 PNG</a>
            <button onClick={() => navigator.clipboard.writeText(css)} className="tool-btn-secondary flex-1">
              📋 複製 CSS
            </button>
          </div>
          <pre className="tool-result text-xs whitespace-pre-wrap">{css}</pre>
        </>
      )}
    </div>
  );
}

/* ───────────────── 圖片去背（白/單色背景） ───────────────── */
function ImageBgRemove() {
  const [src, setSrc] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState(40);
  const [pickColor, setPickColor] = useState("#ffffff");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const r = new FileReader();
    r.onload = (e) => {
      setSrc(e.target?.result as string);
      setOutput(null);
    };
    r.readAsDataURL(file);
  };

  const remove = () => {
    if (!src) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, c.width, c.height);
      const tr = parseInt(pickColor.slice(1, 3), 16);
      const tg = parseInt(pickColor.slice(3, 5), 16);
      const tb = parseInt(pickColor.slice(5, 7), 16);
      const tol2 = tolerance * tolerance * 3;
      for (let i = 0; i < data.data.length; i += 4) {
        const dr = data.data[i] - tr;
        const dg = data.data[i + 1] - tg;
        const db = data.data[i + 2] - tb;
        if (dr * dr + dg * dg + db * db < tol2) {
          data.data[i + 3] = 0;
        }
      }
      ctx.putImageData(data, 0, 0);
      setOutput(c.toDataURL("image/png"));
    };
    img.src = src;
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
      />
      <button onClick={() => inputRef.current?.click()} className="tool-btn w-full">
        🎭 上傳圖片
      </button>
      {src && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="tool-label">背景顏色</label>
              <input
                type="color"
                value={pickColor}
                onChange={(e) => setPickColor(e.target.value)}
                className="w-full h-10 rounded border"
              />
            </div>
            <div>
              <label className="tool-label">容差：{tolerance}</label>
              <input
                type="range"
                min={5}
                max={120}
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <button onClick={remove} className="tool-btn w-full">✂️ 去除背景</button>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">原圖</p>
              <img src={src} alt="原" className="rounded-lg border w-full" />
            </div>
            {output && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">去背後</p>
                <div
                  className="rounded-lg border w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%)",
                    backgroundSize: "16px 16px",
                    backgroundPosition: "0 0,0 8px,8px -8px,-8px 0",
                  }}
                >
                  <img src={output} alt="去背" className="w-full" />
                </div>
              </div>
            )}
          </div>
          {output && (
            <a href={output} download="no-bg.png" className="tool-btn-secondary block text-center">
              ⬇️ 下載 PNG
            </a>
          )}
          <p className="text-xs text-muted-foreground">
            💡 適合單色或漸層背景。複雜背景建議搭配 AI 去背工具。
          </p>
        </>
      )}
    </div>
  );
}

export const ImageToolsAdvanced = {
  ImageExif,
  PixelArt,
  SpriteSheet,
  ImageBgRemove,
};
