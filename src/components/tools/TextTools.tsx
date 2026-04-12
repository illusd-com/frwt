import { useState } from "react";

function WordCounter() {
  const [text, setText] = useState("");
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? text.split(/[.!?。！？]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(s => s.trim()).length : 0;
  const lines = text ? text.split("\n").length : 0;

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[200px]" value={text} onChange={e => setText(e.target.value)} placeholder="在此輸入或貼上文字..." />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          ["字元數", chars], ["字元數（不含空白）", charsNoSpace], ["詞數", words],
          ["句子數", sentences], ["段落數", paragraphs], ["行數", lines],
        ].map(([label, val]) => (
          <div key={label as string} className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="text-2xl font-bold text-primary">{val}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseConverter() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const convert = (fn: (s: string) => string) => setResult(fn(text));

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="輸入文字..." />
      <div className="flex flex-wrap gap-2">
        <button className="tool-btn" onClick={() => convert(s => s.toUpperCase())}>大寫</button>
        <button className="tool-btn" onClick={() => convert(s => s.toLowerCase())}>小寫</button>
        <button className="tool-btn" onClick={() => convert(s => s.replace(/\b\w/g, c => c.toUpperCase()))}>標題格式</button>
        <button className="tool-btn" onClick={() => convert(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())}>句首大寫</button>
        <button className="tool-btn" onClick={() => convert(s => s.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(""))}>反轉大小寫</button>
      </div>
      {result && <div className="tool-result">{result}</div>}
    </div>
  );
}

function TextReverser() {
  const [text, setText] = useState("");
  const reversed = text.split("").reverse().join("");
  const reversedLines = text.split("\n").reverse().join("\n");
  const reversedWords = text.split(/\s+/).reverse().join(" ");

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="輸入文字..." />
      <div className="space-y-3">
        <div><label className="tool-label">反轉字元</label><div className="tool-result">{reversed || "—"}</div></div>
        <div><label className="tool-label">反轉行</label><div className="tool-result whitespace-pre-wrap">{reversedLines || "—"}</div></div>
        <div><label className="tool-label">反轉單字順序</label><div className="tool-result">{reversedWords || "—"}</div></div>
      </div>
    </div>
  );
}

function DuplicateRemover() {
  const [text, setText] = useState("");
  const result = [...new Set(text.split("\n"))].join("\n");
  const removed = text.split("\n").length - result.split("\n").length;

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="每行一個項目..." />
      <p className="text-sm text-muted-foreground">移除了 {removed} 行重複內容</p>
      <div className="tool-result whitespace-pre-wrap">{result || "—"}</div>
    </div>
  );
}

function TextSorter() {
  const [text, setText] = useState("");
  const [asc, setAsc] = useState(true);
  const lines = text.split("\n").filter(Boolean);
  const sorted = [...lines].sort((a, b) => asc ? a.localeCompare(b, "zh-TW") : b.localeCompare(a, "zh-TW"));

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="每行一個項目..." />
      <div className="flex gap-2">
        <button className={`tool-btn ${asc ? "" : "opacity-60"}`} onClick={() => setAsc(true)}>升序 (A→Z)</button>
        <button className={`tool-btn ${!asc ? "" : "opacity-60"}`} onClick={() => setAsc(false)}>降序 (Z→A)</button>
      </div>
      <div className="tool-result whitespace-pre-wrap">{sorted.join("\n") || "—"}</div>
    </div>
  );
}

function WhitespaceRemover() {
  const [text, setText] = useState("");
  const trimmed = text.split("\n").map(l => l.trim()).filter(Boolean).join("\n").replace(/\n{3,}/g, "\n\n");

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="輸入含有多餘空白的文字..." />
      <div className="tool-result whitespace-pre-wrap">{trimmed || "—"}</div>
    </div>
  );
}

function FindReplace() {
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const result = find ? text.replaceAll(find, replace) : text;
  const count = find ? (text.split(find).length - 1) : 0;

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="輸入文字..." />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">尋找</label>
          <input className="w-full rounded-lg border bg-card p-2 text-sm" value={find} onChange={e => setFind(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">替換為</label>
          <input className="w-full rounded-lg border bg-card p-2 text-sm" value={replace} onChange={e => setReplace(e.target.value)} />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">找到 {count} 處匹配</p>
      <div className="tool-result whitespace-pre-wrap">{result || "—"}</div>
    </div>
  );
}

function TextRepeat() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(3);
  const [sep, setSep] = useState("\\n");
  const separator = sep === "\\n" ? "\n" : sep === "\\t" ? "\t" : sep;
  const result = Array(Math.min(count, 1000)).fill(text).join(separator);

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="輸入要重複的文字..." />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">重複次數</label>
          <input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={count} onChange={e => setCount(Number(e.target.value))} min={1} max={1000} />
        </div>
        <div>
          <label className="tool-label">分隔符</label>
          <select className="w-full rounded-lg border bg-card p-2 text-sm" value={sep} onChange={e => setSep(e.target.value)}>
            <option value="\\n">換行</option>
            <option value=" ">空格</option>
            <option value=", ">逗號</option>
            <option value="">無</option>
          </select>
        </div>
      </div>
      <div className="tool-result whitespace-pre-wrap max-h-[200px] overflow-auto">{result || "—"}</div>
    </div>
  );
}

export const TextTools = {
  WordCounter,
  CaseConverter,
  TextReverser,
  DuplicateRemover,
  TextSorter,
  WhitespaceRemover,
  FindReplace,
  TextRepeat,
};
