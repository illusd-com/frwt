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

// Image Watermark
function ImageWatermark() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("FreeWebTools");
  const [fontSize, setFontSize] = useState(32);
  const [opacity, setOpacity] = useState(0.5);
  const [position, setPosition] = useState("bottom-right");
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const apply = () => {
    if (!image) return;
    const img = new window.Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.strokeStyle = `rgba(0,0,0,${opacity * 0.5})`;
      ctx.lineWidth = 1;
      const m = ctx.measureText(text);
      let x = 20, y = img.height - 20;
      if (position === "top-left") { x = 20; y = fontSize + 20; }
      else if (position === "top-right") { x = img.width - m.width - 20; y = fontSize + 20; }
      else if (position === "center") { x = (img.width - m.width) / 2; y = img.height / 2; }
      else if (position === "bottom-left") { x = 20; y = img.height - 20; }
      else { x = img.width - m.width - 20; y = img.height - 20; }
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
      setResult(c.toDataURL("image/png"));
    };
    img.src = image;
  };

  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={image} />
      <div>
        <label className="tool-label">浮水印文字</label>
        <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">字體大小: {fontSize}px</label>
          <input type="range" min="12" max="120" value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-full" />
        </div>
        <div>
          <label className="tool-label">透明度: {Math.round(opacity * 100)}%</label>
          <input type="range" min="0.1" max="1" step="0.05" value={opacity} onChange={e => setOpacity(+e.target.value)} className="w-full" />
        </div>
      </div>
      <div>
        <label className="tool-label">位置</label>
        <select value={position} onChange={e => setPosition(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm">
          <option value="top-left">左上</option>
          <option value="top-right">右上</option>
          <option value="center">置中</option>
          <option value="bottom-left">左下</option>
          <option value="bottom-right">右下</option>
        </select>
      </div>
      <button onClick={apply} disabled={!image} className="tool-btn">添加浮水印</button>
      {result && (
        <div className="space-y-2">
          <img src={result} alt="Watermarked" className="max-h-48 rounded" />
          <a href={result} download="watermarked.png" className="tool-btn-secondary inline-block">下載</a>
        </div>
      )}
    </div>
  );
}

