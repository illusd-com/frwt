import { useState } from "react";

function NamePicker() {
  const [names, setNames] = useState("小明\n小華\n小美\n大雄\n靜香");
  const [count, setCount] = useState(1);
  const [picked, setPicked] = useState<string[]>([]);
  const [removeAfterPick, setRemoveAfterPick] = useState(false);

  const draw = () => {
    const list = names.split("\n").map(s => s.trim()).filter(Boolean);
    if (list.length === 0) return;
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    const result = shuffled.slice(0, Math.min(count, list.length));
    setPicked(result);
    if (removeAfterPick) {
      setNames(list.filter(n => !result.includes(n)).join("\n"));
    }
  };

  return (
    <div className="space-y-4">
      <textarea value={names} onChange={e => setNames(e.target.value)} placeholder="每行一個名字..." className="tool-textarea" />
      <div className="flex flex-wrap gap-2 items-center">
        <label className="tool-label mb-0">抽取人數:</label>
        <input type="number" min="1" value={count} onChange={e => setCount(+e.target.value)} className="w-20 rounded-lg border bg-card p-2 text-sm" />
        <label className="flex items-center gap-1 text-xs cursor-pointer">
          <input type="checkbox" checked={removeAfterPick} onChange={e => setRemoveAfterPick(e.target.checked)} />
          抽完移除
        </label>
        <button onClick={draw} className="tool-btn ml-auto">🎲 抽籤</button>
      </div>
      {picked.length > 0 && (
        <div className="tool-result animate-scale-in">
          <p className="text-xs text-muted-foreground mb-2">抽中名單：</p>
          <div className="flex flex-wrap gap-2">
            {picked.map((n, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold">{n}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MemeText() {
  const [input, setInput] = useState("Hello World");

  const styles: { name: string; transform: (s: string) => string }[] = [
    { name: "全形", transform: s => s.split("").map(c => {
      const code = c.charCodeAt(0);
      if (code >= 33 && code <= 126) return String.fromCharCode(code + 0xfee0);
      if (code === 32) return "\u3000";
      return c;
    }).join("") },
    { name: "粗體 𝗕", transform: s => s.split("").map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d5d4 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d5ee + code - 97);
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ec + code - 48);
      return c;
    }).join("") },
    { name: "斜體 𝘐", transform: s => s.split("").map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d608 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d622 + code - 97);
      return c;
    }).join("") },
    { name: "花體 𝓕", transform: s => s.split("").map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d4d0 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d4ea + code - 97);
      return c;
    }).join("") },
    { name: "倒立", transform: s => {
      const map: Record<string, string> = { a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z","?":"¿","!":"¡",".":"˙",",":"'" };
      return s.toLowerCase().split("").map(c => map[c] || c).reverse().join("");
    } },
    { name: "間隔", transform: s => s.split("").join(" ") },
    { name: "刪除線", transform: s => s.split("").map(c => c + "\u0336").join("") },
    { name: "底線", transform: s => s.split("").map(c => c + "\u0332").join("") },
    { name: "波浪線", transform: s => s.split("").map(c => c + "\u0334").join("") },
    { name: "氣泡 ⓐ", transform: s => s.split("").map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCharCode(0x24b6 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCharCode(0x24d0 + code - 97);
      if (code >= 49 && code <= 57) return String.fromCharCode(0x2460 + code - 49);
      return c;
    }).join("") },
    { name: "方塊 🅰", transform: s => s.toUpperCase().split("").map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1f170 + code - 65);
      return c;
    }).join("") },
    { name: "顛倒大小寫", transform: s => s.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("") },
    { name: "火星文", transform: s => s.split("").map(c => {
      const map: Record<string, string> = { "a":"ㄚ","e":"ㄝ","i":"一","o":"歐","u":"嗚","的":"D","你":"U","好":"嗨","是":"4","不":"8" };
      return map[c.toLowerCase()] || map[c] || c;
    }).join("") },
  ];

  const copy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="輸入文字..." className="tool-textarea" />
      <div className="space-y-2">
        {styles.map((s, i) => {
          const result = s.transform(input);
          return (
            <div key={i} className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <span className="text-xs font-medium text-muted-foreground w-20 shrink-0">{s.name}</span>
              <span className="flex-1 break-all text-sm">{result}</span>
              <button onClick={() => copy(result)} className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground shrink-0">複製</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const KAOMOJI: Record<string, string[]> = {
  "開心": ["(◕‿◕)", "(´∀｀)", "(*^▽^*)", "ヽ(´▽`)/", "(◠‿◠)", "(✿◠‿◠)", "ʕ•ᴥ•ʔ", "(* ´ ▽ ` *)", "(＾▽＾)", "(✯◡✯)"],
  "難過": ["(╥﹏╥)", "(；﹏；)", "(T_T)", "(っ˘̩╭╮˘̩)っ", "(´；ω；`)", "(ノ_<。)", "ಥ_ಥ", "(◞‸◟)", "(つω`)", "ʕ´•ᴥ•`ʔ"],
  "生氣": ["(╬ Ò﹏Ó)", "ヽ(`Д´)ﾉ", "(╯°□°）╯︵ ┻━┻", "(눈_눈)", "(¬_¬)", "(ಠ_ಠ)", "(╯︵╰,)", "(ノಠ益ಠ)ノ", "ヽ(ｏ`皿′ｏ)ﾉ"],
  "驚訝": ["(⊙_⊙)", "(°ロ°)", "Σ(°△°||)", "(゜o゜)", "(ﾟдﾟ；)", "(￣□￣;)", "Σ( ° △ °|||)", "(°〇°；)"],
  "愛心": ["(♥‿♥)", "(*♡∀♡)", "(◍•ᴗ•◍)❤", "ʕ♡ᴥ♡ʔ", "(❤ω❤)", "(♡˙︶˙♡)", "(´｡• ᵕ •｡`) ♡", "♡(˃͈ દ ˂͈ ༶ )"],
  "可愛": ["(´･ω･`)", "(=^･ω･^=)", "ʕ•ᴥ•ʔ", "(◕ᴗ◕✿)", "(´｡• ω •｡`)", "(◍•ᴗ•◍)", "( ´ ▽ ` )ﾉ", "(*ﾟーﾟ)"],
  "聳肩": ["¯\\_(ツ)_/¯", "¯\\_(⊙_ʖ⊙)_/¯", "ʅ(́◡◝)ʃ", "( ͡° ͜ʖ ͡°)", "(￣ヘ￣)"],
  "舉手": ["ヽ(￣д￣;)ノ", "ヽ(°〇°)ﾉ", "ヽ(´∀`)ノ", "＼(^o^)／", "ヽ(>∀<☆)ノ"],
};

function AsciiFace() {
  const [tab, setTab] = useState<keyof typeof KAOMOJI>("開心");
  const [copied, setCopied] = useState("");

  const copy = (k: string) => {
    navigator.clipboard.writeText(k);
    setCopied(k);
    setTimeout(() => setCopied(""), 1200);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(KAOMOJI).map(k => (
          <button
            key={k}
            onClick={() => setTab(k as keyof typeof KAOMOJI)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${tab === k ? "bg-primary text-primary-foreground" : "bg-card border hover:bg-muted"}`}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {KAOMOJI[tab].map((face, i) => (
          <button
            key={i}
            onClick={() => copy(face)}
            className="p-3 rounded-lg border bg-card hover:bg-muted text-center transition-colors relative"
          >
            <span className="text-lg font-mono">{face}</span>
            {copied === face && <span className="absolute top-1 right-2 text-xs text-primary">✓ 已複製</span>}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">點擊顏文字即可複製到剪貼簿</p>
    </div>
  );
}

const NICKNAME_PARTS = {
  adj: ["快樂的", "神祕的", "勇敢的", "孤獨的", "可愛的", "優雅的", "瘋狂的", "閃亮的", "夢幻的", "傳說中的", "迷你", "超級", "黑暗", "永恆的", "微笑的", "懶惰的", "勤奮的", "安靜的"],
  noun: ["小貓", "獨角獸", "鳳凰", "騎士", "巫師", "戰士", "公主", "王子", "刺客", "獵人", "魔法師", "音樂家", "詩人", "夢想家", "旅人", "島嶼", "星辰", "月光", "晚霞", "雪花", "海浪"],
  suffix: ["大師", "之神", "君", "醬", "桑", "X", "Pro", "King", "Queen", "007", "9527", "·改", "II", "III", "Lv99"],
};

function NicknameGen() {
  const [list, setList] = useState<string[]>([]);
  const [count, setCount] = useState(10);
  const [withSuffix, setWithSuffix] = useState(true);

  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

  const gen = () => {
    const out: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = pick(NICKNAME_PARTS.adj) + pick(NICKNAME_PARTS.noun) + (withSuffix && Math.random() > 0.4 ? pick(NICKNAME_PARTS.suffix) : "");
      out.push(name);
    }
    setList(out);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <label className="tool-label mb-0">數量:</label>
          <input type="number" min="1" max="50" value={count} onChange={e => setCount(+e.target.value)} className="w-20 rounded-lg border bg-card p-2 text-sm" />
        </div>
        <label className="flex items-center gap-1 text-sm cursor-pointer">
          <input type="checkbox" checked={withSuffix} onChange={e => setWithSuffix(e.target.checked)} />
          加入後綴
        </label>
        <button onClick={gen} className="tool-btn ml-auto">✨ 產生暱稱</button>
      </div>
      {list.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {list.map((n, i) => (
            <button
              key={i}
              onClick={() => navigator.clipboard.writeText(n)}
              className="p-3 rounded-lg border bg-card hover:bg-muted transition-colors text-left"
              title="點擊複製"
            >
              <span className="text-sm font-medium">{n}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const FORTUNES = [
  "今天會有意想不到的好事發生 ✨",
  "你的努力即將開花結果 🌸",
  "貴人就在身邊，記得抬頭看看",
  "保持微笑，世界會對你溫柔",
  "今天適合嘗試新事物",
  "勇敢說出你的想法",
  "你比想像中更強大 💪",
  "好運已經在路上了",
  "今天適合休息，別太勉強自己",
  "舊朋友會帶來新驚喜",
  "投資自己永遠是最好的選擇",
  "今天適合做一個重要的決定",
  "你的善意會被加倍回報",
  "別忘了感謝身邊的人",
  "今天會收到好消息 📩",
  "保持初心，繼續前行",
  "失敗只是成功的前奏",
  "今天適合整理思緒，放下過去",
  "你值得擁有更好的一切",
  "相信自己的直覺",
];

function FortuneCookie() {
  const [fortune, setFortune] = useState("");
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true);
    setFortune(FORTUNES[Math.floor(Math.random() * FORTUNES.length)]);
  };

  const reset = () => {
    setOpened(false);
    setFortune("");
  };

  return (
    <div className="space-y-4 text-center py-6">
      {!opened ? (
        <>
          <div className="text-7xl animate-pulse cursor-pointer" onClick={open}>🥠</div>
          <button onClick={open} className="tool-btn text-lg px-8 py-3">敲開幸運餅乾</button>
        </>
      ) : (
        <div className="space-y-4 animate-scale-in">
          <div className="text-5xl">🥠✨</div>
          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 p-6">
            <p className="text-xl font-medium leading-relaxed">{fortune}</p>
          </div>
          <button onClick={reset} className="tool-btn-secondary">再來一個</button>
        </div>
      )}
    </div>
  );
}

export const FunToolsExtra = {
  NamePicker,
  MemeText,
  AsciiFace,
  NicknameGen,
  FortuneCookie,
};
