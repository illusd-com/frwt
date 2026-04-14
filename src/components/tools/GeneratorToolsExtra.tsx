import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

function QrCodeGen() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && text) {
      QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        color: { dark: fg, light: bg },
        margin: 2,
      }).catch(() => {});
    }
  }, [text, size, fg, bg]);

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.download = "qrcode.png";
    a.href = canvasRef.current.toDataURL();
    a.click();
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="輸入文字或網址..." />
      <div className="flex flex-wrap gap-3 items-end">
        <div><label className="tool-label">大小</label><input type="number" className="w-20 rounded border bg-card p-2 text-sm" value={size} onChange={e => setSize(+e.target.value)} min={64} max={1024} /></div>
        <div><label className="tool-label">前景色</label><input type="color" value={fg} onChange={e => setFg(e.target.value)} className="h-9 w-12 rounded cursor-pointer" /></div>
        <div><label className="tool-label">背景色</label><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="h-9 w-12 rounded cursor-pointer" /></div>
      </div>
      <div className="flex justify-center"><canvas ref={canvasRef} /></div>
      <button className="tool-btn" onClick={download}>下載 PNG</button>
    </div>
  );
}

function ApiKeyGen() {
  const [prefix, setPrefix] = useState("sk");
  const [length, setLength] = useState(32);
  const [keys, setKeys] = useState<string[]>([]);

  const generate = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const arr = Array.from(crypto.getRandomValues(new Uint8Array(length * 5)));
    const results = Array.from({ length: 5 }, (_, i) => {
      const key = arr.slice(i * length, (i + 1) * length).map(n => chars[n % chars.length]).join("");
      return prefix ? `${prefix}_${key}` : key;
    });
    setKeys(results);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div><label className="tool-label">前綴</label><input className="w-20 rounded border bg-card p-2 text-sm" value={prefix} onChange={e => setPrefix(e.target.value)} /></div>
        <div><label className="tool-label">長度</label><input type="number" className="w-20 rounded border bg-card p-2 text-sm" value={length} onChange={e => setLength(+e.target.value)} min={8} max={128} /></div>
        <button className="tool-btn" onClick={generate}>產生</button>
      </div>
      {keys.length > 0 && (
        <div className="space-y-1">{keys.map((k, i) => (
          <div key={i} className="tool-result flex justify-between items-center py-1.5">
            <span className="font-mono text-xs break-all">{k}</span>
            <button className="text-xs text-primary ml-2 shrink-0" onClick={() => navigator.clipboard.writeText(k)}>複製</button>
          </div>
        ))}</div>
      )}
    </div>
  );
}

function CronGen() {
  const [min, setMin] = useState("0");
  const [hour, setHour] = useState("*");
  const [dom, setDom] = useState("*");
  const [month, setMonth] = useState("*");
  const [dow, setDow] = useState("*");

  const cron = `${min} ${hour} ${dom} ${month} ${dow}`;
  const describe = () => {
    const parts: string[] = [];
    if (min === "*") parts.push("每分鐘");
    else parts.push(`在第 ${min} 分`);
    if (hour === "*") parts.push("每小時");
    else parts.push(`${hour} 時`);
    if (dom === "*" && dow === "*") parts.push("每天");
    else if (dom !== "*") parts.push(`每月第 ${dom} 天`);
    if (dow !== "*") { const days = ["日","一","二","三","四","五","六"]; parts.push(`星期${days[+dow] || dow}`); }
    if (month !== "*") parts.push(`${month} 月`);
    return parts.join("，");
  };

  const presets = [
    ["每分鐘", "* * * * *"], ["每小時", "0 * * * *"], ["每天午夜", "0 0 * * *"],
    ["每週一", "0 0 * * 1"], ["每月1號", "0 0 1 * *"], ["工作日 9AM", "0 9 * * 1-5"],
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        <div><label className="tool-label">分 (0-59)</label><input className="w-full rounded border bg-card p-2 text-sm font-mono" value={min} onChange={e => setMin(e.target.value)} /></div>
        <div><label className="tool-label">時 (0-23)</label><input className="w-full rounded border bg-card p-2 text-sm font-mono" value={hour} onChange={e => setHour(e.target.value)} /></div>
        <div><label className="tool-label">日 (1-31)</label><input className="w-full rounded border bg-card p-2 text-sm font-mono" value={dom} onChange={e => setDom(e.target.value)} /></div>
        <div><label className="tool-label">月 (1-12)</label><input className="w-full rounded border bg-card p-2 text-sm font-mono" value={month} onChange={e => setMonth(e.target.value)} /></div>
        <div><label className="tool-label">週 (0-6)</label><input className="w-full rounded border bg-card p-2 text-sm font-mono" value={dow} onChange={e => setDow(e.target.value)} /></div>
      </div>
      <div className="tool-result text-center font-mono text-lg">{cron}</div>
      <p className="text-sm text-muted-foreground text-center">{describe()}</p>
      <div className="flex flex-wrap gap-2">
        {presets.map(([label, val]) => (
          <button key={label} className="tool-btn-secondary text-xs" onClick={() => { const p = val.split(" "); setMin(p[0]); setHour(p[1]); setDom(p[2]); setMonth(p[3]); setDow(p[4]); }}>{label}</button>
        ))}
      </div>
    </div>
  );
}

function GitignoreGen() {
  const templates: Record<string, string[]> = {
    Node: ["node_modules/", "dist/", ".env", ".env.local", "*.log", "coverage/", ".DS_Store"],
    Python: ["__pycache__/", "*.py[cod]", "*.egg-info/", "dist/", "build/", ".env", "venv/", ".venv/"],
    Java: ["*.class", "*.jar", "target/", ".idea/", "*.iml", "build/", ".gradle/"],
    Go: ["bin/", "*.exe", "*.test", "vendor/", "go.sum"],
    Rust: ["target/", "Cargo.lock", "*.pdb"],
    React: ["node_modules/", "build/", "dist/", ".env", ".env.local", "coverage/", ".DS_Store"],
    Unity: ["Library/", "Temp/", "Obj/", "Build/", "Builds/", "*.csproj", "*.unityproj", "*.sln"],
    macOS: [".DS_Store", ".AppleDouble", ".LSOverride", "Icon\\r", "._*"],
    Windows: ["Thumbs.db", "ehthumbs.db", "Desktop.ini", "$RECYCLE.BIN/"],
    IDE: [".idea/", ".vscode/", "*.swp", "*.swo", "*~", ".project", ".classpath"],
  };

  const [selected, setSelected] = useState<string[]>(["Node", "macOS", "IDE"]);
  const toggle = (t: string) => setSelected(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const result = selected.map(t => `# ${t}\n${templates[t].join("\n")}`).join("\n\n");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(templates).map(t => (
          <button key={t} className={`tool-btn text-xs ${selected.includes(t) ? "" : "opacity-50"}`} onClick={() => toggle(t)}>{t}</button>
        ))}
      </div>
      <pre className="tool-result whitespace-pre-wrap text-xs max-h-[300px] overflow-auto">{result}</pre>
      <button className="tool-btn" onClick={() => navigator.clipboard.writeText(result)}>複製 .gitignore</button>
    </div>
  );
}

export const GeneratorToolsExtra = { QrCodeGen, ApiKeyGen, CronGen, GitignoreGen };
