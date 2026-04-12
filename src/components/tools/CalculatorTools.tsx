import { useState } from "react";

function PercentageCalc() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-muted/50 p-4 space-y-3">
        <p className="text-sm font-medium">X 是 Y 的百分之幾？</p>
        <div className="flex items-center gap-2 flex-wrap">
          <input type="number" className="w-24 rounded-lg border bg-card p-2 text-sm" value={a} onChange={e => setA(e.target.value)} placeholder="X" />
          <span className="text-sm text-muted-foreground">是</span>
          <input type="number" className="w-24 rounded-lg border bg-card p-2 text-sm" value={b} onChange={e => setB(e.target.value)} placeholder="Y" />
          <span className="text-sm text-muted-foreground">的</span>
          <span className="font-bold text-primary">{a && b && Number(b) !== 0 ? (Number(a) / Number(b) * 100).toFixed(2) + "%" : "—"}</span>
        </div>
      </div>
      <div className="rounded-lg bg-muted/50 p-4 space-y-3">
        <p className="text-sm font-medium">Y 的 X% 是多少？</p>
        <div className="flex items-center gap-2 flex-wrap">
          <input type="number" className="w-24 rounded-lg border bg-card p-2 text-sm" placeholder="Y" id="pc-y" />
          <span className="text-sm text-muted-foreground">的</span>
          <input type="number" className="w-24 rounded-lg border bg-card p-2 text-sm" placeholder="X%" id="pc-x" />
          <span className="text-sm text-muted-foreground">% =</span>
          <span className="font-bold text-primary" id="pc-result">—</span>
        </div>
      </div>
    </div>
  );
}

function BmiCalc() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const h = parseFloat(height) / 100;
  const w = parseFloat(weight);
  const bmi = h > 0 && w > 0 ? w / (h * h) : NaN;

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "過輕", color: "text-blue-600" };
    if (bmi < 24) return { label: "正常", color: "text-green-600" };
    if (bmi < 27) return { label: "過重", color: "text-yellow-600" };
    return { label: "肥胖", color: "text-destructive" };
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">身高 (cm)</label>
          <input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={height} onChange={e => setHeight(e.target.value)} placeholder="170" />
        </div>
        <div>
          <label className="tool-label">體重 (kg)</label>
          <input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={weight} onChange={e => setWeight(e.target.value)} placeholder="65" />
        </div>
      </div>
      {!isNaN(bmi) && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <div className="text-xs text-muted-foreground">BMI</div>
            <div className="text-3xl font-bold text-primary">{bmi.toFixed(1)}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <div className="text-xs text-muted-foreground">分類</div>
            <div className={`text-2xl font-bold ${getCategory(bmi).color}`}>{getCategory(bmi).label}</div>
          </div>
        </div>
      )}
      <div className="text-xs text-muted-foreground">
        BMI 分類（台灣標準）：過輕 &lt;18.5 / 正常 18.5-24 / 過重 24-27 / 肥胖 &gt;27
      </div>
    </div>
  );
}

function AgeCalc() {
  const [birth, setBirth] = useState("");
  const now = new Date();
  const birthDate = birth ? new Date(birth) : null;

  let years = 0, months = 0, days = 0, totalDays = 0;
  if (birthDate && birthDate < now) {
    totalDays = Math.floor((now.getTime() - birthDate.getTime()) / 86400000);
    years = now.getFullYear() - birthDate.getFullYear();
    months = now.getMonth() - birthDate.getMonth();
    days = now.getDate() - birthDate.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">出生日期</label>
        <input type="date" className="w-full rounded-lg border bg-card p-2 text-sm" value={birth} onChange={e => setBirth(e.target.value)} />
      </div>
      {birthDate && birthDate < now && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[["年", years], ["月", months], ["日", days], ["總天數", totalDays]].map(([label, val]) => (
            <div key={label as string} className="rounded-lg bg-muted/50 p-3 text-center">
              <div className="text-2xl font-bold text-primary">{val}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DiscountCalc() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const p = parseFloat(price);
  const d = parseFloat(discount);
  const saved = p * d / 100;
  const final_ = p - saved;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">原價</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={price} onChange={e => setPrice(e.target.value)} placeholder="1000" /></div>
        <div><label className="tool-label">折扣 (%)</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="20" /></div>
      </div>
      {!isNaN(saved) && !isNaN(final_) && p > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <div className="text-xs text-muted-foreground">節省金額</div>
            <div className="text-2xl font-bold text-green-600">${saved.toFixed(0)}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <div className="text-xs text-muted-foreground">最終價格</div>
            <div className="text-2xl font-bold text-primary">${final_.toFixed(0)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function TipCalc() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("15");
  const [people, setPeople] = useState("1");

  const b = parseFloat(bill);
  const t = parseFloat(tip);
  const p = parseInt(people) || 1;
  const tipAmount = b * t / 100;
  const total = b + tipAmount;
  const perPerson = total / p;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div><label className="tool-label">帳單金額</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={bill} onChange={e => setBill(e.target.value)} placeholder="500" /></div>
        <div><label className="tool-label">小費 (%)</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={tip} onChange={e => setTip(e.target.value)} /></div>
        <div><label className="tool-label">人數</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={people} onChange={e => setPeople(e.target.value)} min={1} /></div>
      </div>
      {!isNaN(b) && b > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="text-xs text-muted-foreground">小費</div>
            <div className="font-bold text-primary">${tipAmount.toFixed(0)}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="text-xs text-muted-foreground">總計</div>
            <div className="font-bold text-primary">${total.toFixed(0)}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="text-xs text-muted-foreground">每人</div>
            <div className="font-bold text-primary">${perPerson.toFixed(0)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoanCalc() {
  const [principal, setPrincipal] = useState("1000000");
  const [rate, setRate] = useState("3");
  const [years, setYears] = useState("20");

  const p = parseFloat(principal);
  const r = parseFloat(rate) / 100 / 12;
  const n = parseInt(years) * 12;
  const monthly = r > 0 ? p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : p / n;
  const totalPayment = monthly * n;
  const totalInterest = totalPayment - p;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div><label className="tool-label">貸款金額</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={principal} onChange={e => setPrincipal(e.target.value)} /></div>
        <div><label className="tool-label">年利率 (%)</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={rate} onChange={e => setRate(e.target.value)} step="0.1" /></div>
        <div><label className="tool-label">年限</label><input type="number" className="w-full rounded-lg border bg-card p-2 text-sm" value={years} onChange={e => setYears(e.target.value)} /></div>
      </div>
      {!isNaN(monthly) && p > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <div className="text-xs text-muted-foreground">每月還款</div>
            <div className="text-xl font-bold text-primary">${Math.round(monthly).toLocaleString()}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <div className="text-xs text-muted-foreground">總還款金額</div>
            <div className="text-xl font-bold">${Math.round(totalPayment).toLocaleString()}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <div className="text-xs text-muted-foreground">總利息</div>
            <div className="text-xl font-bold text-destructive">${Math.round(totalInterest).toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export const CalculatorTools = { PercentageCalc, BmiCalc, AgeCalc, DiscountCalc, TipCalc, LoanCalc };
