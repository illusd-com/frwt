import { useState } from "react";

function ScientificCalc() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");

  const calc = () => {
    try {
      const sanitized = expr
        .replace(/sin/g, "Math.sin").replace(/cos/g, "Math.cos").replace(/tan/g, "Math.tan")
        .replace(/sqrt/g, "Math.sqrt").replace(/log/g, "Math.log10").replace(/ln/g, "Math.log")
        .replace(/pi/gi, "Math.PI").replace(/e(?![a-z])/gi, "Math.E")
        .replace(/\^/g, "**");
      const fn = new Function(`return ${sanitized}`);
      setResult(String(fn()));
    } catch { setResult("計算錯誤"); }
  };

  const buttons = ["7", "8", "9", "+", "sin(", "4", "5", "6", "-", "cos(", "1", "2", "3", "*", "tan(", "0", ".", "(", "/", ")", "^", "sqrt(", "pi", "C", "="];

  const handle = (b: string) => {
    if (b === "=") calc();
    else if (b === "C") { setExpr(""); setResult(""); }
    else setExpr(e => e + b);
  };

  return (
    <div className="space-y-3">
      <input type="text" value={expr} onChange={e => setExpr(e.target.value)} className="w-full rounded-lg border bg-card p-3 text-right text-lg font-mono" placeholder="0" />
      {result && <div className="text-right text-2xl font-mono font-bold text-primary">{result}</div>}
      <div className="grid grid-cols-5 gap-1">
        {buttons.map(b => (
          <button key={b} onClick={() => handle(b)} className={`p-3 rounded-lg text-sm font-medium ${b === "=" ? "bg-primary text-primary-foreground" : b === "C" ? "bg-destructive text-destructive-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>{b}</button>
        ))}
      </div>
    </div>
  );
}

function PrimeChecker() {
  const [num, setNum] = useState("");
  const isPrime = (n: number) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
    return true;
  };
  const n = parseInt(num);
  const valid = !isNaN(n) && n > 0;

  return (
    <div className="space-y-4">
      <input type="number" value={num} onChange={e => setNum(e.target.value)} placeholder="輸入數字..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      {valid && (
        <div className="tool-result text-center text-lg">
          {n} {isPrime(n) ? "✅ 是質數" : "❌ 不是質數"}
          {!isPrime(n) && n > 1 && (
            <div className="text-sm text-muted-foreground mt-2">
              因數: {Array.from({ length: n }, (_, i) => i + 1).filter(i => n % i === 0).join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GcdLcm() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  const na = parseInt(a), nb = parseInt(b);
  const valid = !isNaN(na) && !isNaN(nb) && na > 0 && nb > 0;
  const g = valid ? gcd(na, nb) : 0;
  const l = valid ? (na * nb) / g : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="數字 A" className="rounded-lg border bg-card p-3 text-sm" />
        <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="數字 B" className="rounded-lg border bg-card p-3 text-sm" />
      </div>
      {valid && (
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg border bg-card p-4"><div className="text-2xl font-bold">{g}</div><div className="text-xs text-muted-foreground">最大公因數 (GCD)</div></div>
          <div className="rounded-lg border bg-card p-4"><div className="text-2xl font-bold">{l}</div><div className="text-xs text-muted-foreground">最小公倍數 (LCM)</div></div>
        </div>
      )}
    </div>
  );
}

function StatisticsCalc() {
  const [input, setInput] = useState("85, 92, 78, 95, 88, 76, 90, 82");

  const nums = input.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = n > 0 ? sum / n : 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const median = n > 0 ? (n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)]) : 0;
  const variance = n > 0 ? nums.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n : 0;
  const stdDev = Math.sqrt(variance);

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="輸入數字（逗號或空格分隔）" className="tool-textarea" />
      {n > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            ["數量", n], ["總和", sum.toFixed(2)], ["平均值", mean.toFixed(2)],
            ["中位數", median.toFixed(2)], ["最小值", Math.min(...nums)], ["最大值", Math.max(...nums)],
            ["範圍", (Math.max(...nums) - Math.min(...nums)).toFixed(2)], ["變異數", variance.toFixed(2)], ["標準差", stdDev.toFixed(2)],
          ].map(([label, val]) => (
            <div key={label as string} className="rounded-lg border bg-card p-3 text-center">
              <div className="text-lg font-bold">{val}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FibonacciGen() {
  const [count, setCount] = useState(20);
  const fib: number[] = [];
  for (let i = 0; i < count; i++) {
    fib.push(i <= 1 ? i : fib[i - 1] + fib[i - 2]);
  }

  return (
    <div className="space-y-4">
      <div><label className="tool-label">產生數量</label><input type="number" min="1" max="50" value={count} onChange={e => setCount(+e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div className="flex flex-wrap gap-2">
        {fib.map((n, i) => (
          <span key={i} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-mono">{n}</span>
        ))}
      </div>
    </div>
  );
}

function PermutationCalc() {
  const [n, setN] = useState("10");
  const [r, setR] = useState("3");

  const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);
  const nn = parseInt(n), rr = parseInt(r);
  const valid = !isNaN(nn) && !isNaN(rr) && nn >= rr && nn >= 0;
  const perm = valid ? factorial(nn) / factorial(nn - rr) : 0;
  const comb = valid ? factorial(nn) / (factorial(rr) * factorial(nn - rr)) : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">n</label><input type="number" value={n} onChange={e => setN(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
        <div><label className="tool-label">r</label><input type="number" value={r} onChange={e => setR(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      </div>
      {valid && (
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg border bg-card p-4"><div className="text-2xl font-bold">{perm.toLocaleString()}</div><div className="text-xs text-muted-foreground">排列 P({nn},{rr})</div></div>
          <div className="rounded-lg border bg-card p-4"><div className="text-2xl font-bold">{comb.toLocaleString()}</div><div className="text-xs text-muted-foreground">組合 C({nn},{rr})</div></div>
        </div>
      )}
    </div>
  );
}

export const MathTools = {
  ScientificCalc,
  PrimeChecker,
  GcdLcm,
  StatisticsCalc,
  FibonacciGen,
  PermutationCalc,
};
