import { useState, useMemo } from "react";

function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  let matches: RegExpMatchArray[] = [];
  let error = "";
  try {
    if (pattern) {
      const re = new RegExp(pattern, flags);
      matches = [...text.matchAll(re)];
    }
  } catch (e: any) { error = e.message; }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3">
          <label className="tool-label">正規表達式</label>
          <input className="w-full rounded-lg border bg-card p-2 text-sm font-mono" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="[a-z]+" />
        </div>
        <div>
          <label className="tool-label">Flags</label>
          <input className="w-full rounded-lg border bg-card p-2 text-sm font-mono" value={flags} onChange={e => setFlags(e.target.value)} placeholder="gi" />
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="輸入測試文字..." />
      <div>
        <p className="text-sm text-muted-foreground mb-2">匹配結果: {matches.length} 個</p>
        {matches.length > 0 && (
          <div className="space-y-1">
            {matches.slice(0, 50).map((m, i) => (
              <div key={i} className="tool-result py-1.5 text-xs">
                <span className="text-muted-foreground">#{i + 1} [位置 {m.index}]</span> <span className="text-primary font-medium">{m[0]}</span>
                {m.length > 1 && <span className="text-muted-foreground ml-2">群組: {m.slice(1).join(", ")}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MarkdownPreview() {
  const [md, setMd] = useState("# 標題\n\n這是**粗體**和*斜體*。\n\n- 項目一\n- 項目二\n\n```\ncode block\n```\n\n[連結](https://example.com)");

  const toHtml = (text: string) => {
    return text
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/```[\s\S]*?```/g, m => `<pre><code>${m.slice(3, -3).trim()}</code></pre>`)
      .replace(/^\- (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
      .replace(/\n\n/g, "<br/><br/>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="tool-label">Markdown</label>
        <textarea className="tool-textarea min-h-[300px]" value={md} onChange={e => setMd(e.target.value)} />
      </div>
      <div>
        <label className="tool-label">預覽</label>
        <div className="rounded-lg border bg-card p-4 min-h-[300px] prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: toHtml(md) }} />
      </div>
    </div>
  );
}

function DiffChecker() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");

  const diff = useMemo(() => {
    const linesA = textA.split("\n");
    const linesB = textB.split("\n");
    const maxLen = Math.max(linesA.length, linesB.length);
    const result: Array<{ lineA: string; lineB: string; status: "same" | "changed" | "added" | "removed" }> = [];
    for (let i = 0; i < maxLen; i++) {
      const a = linesA[i] ?? "";
      const b = linesB[i] ?? "";
      if (i >= linesA.length) result.push({ lineA: "", lineB: b, status: "added" });
      else if (i >= linesB.length) result.push({ lineA: a, lineB: "", status: "removed" });
      else if (a === b) result.push({ lineA: a, lineB: b, status: "same" });
      else result.push({ lineA: a, lineB: b, status: "changed" });
    }
    return result;
  }, [textA, textB]);

  const bgMap = { same: "", changed: "bg-yellow-50", added: "bg-green-50", removed: "bg-red-50" };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="tool-label">原始文字</label><textarea className="tool-textarea min-h-[200px]" value={textA} onChange={e => setTextA(e.target.value)} /></div>
        <div><label className="tool-label">修改後文字</label><textarea className="tool-textarea min-h-[200px]" value={textB} onChange={e => setTextB(e.target.value)} /></div>
      </div>
      {diff.some(d => d.status !== "same") && (
        <div className="rounded-lg border overflow-hidden text-xs font-mono">
          {diff.map((d, i) => (
            <div key={i} className={`grid grid-cols-2 border-b last:border-0 ${bgMap[d.status]}`}>
              <div className="p-1.5 border-r">{d.lineA}</div>
              <div className="p-1.5">{d.lineB}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data) || data.length === 0) { setOutput("請輸入 JSON 陣列"); return; }
      const headers = Object.keys(data[0]);
      const csv = [headers.join(","), ...data.map((row: any) => headers.map(h => JSON.stringify(row[h] ?? "")).join(","))].join("\n");
      setOutput(csv);
    } catch { setOutput("無效的 JSON"); }
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[150px]" value={input} onChange={e => setInput(e.target.value)} placeholder='[{"name":"Alice","age":30}]' />
      <button className="tool-btn" onClick={convert}>轉換</button>
      {output && <pre className="tool-result whitespace-pre-wrap">{output}</pre>}
    </div>
  );
}

function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    const lines = input.trim().split("\n");
    if (lines.length < 2) { setOutput("需要至少兩行（標題+資料）"); return; }
    const headers = lines[0].split(",").map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""));
      return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
    });
    setOutput(JSON.stringify(data, null, 2));
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[150px]" value={input} onChange={e => setInput(e.target.value)} placeholder="name,age\nAlice,30" />
      <button className="tool-btn" onClick={convert}>轉換</button>
      {output && <pre className="tool-result whitespace-pre-wrap max-h-[300px] overflow-auto">{output}</pre>}
    </div>
  );
}

function TimestampConverter() {
  const [ts, setTs] = useState(String(Math.floor(Date.now() / 1000)));
  const [date, setDate] = useState("");

  const tsNum = parseInt(ts);
  const tsDate = !isNaN(tsNum) ? new Date(ts.length <= 10 ? tsNum * 1000 : tsNum) : null;

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">Unix 時間戳</label>
        <input className="w-full rounded-lg border bg-card p-2 text-sm font-mono" value={ts} onChange={e => setTs(e.target.value)} />
      </div>
      {tsDate && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xs text-muted-foreground">本地時間</div>
            <div className="font-mono text-sm">{tsDate.toLocaleString("zh-TW")}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xs text-muted-foreground">UTC</div>
            <div className="font-mono text-sm">{tsDate.toUTCString()}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xs text-muted-foreground">ISO 8601</div>
            <div className="font-mono text-sm">{tsDate.toISOString()}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xs text-muted-foreground">現在時間戳</div>
            <div className="font-mono text-sm">{Math.floor(Date.now() / 1000)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function JsonPath() {
  const [json, setJson] = useState('{"users":[{"name":"Alice","age":30},{"name":"Bob","age":25}]}');
  const [path, setPath] = useState("users.0.name");
  const [result, setResult] = useState("");

  const query = () => {
    try {
      const data = JSON.parse(json);
      const parts = path.split(".");
      let current: any = data;
      for (const part of parts) {
        if (current === undefined || current === null) break;
        current = current[part] ?? current[parseInt(part)];
      }
      setResult(typeof current === "object" ? JSON.stringify(current, null, 2) : String(current ?? "undefined"));
    } catch (e: any) { setResult("錯誤: " + e.message); }
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[150px]" value={json} onChange={e => setJson(e.target.value)} placeholder="JSON..." />
      <div className="flex gap-2">
        <input className="flex-1 rounded-lg border bg-card p-2 text-sm font-mono" value={path} onChange={e => setPath(e.target.value)} placeholder="users.0.name" />
        <button className="tool-btn" onClick={query}>查詢</button>
      </div>
      {result && <pre className="tool-result whitespace-pre-wrap">{result}</pre>}
    </div>
  );
}

function PixelConverter() {
  const [px, setPx] = useState("16");
  const [base, setBase] = useState("16");
  const pxNum = parseFloat(px);
  const baseNum = parseFloat(base);
  const rem = pxNum / baseNum;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div><label className="tool-label">像素 (px)</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={px} onChange={e => setPx(e.target.value)} /></div>
        <div><label className="tool-label">基準大小 (px)</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={base} onChange={e => setBase(e.target.value)} /></div>
        <div><label className="tool-label">Rem</label><div className="rounded-lg bg-muted/50 p-2 text-sm font-mono">{isNaN(rem) ? "—" : rem.toFixed(4)} rem</div></div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead><tr><th className="border bg-muted/50 p-2">PX</th><th className="border bg-muted/50 p-2">REM</th><th className="border bg-muted/50 p-2">PX</th><th className="border bg-muted/50 p-2">REM</th></tr></thead>
          <tbody>
            {[8,10,12,14,16,18,20,24,28,32,36,40,48,56,64,72].reduce<number[][]>((acc, val, i) => {
              if (i % 2 === 0) acc.push([val]); else acc[acc.length - 1].push(val);
              return acc;
            }, []).map((pair, i) => (
              <tr key={i}>
                {pair.map(v => (<><td key={`${v}px`} className="border p-2 font-mono text-center">{v}px</td><td key={`${v}rem`} className="border p-2 font-mono text-center">{(v / baseNum).toFixed(4)}</td></>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const DeveloperTools = { RegexTester, MarkdownPreview, DiffChecker, JsonToCsv, CsvToJson, TimestampConverter, JsonPath, PixelConverter };
