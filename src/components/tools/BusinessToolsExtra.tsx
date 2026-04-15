import { useState } from "react";

function InvoiceCalculator() {
  const [items, setItems] = useState([{ name: "商品 A", qty: 2, price: 500 }]);
  const [taxRate, setTaxRate] = useState(5);

  const addItem = () => setItems([...items, { name: "", qty: 1, price: 0 }]);
  const updateItem = (i: number, field: string, value: any) => {
    const copy = [...items];
    (copy[i] as any)[field] = value;
    setItems(copy);
  };
  const removeItem = (i: number) => setItems(items.filter((_, j) => j !== i));

  const subtotal = items.reduce((sum, it) => sum + it.qty * it.price, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input value={it.name} onChange={e => updateItem(i, "name", e.target.value)} placeholder="品名" className="flex-1 rounded border bg-card p-2 text-sm" />
          <input type="number" value={it.qty} onChange={e => updateItem(i, "qty", +e.target.value)} className="w-16 rounded border bg-card p-2 text-sm text-center" />
          <input type="number" value={it.price} onChange={e => updateItem(i, "price", +e.target.value)} className="w-24 rounded border bg-card p-2 text-sm text-center" />
          <button onClick={() => removeItem(i)} className="text-destructive text-sm px-2">✕</button>
        </div>
      ))}
      <button onClick={addItem} className="tool-btn-secondary text-sm">+ 新增項目</button>
      <div><label className="tool-label">稅率 (%)</label><input type="number" value={taxRate} onChange={e => setTaxRate(+e.target.value)} className="w-20 rounded border bg-card p-2 text-sm" /></div>
      <div className="rounded-lg border bg-card p-4 space-y-1 text-sm">
        <div className="flex justify-between"><span>小計</span><span>${subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between"><span>稅金 ({taxRate}%)</span><span>${tax.toLocaleString()}</span></div>
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>合計</span><span>${total.toLocaleString()}</span></div>
      </div>
    </div>
  );
}

