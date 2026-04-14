import { useState } from "react";

function TextTruncate() {
  const [text, setText] = useState("");
  const [len, setLen] = useState(100);
  const [suffix, setSuffix] = useState("...");
  const result = text.length > len ? text.slice(0, len) + suffix : text;
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="輸入文字..." />
      <div className="flex gap-3">
        <div><label className="tool-label">長度</label><input type="number" className="w-20 rounded border bg-card p-2 text-sm" value={len} onChange={e => setLen(+e.target.value)} /></div>
        <div><label className="tool-label">後綴</label><input className="w-20 rounded border bg-card p-2 text-sm" value={suffix} onChange={e => setSuffix(e.target.value)} /></div>
      </div>
      <div className="tool-result">{result || "—"}</div>
    </div>
  );
}

function TextToSlug() {
  const [text, setText] = useState("");
  const slug = text.toLowerCase().trim()
    .replace(/[^\w\s\u4e00-\u9fff-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return (
    <div className="space-y-4">
      <input className="w-full rounded border bg-card p-2 text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="輸入標題..." />
      <div className="tool-result font-mono">{slug || "—"}</div>
      <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(slug)}>複製</button>
    </div>
  );
}

function TextToBinary() {
  const [text, setText] = useState("");
  const [bin, setBin] = useState("");
  const toBin = (s: string) => s.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
  const fromBin = (s: string) => { try { return s.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join(""); } catch { return "轉換錯誤"; } };
  return (
    <div className="space-y-4">
      <div><label className="tool-label">文字</label>
        <textarea className="tool-textarea" value={text} onChange={e => { setText(e.target.value); setBin(toBin(e.target.value)); }} placeholder="輸入文字..." /></div>
      <div><label className="tool-label">二進位</label>
        <textarea className="tool-textarea font-mono" value={bin} onChange={e => { setBin(e.target.value); setText(fromBin(e.target.value)); }} placeholder="01001000 01101001" /></div>
    </div>
  );
}

function TextExtractEmails() {
  const [text, setText] = useState("");
  const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  const unique = [...new Set(emails)];
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[150px]" value={text} onChange={e => setText(e.target.value)} placeholder="貼上含有 Email 的文字..." />
      <p className="text-sm text-muted-foreground">找到 {unique.length} 個 Email</p>
      {unique.length > 0 && <div className="tool-result whitespace-pre-wrap">{unique.join("\n")}</div>}
      {unique.length > 0 && <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(unique.join("\n"))}>複製全部</button>}
    </div>
  );
}

function TextExtractUrls() {
  const [text, setText] = useState("");
  const urls = text.match(/https?:\/\/[^\s<>"{}|\\^`\[\]]+/g) || [];
  const unique = [...new Set(urls)];
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[150px]" value={text} onChange={e => setText(e.target.value)} placeholder="貼上含有網址的文字..." />
      <p className="text-sm text-muted-foreground">找到 {unique.length} 個網址</p>
      {unique.length > 0 && <div className="tool-result whitespace-pre-wrap">{unique.join("\n")}</div>}
    </div>
  );
}

function TextExtractNumbers() {
  const [text, setText] = useState("");
  const nums = text.match(/-?\d+\.?\d*/g) || [];
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="貼上含有數字的文字..." />
      <p className="text-sm text-muted-foreground">找到 {nums.length} 個數字</p>
      {nums.length > 0 && (
        <>
          <div className="tool-result">{nums.join(", ")}</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded bg-muted/50 p-2 text-center"><div className="text-xs text-muted-foreground">總和</div><div className="font-mono font-bold">{nums.reduce((a, b) => a + Number(b), 0)}</div></div>
            <div className="rounded bg-muted/50 p-2 text-center"><div className="text-xs text-muted-foreground">平均</div><div className="font-mono font-bold">{(nums.reduce((a, b) => a + Number(b), 0) / nums.length).toFixed(2)}</div></div>
            <div className="rounded bg-muted/50 p-2 text-center"><div className="text-xs text-muted-foreground">數量</div><div className="font-mono font-bold">{nums.length}</div></div>
          </div>
        </>
      )}
    </div>
  );
}

function TextToList() {
  const [text, setText] = useState("");
  const [type, setType] = useState<"ol" | "ul" | "checkbox">("ol");
  const lines = text.split("\n").filter(Boolean);
  const result = lines.map((l, i) => {
    if (type === "ol") return `${i + 1}. ${l}`;
    if (type === "ul") return `- ${l}`;
    return `- [ ] ${l}`;
  }).join("\n");
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="每行一個項目..." />
      <div className="flex gap-2">
        <button className={`tool-btn ${type === "ol" ? "" : "opacity-60"}`} onClick={() => setType("ol")}>編號</button>
        <button className={`tool-btn ${type === "ul" ? "" : "opacity-60"}`} onClick={() => setType("ul")}>項目符號</button>
        <button className={`tool-btn ${type === "checkbox" ? "" : "opacity-60"}`} onClick={() => setType("checkbox")}>核取方塊</button>
      </div>
      <div className="tool-result whitespace-pre-wrap">{result || "—"}</div>
    </div>
  );
}

function TextPrefixSuffix() {
  const [text, setText] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const result = text.split("\n").map(l => `${prefix}${l}${suffix}`).join("\n");
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="每行一個項目..." />
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">前綴</label><input className="w-full rounded border bg-card p-2 text-sm" value={prefix} onChange={e => setPrefix(e.target.value)} /></div>
        <div><label className="tool-label">後綴</label><input className="w-full rounded border bg-card p-2 text-sm" value={suffix} onChange={e => setSuffix(e.target.value)} /></div>
      </div>
      <div className="tool-result whitespace-pre-wrap">{result || "—"}</div>
    </div>
  );
}

export const TextToolsExtra = { TextTruncate, TextToSlug, TextToBinary, TextExtractEmails, TextExtractUrls, TextExtractNumbers, TextToList, TextPrefixSuffix };
