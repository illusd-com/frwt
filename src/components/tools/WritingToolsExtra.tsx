import { useState } from "react";

function GrammarCheck() {
  const [text, setText] = useState("");

  // 簡易啟發式英文文法檢查（純 client-side）
  const checks = (() => {
    const issues: { type: string; message: string; snippet: string }[] = [];
    if (!text) return issues;

    // 1. 雙空格
    const dbl = text.match(/  +/g);
    if (dbl) issues.push({ type: "格式", message: `發現 ${dbl.length} 處雙空格`, snippet: "  " });

    // 2. 句首小寫
    const sentences = text.split(/(?<=[.!?])\s+/);
    sentences.forEach(s => {
      const t = s.trim();
      if (t && /^[a-z]/.test(t)) {
        issues.push({ type: "大小寫", message: "句首應大寫", snippet: t.slice(0, 30) + "..." });
      }
    });

    // 3. 重複單字
    const dupRegex = /\b(\w+)\s+\1\b/gi;
    let m;
    while ((m = dupRegex.exec(text))) {
      issues.push({ type: "重複", message: `重複單字：${m[1]}`, snippet: m[0] });
    }

    // 4. 標點前空格
    if (/\s+[,.!?;:]/.test(text)) {
      issues.push({ type: "標點", message: "標點符號前不應有空格", snippet: "" });
    }

    // 5. a/an 用法
    const aMatch = text.match(/\ba\s+[aeiouAEIOU]\w*/g);
    if (aMatch) aMatch.forEach(s => issues.push({ type: "冠詞", message: "母音前應使用 'an'", snippet: s }));

    // 6. 常見錯字
    const typos: Record<string, string> = { "teh": "the", "recieve": "receive", "occured": "occurred", "seperate": "separate", "definately": "definitely" };
    Object.entries(typos).forEach(([wrong, right]) => {
      const re = new RegExp(`\\b${wrong}\\b`, "gi");
      if (re.test(text)) issues.push({ type: "拼字", message: `${wrong} → ${right}`, snippet: wrong });
    });

    return issues;
  })();

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="貼上英文文章..." className="tool-textarea min-h-40" />
      <div className="tool-result space-y-2">
        <p className="text-sm font-semibold">{checks.length === 0 && text ? "✓ 沒有發現明顯問題" : `發現 ${checks.length} 個問題`}</p>
        {checks.map((c, i) => (
          <div key={i} className="text-sm border-l-2 border-primary pl-3 py-1">
            <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary mr-2">{c.type}</span>
            {c.message}
            {c.snippet && <code className="block text-xs text-muted-foreground mt-1">{c.snippet}</code>}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">⚠️ 此為基本啟發式檢查，無法取代專業文法工具。</p>
    </div>
  );
}

function OutlineGen() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("argumentative");
  const [outline, setOutline] = useState("");

  const templates: Record<string, (t: string) => string> = {
    argumentative: t => `# ${t}

## I. 引言
   A. 主題背景介紹
   B. 提出論點/立場
   C. 文章結構預告

## II. 主要論點一
   A. 論點陳述
   B. 支持證據
   C. 案例說明

## III. 主要論點二
   A. 論點陳述
   B. 數據支持
   C. 對比分析

## IV. 反方觀點與回應
   A. 列出反對意見
   B. 提出反駁理由

## V. 結論
   A. 重申主要論點
   B. 行動呼籲
   C. 未來展望`,
    narrative: t => `# ${t}

## I. 開場
   A. 場景設定
   B. 主要人物介紹

## II. 起因
   A. 事件背景
   B. 衝突開始

## III. 發展
   A. 情節推進
   B. 角色變化
   C. 高潮鋪墊

## IV. 高潮
   A. 關鍵事件
   B. 角色抉擇

## V. 結局
   A. 衝突解決
   B. 反思與啟示`,
    expository: t => `# ${t}

## I. 引言
   A. 定義主題
   B. 重要性說明

## II. 背景知識
   A. 歷史脈絡
   B. 相關概念

## III. 主要內容
   A. 第一個面向
   B. 第二個面向
   C. 第三個面向

## IV. 案例分析
   A. 實際應用
   B. 案例討論

## V. 總結
   A. 重點回顧
   B. 延伸閱讀建議`,
  };

  const gen = () => {
    if (!topic.trim()) return;
    setOutline(templates[type](topic));
  };

  return (
    <div className="space-y-4">
      <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="輸入文章主題..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      <div className="flex gap-2 items-center">
        <label className="tool-label mb-0">類型:</label>
        <select value={type} onChange={e => setType(e.target.value)} className="rounded-lg border bg-card p-2 text-sm">
          <option value="argumentative">論說文</option>
          <option value="narrative">記敘文</option>
          <option value="expository">說明文</option>
        </select>
        <button onClick={gen} className="tool-btn ml-auto">📝 產生大綱</button>
      </div>
      {outline && <pre className="tool-result whitespace-pre-wrap text-sm font-mono">{outline}</pre>}
    </div>
  );
}

function PlagiarismCheck() {
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");

  // 計算 n-gram 重複率
  const result = (() => {
    if (!t1 || !t2) return null;
    const norm = (s: string) => s.toLowerCase().replace(/[^\w\s\u4e00-\u9fa5]/g, "").trim();
    const ngrams = (s: string, n: number) => {
      const tokens = norm(s).split(/\s+/);
      const set = new Set<string>();
      for (let i = 0; i <= tokens.length - n; i++) set.add(tokens.slice(i, i + n).join(" "));
      return set;
    };
    const a = ngrams(t1, 3);
    const b = ngrams(t2, 3);
    const common = [...a].filter(x => b.has(x));
    const similarity = a.size === 0 ? 0 : (common.length / a.size) * 100;
    return { similarity: similarity.toFixed(1), commonCount: common.length, total: a.size, samples: common.slice(0, 5) };
  })();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="tool-label">原文 A</label>
          <textarea value={t1} onChange={e => setT1(e.target.value)} placeholder="貼上第一段文字..." className="tool-textarea" />
        </div>
        <div>
          <label className="tool-label">比對 B</label>
          <textarea value={t2} onChange={e => setT2(e.target.value)} placeholder="貼上第二段文字..." className="tool-textarea" />
        </div>
      </div>
      {result && (
        <div className="tool-result space-y-2">
          <div className="text-3xl font-bold text-center">{result.similarity}%</div>
          <p className="text-sm text-center text-muted-foreground">相似度（基於 3-gram 比對）</p>
          <p className="text-xs text-muted-foreground">共同片段: {result.commonCount} / {result.total}</p>
          {result.samples.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-semibold">重複片段範例:</p>
              {result.samples.map((s, i) => <code key={i} className="block text-xs bg-muted px-2 py-1 rounded">{s}</code>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SummaryGen() {
  const [text, setText] = useState("");
  const [ratio, setRatio] = useState(30);

  // 萃取式摘要：依詞頻計算句子分數，挑選分數最高者
  const summary = (() => {
    if (!text.trim()) return "";
    const sentences = text.split(/(?<=[。！？.!?])\s*/).filter(s => s.trim().length > 5);
    if (sentences.length <= 2) return text;

    const stopwords = new Set(["的", "了", "是", "在", "和", "與", "或", "也", "都", "the", "a", "an", "is", "are", "was", "were", "and", "or", "of", "to", "in"]);
    const wordFreq: Record<string, number> = {};
    sentences.forEach(s => {
      const words = s.toLowerCase().match(/[\w\u4e00-\u9fa5]+/g) || [];
      words.forEach(w => { if (!stopwords.has(w)) wordFreq[w] = (wordFreq[w] || 0) + 1; });
    });

    const scored = sentences.map((s, i) => {
      const words = s.toLowerCase().match(/[\w\u4e00-\u9fa5]+/g) || [];
      const score = words.reduce((sum, w) => sum + (wordFreq[w] || 0), 0) / Math.max(words.length, 1);
      return { s, i, score };
    });

    const keepCount = Math.max(1, Math.round(sentences.length * ratio / 100));
    const top = [...scored].sort((a, b) => b.score - a.score).slice(0, keepCount).sort((a, b) => a.i - b.i);
    return top.map(x => x.s).join(" ");
  })();

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="貼上要摘要的文章..." className="tool-textarea min-h-40" />
      <div className="flex gap-2 items-center">
        <label className="tool-label mb-0">摘要比例:</label>
        <input type="range" min="10" max="70" value={ratio} onChange={e => setRatio(+e.target.value)} className="flex-1" />
        <span className="text-sm w-12">{ratio}%</span>
      </div>
      {summary && (
        <div className="tool-result space-y-2">
          <p className="text-xs text-muted-foreground">摘要結果（{summary.length} / {text.length} 字）：</p>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
}

function Paraphrase() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  // 簡易同義詞替換（中英文）
  const synonyms: Record<string, string[]> = {
    "good": ["great", "excellent", "fine"],
    "bad": ["poor", "terrible", "awful"],
    "big": ["large", "huge", "massive"],
    "small": ["tiny", "little", "compact"],
    "happy": ["joyful", "cheerful", "delighted"],
    "important": ["crucial", "vital", "essential"],
    "show": ["display", "demonstrate", "reveal"],
    "make": ["create", "produce", "build"],
    "use": ["utilize", "employ", "apply"],
    "很": ["非常", "十分", "相當"],
    "好": ["優秀", "出色", "良好"],
    "重要": ["關鍵", "核心", "重大"],
    "問題": ["議題", "難題", "課題"],
    "方法": ["方式", "途徑", "手段"],
    "認為": ["覺得", "相信", "以為"],
    "因此": ["所以", "故而", "於是"],
    "但是": ["然而", "不過", "可是"],
  };

  const run = () => {
    let out = text;
    Object.entries(synonyms).forEach(([k, vs]) => {
      const re = new RegExp(`\\b${k}\\b|${k}`, "g");
      out = out.replace(re, () => vs[Math.floor(Math.random() * vs.length)]);
    });
    setOutput(out);
  };

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="輸入要改寫的文字..." className="tool-textarea" />
      <button onClick={run} className="tool-btn w-full">🔄 改寫文字</button>
      {output && (
        <div className="space-y-2">
          <textarea value={output} readOnly className="tool-textarea bg-muted" />
          <button onClick={() => navigator.clipboard.writeText(output)} className="tool-btn-secondary text-sm">複製改寫結果</button>
        </div>
      )}
      <p className="text-xs text-muted-foreground">⚠️ 基於同義詞替換，僅供參考。</p>
    </div>
  );
}

export const WritingToolsExtra = {
  GrammarCheck,
  OutlineGen,
  PlagiarismCheck,
  SummaryGen,
  Paraphrase,
};
