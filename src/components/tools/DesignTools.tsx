import { useState } from "react";

function GradientGen() {
  const [color1, setColor1] = useState("#667eea");
  const [color2, setColor2] = useState("#764ba2");
  const [angle, setAngle] = useState(135);
  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

  return (
    <div className="space-y-4">
      <div className="h-40 rounded-xl" style={{ background: gradient }} />
      <div className="flex gap-4">
        <div><label className="tool-label">顏色 1</label><input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-12 h-10 rounded cursor-pointer" /></div>
        <div><label className="tool-label">顏色 2</label><input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-12 h-10 rounded cursor-pointer" /></div>
        <div className="flex-1"><label className="tool-label">角度: {angle}°</label><input type="range" min="0" max="360" value={angle} onChange={e => setAngle(+e.target.value)} className="w-full" /></div>
      </div>
      <div className="tool-result font-mono text-xs">background: {gradient};</div>
    </div>
  );
}

function ShadowGen() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(10);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(-5);
  const [color, setColor] = useState("#00000030");
  const shadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center py-12">
        <div className="w-40 h-40 rounded-2xl bg-card" style={{ boxShadow: shadow }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">X: {x}px</label><input type="range" min="-50" max="50" value={x} onChange={e => setX(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">Y: {y}px</label><input type="range" min="-50" max="50" value={y} onChange={e => setY(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">模糊: {blur}px</label><input type="range" min="0" max="100" value={blur} onChange={e => setBlur(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">擴展: {spread}px</label><input type="range" min="-50" max="50" value={spread} onChange={e => setSpread(+e.target.value)} className="w-full" /></div>
      </div>
      <div><label className="tool-label">顏色</label><input type="color" value={color.slice(0, 7)} onChange={e => setColor(e.target.value + "30")} className="w-12 h-10 rounded cursor-pointer" /></div>
      <div className="tool-result font-mono text-xs">box-shadow: {shadow};</div>
    </div>
  );
}

function BorderRadiusGen() {
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);
  const radius = `${tl}px ${tr}px ${br}px ${bl}px`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center py-8">
        <div className="w-40 h-40 bg-primary" style={{ borderRadius: radius }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">左上: {tl}px</label><input type="range" min="0" max="100" value={tl} onChange={e => setTl(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">右上: {tr}px</label><input type="range" min="0" max="100" value={tr} onChange={e => setTr(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">右下: {br}px</label><input type="range" min="0" max="100" value={br} onChange={e => setBr(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">左下: {bl}px</label><input type="range" min="0" max="100" value={bl} onChange={e => setBl(+e.target.value)} className="w-full" /></div>
      </div>
      <div className="tool-result font-mono text-xs">border-radius: {radius};</div>
    </div>
  );
}

function GlassmorphismGen() {
  const [bg, setBg] = useState("rgba(255,255,255,0.15)");
  const [blurVal, setBlurVal] = useState(15);
  const [border, setBorder] = useState("rgba(255,255,255,0.2)");

  return (
    <div className="space-y-4">
      <div className="h-48 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
        <div className="w-48 h-32 rounded-xl p-4 text-primary-foreground text-sm flex items-center justify-center" style={{ background: bg, backdropFilter: `blur(${blurVal}px)`, border: `1px solid ${border}` }}>
          玻璃擬態效果
        </div>
      </div>
      <div><label className="tool-label">模糊: {blurVal}px</label><input type="range" min="0" max="30" value={blurVal} onChange={e => setBlurVal(+e.target.value)} className="w-full" /></div>
      <div className="tool-result font-mono text-xs whitespace-pre">{`background: ${bg};\nbackdrop-filter: blur(${blurVal}px);\nborder: 1px solid ${border};`}</div>
    </div>
  );
}

function ColorPaletteGen() {
  const [baseHue, setBaseHue] = useState(200);
  const palettes = [
    { name: "互補色", hues: [baseHue, (baseHue + 180) % 360] },
    { name: "三等分", hues: [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360] },
    { name: "類似色", hues: [baseHue, (baseHue + 30) % 360, (baseHue + 60) % 360] },
    { name: "分裂互補", hues: [baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360] },
  ];

  return (
    <div className="space-y-4">
      <div><label className="tool-label">基礎色相: {baseHue}°</label><input type="range" min="0" max="360" value={baseHue} onChange={e => setBaseHue(+e.target.value)} className="w-full" /></div>
      <div className="h-12 rounded-lg" style={{ background: `hsl(${baseHue}, 70%, 50%)` }} />
      {palettes.map(p => (
        <div key={p.name} className="space-y-1">
          <p className="text-sm font-medium">{p.name}</p>
          <div className="flex gap-2">
            {p.hues.map((h, i) => (
              <div key={i} className="flex-1 h-16 rounded-lg flex items-end justify-center pb-1" style={{ background: `hsl(${h}, 70%, 50%)` }}>
                <span className="text-xs text-white/80">hsl({h}, 70%, 50%)</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FlexboxGen() {
  const [dir, setDir] = useState("row");
  const [justify, setJustify] = useState("center");
  const [align, setAlign] = useState("center");
  const [wrap, setWrap] = useState("nowrap");
  const [gap, setGap] = useState(8);

  return (
    <div className="space-y-4">
      <div className="h-48 rounded-xl border bg-muted/50 p-4" style={{ display: "flex", flexDirection: dir as any, justifyContent: justify, alignItems: align, flexWrap: wrap as any, gap }}>
        {[1, 2, 3, 4].map(i => <div key={i} className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">{i}</div>)}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">方向</label><select value={dir} onChange={e => setDir(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm"><option value="row">row</option><option value="column">column</option><option value="row-reverse">row-reverse</option><option value="column-reverse">column-reverse</option></select></div>
        <div><label className="tool-label">主軸對齊</label><select value={justify} onChange={e => setJustify(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm"><option value="flex-start">flex-start</option><option value="center">center</option><option value="flex-end">flex-end</option><option value="space-between">space-between</option><option value="space-around">space-around</option></select></div>
        <div><label className="tool-label">交叉軸對齊</label><select value={align} onChange={e => setAlign(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm"><option value="flex-start">flex-start</option><option value="center">center</option><option value="flex-end">flex-end</option><option value="stretch">stretch</option></select></div>
        <div><label className="tool-label">Gap: {gap}px</label><input type="range" min="0" max="32" value={gap} onChange={e => setGap(+e.target.value)} className="w-full" /></div>
      </div>
      <div className="tool-result font-mono text-xs whitespace-pre">{`display: flex;\nflex-direction: ${dir};\njustify-content: ${justify};\nalign-items: ${align};\nflex-wrap: ${wrap};\ngap: ${gap}px;`}</div>
    </div>
  );
}

export const DesignTools = {
  GradientGen,
  ShadowGen,
  BorderRadiusGen,
  GlassmorphismGen,
  ColorPaletteGen,
  FlexboxGen,
};
