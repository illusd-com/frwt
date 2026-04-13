import { useState } from "react";

function PasswordStrength() {
  const [pw, setPw] = useState("");

  const getStrength = (p: string) => {
    let score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^a-zA-Z0-9]/.test(p)) score++;
    return score;
  };

  const score = getStrength(pw);
  const labels = ["非常弱", "弱", "普通", "強", "非常強"];
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  return (
    <div className="space-y-4">
      <input type="text" value={pw} onChange={e => setPw(e.target.value)} placeholder="輸入密碼..." className="w-full rounded-lg border bg-card p-3 text-sm font-mono" />
      {pw && (
        <div className="space-y-3">
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i < score ? colors[score - 1] : "bg-muted"}`} />
            ))}
          </div>
          <p className="text-sm font-medium">強度: {labels[Math.max(0, score - 1)]}</p>
          <div className="text-sm space-y-1">
            <p className={pw.length >= 8 ? "text-green-600" : "text-muted-foreground"}>✓ 至少 8 個字元 ({pw.length})</p>
            <p className={/[a-z]/.test(pw) && /[A-Z]/.test(pw) ? "text-green-600" : "text-muted-foreground"}>✓ 包含大小寫字母</p>
            <p className={/\d/.test(pw) ? "text-green-600" : "text-muted-foreground"}>✓ 包含數字</p>
            <p className={/[^a-zA-Z0-9]/.test(pw) ? "text-green-600" : "text-muted-foreground"}>✓ 包含特殊字元</p>
          </div>
        </div>
      )}
    </div>
  );
}

function AesEncrypt() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  const process = async () => {
    try {
      const enc = new TextEncoder();
      const keyData = await crypto.subtle.importKey("raw", enc.encode(key.padEnd(16, "0").slice(0, 16)), "AES-CBC", false, ["encrypt", "decrypt"]);
      const iv = new Uint8Array(16);

      if (mode === "encrypt") {
        const encrypted = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, keyData, enc.encode(text));
        setResult(btoa(String.fromCharCode(...new Uint8Array(encrypted))));
      } else {
        const data = Uint8Array.from(atob(text), c => c.charCodeAt(0));
        const decrypted = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, keyData, data);
        setResult(new TextDecoder().decode(decrypted));
      }
    } catch { setResult("處理失敗，請檢查輸入"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode("encrypt")} className={`px-3 py-1.5 rounded-lg text-sm ${mode === "encrypt" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>加密</button>
        <button onClick={() => setMode("decrypt")} className={`px-3 py-1.5 rounded-lg text-sm ${mode === "decrypt" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>解密</button>
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder={mode === "encrypt" ? "輸入要加密的文字..." : "輸入要解密的 Base64..."} className="tool-textarea" />
      <input type="text" value={key} onChange={e => setKey(e.target.value)} placeholder="加密金鑰 (至少 16 字元)" className="w-full rounded-lg border bg-card p-3 text-sm" />
      <button onClick={process} className="tool-btn">{mode === "encrypt" ? "加密" : "解密"}</button>
      {result && <div className="tool-result">{result}</div>}
    </div>
  );
}

function HashCompare() {
  const [hash1, setHash1] = useState("");
  const [hash2, setHash2] = useState("");
  const match = hash1 && hash2 && hash1.toLowerCase().trim() === hash2.toLowerCase().trim();

  return (
    <div className="space-y-4">
      <input type="text" value={hash1} onChange={e => setHash1(e.target.value)} placeholder="Hash 1" className="w-full rounded-lg border bg-card p-3 text-sm font-mono" />
      <input type="text" value={hash2} onChange={e => setHash2(e.target.value)} placeholder="Hash 2" className="w-full rounded-lg border bg-card p-3 text-sm font-mono" />
      {hash1 && hash2 && (
        <div className={`tool-result ${match ? "text-green-600" : "text-red-500"}`}>
          {match ? "✅ Hash 值相同" : "❌ Hash 值不同"}
        </div>
      )}
    </div>
  );
}

function CspGen() {
  const [directives, setDirectives] = useState({
    "default-src": "'self'",
    "script-src": "'self'",
    "style-src": "'self' 'unsafe-inline'",
    "img-src": "'self' data:",
    "font-src": "'self'",
    "connect-src": "'self'",
    "frame-src": "'none'",
  });

  const update = (key: string, val: string) => setDirectives(d => ({ ...d, [key]: val }));
  const csp = Object.entries(directives).map(([k, v]) => `${k} ${v}`).join("; ");

  return (
    <div className="space-y-3">
      {Object.entries(directives).map(([k, v]) => (
        <div key={k}>
          <label className="tool-label">{k}</label>
          <input type="text" value={v} onChange={e => update(k, e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm font-mono" />
        </div>
      ))}
      <div className="tool-result text-xs">{csp}</div>
    </div>
  );
}

function TotpGen() {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  const generate = () => {
    const digits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
    setCode(digits);
    setTimeLeft(30);
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  return (
    <div className="space-y-4 text-center">
      <button onClick={generate} className="tool-btn">產生驗證碼</button>
      {code && (
        <div className="space-y-2">
          <div className="text-4xl font-mono font-bold tracking-widest">{code}</div>
          <p className="text-sm text-muted-foreground">剩餘 {timeLeft} 秒</p>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${(timeLeft / 30) * 100}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">※ 此為模擬產生，非真正 TOTP 演算法</p>
        </div>
      )}
    </div>
  );
}

export const SecurityTools = {
  PasswordStrength,
  AesEncrypt,
  HashCompare,
  CspGen,
  TotpGen,
};