function BusinessNameGen() {
  const [keyword, setKeyword] = useState("");
  const [names, setNames] = useState<string[]>([]);

  const prefixes = ["Smart", "Pro", "Next", "Ultra", "Cloud", "Alpha", "Zen", "Peak", "Nova", "Apex", "Core", "Flux", "Neo", "Pixel", "Swift"];
  const suffixes = ["Lab", "Hub", "Works", "Tech", "Solutions", "Studio", "Systems", "Group", "Digital", "Co", "IO", "Base", "Force", "Link", "Net"];

  const generate = () => {
    const results: string[] = [];
    for (let i = 0; i < 12; i++) {
      const p = prefixes[Math.floor(Math.random() * prefixes.length)];
      const s = suffixes[Math.floor(Math.random() * suffixes.length)];
      const k = keyword.trim();
      if (k) {
        const cap = k.charAt(0).toUpperCase() + k.slice(1).toLowerCase();
        const variants = [`${p}${cap}`, `${cap}${s}`, `${p} ${cap}`, `${cap} ${s}`];
        results.push(variants[Math.floor(Math.random() * variants.length)]);
      } else {
        results.push(`${p}${s}`);
      }
    }
    setNames([...new Set(results)]);
  };

  return (
    <div className="space-y-4">
      <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="輸入關鍵字（選填）..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      <button onClick={generate} className="tool-btn">產生名稱</button>
      {names.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {names.map((n, i) => (
            <button key={i} onClick={() => navigator.clipboard.writeText(n)}
              className="rounded-lg border bg-card p-3 text-sm font-medium hover:bg-muted transition-colors text-left">{n}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function EmailTemplate() {
  const [type, setType] = useState<"meeting" | "followup" | "intro" | "thanks">("meeting");
  const [name, setName] = useState("王先生");
  const [company, setCompany] = useState("ABC 公司");

  const templates: Record<string, { subject: string; body: string }> = {
    meeting: { subject: `會議邀請 — ${company}`, body: `${name} 您好，\n\n感謝您的時間。我想邀請您參加一場會議，討論我們未來的合作方向。\n\n請問您這週是否有空？以下是建議的時段：\n- 週二 14:00-15:00\n- 週三 10:00-11:00\n\n期待您的回覆。\n\n此致\n敬禮` },
    followup: { subject: `後續跟進 — ${company}`, body: `${name} 您好，\n\n感謝上次的會議，以下是我們討論的重點摘要：\n\n1. [重點一]\n2. [重點二]\n3. [重點三]\n\n下一步行動計畫：\n- [行動項目]\n\n如有任何問題，請隨時與我聯繫。\n\n此致\n敬禮` },
    intro: { subject: `自我介紹 — 來自 ${company}`, body: `${name} 您好，\n\n我是來自${company}的 [您的姓名]，負責 [您的職務]。\n\n我注意到貴公司在 [領域] 方面的成就，相信我們有很好的合作機會。\n\n希望能安排一次簡短的通話，進一步了解您的需求。\n\n期待您的回覆。\n\n此致\n敬禮` },
    thanks: { subject: `感謝 — ${company}`, body: `${name} 您好，\n\n衷心感謝您的 [具體事項]。您的支持對我們非常重要。\n\n我們會持續努力，提供最好的服務。如有任何需要，請隨時告知。\n\n再次感謝！\n\n此致\n敬禮` },
  };

  const tmpl = templates[type];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {([["meeting", "會議邀請"], ["followup", "跟進"], ["intro", "自我介紹"], ["thanks", "感謝信"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setType(k)} className={`px-3 py-1.5 rounded-lg text-sm ${type === k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{l}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">收件人</label><input value={name} onChange={e => setName(e.target.value)} className="w-full rounded border bg-card p-2 text-sm" /></div>
        <div><label className="tool-label">公司名稱</label><input value={company} onChange={e => setCompany(e.target.value)} className="w-full rounded border bg-card p-2 text-sm" /></div>
      </div>
      <div>
        <label className="tool-label">主旨</label>
        <div className="rounded border bg-card p-2 text-sm">{tmpl.subject}</div>
      </div>
      <div>
        <label className="tool-label">內容</label>
        <div className="tool-result whitespace-pre-wrap text-sm">{tmpl.body}</div>
      </div>
      <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(`主旨：${tmpl.subject}\n\n${tmpl.body}`)}>複製全文</button>
    </div>
  );
}

function NdaGen() {
  const [partyA, setPartyA] = useState("甲方公司名稱");
  const [partyB, setPartyB] = useState("乙方公司名稱");
  const [duration, setDuration] = useState("2");
  const [scope, setScope] = useState("技術資料、商業計畫、客戶資料");

  const nda = `保密協議（NDA）

甲方：${partyA}
乙方：${partyB}
簽署日期：${new Date().toLocaleDateString("zh-TW")}

第一條　目的
本協議旨在保護雙方在合作過程中所交換之機密資訊。

第二條　機密資訊定義
機密資訊包括但不限於：${scope}，以及任何被標示為「機密」或按其性質應被視為機密的資訊。

第三條　保密義務
1. 接收方應以合理的注意義務保護機密資訊。
2. 接收方不得將機密資訊揭露予第三方。
3. 接收方僅得為本協議之目的使用機密資訊。

第四條　例外
以下情況不構成保密義務之違反：
(a) 接收方已合法持有之資訊；
(b) 已進入公共領域之資訊；
(c) 經揭露方書面同意揭露之資訊；
(d) 依法律規定必須揭露之資訊。

第五條　保密期限
本協議之保密義務自簽署日起 ${duration} 年內有效。

第六條　違約責任
任何一方違反本協議，應賠償對方因此所受之一切損失。

第七條　適用法律
本協議受中華民國法律管轄。

甲方簽章：________________
乙方簽章：________________`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">甲方名稱</label><input value={partyA} onChange={e => setPartyA(e.target.value)} className="w-full rounded border bg-card p-2 text-sm" /></div>
        <div><label className="tool-label">乙方名稱</label><input value={partyB} onChange={e => setPartyB(e.target.value)} className="w-full rounded border bg-card p-2 text-sm" /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">保密期限（年）</label><input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-full rounded border bg-card p-2 text-sm" /></div>
        <div><label className="tool-label">機密範圍</label><input value={scope} onChange={e => setScope(e.target.value)} className="w-full rounded border bg-card p-2 text-sm" /></div>
      </div>
      <div className="tool-result whitespace-pre-wrap text-sm leading-relaxed max-h-96 overflow-auto">{nda}</div>
      <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(nda)}>複製全文</button>
    </div>
  );
}

function ProjectTimeline() {
  const [tasks, setTasks] = useState([
    { name: "需求分析", days: 5, status: "done" as const },
    { name: "UI 設計", days: 10, status: "in-progress" as const },
    { name: "前端開發", days: 15, status: "todo" as const },
    { name: "後端開發", days: 15, status: "todo" as const },
    { name: "測試", days: 7, status: "todo" as const },
    { name: "部署上線", days: 3, status: "todo" as const },
  ]);

  const addTask = () => setTasks([...tasks, { name: "", days: 5, status: "todo" }]);
  const updateTask = (i: number, field: string, value: any) => {
    const copy = [...tasks];
    (copy[i] as any)[field] = value;
    setTasks(copy);
  };
  const totalDays = tasks.reduce((s, t) => s + t.days, 0);
  const colors = { done: "bg-green-500", "in-progress": "bg-blue-500", todo: "bg-muted" };

  return (
    <div className="space-y-4">
      {tasks.map((t, i) => (
        <div key={i} className="flex items-center gap-2">
          <select value={t.status} onChange={e => updateTask(i, "status", e.target.value)} className="rounded border bg-card p-1.5 text-xs">
            <option value="todo">待辦</option>
            <option value="in-progress">進行中</option>
            <option value="done">完成</option>
          </select>
          <input value={t.name} onChange={e => updateTask(i, "name", e.target.value)} className="flex-1 rounded border bg-card p-2 text-sm" />
          <input type="number" value={t.days} onChange={e => updateTask(i, "days", +e.target.value)} className="w-16 rounded border bg-card p-2 text-sm text-center" />
          <span className="text-xs text-muted-foreground">天</span>
        </div>
      ))}
      <button onClick={addTask} className="tool-btn-secondary text-sm">+ 新增任務</button>
      <div className="rounded-lg border bg-card p-4">
        <div className="text-sm font-medium mb-3">甘特圖（總計 {totalDays} 天）</div>
        <div className="space-y-2">
          {(() => {
            let offset = 0;
            return tasks.map((t, i) => {
              const pct = totalDays > 0 ? (t.days / totalDays) * 100 : 0;
              const left = totalDays > 0 ? (offset / totalDays) * 100 : 0;
              offset += t.days;
              return (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-24 text-xs truncate">{t.name}</div>
                  <div className="flex-1 h-6 rounded bg-muted/30 relative">
                    <div className={`absolute h-full rounded ${colors[t.status]}`} style={{ left: `${left}%`, width: `${pct}%`, opacity: t.status === "todo" ? 0.4 : 0.8 }} />
                  </div>
                  <div className="w-10 text-xs text-right">{t.days}d</div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}

function PricingTableGen() {
  const [plans, setPlans] = useState([
    { name: "基本版", price: "0", features: ["5 個專案", "基本支援", "1GB 儲存空間"] },
    { name: "專業版", price: "299", features: ["無限專案", "優先支援", "10GB 儲存空間", "API 存取"] },
    { name: "企業版", price: "999", features: ["無限專案", "24/7 支援", "無限儲存空間", "API 存取", "自訂域名", "SSO 登入"] },
  ]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map((plan, pi) => (
          <div key={pi} className={`rounded-xl border p-4 space-y-3 ${pi === 1 ? "border-primary ring-2 ring-primary/20" : ""}`}>
            <input value={plan.name} onChange={e => { const c = [...plans]; c[pi].name = e.target.value; setPlans(c); }}
              className="w-full text-center font-bold text-lg bg-transparent border-none outline-none" />
            <div className="text-center">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground text-sm">/月</span>
            </div>
            <div className="space-y-1">
              {plan.features.map((f, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <input value={f} onChange={e => { const c = [...plans]; c[pi].features[fi] = e.target.value; setPlans(c); }}
                    className="flex-1 bg-transparent text-sm outline-none" />
                </div>
              ))}
              <button onClick={() => { const c = [...plans]; c[pi].features.push("新功能"); setPlans(c); }}
                className="text-xs text-primary hover:underline">+ 新增功能</button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">點擊文字即可編輯</p>
    </div>
  );
}

export const BusinessToolsExtra = { InvoiceCalculator, BusinessNameGen, EmailTemplate, NdaGen, ProjectTimeline, PricingTableGen };
