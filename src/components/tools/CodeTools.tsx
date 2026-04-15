import { useState, useCallback } from "react";

function HtmlPreview() {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #667eea, #764ba2); }
    .card { background: white; border-radius: 16px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); text-align: center; }
    h1 { color: #333; }
    p { color: #666; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 Hello World!</h1>
    <p>在這裡編寫你的 HTML / CSS / JS</p>
  </div>
</body>
</html>`);

  return (
    <div className="space-y-4">
      <div><label className="tool-label">HTML / CSS / JS 代碼</label>
        <textarea className="tool-input h-64 font-mono text-sm" value={code} onChange={e => setCode(e.target.value)} />
      </div>
      <div><label className="tool-label">即時預覽</label>
        <iframe
          srcDoc={code}
          className="w-full h-80 border rounded-lg bg-white"
          sandbox="allow-scripts"
          title="preview"
        />
      </div>
    </div>
  );
}

function JsRunner() {
  const [code, setCode] = useState(`// 在這裡撰寫 JavaScript\nconst arr = [1, 2, 3, 4, 5];\nconst sum = arr.reduce((a, b) => a + b, 0);\nconsole.log("陣列:", arr);\nconsole.log("總和:", sum);\nconsole.log("平均:", sum / arr.length);`);
  const [output, setOutput] = useState("");

  const run = useCallback(() => {
    const logs: string[] = [];
    const fakeConsole = {
      log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
      error: (...args: any[]) => logs.push('❌ ' + args.map(String).join(' ')),
      warn: (...args: any[]) => logs.push('⚠️ ' + args.map(String).join(' ')),
      info: (...args: any[]) => logs.push('ℹ️ ' + args.map(String).join(' ')),
    };
    try {
      const fn = new Function('console', code);
      const result = fn(fakeConsole);
      if (result !== undefined) logs.push(`→ ${typeof result === 'object' ? JSON.stringify(result, null, 2) : result}`);
      setOutput(logs.join('\n') || '（無輸出）');
    } catch (e: any) {
      setOutput(`❌ 錯誤: ${e.message}`);
    }
  }, [code]);

  return (
    <div className="space-y-4">
      <div><label className="tool-label">JavaScript 代碼</label>
        <textarea className="tool-input h-48 font-mono text-sm" value={code} onChange={e => setCode(e.target.value)} />
      </div>
      <button onClick={run} className="tool-btn">▶ 執行</button>
      <div><label className="tool-label">輸出結果</label>
        <pre className="tool-result font-mono text-sm whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
}

function CssPlayground() {
  const [html, setHtml] = useState('<div class="box">\n  <h2>Hello!</h2>\n  <p>CSS Playground</p>\n</div>');
  const [css, setCss] = useState(`.box {\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  color: white;\n  padding: 40px;\n  border-radius: 16px;\n  text-align: center;\n  font-family: sans-serif;\n}\n.box h2 {\n  margin: 0 0 8px;\n  font-size: 24px;\n}\n.box p {\n  margin: 0;\n  opacity: 0.8;\n}`);

  const srcDoc = `<style>${css}</style>${html}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="tool-label">HTML</label><textarea className="tool-input h-40 font-mono text-sm" value={html} onChange={e => setHtml(e.target.value)} /></div>
        <div><label className="tool-label">CSS</label><textarea className="tool-input h-40 font-mono text-sm" value={css} onChange={e => setCss(e.target.value)} /></div>
      </div>
      <div><label className="tool-label">預覽</label>
        <iframe srcDoc={srcDoc} className="w-full h-60 border rounded-lg bg-white" sandbox="allow-scripts" title="css-preview" />
      </div>
    </div>
  );
}

function JsonFormatter() {
  const [input, setInput] = useState('{"name":"FreeWebTools","version":"1.0","features":["text","encode","format"]}');
  const [indent, setIndent] = useState(2);
  let formatted = "";
  try { formatted = JSON.stringify(JSON.parse(input), null, indent); } catch { formatted = "❌ 無效的 JSON"; }

  return (
    <div className="space-y-4">
      <div><label className="tool-label">JSON 輸入</label><textarea className="tool-input h-32 font-mono text-sm" value={input} onChange={e => setInput(e.target.value)} /></div>
      <div className="flex gap-4 items-center">
        <label className="tool-label mb-0">縮排空格:</label>
        {[2, 4].map(n => <button key={n} onClick={() => setIndent(n)} className={`px-3 py-1 rounded text-sm ${indent === n ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{n}</button>)}
      </div>
      <div><label className="tool-label">格式化結果</label><pre className="tool-result font-mono text-sm whitespace-pre overflow-x-auto">{formatted}</pre></div>
    </div>
  );
}

function RegexPlayground() {
  const [pattern, setPattern] = useState("\\b[A-Z][a-z]+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Hello World from FreeWebTools. This Is A Test.");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  const test = useCallback(() => {
    try {
      const re = new RegExp(pattern, flags);
      const m = [...text.matchAll(re)].map(m => m[0]);
      setMatches(m);
      setError("");
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  }, [pattern, flags, text]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1"><label className="tool-label">正則表達式</label><input className="tool-input font-mono" value={pattern} onChange={e => setPattern(e.target.value)} /></div>
        <div className="w-20"><label className="tool-label">Flags</label><input className="tool-input font-mono" value={flags} onChange={e => setFlags(e.target.value)} /></div>
      </div>
      <div><label className="tool-label">測試文字</label><textarea className="tool-input h-24" value={text} onChange={e => setText(e.target.value)} /></div>
      <button onClick={test} className="tool-btn">測試</button>
      {error && <div className="text-sm text-red-500">❌ {error}</div>}
      {matches.length > 0 && (
        <div><label className="tool-label">匹配結果 ({matches.length})</label>
          <div className="flex flex-wrap gap-2">{matches.map((m, i) => <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-mono">{m}</span>)}</div>
        </div>
      )}
    </div>
  );
}

export const CodeTools = {
  HtmlPreview,
  JsRunner,
  CssPlayground,
  JsonFormatter: JsonFormatter,
  RegexPlayground,
};
