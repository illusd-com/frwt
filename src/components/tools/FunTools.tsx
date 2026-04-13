import { useState } from "react";

function DiceRoller() {
  const [count, setCount] = useState(1);
  const [sides, setSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);

  const roll = () => {
    setResults(Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1));
  };

  return (
    <div className="space-y-4 text-center">
      <div className="flex gap-4 justify-center">
        <div><label className="tool-label">骰子數</label><input type="number" min="1" max="20" value={count} onChange={e => setCount(+e.target.value)} className="w-20 rounded-lg border bg-card p-2 text-sm text-center" /></div>
        <div><label className="tool-label">面數</label><input type="number" min="2" max="100" value={sides} onChange={e => setSides(+e.target.value)} className="w-20 rounded-lg border bg-card p-2 text-sm text-center" /></div>
      </div>
      <button onClick={roll} className="tool-btn text-lg px-8 py-3">🎲 擲骰子</button>
      {results.length > 0 && (
        <div className="space-y-2">
          <div className="flex gap-3 justify-center flex-wrap">
            {results.map((r, i) => (
              <div key={i} className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold animate-scale-in">{r}</div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">總和: {results.reduce((a, b) => a + b, 0)}</p>
        </div>
      )}
    </div>
  );
}

function CoinFlip() {
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const flip = () => {
    const r = Math.random() > 0.5 ? "正面" : "反面";
    setResult(r);
    setHistory(h => [r, ...h].slice(0, 20));
  };

  return (
    <div className="space-y-4 text-center">
      <button onClick={flip} className="tool-btn text-lg px-8 py-3">🪙 拋硬幣</button>
      {result && <div className="text-4xl font-bold animate-scale-in">{result === "正面" ? "👑" : "🌙"} {result}</div>}
      {history.length > 0 && (
        <div className="text-sm text-muted-foreground">
          歷史: {history.join(", ")}
          <br />正面 {history.filter(h => h === "正面").length} / 反面 {history.filter(h => h === "反面").length}
        </div>
      )}
    </div>
  );
}

function RandomPicker() {
  const [items, setItems] = useState("選項 A\n選項 B\n選項 C\n選項 D");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(1);

  const pick = () => {
    const list = items.split("\n").filter(s => s.trim());
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    setResult(shuffled.slice(0, count).join("\n"));
  };

  return (
    <div className="space-y-4">
      <textarea value={items} onChange={e => setItems(e.target.value)} placeholder="每行一個選項..." className="tool-textarea" />
      <div className="flex gap-2 items-center">
        <label className="tool-label mb-0">選取數量:</label>
        <input type="number" min="1" value={count} onChange={e => setCount(+e.target.value)} className="w-20 rounded-lg border bg-card p-2 text-sm" />
        <button onClick={pick} className="tool-btn">🎯 隨機選取</button>
      </div>
      {result && <div className="tool-result text-lg font-bold text-center animate-scale-in">{result}</div>}
    </div>
  );
}

function WheelSpinner() {
  const [items, setItems] = useState("🍕 披薩\n🍜 拉麵\n🍔 漢堡\n🍣 壽司\n🥗 沙拉");
  const [result, setResult] = useState("");
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    const list = items.split("\n").filter(s => s.trim());
    if (list.length === 0) return;
    setSpinning(true);
    setResult("");
    let i = 0;
    const interval = setInterval(() => {
      setResult(list[i % list.length]);
      i++;
    }, 80);
    setTimeout(() => {
      clearInterval(interval);
      setResult(list[Math.floor(Math.random() * list.length)]);
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <textarea value={items} onChange={e => setItems(e.target.value)} placeholder="每行一個選項..." className="tool-textarea" />
      <button onClick={spin} disabled={spinning} className="tool-btn w-full text-lg py-3">{spinning ? "🌀 轉動中..." : "🎡 開始轉盤"}</button>
      {result && <div className={`text-center text-3xl font-bold py-4 ${spinning ? "animate-pulse" : "animate-scale-in"}`}>{result}</div>}
    </div>
  );
}

function DecisionMaker() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");

  const answers = ["是的！", "不是", "也許吧", "絕對可以", "再想想", "當然！", "不建議", "相信你的直覺", "問問別人吧", "大膽去做！", "再等等", "機會很大"];

  const decide = () => {
    setResult(answers[Math.floor(Math.random() * answers.length)]);
  };

  return (
    <div className="space-y-4 text-center">
      <input type="text" value={question} onChange={e => setQuestion(e.target.value)} placeholder="你的問題是？" className="w-full rounded-lg border bg-card p-3 text-sm text-center" />
      <button onClick={decide} className="tool-btn text-lg px-8 py-3">🔮 獲取答案</button>
      {result && <div className="text-3xl font-bold animate-scale-in py-4">{result}</div>}
    </div>
  );
}

function TypingTest() {
  const texts = ["The quick brown fox jumps over the lazy dog.", "Practice makes perfect.", "To be or not to be, that is the question."];
  const [target] = useState(texts[Math.floor(Math.random() * texts.length)]);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);

  const handleChange = (val: string) => {
    if (!startTime) setStartTime(Date.now());
    setInput(val);
    if (val.length >= target.length) {
      const elapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
      const words = target.split(" ").length;
      setWpm(Math.round(words / elapsed));
    }
  };

  const accuracy = input.length > 0
    ? Math.round(input.split("").filter((c, i) => c === target[i]).length / input.length * 100)
    : 100;

  return (
    <div className="space-y-4">
      <div className="tool-result text-lg font-mono">{target}</div>
      <textarea value={input} onChange={e => handleChange(e.target.value)} placeholder="在此輸入上方文字..." className="tool-textarea" />
      <div className="flex gap-4 text-sm">
        <span>準確率: {accuracy}%</span>
        {wpm > 0 && <span className="font-bold">速度: {wpm} WPM</span>}
      </div>
    </div>
  );
}

function LoveCalc() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calc = () => {
    const hash = (name1 + name2).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    setResult((hash % 61) + 40); // 40-100
  };

  return (
    <div className="space-y-4 text-center">
      <input type="text" value={name1} onChange={e => setName1(e.target.value)} placeholder="名字 1" className="w-full rounded-lg border bg-card p-3 text-sm text-center" />
      <div className="text-2xl">💕</div>
      <input type="text" value={name2} onChange={e => setName2(e.target.value)} placeholder="名字 2" className="w-full rounded-lg border bg-card p-3 text-sm text-center" />
      <button onClick={calc} disabled={!name1 || !name2} className="tool-btn px-8">計算匹配度</button>
      {result !== null && (
        <div className="animate-scale-in">
          <div className="text-5xl font-bold">{result}%</div>
          <p className="text-sm text-muted-foreground mt-2">{result >= 80 ? "天生一對！💑" : result >= 60 ? "蠻合適的！😊" : "需要多磨合 🤝"}</p>
        </div>
      )}
    </div>
  );
}

