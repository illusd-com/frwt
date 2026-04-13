import { useState } from "react";

function RoiCalc() {
  const [investment, setInvestment] = useState("");
  const [revenue, setRevenue] = useState("");

  const inv = parseFloat(investment) || 0;
  const rev = parseFloat(revenue) || 0;
  const roi = inv > 0 ? ((rev - inv) / inv) * 100 : 0;

  return (
    <div className="space-y-4">
      <div><label className="tool-label">投資金額</label><input type="number" value={investment} onChange={e => setInvestment(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">回收金額</label><input type="number" value={revenue} onChange={e => setRevenue(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      {inv > 0 && (
        <div className="tool-result text-center">
          <div className="text-3xl font-bold">{roi.toFixed(1)}%</div>
          <div className="text-sm text-muted-foreground">投資報酬率 (ROI)</div>
          <div className="text-sm mt-2">淨利潤: {(rev - inv).toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}

function SalaryCalc() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"yearly" | "monthly" | "hourly">("monthly");

  const a = parseFloat(amount) || 0;
  const yearly = type === "yearly" ? a : type === "monthly" ? a * 12 : a * 8 * 22 * 12;
  const monthly = yearly / 12;
  const daily = yearly / 260;
  const hourly = daily / 8;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {([["yearly", "年薪"], ["monthly", "月薪"], ["hourly", "時薪"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setType(k)} className={`px-3 py-1.5 rounded-lg text-sm ${type === k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{l}</button>
        ))}
      </div>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder={`輸入${type === "yearly" ? "年薪" : type === "monthly" ? "月薪" : "時薪"}...`} className="w-full rounded-lg border bg-card p-3 text-sm" />
      {a > 0 && (
        <div className="grid grid-cols-2 gap-3 text-center">
          {[["年薪", yearly], ["月薪", monthly], ["日薪", daily], ["時薪", hourly]].map(([l, v]) => (
            <div key={l as string} className="rounded-lg border bg-card p-3"><div className="text-lg font-bold">${(v as number).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div><div className="text-xs text-muted-foreground">{l}</div></div>
          ))}
        </div>
      )}
    </div>
  );
}

function MeetingCost() {
  const [people, setPeople] = useState("5");
  const [hourlyRate, setHourlyRate] = useState("500");
  const [duration, setDuration] = useState("60");

  const cost = (parseInt(people) || 0) * (parseInt(hourlyRate) || 0) * ((parseInt(duration) || 0) / 60);

  return (
    <div className="space-y-4">
      <div><label className="tool-label">參與人數</label><input type="number" value={people} onChange={e => setPeople(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">每人時薪 (NT$)</label><input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">會議時長 (分鐘)</label><input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div className="tool-result text-center">
        <div className="text-3xl font-bold">NT$ {cost.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">會議總成本</div>
      </div>
    </div>
  );
}

function BreakEvenCalc() {
  const [fixedCost, setFixedCost] = useState("");
  const [price, setPrice] = useState("");
  const [variableCost, setVariableCost] = useState("");

  const fc = parseFloat(fixedCost) || 0;
  const p = parseFloat(price) || 0;
  const vc = parseFloat(variableCost) || 0;
  const units = p > vc ? Math.ceil(fc / (p - vc)) : 0;
  const revenue = units * p;

  return (
    <div className="space-y-4">
      <div><label className="tool-label">固定成本</label><input type="number" value={fixedCost} onChange={e => setFixedCost(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">單位售價</label><input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">單位變動成本</label><input type="number" value={variableCost} onChange={e => setVariableCost(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      {units > 0 && (
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg border bg-card p-3"><div className="text-2xl font-bold">{units.toLocaleString()}</div><div className="text-xs text-muted-foreground">損益平衡數量</div></div>
          <div className="rounded-lg border bg-card p-3"><div className="text-2xl font-bold">${revenue.toLocaleString()}</div><div className="text-xs text-muted-foreground">損益平衡營收</div></div>
        </div>
      )}
    </div>
  );
}

export const BusinessTools = {
  RoiCalc,
  SalaryCalc,
  MeetingCost,
  BreakEvenCalc,
};
