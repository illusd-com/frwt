import { useState, useCallback } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);

  const generate = () => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;
    const arr = Array.from(crypto.getRandomValues(new Uint32Array(length * 5)));
    const results: string[] = [];
    for (let i = 0; i < 5; i++) {
      results.push(arr.slice(i * length, (i + 1) * length).map(n => chars[n % chars.length]).join(""));
    }
    setPasswords(results);
  };

  const Chk = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="rounded" />{label}
    </label>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="tool-label">長度: {length}</label>
          <input type="range" min={4} max={64} value={length} onChange={e => setLength(Number(e.target.value))} className="w-40" />
        </div>
        <Chk label="大寫" checked={upper} onChange={setUpper} />
        <Chk label="小寫" checked={lower} onChange={setLower} />
        <Chk label="數字" checked={numbers} onChange={setNumbers} />
        <Chk label="符號" checked={symbols} onChange={setSymbols} />
      </div>
      <button className="tool-btn" onClick={generate}>產生密碼</button>
      {passwords.length > 0 && (
        <div className="space-y-2">
          {passwords.map((pw, i) => (
            <div key={i} className="tool-result flex items-center justify-between">
              <span className="break-all">{pw}</span>
              <button className="tool-btn-secondary text-xs py-1 px-2 ml-2 shrink-0" onClick={() => navigator.clipboard.writeText(pw)}>複製</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generate = () => {
    setUuids(Array.from({ length: count }, () => crypto.randomUUID()));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        <div>
          <label className="tool-label">數量</label>
          <input type="number" className="w-20 rounded-lg border bg-card p-2 text-sm" value={count} onChange={e => setCount(Math.min(50, Number(e.target.value)))} min={1} max={50} />
        </div>
        <button className="tool-btn" onClick={generate}>產生 UUID</button>
      </div>
      {uuids.length > 0 && (
        <div className="space-y-1">
          {uuids.map((uuid, i) => (
            <div key={i} className="tool-result flex items-center justify-between py-1.5">
              <span>{uuid}</span>
              <button className="text-xs text-primary hover:underline ml-2" onClick={() => navigator.clipboard.writeText(uuid)}>複製</button>
            </div>
          ))}
          <button className="tool-btn-secondary text-xs mt-2" onClick={() => navigator.clipboard.writeText(uuids.join("\n"))}>全部複製</button>
        </div>
      )}
    </div>
  );
}

function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    setResults(Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div><label className="tool-label">最小值</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={min} onChange={e => setMin(Number(e.target.value))} /></div>
        <div><label className="tool-label">最大值</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={max} onChange={e => setMax(Number(e.target.value))} /></div>
        <div><label className="tool-label">數量</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={count} onChange={e => setCount(Math.min(100, Number(e.target.value)))} min={1} max={100} /></div>
      </div>
      <button className="tool-btn" onClick={generate}>產生</button>
      {results.length > 0 && <div className="tool-result">{results.join(", ")}</div>}
    </div>
  );
}

function ColorGenerator() {
  const [colors, setColors] = useState<string[]>([]);

  const randomHex = () => "#" + Array.from(crypto.getRandomValues(new Uint8Array(3))).map(b => b.toString(16).padStart(2, "0")).join("");

  const generate = () => setColors(Array.from({ length: 8 }, randomHex));

  return (
    <div className="space-y-4">
      <button className="tool-btn" onClick={generate}>產生調色盤</button>
      {colors.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {colors.map((c, i) => (
            <div key={i} className="text-center cursor-pointer" onClick={() => navigator.clipboard.writeText(c)}>
              <div className="h-20 rounded-lg mb-1 border" style={{ backgroundColor: c }} />
              <span className="text-xs font-mono text-muted-foreground">{c}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoremIpsum() {
  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
  ];
  const [count, setCount] = useState(3);
  const result = Array.from({ length: count }, (_, i) => paragraphs[i % paragraphs.length]).join("\n\n");

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        <div><label className="tool-label">段落數</label><input type="number" className="w-20 rounded-lg border bg-card p-2 text-sm" value={count} onChange={e => setCount(Math.min(20, Number(e.target.value)))} min={1} max={20} /></div>
      </div>
      <div className="tool-result whitespace-pre-wrap max-h-[400px] overflow-auto">{result}</div>
      <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(result)}>複製</button>
    </div>
  );
}

function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const compute = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const results: Record<string, string> = {};
    for (const algo of ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]) {
      const hash = await crypto.subtle.digest(algo, data);
      results[algo] = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
    }
    setHashes(results);
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder="輸入文字..." />
      <button className="tool-btn" onClick={compute}>計算 Hash</button>
      {Object.keys(hashes).length > 0 && (
        <div className="space-y-2">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo}>
              <label className="tool-label">{algo}</label>
              <div className="tool-result text-xs cursor-pointer" onClick={() => navigator.clipboard.writeText(hash)}>{hash}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FakeData() {
  const [data, setData] = useState<Array<Record<string, string>>>([]);
  const lastNames = ["王","李","張","劉","陳","楊","黃","趙","吳","周","徐","孫","馬","朱","林"];
  const firstNames = ["志明","美麗","家豪","淑芬","建宏","雅婷","俊傑","怡君","宗翰","佳蓉","冠宇","雅雯","柏翰","詩涵","彥廷"];
  const cities = ["台北市","新北市","台中市","高雄市","桃園市","台南市","新竹市","基隆市","嘉義市"];
  const domains = ["gmail.com","yahoo.com.tw","hotmail.com","outlook.com"];

  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

  const generate = () => {
    setData(Array.from({ length: 10 }, () => {
      const last = pick(lastNames);
      const first = pick(firstNames);
      return {
        "姓名": last + first,
        "電話": `09${Math.floor(10000000 + Math.random() * 90000000)}`,
        "Email": `${first.toLowerCase()}${Math.floor(Math.random() * 999)}@${pick(domains)}`,
        "城市": pick(cities),
        "年齡": String(18 + Math.floor(Math.random() * 50)),
      };
    }));
  };

  return (
    <div className="space-y-4">
      <button className="tool-btn" onClick={generate}>產生假資料</button>
      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>{Object.keys(data[0]).map(k => <th key={k} className="border bg-muted/50 p-2 text-left font-medium">{k}</th>)}</tr>
            </thead>
            <tbody>
              {data.map((row, i) => <tr key={i}>{Object.values(row).map((v, j) => <td key={j} className="border p-2">{v}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CreditCardValidator() {
  const [number, setNumber] = useState("");

  const luhn = (num: string): boolean => {
    const digits = num.replace(/\D/g, "").split("").map(Number).reverse();
    const sum = digits.reduce((acc, d, i) => {
      if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
      return acc + d;
    }, 0);
    return sum % 10 === 0;
  };

  const getType = (num: string) => {
    const n = num.replace(/\D/g, "");
    if (/^4/.test(n)) return "Visa";
    if (/^5[1-5]/.test(n)) return "Mastercard";
    if (/^3[47]/.test(n)) return "American Express";
    if (/^6(?:011|5)/.test(n)) return "Discover";
    if (/^35/.test(n)) return "JCB";
    return "未知";
  };

  const clean = number.replace(/\D/g, "");
  const valid = clean.length >= 13 && luhn(clean);

  return (
    <div className="space-y-4">
      <input className="w-full rounded-lg border bg-card p-3 text-lg font-mono" value={number} onChange={e => setNumber(e.target.value)} placeholder="4111 1111 1111 1111" />
      {clean.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xs text-muted-foreground">驗證結果</div>
            <div className={`font-bold ${valid ? "text-green-600" : "text-destructive"}`}>{valid ? "✓ 有效" : "✗ 無效"}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xs text-muted-foreground">卡片類型</div>
            <div className="font-bold">{getType(clean)}</div>
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground">此工具僅驗證號碼格式（Luhn 演算法），不會驗證卡片是否真實存在。</p>
    </div>
  );
}

export const GeneratorTools = { PasswordGenerator, UuidGenerator, RandomNumber, ColorGenerator, LoremIpsum, HashGenerator, FakeData, CreditCardValidator };
