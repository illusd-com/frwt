import { useState } from "react";

function UnitConverter({ units }: { units: { name: string; factor: number }[] }) {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState(0);
  const base = parseFloat(value) * units[from].factor;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">數值</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={value} onChange={e => setValue(e.target.value)} /></div>
        <div><label className="tool-label">從</label><select className="w-full rounded border bg-card p-2 text-sm" value={from} onChange={e => setFrom(+e.target.value)}>{units.map((u, i) => <option key={i} value={i}>{u.name}</option>)}</select></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {units.map((u, i) => (
          <div key={i} className="rounded bg-muted/50 p-3"><div className="text-xs text-muted-foreground">{u.name}</div><div className="font-mono text-sm">{isNaN(base) ? "—" : (base / u.factor).toLocaleString(undefined, { maximumFractionDigits: 6 })}</div></div>
        ))}
      </div>
    </div>
  );
}

function AreaConverter() {
  return <UnitConverter units={[
    { name: "平方公尺 (m²)", factor: 1 },{ name: "平方公里 (km²)", factor: 1e6 },{ name: "公頃 (ha)", factor: 10000 },
    { name: "坪", factor: 3.306 },{ name: "甲", factor: 9699 },{ name: "英畝 (acre)", factor: 4046.86 },
    { name: "平方英呎 (ft²)", factor: 0.0929 },{ name: "平方碼 (yd²)", factor: 0.8361 },
  ]} />;
}

function VolumeConverter() {
  return <UnitConverter units={[
    { name: "公升 (L)", factor: 1 },{ name: "毫升 (mL)", factor: 0.001 },{ name: "立方公尺 (m³)", factor: 1000 },
    { name: "加侖 (US gal)", factor: 3.78541 },{ name: "品脫 (US pt)", factor: 0.473176 },
    { name: "液量盎司 (fl oz)", factor: 0.0295735 },{ name: "杯 (cup)", factor: 0.236588 },
  ]} />;
}

function PressureConverter() {
  return <UnitConverter units={[
    { name: "帕斯卡 (Pa)", factor: 1 },{ name: "千帕 (kPa)", factor: 1000 },{ name: "大氣壓 (atm)", factor: 101325 },
    { name: "巴 (bar)", factor: 100000 },{ name: "psi", factor: 6894.76 },{ name: "mmHg", factor: 133.322 },
  ]} />;
}

function EnergyConverter() {
  return <UnitConverter units={[
    { name: "焦耳 (J)", factor: 1 },{ name: "千焦 (kJ)", factor: 1000 },{ name: "卡路里 (cal)", factor: 4.184 },
    { name: "千卡 (kcal)", factor: 4184 },{ name: "千瓦時 (kWh)", factor: 3.6e6 },{ name: "英熱單位 (BTU)", factor: 1055.06 },
  ]} />;
}

function AngleConverter() {
  return <UnitConverter units={[
    { name: "度 (°)", factor: 1 },{ name: "弧度 (rad)", factor: 57.2958 },{ name: "梯度 (grad)", factor: 0.9 },
    { name: "轉 (turn)", factor: 360 },{ name: "角分 (')", factor: 1/60 },{ name: "角秒 (\")", factor: 1/3600 },
  ]} />;
}

function RomanNumeral() {
  const [input, setInput] = useState("");
  const toRoman = (n: number) => {
    if (n < 1 || n > 3999) return "範圍 1-3999";
    const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
    let result = "";
    vals.forEach((v, i) => { while (n >= v) { result += syms[i]; n -= v; } });
    return result;
  };
  const fromRoman = (s: string) => {
    const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    for (let i = 0; i < s.length; i++) {
      const curr = map[s[i].toUpperCase()] || 0;
      const next = map[s[i + 1]?.toUpperCase()] || 0;
      result += curr < next ? -curr : curr;
    }
    return result;
  };

  const isNum = /^\d+$/.test(input.trim());
  const result = isNum ? toRoman(parseInt(input)) : `${fromRoman(input)}`;

  return (
    <div className="space-y-4">
      <input className="w-full rounded border bg-card p-2 text-sm font-mono" value={input} onChange={e => setInput(e.target.value)} placeholder="輸入數字或羅馬數字 (例: 42 或 XLII)" />
      <div className="tool-result text-center text-2xl font-bold">{input ? result : "—"}</div>
      <p className="text-xs text-muted-foreground text-center">輸入阿拉伯數字會轉為羅馬數字，輸入羅馬數字會轉為阿拉伯數字</p>
    </div>
  );
}

function CookingConverter() {
  return <UnitConverter units={[
    { name: "毫升 (mL)", factor: 1 },{ name: "茶匙 (tsp)", factor: 4.929 },{ name: "湯匙 (tbsp)", factor: 14.787 },
    { name: "杯 (cup)", factor: 236.588 },{ name: "液量盎司 (fl oz)", factor: 29.5735 },
    { name: "公克 (g, 水)", factor: 1 },{ name: "公升 (L)", factor: 1000 },
  ]} />;
}

export const ConverterToolsExtra = { AreaConverter, VolumeConverter, PressureConverter, EnergyConverter, AngleConverter, RomanNumeral, CookingConverter };
