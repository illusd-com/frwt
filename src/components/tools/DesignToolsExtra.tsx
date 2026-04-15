import { useState } from "react";

function CssAnimationGen() {
  const [name, setName] = useState("bounce");
  const [duration, setDuration] = useState("1s");
  const [timing, setTiming] = useState("ease");
  const [iteration, setIteration] = useState("infinite");
  const [type, setType] = useState("bounce");

  const animations: Record<string, string> = {
    bounce: `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-30px); }\n}`,
    fade: `@keyframes fade {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}`,
    slide: `@keyframes slide {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(0); }\n}`,
    rotate: `@keyframes rotate {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}`,
    scale: `@keyframes scale {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.2); }\n}`,
    shake: `@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  25% { transform: translateX(-10px); }\n  75% { transform: translateX(10px); }\n}`,
    pulse: `@keyframes pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.5; }\n}`,
    swing: `@keyframes swing {\n  0%, 100% { transform: rotate(0deg); }\n  25% { transform: rotate(15deg); }\n  75% { transform: rotate(-15deg); }\n}`,
  };

  const keyframes = animations[type] || animations.bounce;
  const animProp = `animation: ${type} ${duration} ${timing} ${iteration};`;

  const previewStyle: React.CSSProperties = {
    width: 60, height: 60, borderRadius: 12, background: 'linear-gradient(135deg, #667eea, #764ba2)',
    animation: `${type} ${duration} ${timing} ${iteration}`,
  };

  return (
    <div className="space-y-4">
      <style>{keyframes}</style>
      <div className="flex justify-center p-8 bg-muted rounded-xl">
        <div style={previewStyle} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">動畫類型</label>
          <select className="tool-input" value={type} onChange={e => { setType(e.target.value); setName(e.target.value); }}>
            {Object.keys(animations).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div><label className="tool-label">持續時間</label>
          <select className="tool-input" value={duration} onChange={e => setDuration(e.target.value)}>
            {['0.3s','0.5s','0.8s','1s','1.5s','2s','3s'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div><label className="tool-label">時間函數</label>
          <select className="tool-input" value={timing} onChange={e => setTiming(e.target.value)}>
            {['ease','linear','ease-in','ease-out','ease-in-out'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div><label className="tool-label">重複次數</label>
          <select className="tool-input" value={iteration} onChange={e => setIteration(e.target.value)}>
            {['1','2','3','infinite'].map(i => <option key={i}>{i}</option>)}
          </select>
        </div>
      </div>
      <div><label className="tool-label">CSS 代碼</label>
        <pre className="tool-result font-mono text-xs whitespace-pre">{keyframes}{'\n\n'}.element {'{\n  '}{animProp}{'\n}'}</pre>
      </div>
    </div>
  );
}

function GridGen() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(16);
  const [colTemplate, setColTemplate] = useState("1fr 1fr 1fr");
  const [rowTemplate, setRowTemplate] = useState("auto auto");

  const css = `display: grid;\ngrid-template-columns: ${colTemplate};\ngrid-template-rows: ${rowTemplate};\ngap: ${gap}px;`;

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-xl" style={{ display: 'grid', gridTemplateColumns: colTemplate, gridTemplateRows: rowTemplate, gap }}>
        {Array.from({ length: cols * rows }, (_, i) => (
          <div key={i} className="h-16 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-mono text-primary">{i + 1}</div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">欄數: {cols}</label><input type="range" min="1" max="6" value={cols} onChange={e => { const c = +e.target.value; setCols(c); setColTemplate(Array(c).fill('1fr').join(' ')); }} className="w-full" /></div>
        <div><label className="tool-label">列數: {rows}</label><input type="range" min="1" max="6" value={rows} onChange={e => { const r = +e.target.value; setRows(r); setRowTemplate(Array(r).fill('auto').join(' ')); }} className="w-full" /></div>
      </div>
      <div><label className="tool-label">Gap: {gap}px</label><input type="range" min="0" max="40" value={gap} onChange={e => setGap(+e.target.value)} className="w-full" /></div>
      <div><label className="tool-label">Columns</label><input className="tool-input font-mono text-sm" value={colTemplate} onChange={e => setColTemplate(e.target.value)} /></div>
      <div><label className="tool-label">Rows</label><input className="tool-input font-mono text-sm" value={rowTemplate} onChange={e => setRowTemplate(e.target.value)} /></div>
      <div className="tool-result font-mono text-xs whitespace-pre">{css}</div>
    </div>
  );
}

function ClipPathGen() {
  const [shape, setShape] = useState("polygon(50% 0%, 0% 100%, 100% 100%)");
  const presets: Record<string, string> = {
    "三角形": "polygon(50% 0%, 0% 100%, 100% 100%)",
    "箭頭": "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)",
    "五角形": "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    "六角形": "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    "星形": "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    "十字": "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)",
    "圓形": "circle(50% at 50% 50%)",
    "橢圓": "ellipse(40% 50% at 50% 50%)",
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center p-8 bg-muted rounded-xl">
        <div className="w-40 h-40 bg-primary" style={{ clipPath: shape }} />
      </div>
      <div><label className="tool-label">預設形狀</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(presets).map(([k, v]) => (
            <button key={k} onClick={() => setShape(v)} className={`px-3 py-1 rounded-full text-xs ${shape === v ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}>{k}</button>
          ))}
        </div>
      </div>
      <div><label className="tool-label">Clip Path 值</label><input className="tool-input font-mono text-sm" value={shape} onChange={e => setShape(e.target.value)} /></div>
      <div className="tool-result font-mono text-xs">clip-path: {shape};</div>
    </div>
  );
}

function TransformGen() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [rotateZ, setRotateZ] = useState(0);
  const [scaleVal, setScaleVal] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);

  const transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scaleVal}) translate(${translateX}px, ${translateY}px) skew(${skewX}deg, ${skewY}deg)`;

  return (
    <div className="space-y-4">
      <div className="flex justify-center p-12 bg-muted rounded-xl" style={{ perspective: 600 }}>
        <div className="w-24 h-24 rounded-xl bg-primary" style={{ transform }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">旋轉 X: {rotateX}°</label><input type="range" min="-180" max="180" value={rotateX} onChange={e => setRotateX(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">旋轉 Y: {rotateY}°</label><input type="range" min="-180" max="180" value={rotateY} onChange={e => setRotateY(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">旋轉 Z: {rotateZ}°</label><input type="range" min="-180" max="180" value={rotateZ} onChange={e => setRotateZ(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">縮放: {scaleVal}</label><input type="range" min="0.1" max="3" step="0.1" value={scaleVal} onChange={e => setScaleVal(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">平移 X: {translateX}px</label><input type="range" min="-100" max="100" value={translateX} onChange={e => setTranslateX(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">平移 Y: {translateY}px</label><input type="range" min="-100" max="100" value={translateY} onChange={e => setTranslateY(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">傾斜 X: {skewX}°</label><input type="range" min="-45" max="45" value={skewX} onChange={e => setSkewX(+e.target.value)} className="w-full" /></div>
        <div><label className="tool-label">傾斜 Y: {skewY}°</label><input type="range" min="-45" max="45" value={skewY} onChange={e => setSkewY(+e.target.value)} className="w-full" /></div>
      </div>
      <div className="tool-result font-mono text-xs break-all">transform: {transform};</div>
    </div>
  );
}

export const DesignToolsExtra = {
  CssAnimationGen,
  GridGen,
  ClipPathGen,
  TransformGen,
};
