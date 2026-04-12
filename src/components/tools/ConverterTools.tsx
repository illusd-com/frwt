import { useState } from "react";

function UnitConverter({ title, units }: { title: string; units: { name: string; factor: number }[] }) {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState(0);
  const base = parseFloat(value) * units[from].factor;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">數值</label>
          <input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={value} onChange={e => setValue(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">從</label>
          <select className="w-full rounded-lg border bg-card p-2 text-sm" value={from} onChange={e => setFrom(Number(e.target.value))}>
            {units.map((u, i) => <option key={i} value={i}>{u.name}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {units.map((u, i) => (
          <div key={i} className="rounded-lg bg-muted/50 p-3">
            <div className="text-xs text-muted-foreground">{u.name}</div>
            <div className="font-mono text-sm font-medium">{isNaN(base) ? "—" : (base / u.factor).toLocaleString(undefined, { maximumFractionDigits: 6 })}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LengthConverter() {
  return <UnitConverter title="長度" units={[
    { name: "公尺 (m)", factor: 1 },
    { name: "公分 (cm)", factor: 0.01 },
    { name: "公里 (km)", factor: 1000 },
    { name: "英吋 (in)", factor: 0.0254 },
    { name: "英呎 (ft)", factor: 0.3048 },
    { name: "英里 (mi)", factor: 1609.344 },
    { name: "碼 (yd)", factor: 0.9144 },
    { name: "毫米 (mm)", factor: 0.001 },
  ]} />;
}

function WeightConverter() {
  return <UnitConverter title="重量" units={[
    { name: "公斤 (kg)", factor: 1 },
    { name: "公克 (g)", factor: 0.001 },
    { name: "磅 (lb)", factor: 0.453592 },
    { name: "盎司 (oz)", factor: 0.0283495 },
    { name: "公噸 (t)", factor: 1000 },
    { name: "台斤", factor: 0.6 },
  ]} />;
}

function TemperatureConverter() {
  const [celsius, setCelsius] = useState("0");
  const c = parseFloat(celsius);
  const f = c * 9 / 5 + 32;
  const k = c + 273.15;

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">攝氏 (°C)</label>
        <input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={celsius} onChange={e => setCelsius(e.target.value)} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-xs text-muted-foreground">攝氏 °C</div>
          <div className="font-mono font-medium">{isNaN(c) ? "—" : c.toFixed(2)}</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-xs text-muted-foreground">華氏 °F</div>
          <div className="font-mono font-medium">{isNaN(f) ? "—" : f.toFixed(2)}</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-xs text-muted-foreground">凱氏 K</div>
          <div className="font-mono font-medium">{isNaN(k) ? "—" : k.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

function TimeConverter() {
  return <UnitConverter title="時間" units={[
    { name: "秒 (s)", factor: 1 },
    { name: "毫秒 (ms)", factor: 0.001 },
    { name: "分鐘 (min)", factor: 60 },
    { name: "小時 (hr)", factor: 3600 },
    { name: "天 (day)", factor: 86400 },
    { name: "週 (week)", factor: 604800 },
  ]} />;
}

function SpeedConverter() {
  return <UnitConverter title="速度" units={[
    { name: "公里/時 (km/h)", factor: 1 },
    { name: "英里/時 (mph)", factor: 1.60934 },
    { name: "公尺/秒 (m/s)", factor: 3.6 },
    { name: "節 (knot)", factor: 1.852 },
  ]} />;
}

function DataSizeConverter() {
  return <UnitConverter title="資料大小" units={[
    { name: "Byte (B)", factor: 1 },
    { name: "KB", factor: 1024 },
    { name: "MB", factor: 1048576 },
    { name: "GB", factor: 1073741824 },
    { name: "TB", factor: 1099511627776 },
  ]} />;
}

function NumberBase() {
  const [input, setInput] = useState("255");
  const [base, setBase] = useState(10);

  const num = parseInt(input, base);
  const isValid = !isNaN(num);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">數值</label>
          <input className="w-full rounded-lg border bg-card p-2 text-sm font-mono" value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">進位</label>
          <select className="w-full rounded-lg border bg-card p-2 text-sm" value={base} onChange={e => setBase(Number(e.target.value))}>
            <option value={2}>二進位 (Binary)</option>
            <option value={8}>八進位 (Octal)</option>
            <option value={10}>十進位 (Decimal)</option>
            <option value={16}>十六進位 (Hex)</option>
          </select>
        </div>
      </div>
      {isValid && (
        <div className="grid grid-cols-2 gap-3">
          {[
            ["二進位", num.toString(2)],
            ["八進位", num.toString(8)],
            ["十進位", num.toString(10)],
            ["十六進位", num.toString(16).toUpperCase()],
          ].map(([label, val]) => (
            <div key={label} className="rounded-lg bg-muted/50 p-3">
              <div className="text-xs text-muted-foreground">{label}</div>
              <div className="font-mono text-sm font-medium break-all">{val}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");

  const hexToRgb = (h: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        <div>
          <label className="tool-label">選擇顏色</label>
          <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="h-12 w-20 rounded cursor-pointer" />
        </div>
        <div className="flex-1">
          <label className="tool-label">HEX</label>
          <input className="w-full rounded-lg border bg-card p-2 text-sm font-mono" value={hex} onChange={e => setHex(e.target.value)} />
        </div>
      </div>
      <div className="h-20 rounded-lg border" style={{ backgroundColor: hex }} />
      {rgb && hsl && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xs text-muted-foreground">HEX</div>
            <div className="font-mono text-sm">{hex}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xs text-muted-foreground">RGB</div>
            <div className="font-mono text-sm">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xs text-muted-foreground">HSL</div>
            <div className="font-mono text-sm">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
          </div>
        </div>
      )}
    </div>
  );
}

export const ConverterTools = { LengthConverter, WeightConverter, TemperatureConverter, TimeConverter, SpeedConverter, DataSizeConverter, NumberBase, ColorConverter };
