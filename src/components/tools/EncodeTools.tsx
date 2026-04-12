import { useState } from "react";

function Base64() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <div className="space-y-4">
      <div><label className="tool-label">輸入</label><textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder="輸入文字..." /></div>
      <div className="flex gap-2">
        <button className="tool-btn" onClick={() => { try { setOutput(btoa(unescape(encodeURIComponent(input)))); } catch { setOutput("編碼錯誤"); } }}>編碼</button>
        <button className="tool-btn-secondary" onClick={() => { try { setOutput(decodeURIComponent(escape(atob(input)))); } catch { setOutput("解碼錯誤"); } }}>解碼</button>
      </div>
      <div><label className="tool-label">結果</label><div className="tool-result whitespace-pre-wrap">{output || "—"}</div></div>
    </div>
  );
}

function UrlEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder="輸入文字或 URL..." />
      <div className="flex gap-2">
        <button className="tool-btn" onClick={() => setOutput(encodeURIComponent(input))}>編碼</button>
        <button className="tool-btn-secondary" onClick={() => { try { setOutput(decodeURIComponent(input)); } catch { setOutput("解碼錯誤"); } }}>解碼</button>
      </div>
      <div className="tool-result whitespace-pre-wrap">{output || "—"}</div>
    </div>
  );
}

function HtmlEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const encode = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  const decode = (s: string) => s.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'");
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder="輸入 HTML..." />
      <div className="flex gap-2">
        <button className="tool-btn" onClick={() => setOutput(encode(input))}>編碼</button>
        <button className="tool-btn-secondary" onClick={() => setOutput(decode(input))}>解碼</button>
      </div>
      <div className="tool-result whitespace-pre-wrap">{output || "—"}</div>
    </div>
  );
}

function JwtDecoder() {
  const [token, setToken] = useState("");
  let header = "", payload = "", error = "";
  if (token.trim()) {
    try {
      const parts = token.split(".");
      header = JSON.stringify(JSON.parse(atob(parts[0])), null, 2);
      payload = JSON.stringify(JSON.parse(atob(parts[1].replace(/-/g,"+").replace(/_/g,"/"))), null, 2);
    } catch { error = "無效的 JWT 格式"; }
  }
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={token} onChange={e => setToken(e.target.value)} placeholder="貼上 JWT token..." />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {header && <div><label className="tool-label">Header</label><pre className="tool-result">{header}</pre></div>}
      {payload && <div><label className="tool-label">Payload</label><pre className="tool-result">{payload}</pre></div>}
    </div>
  );
}

function UnicodeConverter() {
  const [text, setText] = useState("");
  const [uni, setUni] = useState("");
  const toUnicode = (s: string) => s.split("").map(c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")).join("");
  const fromUnicode = (s: string) => { try { return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, g) => String.fromCharCode(parseInt(g, 16))); } catch { return "轉換錯誤"; } };

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">文字</label>
        <textarea className="tool-textarea" value={text} onChange={e => { setText(e.target.value); setUni(toUnicode(e.target.value)); }} placeholder="輸入文字..." />
      </div>
      <div>
        <label className="tool-label">Unicode</label>
        <textarea className="tool-textarea" value={uni} onChange={e => { setUni(e.target.value); setText(fromUnicode(e.target.value)); }} placeholder="\u0048\u0065\u006c\u006c\u006f" />
      </div>
    </div>
  );
}

function MorseCode() {
  const morseMap: Record<string, string> = {"A":".-","B":"-...","C":"-.-.","D":"-..","E":".","F":"..-.","G":"--.","H":"....","I":"..","J":".---","K":"-.-","L":".-..","M":"--","N":"-.","O":"---","P":".--.","Q":"--.-","R":".-.","S":"...","T":"-","U":"..-","V":"...-","W":".--","X":"-..-","Y":"-.--","Z":"--..","0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----."," ":"/"};
  const reverseMorse = Object.fromEntries(Object.entries(morseMap).map(([k,v])=>[v,k]));
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");

  const toMorse = (s: string) => s.toUpperCase().split("").map(c => morseMap[c] || c).join(" ");
  const fromMorse = (s: string) => s.split(" ").map(c => c === "/" ? " " : reverseMorse[c] || c).join("");

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">文字</label>
        <textarea className="tool-textarea" value={text} onChange={e => { setText(e.target.value); setMorse(toMorse(e.target.value)); }} placeholder="輸入文字..." />
      </div>
      <div>
        <label className="tool-label">摩斯密碼</label>
        <textarea className="tool-textarea" value={morse} onChange={e => { setMorse(e.target.value); setText(fromMorse(e.target.value)); }} placeholder=".- -... -.-." />
      </div>
    </div>
  );
}

export const EncodeTools = { Base64, UrlEncode, HtmlEncode, JwtDecoder, UnicodeConverter, MorseCode };