// Image Color Palette / Color Picker
function ImagePalette() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const src = e.target?.result as string;
      setImage(src);
      extractColors(src);
    };
    reader.readAsDataURL(file);
  };

  const extractColors = (src: string) => {
    const img = new window.Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      const colorMap: Record<string, number> = {};
      for (let i = 0; i < data.length; i += 16) {
        const r = Math.round(data[i] / 32) * 32;
        const g = Math.round(data[i + 1] / 32) * 32;
        const b = Math.round(data[i + 2] / 32) * 32;
        const key = `rgb(${r},${g},${b})`;
        colorMap[key] = (colorMap[key] || 0) + 1;
      }
      const sorted = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);
      setColors(sorted.slice(0, 8).map(([c]) => c));
    };
    img.src = src;
  };

  const rgbToHex = (rgb: string) => {
    const m = rgb.match(/\d+/g);
    if (!m) return rgb;
    return "#" + m.map(n => parseInt(n).toString(16).padStart(2, "0")).join("");
  };

  const copyColor = (c: string) => {
    navigator.clipboard.writeText(rgbToHex(c));
  };

  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={image} />
      <canvas ref={canvasRef} className="hidden" />
      {colors.length > 0 && (
        <div>
          <label className="tool-label">提取的主要顏色（點擊複製 HEX）</label>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((c, i) => (
              <button key={i} onClick={() => copyColor(c)} className="rounded-lg p-1 border hover:border-primary transition-colors text-center">
                <div className="w-full h-12 rounded" style={{ backgroundColor: c }} />
                <span className="text-xs mt-1 block">{rgbToHex(c)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// SVG to PNG
function SvgToPng() {
  const [svg, setSvg] = useState("");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [result, setResult] = useState<string | null>(null);

  const convert = () => {
    if (!svg.trim()) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new window.Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = width; c.height = height;
      c.getContext("2d")!.drawImage(img, 0, 0, width, height);
      setResult(c.toDataURL("image/png"));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">SVG 程式碼</label>
        <textarea value={svg} onChange={e => setSvg(e.target.value)} placeholder='<svg xmlns="http://www.w3.org/2000/svg" ...>...</svg>' className="tool-textarea min-h-[150px]" />
      </div>
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
      <button onClick={convert} disabled={!svg.trim()} className="tool-btn">轉換為 PNG</button>
      {result && (
        <div className="space-y-2">
          <img src={result} alt="Converted PNG" className="max-h-48 rounded border" />
          <a href={result} download="converted.png" className="tool-btn-secondary inline-block">下載 PNG</a>
        </div>
      )}
    </div>
  );
}

// Image Blur
function ImageBlur() {
  const [image, setImage] = useState<string | null>(null);
  const [blur, setBlur] = useState(5);

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
          <img src={image} alt="Blurred" className="max-h-48 mx-auto rounded" style={{ filter: `blur(${blur}px)` }} />
          <div>
            <label className="tool-label">模糊程度: {blur}px</label>
            <input type="range" min="0" max="30" value={blur} onChange={e => setBlur(+e.target.value)} className="w-full" />
          </div>
        </>
      )}
    </div>
  );
}

// Favicon Generator
function FaviconGen() {
  const [image, setImage] = useState<string | null>(null);
  const [results, setResults] = useState<{ size: number; data: string }[]>([]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const generate = () => {
    if (!image) return;
    const sizes = [16, 32, 48, 64, 128, 180, 192, 512];
    const img = new window.Image();
    img.onload = () => {
      const out: typeof results = [];
      for (const s of sizes) {
        const c = document.createElement("canvas");
        c.width = s; c.height = s;
        c.getContext("2d")!.drawImage(img, 0, 0, s, s);
        out.push({ size: s, data: c.toDataURL("image/png") });
      }
      setResults(out);
    };
    img.src = image;
  };

  return (
    <div className="space-y-4">
      <ImageUploadArea onFile={handleFile} image={image} />
      <button onClick={generate} disabled={!image} className="tool-btn">產生 Favicon</button>
      {results.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {results.map(r => (
            <div key={r.size} className="text-center border rounded-lg p-2">
              <img src={r.data} alt={`${r.size}x${r.size}`} className="mx-auto mb-1" style={{ width: Math.min(r.size, 64), height: Math.min(r.size, 64) }} />
              <p className="text-xs text-muted-foreground">{r.size}×{r.size}</p>
              <a href={r.data} download={`favicon-${r.size}.png`} className="text-xs text-primary hover:underline">下載</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Image Placeholder Generator
function ImagePlaceholder() {
  const [w, setW] = useState(800);
  const [h, setH] = useState(600);
  const [bgColor, setBgColor] = useState("#cccccc");
  const [textColor, setTextColor] = useState("#666666");
  const [result, setResult] = useState<string | null>(null);

  const generate = () => {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = textColor;
    const size = Math.max(16, Math.min(w, h) / 10);
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${w} × ${h}`, w / 2, h / 2);
    setResult(c.toDataURL("image/png"));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">寬度</label><input type="number" value={w} onChange={e => setW(+e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
        <div><label className="tool-label">高度</label><input type="number" value={h} onChange={e => setH(+e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
        <div><label className="tool-label">背景色</label><input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 rounded-lg" /></div>
        <div><label className="tool-label">文字色</label><input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-10 rounded-lg" /></div>
      </div>
      <button onClick={generate} className="tool-btn">產生佔位圖</button>
      {result && (
        <div className="space-y-2">
          <img src={result} alt="Placeholder" className="max-h-48 rounded border" />
          <a href={result} download={`placeholder-${w}x${h}.png`} className="tool-btn-secondary inline-block">下載</a>
        </div>
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
  ImageWatermark,
  ImagePalette,
  SvgToPng,
  ImageBlur,
  FaviconGen,
  ImagePlaceholder,
};
