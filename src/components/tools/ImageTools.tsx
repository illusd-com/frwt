import { useState, useRef, useCallback } from "react";

function useImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return { image, setImage, fileName, inputRef, handleFile, onDrop };
}

function ImageUploadArea({ onFile, image }: { onFile: (f: File) => void; image: string | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
      onClick={() => inputRef.current?.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) onFile(f); }}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
      {image ? (
        <img src={image} alt="Preview" className="max-h-48 mx-auto rounded" />
      ) : (
        <p className="text-muted-foreground text-sm">拖放圖片或點擊上傳</p>
      )}
    </div>
  );
}

// Image Compress
function ImageCompress() {
  const [image, setImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [result, setResult] = useState<string | null>(null);
  const [sizes, setSizes] = useState({ original: 0, compressed: 0 });

  const handleFile = (file: File) => {
    setSizes(s => ({ ...s, original: file.size }));
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const compress = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const compressed = canvas.toDataURL("image/jpeg", quality);
      setResult(compressed);
      setSizes(s => ({ ...s, compressed: Math.round(compressed.length * 0.75) }));
    };
    img.src = image;
  };

  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={image} />
      <div>
        <label className="tool-label">壓縮品質: {Math.round(quality * 100)}%</label>
        <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e => setQuality(+e.target.value)} className="w-full" />
      </div>
      <button onClick={compress} disabled={!image} className="tool-btn">壓縮圖片</button>
      {result && (
        <div className="space-y-2">
          <p className="text-sm">原始: {(sizes.original / 1024).toFixed(1)} KB → 壓縮後: {(sizes.compressed / 1024).toFixed(1)} KB</p>
          <img src={result} alt="Compressed" className="max-h-48 rounded" />
          <a href={result} download="compressed.jpg" className="tool-btn-secondary inline-block">下載</a>
        </div>
      )}
    </div>
  );
}

// Image Resize
function ImageResize() {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const src = e.target?.result as string;
      setImage(src);
      const img = new Image();
      img.onload = () => { setWidth(img.width); setHeight(img.height); };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const resize = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      setResult(canvas.toDataURL("image/png"));
    };
    img.src = image;
  };

  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={image} />
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="tool-label">寬度 (px)</label>
          <input type="number" value={width} onChange={e => setWidth(+e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" />
        </div>
        <div className="flex-1">
          <label className="tool-label">高度 (px)</label>
          <input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" />
        </div>
      </div>
      <button onClick={resize} disabled={!image} className="tool-btn">縮放圖片</button>
      {result && (
        <div className="space-y-2">
          <img src={result} alt="Resized" className="max-h-48 rounded" />
          <a href={result} download="resized.png" className="tool-btn-secondary inline-block">下載</a>
        </div>
      )}
    </div>
  );
}

