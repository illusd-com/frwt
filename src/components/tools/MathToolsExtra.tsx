import { useState } from "react";

function EquationSolver() {
  const [eqType, setEqType] = useState<"linear" | "quadratic" | "system">("linear");
  const [a, setA] = useState(""); const [b, setB] = useState(""); const [c, setC] = useState("");
  const [d, setD] = useState(""); const [e, setE] = useState(""); const [f, setF] = useState("");

  const solveLinear = () => {
    const na = parseFloat(a) || 0, nb = parseFloat(b) || 0;
    if (na === 0) return "無解（a 不能為 0）";
    return `x = ${(-nb / na).toFixed(6)}`;
  };

  const solveQuadratic = () => {
    const na = parseFloat(a) || 0, nb = parseFloat(b) || 0, nc = parseFloat(c) || 0;
    if (na === 0) return "a 不能為 0";
    const disc = nb * nb - 4 * na * nc;
    if (disc < 0) return `x = ${(-nb / (2 * na)).toFixed(4)} ± ${(Math.sqrt(-disc) / (2 * na)).toFixed(4)}i（複數根）`;
    if (disc === 0) return `x = ${(-nb / (2 * na)).toFixed(6)}（重根）`;
    const x1 = (-nb + Math.sqrt(disc)) / (2 * na);
    const x2 = (-nb - Math.sqrt(disc)) / (2 * na);
    return `x₁ = ${x1.toFixed(6)}\nx₂ = ${x2.toFixed(6)}`;
  };

  const solveSystem = () => {
    const na = parseFloat(a) || 0, nb = parseFloat(b) || 0, nc = parseFloat(c) || 0;
    const nd = parseFloat(d) || 0, ne = parseFloat(e) || 0, nf = parseFloat(f) || 0;
    const det = na * ne - nb * nd;
    if (det === 0) return "無唯一解";
    const x = (nc * ne - nb * nf) / det;
    const y = (na * nf - nc * nd) / det;
    return `x = ${x.toFixed(6)}\ny = ${y.toFixed(6)}`;
  };

  const result = eqType === "linear" ? solveLinear() : eqType === "quadratic" ? solveQuadratic() : solveSystem();
  const hasInput = a || b || c;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {([["linear", "一元一次 ax+b=0"], ["quadratic", "一元二次 ax²+bx+c=0"], ["system", "二元一次聯立"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => { setEqType(k); setA(""); setB(""); setC(""); setD(""); setE(""); setF(""); }}
            className={`px-3 py-1.5 rounded-lg text-xs ${eqType === k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{l}</button>
        ))}
      </div>
      {eqType === "linear" && (
        <div className="flex items-center gap-2">
          <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="a" className="w-20 rounded border bg-card p-2 text-sm text-center" />
          <span>x +</span>
          <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="b" className="w-20 rounded border bg-card p-2 text-sm text-center" />
          <span>= 0</span>
        </div>
      )}
      {eqType === "quadratic" && (
        <div className="flex items-center gap-2 flex-wrap">
          <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="a" className="w-16 rounded border bg-card p-2 text-sm text-center" />
          <span>x² +</span>
          <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="b" className="w-16 rounded border bg-card p-2 text-sm text-center" />
          <span>x +</span>
          <input type="number" value={c} onChange={e => setC(e.target.value)} placeholder="c" className="w-16 rounded border bg-card p-2 text-sm text-center" />
          <span>= 0</span>
        </div>
      )}
      {eqType === "system" && (
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="a" className="w-16 rounded border bg-card p-2 text-center" />
            <span>x +</span>
            <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="b" className="w-16 rounded border bg-card p-2 text-center" />
            <span>y =</span>
            <input type="number" value={c} onChange={e => setC(e.target.value)} placeholder="c" className="w-16 rounded border bg-card p-2 text-center" />
          </div>
          <div className="flex items-center gap-2">
            <input type="number" value={d} onChange={e => setD(e.target.value)} placeholder="d" className="w-16 rounded border bg-card p-2 text-center" />
            <span>x +</span>
            <input type="number" value={e} onChange={ev => setE(ev.target.value)} placeholder="e" className="w-16 rounded border bg-card p-2 text-center" />
            <span>y =</span>
            <input type="number" value={f} onChange={e => setF(e.target.value)} placeholder="f" className="w-16 rounded border bg-card p-2 text-center" />
          </div>
        </div>
      )}
      {hasInput && <div className="tool-result whitespace-pre-wrap font-mono">{result}</div>}
    </div>
  );
}

function MatrixCalc() {
  const [size, setSize] = useState(3);
  const empty = () => Array.from({ length: size }, () => Array(size).fill(0));
  const [matA, setMatA] = useState(empty);
  const [matB, setMatB] = useState(empty);
  const [op, setOp] = useState<"add" | "sub" | "mul" | "det" | "inv">("add");

  const updateCell = (mat: number[][], setMat: Function, r: number, c: number, v: string) => {
    const copy = mat.map(row => [...row]);
    copy[r][c] = parseFloat(v) || 0;
    setMat(copy);
  };

  const add = (a: number[][], b: number[][]) => a.map((row, i) => row.map((v, j) => v + b[i][j]));
  const sub = (a: number[][], b: number[][]) => a.map((row, i) => row.map((v, j) => v - b[i][j]));
  const mul = (a: number[][], b: number[][]) => {
    const n = a.length;
    return Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) =>
        a[i].reduce((sum, _, k) => sum + a[i][k] * b[k][j], 0)
      )
    );
  };
  const det = (m: number[][]): number => {
    const n = m.length;
    if (n === 1) return m[0][0];
    if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    return m[0].reduce((sum, val, j) => {
      const sub = m.slice(1).map(row => [...row.slice(0, j), ...row.slice(j + 1)]);
      return sum + val * (j % 2 === 0 ? 1 : -1) * det(sub);
    }, 0);
  };

  const getResult = () => {
    if (op === "add") return add(matA, matB);
    if (op === "sub") return sub(matA, matB);
    if (op === "mul") return mul(matA, matB);
    if (op === "det") return det(matA);
    return null;
  };

  const result = getResult();

  const renderMatrix = (mat: number[][], setMat: Function, label: string) => (
    <div>
      <label className="tool-label">{label}</label>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {mat.map((row, i) => row.map((v, j) => (
          <input key={`${i}-${j}`} type="number" value={v || ""} onChange={e => updateCell(mat, setMat, i, j, e.target.value)}
            className="w-full rounded border bg-card p-1.5 text-center text-sm font-mono" />
        )))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="tool-label">矩陣大小</label>
        <select value={size} onChange={e => { const s = +e.target.value; setSize(s); setMatA(Array.from({ length: s }, () => Array(s).fill(0))); setMatB(Array.from({ length: s }, () => Array(s).fill(0))); }}
          className="rounded border bg-card p-2 text-sm">
          {[2, 3, 4].map(n => <option key={n} value={n}>{n}×{n}</option>)}
        </select>
      </div>
      <div className="flex gap-2 flex-wrap">
        {([["add", "A + B"], ["sub", "A - B"], ["mul", "A × B"], ["det", "det(A)"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setOp(k)} className={`px-3 py-1.5 rounded-lg text-sm ${op === k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{l}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderMatrix(matA, setMatA, "矩陣 A")}
        {op !== "det" && renderMatrix(matB, setMatB, "矩陣 B")}
      </div>
      {result !== null && (
        <div className="tool-result">
          <label className="tool-label">結果</label>
          {typeof result === "number" ? (
            <div className="text-2xl font-bold text-center font-mono">{result}</div>
          ) : (
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
              {(result as number[][]).map((row, i) => row.map((v, j) => (
                <div key={`${i}-${j}`} className="rounded bg-muted/50 p-2 text-center font-mono text-sm">{v.toFixed(2)}</div>
              )))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FactorialCalc() {
  const [num, setNum] = useState("");
  const n = parseInt(num);
  const factorial = (x: number): bigint => x <= 1 ? 1n : BigInt(x) * factorial(x - 1);
  const valid = !isNaN(n) && n >= 0 && n <= 170;

  return (
    <div className="space-y-4">
      <input type="number" value={num} onChange={e => setNum(e.target.value)} placeholder="輸入非負整數（0-170）..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      {valid && (
        <div className="tool-result text-center">
          <div className="text-sm text-muted-foreground">{n}! =</div>
          <div className="text-lg font-bold font-mono break-all">{n <= 20 ? factorial(n).toString() : Number(factorial(n)).toExponential(6)}</div>
        </div>
      )}
    </div>
  );
}

function QuadraticSolver() {
  const [a, setA] = useState("1"); const [b, setB] = useState("-5"); const [c, setC] = useState("6");
  const na = parseFloat(a) || 0, nb = parseFloat(b) || 0, nc = parseFloat(c) || 0;
  const disc = nb * nb - 4 * na * nc;
  const vertex = na !== 0 ? { x: -nb / (2 * na), y: nc - nb * nb / (4 * na) } : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <input type="number" value={a} onChange={e => setA(e.target.value)} className="w-16 rounded border bg-card p-2 text-sm text-center" />
        <span>x² +</span>
        <input type="number" value={b} onChange={e => setB(e.target.value)} className="w-16 rounded border bg-card p-2 text-sm text-center" />
        <span>x +</span>
        <input type="number" value={c} onChange={e => setC(e.target.value)} className="w-16 rounded border bg-card p-2 text-sm text-center" />
        <span>= 0</span>
      </div>
      {na !== 0 && (
        <div className="space-y-3">
          <div className="tool-result">
            <div className="text-sm text-muted-foreground mb-1">判別式 Δ = {disc.toFixed(4)}</div>
            {disc > 0 && (
              <div className="font-mono">
                <div>x₁ = {((-nb + Math.sqrt(disc)) / (2 * na)).toFixed(6)}</div>
                <div>x₂ = {((-nb - Math.sqrt(disc)) / (2 * na)).toFixed(6)}</div>
              </div>
            )}
            {disc === 0 && <div className="font-mono">x = {(-nb / (2 * na)).toFixed(6)}（重根）</div>}
            {disc < 0 && (
              <div className="font-mono">
                <div>x₁ = {(-nb / (2 * na)).toFixed(4)} + {(Math.sqrt(-disc) / (2 * na)).toFixed(4)}i</div>
                <div>x₂ = {(-nb / (2 * na)).toFixed(4)} - {(Math.sqrt(-disc) / (2 * na)).toFixed(4)}i</div>
              </div>
            )}
          </div>
          {vertex && (
            <div className="rounded-lg border bg-card p-3 text-sm">
              <div className="font-medium mb-1">頂點座標</div>
              <div className="font-mono">({vertex.x.toFixed(4)}, {vertex.y.toFixed(4)})</div>
              <div className="text-muted-foreground mt-1">拋物線{na > 0 ? "開口朝上" : "開口朝下"}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function UnitCircle() {
  const [angle, setAngle] = useState(45);
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad), sin = Math.sin(rad), tan = sin / cos;

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">角度: {angle}°（{(rad).toFixed(4)} rad）</label>
        <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(+e.target.value)} className="w-full" />
      </div>
      <div className="flex justify-center">
        <svg viewBox="-140 -140 280 280" className="w-64 h-64">
          <circle cx="0" cy="0" r="100" fill="none" stroke="currentColor" opacity="0.2" strokeWidth="1" />
          <line x1="-120" y1="0" x2="120" y2="0" stroke="currentColor" opacity="0.15" strokeWidth="1" />
          <line x1="0" y1="-120" x2="0" y2="120" stroke="currentColor" opacity="0.15" strokeWidth="1" />
          <line x1="0" y1="0" x2={cos * 100} y2={-sin * 100} stroke="oklch(0.6 0.2 260)" strokeWidth="2" />
          <circle cx={cos * 100} cy={-sin * 100} r="4" fill="oklch(0.6 0.2 260)" />
          <line x1={cos * 100} y1="0" x2={cos * 100} y2={-sin * 100} stroke="oklch(0.6 0.15 150)" strokeWidth="1.5" strokeDasharray="4" />
          <line x1="0" y1={-sin * 100} x2={cos * 100} y2={-sin * 100} stroke="oklch(0.6 0.15 30)" strokeWidth="1.5" strokeDasharray="4" />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        {[["sin", sin], ["cos", cos], ["tan", Math.abs(cos) < 1e-10 ? "∞" : tan]].map(([label, val]) => (
          <div key={label as string} className="rounded-lg border bg-card p-3">
            <div className="text-lg font-bold font-mono">{typeof val === "number" ? val.toFixed(6) : val}</div>
            <div className="text-xs text-muted-foreground">{label}({angle}°)</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BinaryCalc() {
  const [a, setA] = useState(""); const [b, setB] = useState("");
  const [op, setOp] = useState<"+" | "-" | "×" | "&" | "|" | "^">("+");
  const na = parseInt(a, 2), nb = parseInt(b, 2);
  const valid = !isNaN(na) && !isNaN(nb);

  const calc = () => {
    switch (op) {
      case "+": return na + nb;
      case "-": return na - nb;
      case "×": return na * nb;
      case "&": return na & nb;
      case "|": return na | nb;
      case "^": return na ^ nb;
    }
  };

  return (
    <div className="space-y-4">
      <input value={a} onChange={e => setA(e.target.value.replace(/[^01]/g, ""))} placeholder="輸入二進位數 A..." className="w-full rounded-lg border bg-card p-3 text-sm font-mono" />
      <div className="flex gap-2 justify-center">
        {(["+", "-", "×", "&", "|", "^"] as const).map(o => (
          <button key={o} onClick={() => setOp(o)} className={`w-10 h-10 rounded-lg text-sm font-bold ${op === o ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{o}</button>
        ))}
      </div>
      <input value={b} onChange={e => setB(e.target.value.replace(/[^01]/g, ""))} placeholder="輸入二進位數 B..." className="w-full rounded-lg border bg-card p-3 text-sm font-mono" />
      {valid && a && b && (
        <div className="tool-result text-center">
          <div className="text-sm text-muted-foreground">結果</div>
          <div className="text-xl font-bold font-mono">{(calc() >>> 0).toString(2)}</div>
          <div className="text-sm text-muted-foreground mt-1">十進位: {calc()}</div>
        </div>
      )}
    </div>
  );
}

export const MathToolsExtra = { EquationSolver, MatrixCalc, FactorialCalc, QuadraticSolver, UnitCircle, BinaryCalc };