function EmojiPicker() {
  const [search, setSearch] = useState("");
  const emojis = "😀😃😄😁😆😅🤣😂🙂🙃😉😊😇🥰😍🤩😘😗😚😙🥲😋😛😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😶😏😒🙄😬🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧🥵🥶🥴😵🤯🤠🥳🥸😎🤓🧐😕😟🙁😮😯😲😳🥺😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱😤😡😠🤬💀👻👽🤖💩😺😸😹😻😼😽🙀😿😾🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🙈🙉🙊🐔🐧🐦🐤🐣🐥🦆🦅🦉🦇🐺🐗🐴🦄🐝🐛🦋🐌🐞🐜🪲🦂🐢🐍🦎🦖🦕❤️🧡💛💚💙💜🖤🤍🤎💔❣️💕💞💓💗💖💘💝⭐🌟✨⚡🔥💥🎉🎊🎈🎁🏆🥇🥈🥉🎯🎪🎨🎭🎬🎤🎧🎼🎹🎸🎺🎻🥁🎲♟🎮🎰🧩".split(/(?:[\u200d\u2640\u2642\ufe0f]|\ud83c[\udde6-\uddff]|\ud83c[\udffb-\udfff])/g).filter(Boolean);

  const filtered = search
    ? emojis.filter(e => e.includes(search))
    : emojis;

  const copy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
  };

  return (
    <div className="space-y-4">
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="搜尋 Emoji..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      <div className="grid grid-cols-8 sm:grid-cols-12 gap-1 max-h-[300px] overflow-auto">
        {filtered.slice(0, 200).map((emoji, i) => (
          <button key={i} onClick={() => copy(emoji)} className="text-2xl p-1 rounded hover:bg-muted transition-colors" title="點擊複製">{emoji}</button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">點擊 Emoji 即可複製</p>
    </div>
  );
}

export const FunTools = {
  DiceRoller,
  CoinFlip,
  RandomPicker,
  WheelSpinner,
  DecisionMaker,
  TypingTest,
  LoveCalc,
  EmojiPicker,
};