// Image Crop
function ImageCrop() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(200);
  const [cropH, setCropH] = useState(200);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const crop = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropW; canvas.height = cropH;
      canvas.getContext("2d")!.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
      setResult(canvas.toDataURL("image/png"));
    };
    img.src = image;
  };

  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={image} />
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">X</label><input type="number" value={cropX} onChange={e => setCropX(+e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
        <div><label className="tool-label">Y</label><input type="number" value={cropY} onChange={e => setCropY(+e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
        <div><label className="tool-label">寬度</label><input type="number" value={cropW} onChange={e => setCropW(+e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
        <div><label className="tool-label">高度</label><input type="number" value={cropH} onChange={e => setCropH(+e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      </div>
      <button onClick={crop} disabled={!image} className="tool-btn">裁切圖片</button>
      {result && (
        <div className="space-y-2">
          <img src={result} alt="Cropped" className="max-h-48 rounded" />
          <a href={result} download="cropped.png" className="tool-btn-secondary inline-block">下載</a>
        </div>
      )}
    </div>
  );
}

// Image Rotate
function ImageRotate() {
  const [image, setImage] = useState<string | null>(null);
  const [angle, setAngle] = useState(90);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const rotate = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const rad = (angle * Math.PI) / 180;
      const sin = Math.abs(Math.sin(rad)), cos = Math.abs(Math.cos(rad));
      canvas.width = img.width * cos + img.height * sin;
      canvas.height = img.width * sin + img.height * cos;
      const ctx = canvas.getContext("2d")!;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      setResult(canvas.toDataURL("image/png"));
    };
    img.src = image;
  };

  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={image} />
      <div className="flex gap-2">
        {[90, 180, 270].map(a => (
          <button key={a} onClick={() => setAngle(a)} className={`px-3 py-1.5 rounded-lg text-sm ${angle === a ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{a}°</button>
        ))}
        <input type="number" value={angle} onChange={e => setAngle(+e.target.value)} className="w-20 rounded-lg border bg-card p-2 text-sm" />
      </div>
      <button onClick={rotate} disabled={!image} className="tool-btn">旋轉圖片</button>
      {result && (
        <div className="space-y-2">
          <img src={result} alt="Rotated" className="max-h-48 rounded" />
          <a href={result} download="rotated.png" className="tool-btn-secondary inline-block">下載</a>
        </div>
      )}
    </div>
  );
}

// Image to Base64
function ImageToBase64() {
  const [result, setResult] = useState("");
  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setResult(e.target?.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={null} />
      {result && <textarea readOnly value={result} className="tool-textarea min-h-[200px]" />}
    </div>
  );
}

// Base64 to Image
function Base64ToImage() {
  const [input, setInput] = useState("");
  const isValid = input.startsWith("data:image");
  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="貼上 Base64 圖片字串..." className="tool-textarea min-h-[120px]" />
      {isValid && <img src={input} alt="Preview" className="max-h-48 rounded" />}
    </div>
  );
}

// Image Format Convert
function ImageFormatConvert() {
  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState("image/png");
  const [result, setResult] = useState<string | null>(null);
  const fmtMap: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const convert = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      c.getContext("2d")!.drawImage(img, 0, 0);
      setResult(c.toDataURL(format, 0.92));
    };
    img.src = image;
  };

  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={image} />
      <div>
        <label className="tool-label">目標格式</label>
        <select value={format} onChange={e => setFormat(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm">
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPEG</option>
          <option value="image/webp">WebP</option>
        </select>
      </div>
      <button onClick={convert} disabled={!image} className="tool-btn">轉換格式</button>
      {result && (
        <div className="space-y-2">
          <img src={result} alt="Converted" className="max-h-48 rounded" />
          <a href={result} download={`converted.${fmtMap[format]}`} className="tool-btn-secondary inline-block">下載</a>
        </div>
      )}
    </div>
  );
}

// Image Filter
function ImageFilter() {
  const [image, setImage] = useState<string | null>(null);
  const [filter, setFilter] = useState("none");
  const filters = [
    { id: "none", name: "原始", css: "none" },
    { id: "grayscale", name: "灰階", css: "grayscale(100%)" },
    { id: "sepia", name: "復古", css: "sepia(100%)" },
    { id: "blur", name: "模糊", css: "blur(3px)" },
    { id: "brightness", name: "高亮", css: "brightness(1.5)" },
    { id: "contrast", name: "高對比", css: "contrast(1.5)" },
    { id: "invert", name: "反轉", css: "invert(100%)" },
    { id: "saturate", name: "飽和", css: "saturate(2)" },
  ];

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const currentFilter = filters.find(f => f.id === filter)?.css || "none";

  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={null} />
      {image && (
        <>
          <img src={image} alt="Filtered" className="max-h-48 mx-auto rounded" style={{ filter: currentFilter }} />
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} className={`px-3 py-1.5 rounded-lg text-sm ${filter === f.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{f.name}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Image Grayscale
function ImageGrayscale() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const convert = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d")!;
      ctx.filter = "grayscale(100%)";
      ctx.drawImage(img, 0, 0);
      setResult(c.toDataURL("image/png"));
    };
    img.src = image;
  };

  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={image} />
      <button onClick={convert} disabled={!image} className="tool-btn">轉為灰階</button>
      {result && (
        <div className="space-y-2">
          <img src={result} alt="Grayscale" className="max-h-48 rounded" />
          <a href={result} download="grayscale.png" className="tool-btn-secondary inline-block">下載</a>
        </div>
      )}
    </div>
  );
}

// Image Brightness
function ImageBrightness() {
  const [image, setImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={null} />
      {image && (
        <>
          <img src={image} alt="Adjusted" className="max-h-48 mx-auto rounded" style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />
          <div>
            <label className="tool-label">亮度: {brightness}%</label>
            <input type="range" min="0" max="200" value={brightness} onChange={e => setBrightness(+e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="tool-label">對比度: {contrast}%</label>
            <input type="range" min="0" max="200" value={contrast} onChange={e => setContrast(+e.target.value)} className="w-full" />
          </div>
        </>
      )}
    </div>
  );
}

export const ImageTools = {
  ImageCompress,
  ImageResize,
  ImageCrop,
  ImageRotate,
  ImageToBase64,
  Base64ToImage,
  ImageFormatConvert,
  ImageFilter,
  ImageGrayscale,
  ImageBrightness,
};
