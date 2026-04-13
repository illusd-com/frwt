import { useState } from "react";

function ContrastChecker() {
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b].map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  };

  const luminance = (hex: string) => {
    const [r, g, b] = hexToRgb(hex);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = luminance(fg), l2 = luminance(bg);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  const aaLarge = ratio >= 3;
  const aa = ratio >= 4.5;
  const aaa = ratio >= 7;

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div><label className="tool-label">前景色</label><input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-16 h-10 rounded cursor-pointer" /></div>
        <div><label className="tool-label">背景色</label><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-16 h-10 rounded cursor-pointer" /></div>
      </div>
      <div className="h-24 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: bg, color: fg }}>
        範例文字 Sample Text
      </div>
      <div className="text-center text-3xl font-bold">{ratio.toFixed(2)}:1</div>
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className={`rounded-lg p-3 ${aa ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>AA 正常文字<br />{aa ? "✅ 通過" : "❌ 未通過"}</div>
        <div className={`rounded-lg p-3 ${aaLarge ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>AA 大文字<br />{aaLarge ? "✅ 通過" : "❌ 未通過"}</div>
        <div className={`rounded-lg p-3 ${aaa ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>AAA 正常文字<br />{aaa ? "✅ 通過" : "❌ 未通過"}</div>
      </div>
    </div>
  );
}

function ColorBlindSim() {
  const [color, setColor] = useState("#e74c3c");

  const hexToRgb = (hex: string): [number, number, number] => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];

  const rgbToHex = (r: number, g: number, b: number) =>
    "#" + [r, g, b].map(c => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, "0")).join("");

  const [r, g, b] = hexToRgb(color);
  const simulations = [
    { name: "正常視覺", color: rgbToHex(r, g, b) },
    { name: "紅色盲 (Protanopia)", color: rgbToHex(0.567 * r + 0.433 * g, 0.558 * r + 0.442 * g, 0.242 * g + 0.758 * b) },
    { name: "綠色盲 (Deuteranopia)", color: rgbToHex(0.625 * r + 0.375 * g, 0.7 * r + 0.3 * g, 0.3 * g + 0.7 * b) },
    { name: "藍色盲 (Tritanopia)", color: rgbToHex(0.95 * r + 0.05 * g, 0.433 * g + 0.567 * b, 0.475 * g + 0.525 * b) },
  ];

  return (
    <div className="space-y-4">
      <div><label className="tool-label">選擇顏色</label><input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-16 h-10 rounded cursor-pointer" /></div>
      <div className="grid grid-cols-2 gap-3">
        {simulations.map(s => (
          <div key={s.name} className="rounded-lg border p-4 text-center">
            <div className="w-full h-16 rounded-lg mb-2" style={{ backgroundColor: s.color }} />
            <p className="text-sm font-medium">{s.name}</p>
            <p className="text-xs text-muted-foreground font-mono">{s.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FontSizeCalc() {
  const [basePx, setBasePx] = useState(16);
  const scale = [0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.875, 2.25, 3, 3.75, 4.5];
  const names = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"];

  return (
    <div className="space-y-4">
      <div><label className="tool-label">基礎字型大小 (px)</label><input type="number" value={basePx} onChange={e => setBasePx(+e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div className="space-y-2">
        {scale.map((s, i) => {
          const px = basePx * s;
          return (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
              <span className="text-xs text-muted-foreground w-10 font-mono">{names[i]}</span>
              <span className="text-xs font-mono w-16">{px}px</span>
              <span className="text-xs font-mono w-16">{s}rem</span>
              <span style={{ fontSize: `${Math.min(px, 48)}px`, lineHeight: 1.2 }}>Aa 字型</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const A11yTools = {
  ContrastChecker,
  ColorBlindSim,
  FontSizeCalc,
};
