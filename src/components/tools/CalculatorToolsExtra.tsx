import { useState } from "react";

function CompoundInterest() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState("12");

  const p = +principal, r = +rate / 100, n = +freq, t = +years;
  const amount = p * Math.pow(1 + r / n, n * t);
  const interest = amount - p;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">本金</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={principal} onChange={e => setPrincipal(e.target.value)} /></div>
        <div><label className="tool-label">年利率 (%)</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={rate} onChange={e => setRate(e.target.value)} step="0.1" /></div>
        <div><label className="tool-label">年數</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={years} onChange={e => setYears(e.target.value)} /></div>
        <div><label className="tool-label">複利頻率 (次/年)</label>
          <select className="w-full rounded border bg-card p-2 text-sm" value={freq} onChange={e => setFreq(e.target.value)}>
            <option value="1">年</option><option value="4">季</option><option value="12">月</option><option value="365">日</option>
          </select>
        </div>
      </div>
      {p > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded bg-muted/50 p-4 text-center"><div className="text-xs text-muted-foreground">最終金額</div><div className="text-xl font-bold text-primary">${Math.round(amount).toLocaleString()}</div></div>
          <div className="rounded bg-muted/50 p-4 text-center"><div className="text-xs text-muted-foreground">總利息</div><div className="text-xl font-bold text-green-600">${Math.round(interest).toLocaleString()}</div></div>
          <div className="rounded bg-muted/50 p-4 text-center"><div className="text-xs text-muted-foreground">成長倍數</div><div className="text-xl font-bold">{(amount / p).toFixed(2)}x</div></div>
        </div>
      )}
    </div>
  );
}

function TaxCalc() {
  const [amount, setAmount] = useState("");
  const [taxRate, setTaxRate] = useState("5");
  const a = +amount, r = +taxRate / 100;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">金額</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={amount} onChange={e => setAmount(e.target.value)} /></div>
        <div><label className="tool-label">稅率 (%)</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={taxRate} onChange={e => setTaxRate(e.target.value)} step="0.1" /></div>
      </div>
      {a > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded bg-muted/50 p-4"><div className="text-xs text-muted-foreground">未稅 → 含稅</div><div className="font-bold">${a.toLocaleString()} → ${Math.round(a * (1 + r)).toLocaleString()}</div><div className="text-xs text-muted-foreground">稅金: ${Math.round(a * r).toLocaleString()}</div></div>
          <div className="rounded bg-muted/50 p-4"><div className="text-xs text-muted-foreground">含稅 → 未稅</div><div className="font-bold">${a.toLocaleString()} → ${Math.round(a / (1 + r)).toLocaleString()}</div><div className="text-xs text-muted-foreground">稅金: ${Math.round(a - a / (1 + r)).toLocaleString()}</div></div>
        </div>
      )}
    </div>
  );
}

function MarginCalc() {
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const c = +cost, p = +price;
  const profit = p - c;
  const margin = p > 0 ? (profit / p * 100) : 0;
  const markup = c > 0 ? (profit / c * 100) : 0;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">成本</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={cost} onChange={e => setCost(e.target.value)} /></div>
        <div><label className="tool-label">售價</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={price} onChange={e => setPrice(e.target.value)} /></div>
      </div>
      {c > 0 && p > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded bg-muted/50 p-3 text-center"><div className="text-xs text-muted-foreground">利潤</div><div className="font-bold text-primary">${profit.toLocaleString()}</div></div>
          <div className="rounded bg-muted/50 p-3 text-center"><div className="text-xs text-muted-foreground">毛利率</div><div className="font-bold">{margin.toFixed(1)}%</div></div>
          <div className="rounded bg-muted/50 p-3 text-center"><div className="text-xs text-muted-foreground">加成率</div><div className="font-bold">{markup.toFixed(1)}%</div></div>
        </div>
      )}
    </div>
  );
}

function CalorieCalc() {
  const [gender, setGender] = useState<"m" | "f">("m");
  const [age, setAge] = useState("25");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [activity, setActivity] = useState("1.55");

  const bmr = gender === "m"
    ? 88.362 + 13.397 * +weight + 4.799 * +height - 5.677 * +age
    : 447.593 + 9.247 * +weight + 3.098 * +height - 4.330 * +age;
  const tdee = bmr * +activity;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className={`tool-btn ${gender === "m" ? "" : "opacity-60"}`} onClick={() => setGender("m")}>男性</button>
        <button className={`tool-btn ${gender === "f" ? "" : "opacity-60"}`} onClick={() => setGender("f")}>女性</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="tool-label">年齡</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={age} onChange={e => setAge(e.target.value)} /></div>
        <div><label className="tool-label">體重 (kg)</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={weight} onChange={e => setWeight(e.target.value)} /></div>
        <div><label className="tool-label">身高 (cm)</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={height} onChange={e => setHeight(e.target.value)} /></div>
      </div>
      <div><label className="tool-label">活動量</label>
        <select className="w-full rounded border bg-card p-2 text-sm" value={activity} onChange={e => setActivity(e.target.value)}>
          <option value="1.2">久坐不動</option><option value="1.375">輕度活動</option><option value="1.55">中度活動</option><option value="1.725">高度活動</option><option value="1.9">極高活動</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded bg-muted/50 p-3 text-center"><div className="text-xs text-muted-foreground">BMR</div><div className="font-bold">{Math.round(bmr)} kcal</div></div>
        <div className="rounded bg-muted/50 p-3 text-center"><div className="text-xs text-muted-foreground">TDEE</div><div className="font-bold text-primary">{Math.round(tdee)} kcal</div></div>
        <div className="rounded bg-muted/50 p-3 text-center"><div className="text-xs text-muted-foreground">減重建議</div><div className="font-bold text-green-600">{Math.round(tdee - 500)} kcal</div></div>
      </div>
    </div>
  );
}

function ElectricityCalc() {
  const [watts, setWatts] = useState("1000");
  const [hours, setHours] = useState("8");
  const [days, setDays] = useState("30");
  const [rate, setRate] = useState("3.5");

  const kwh = +watts / 1000 * +hours * +days;
  const cost = kwh * +rate;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">功率 (W)</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={watts} onChange={e => setWatts(e.target.value)} /></div>
        <div><label className="tool-label">每日使用小時</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={hours} onChange={e => setHours(e.target.value)} /></div>
        <div><label className="tool-label">天數</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={days} onChange={e => setDays(e.target.value)} /></div>
        <div><label className="tool-label">電費 (元/度)</label><input type="number" className="w-full rounded border bg-card p-2 text-sm" value={rate} onChange={e => setRate(e.target.value)} step="0.1" /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded bg-muted/50 p-4 text-center"><div className="text-xs text-muted-foreground">用電量</div><div className="text-xl font-bold">{kwh.toFixed(1)} 度</div></div>
        <div className="rounded bg-muted/50 p-4 text-center"><div className="text-xs text-muted-foreground">電費</div><div className="text-xl font-bold text-primary">${Math.round(cost).toLocaleString()}</div></div>
      </div>
    </div>
  );
}

export const CalculatorToolsExtra = { CompoundInterest, TaxCalc, MarginCalc, CalorieCalc, ElectricityCalc };
