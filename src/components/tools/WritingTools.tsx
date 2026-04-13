import { useState } from "react";

function ReadabilityScore() {
  const [text, setText] = useState("");
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const syllables = words.reduce((acc, w) => acc + Math.max(1, w.replace(/[^aeiouy]/gi, "").length), 0);

  const wc = words.length;
  const sc = sentences.length;
  const fk = sc > 0 && wc > 0 ? 0.39 * (wc / sc) + 11.8 * (syllables / wc) - 15.59 : 0;

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="貼上英文文章..." className="tool-textarea min-h-[200px]" />
      {wc > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            ["字數", wc], ["句數", sc], ["音節數", syllables], ["閱讀等級", fk.toFixed(1)],
          ].map(([l, v]) => (
            <div key={l as string} className="rounded-lg border bg-card p-3 text-center"><div className="text-lg font-bold">{v}</div><div className="text-xs text-muted-foreground">{l}</div></div>
          ))}
        </div>
      )}
    </div>
  );
}

function TitleGen() {
  const [topic, setTopic] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const templates = [
    (t: string) => `${t}的完整指南`,
    (t: string) => `10 個你不知道的${t}技巧`,
    (t: string) => `為什麼${t}如此重要？`,
    (t: string) => `${t}入門：初學者必讀`,
    (t: string) => `如何在 2024 年掌握${t}`,
    (t: string) => `${t} vs. 傳統方法：哪個更好？`,
    (t: string) => `專家教你${t}的 5 個秘訣`,
    (t: string) => `${t}的未來趨勢`,
  ];

  const generate = () => {
    if (!topic) return;
    setTitles(templates.sort(() => Math.random() - 0.5).slice(0, 5).map(t => t(topic)));
  };

  return (
    <div className="space-y-4">
      <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="輸入主題..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      <button onClick={generate} disabled={!topic} className="tool-btn">✨ 產生標題</button>
      {titles.length > 0 && (
        <div className="space-y-2">
          {titles.map((t, i) => (
            <div key={i} className="tool-result cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => navigator.clipboard.writeText(t)}>{t}</div>
          ))}
          <p className="text-xs text-muted-foreground">點擊標題即可複製</p>
        </div>
      )}
    </div>
  );
}

function CitationGen() {
  const [type, setType] = useState("apa");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [source, setSource] = useState("");

  const generateCitation = () => {
    if (type === "apa") return `${author} (${year}). ${title}. ${source}.`;
    if (type === "mla") return `${author}. "${title}." ${source}, ${year}.`;
    if (type === "chicago") return `${author}. ${title}. ${source}, ${year}.`;
    return "";
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {["apa", "mla", "chicago"].map(t => (
          <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-lg text-sm uppercase ${type === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{t}</button>
        ))}
      </div>
      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="作者" className="w-full rounded-lg border bg-card p-2 text-sm" />
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="標題" className="w-full rounded-lg border bg-card p-2 text-sm" />
      <input type="text" value={year} onChange={e => setYear(e.target.value)} placeholder="年份" className="w-full rounded-lg border bg-card p-2 text-sm" />
      <input type="text" value={source} onChange={e => setSource(e.target.value)} placeholder="來源/期刊" className="w-full rounded-lg border bg-card p-2 text-sm" />
      {author && title && <div className="tool-result">{generateCitation()}</div>}
    </div>
  );
}

function WritingPrompt() {
  const [prompt, setPrompt] = useState("");
  const prompts = [
    "寫一封給十年後自己的信",
    "描述你最難忘的一次旅行",
    "如果你可以和任何歷史人物共進晚餐，你會選誰？",
    "想像你醒來發現自己在一個完全不同的世界",
    "寫一個以「雨」開始的故事",
    "描述你理想中的一天",
    "如果動物會說話，世界會變成什麼樣子？",
    "寫一封給陌生人的感謝信",
    "描述一個改變你人生觀的時刻",
    "如果你能擁有任何超能力，你會選什麼？",
  ];

  return (
    <div className="space-y-4 text-center">
      <button onClick={() => setPrompt(prompts[Math.floor(Math.random() * prompts.length)])} className="tool-btn text-lg px-8 py-3">✨ 隨機寫作提示</button>
      {prompt && <div className="text-xl font-medium py-8 animate-scale-in">{prompt}</div>}
    </div>
  );
}

function EssayCounter() {
  const [text, setText] = useState("");
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const sentences = text.split(/[.!?。！？]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter(s => s.trim()).length;
  const readTime = Math.ceil(words / 200);
  const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="貼上文章..." className="tool-textarea min-h-[200px]" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ["總字元", chars], ["不含空格", charsNoSpace], ["英文字數", words], ["中文字數", chineseChars],
          ["句子數", sentences], ["段落數", paragraphs], ["閱讀時間", `${readTime} 分鐘`], ["頁數 (約)", Math.ceil(charsNoSpace / 500)],
        ].map(([l, v]) => (
          <div key={l as string} className="rounded-lg border bg-card p-3 text-center"><div className="text-lg font-bold">{v}</div><div className="text-xs text-muted-foreground">{l}</div></div>
        ))}
      </div>
    </div>
  );
}

export const WritingTools = {
  ReadabilityScore,
  TitleGen,
  CitationGen,
  WritingPrompt,
  EssayCounter,
};
