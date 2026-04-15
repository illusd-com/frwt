import { useState } from "react";

function MarkdownToHtml() {
  const [md, setMd] = useState("# 標題\n\n這是一段 **粗體** 和 *斜體* 文字。\n\n- 項目一\n- 項目二\n\n```\nconsole.log('Hello');\n```");
  const convert = (s: string) => {
    return s
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n\n/g, '<br/><br/>');
  };
  return (
    <div className="space-y-4">
      <div><label className="tool-label">Markdown</label><textarea className="tool-input h-40 font-mono text-sm" value={md} onChange={e => setMd(e.target.value)} /></div>
      <div><label className="tool-label">HTML 輸出</label><div className="tool-result font-mono text-xs whitespace-pre-wrap break-all">{convert(md)}</div></div>
      <div><label className="tool-label">預覽</label><div className="p-4 border rounded-lg bg-card prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: convert(md) }} /></div>
    </div>
  );
}

function TextToPdf() {
  const [text, setText] = useState("在此輸入文字內容...");
  const generate = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<html><head><title>PDF</title><style>body{font-family:sans-serif;padding:40px;line-height:1.8;white-space:pre-wrap;}</style></head><body>${text.replace(/</g,'&lt;')}</body></html>`);
    w.document.close();
    w.print();
  };
  return (
    <div className="space-y-4">
      <div><label className="tool-label">文字內容</label><textarea className="tool-input h-48" value={text} onChange={e => setText(e.target.value)} /></div>
      <button onClick={generate} className="tool-btn">產生 PDF（列印）</button>
      <p className="text-xs text-muted-foreground">點擊後開啟列印對話框，可選擇「另存為 PDF」</p>
    </div>
  );
}

function ResumeGen() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");

  const generate = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>${name} - 履歷</title><style>
      body{font-family:'Segoe UI',sans-serif;max-width:800px;margin:0 auto;padding:40px;color:#333;line-height:1.6}
      h1{margin:0;font-size:28px;color:#1a1a2e}
      h2{border-bottom:2px solid #6366f1;padding-bottom:4px;color:#6366f1;font-size:18px;margin-top:24px}
      .subtitle{color:#666;font-size:16px;margin:4px 0}
      .contact{color:#888;font-size:14px}
      .section{margin-top:16px}
      ul{padding-left:20px}
      .skills span{display:inline-block;background:#eef2ff;color:#6366f1;padding:4px 12px;border-radius:20px;margin:4px;font-size:13px}
    </style></head><body>
      <h1>${name || '您的姓名'}</h1>
      <div class="subtitle">${title || '職位名稱'}</div>
      <div class="contact">${[email, phone].filter(Boolean).join(' | ')}</div>
      ${summary ? `<h2>自我介紹</h2><p>${summary}</p>` : ''}
      ${experience ? `<h2>工作經歷</h2><div>${experience.split('\n').map(l => `<p>${l}</p>`).join('')}</div>` : ''}
      ${education ? `<h2>學歷</h2><div>${education.split('\n').map(l => `<p>${l}</p>`).join('')}</div>` : ''}
      ${skills ? `<h2>技能</h2><div class="skills">${skills.split(',').map(s => `<span>${s.trim()}</span>`).join('')}</div>` : ''}
    </body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">姓名</label><input className="tool-input" value={name} onChange={e => setName(e.target.value)} placeholder="王小明" /></div>
        <div><label className="tool-label">職位</label><input className="tool-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="前端工程師" /></div>
        <div><label className="tool-label">Email</label><input className="tool-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" /></div>
        <div><label className="tool-label">電話</label><input className="tool-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="0912-345-678" /></div>
      </div>
      <div><label className="tool-label">自我介紹</label><textarea className="tool-input h-20" value={summary} onChange={e => setSummary(e.target.value)} placeholder="簡短描述您的專業背景..." /></div>
      <div><label className="tool-label">工作經歷（每行一項）</label><textarea className="tool-input h-24" value={experience} onChange={e => setExperience(e.target.value)} placeholder="2020-2024 ABC 公司 - 資深前端工程師" /></div>
      <div><label className="tool-label">學歷（每行一項）</label><textarea className="tool-input h-20" value={education} onChange={e => setEducation(e.target.value)} placeholder="2016-2020 台灣大學 資訊工程學系" /></div>
      <div><label className="tool-label">技能（逗號分隔）</label><input className="tool-input" value={skills} onChange={e => setSkills(e.target.value)} placeholder="React, TypeScript, Node.js, CSS" /></div>
      <button onClick={generate} className="tool-btn">產生履歷 PDF</button>
    </div>
  );
}

function InvoiceGen() {
  const [company, setCompany] = useState("");
  const [client, setClient] = useState("");
  const [items, setItems] = useState([{ desc: "", qty: 1, price: 0 }]);
  const addItem = () => setItems([...items, { desc: "", qty: 1, price: 0 }]);
  const updateItem = (i: number, key: string, val: any) => {
    const n = [...items]; (n[i] as any)[key] = val; setItems(n);
  };
  const total = items.reduce((s, it) => s + it.qty * it.price, 0);

  const generate = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>發票</title><style>
      body{font-family:sans-serif;max-width:800px;margin:0 auto;padding:40px}
      table{width:100%;border-collapse:collapse;margin:20px 0}
      th,td{border:1px solid #ddd;padding:10px;text-align:left}
      th{background:#f5f5f5}
      .total{text-align:right;font-size:20px;font-weight:bold;margin-top:20px}
    </style></head><body>
      <h1>發票</h1>
      <p><strong>開立方：</strong>${company || '-'}</p>
      <p><strong>客戶：</strong>${client || '-'}</p>
      <p><strong>日期：</strong>${new Date().toLocaleDateString('zh-TW')}</p>
      <table><tr><th>項目</th><th>數量</th><th>單價</th><th>小計</th></tr>
      ${items.map(it => `<tr><td>${it.desc}</td><td>${it.qty}</td><td>$${it.price}</td><td>$${it.qty * it.price}</td></tr>`).join('')}
      </table>
      <div class="total">總計：$${total.toLocaleString()}</div>
    </body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">公司名稱</label><input className="tool-input" value={company} onChange={e => setCompany(e.target.value)} /></div>
        <div><label className="tool-label">客戶名稱</label><input className="tool-input" value={client} onChange={e => setClient(e.target.value)} /></div>
      </div>
      {items.map((it, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <input className="tool-input" placeholder="項目描述" value={it.desc} onChange={e => updateItem(i, 'desc', e.target.value)} />
          <input className="tool-input" type="number" placeholder="數量" value={it.qty} onChange={e => updateItem(i, 'qty', +e.target.value)} />
          <input className="tool-input" type="number" placeholder="單價" value={it.price} onChange={e => updateItem(i, 'price', +e.target.value)} />
        </div>
      ))}
      <button onClick={addItem} className="text-sm text-primary hover:underline">+ 新增項目</button>
      <div className="text-lg font-bold">總計：${total.toLocaleString()}</div>
      <button onClick={generate} className="tool-btn">產生發票 PDF</button>
    </div>
  );
}

function LetterGen() {
  const [type, setType] = useState("formal");
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const templates: Record<string, string> = {
    formal: `${recipient} 您好：\n\n${body || '（信件內容）'}\n\n此致\n敬禮\n\n${sender}`,
    resignation: `${recipient} 您好：\n\n感謝公司長期以來的栽培，經過審慎考慮後，本人決定辭去目前的職務。\n\n${body || '希望能在離職前完成所有交接工作。'}\n\n此致\n敬禮\n\n${sender}\n${new Date().toLocaleDateString('zh-TW')}`,
    recommendation: `致相關單位：\n\n本人在此鄭重推薦 ${subject || '（被推薦人）'}。\n\n${body || '（推薦理由）'}\n\n如有任何問題，歡迎與本人聯繫。\n\n${sender}`,
    thank: `${recipient} 您好：\n\n非常感謝您${subject ? '在' + subject + '方面的' : '的'}幫助。\n\n${body || '您的支持對我意義重大。'}\n\n此致\n敬禮\n\n${sender}`,
  };

  return (
    <div className="space-y-3">
      <div><label className="tool-label">信件類型</label>
        <select className="tool-input" value={type} onChange={e => setType(e.target.value)}>
          <option value="formal">正式信函</option>
          <option value="resignation">辭職信</option>
          <option value="recommendation">推薦信</option>
          <option value="thank">感謝信</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">寄件人</label><input className="tool-input" value={sender} onChange={e => setSender(e.target.value)} /></div>
        <div><label className="tool-label">收件人</label><input className="tool-input" value={recipient} onChange={e => setRecipient(e.target.value)} /></div>
      </div>
      <div><label className="tool-label">主旨/對象</label><input className="tool-input" value={subject} onChange={e => setSubject(e.target.value)} /></div>
      <div><label className="tool-label">自訂內容</label><textarea className="tool-input h-20" value={body} onChange={e => setBody(e.target.value)} /></div>
      <div><label className="tool-label">預覽</label><div className="tool-result whitespace-pre-wrap">{templates[type]}</div></div>
    </div>
  );
}

function TableToCsv() {
  const [html, setHtml] = useState('<table>\n  <tr><th>姓名</th><th>年齡</th></tr>\n  <tr><td>王小明</td><td>25</td></tr>\n  <tr><td>李小華</td><td>30</td></tr>\n</table>');
  const convert = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = doc.querySelectorAll('tr');
    return Array.from(rows).map(r => 
      Array.from(r.querySelectorAll('th, td')).map(c => `"${c.textContent?.replace(/"/g, '""') || ''}"`).join(',')
    ).join('\n');
  };
  return (
    <div className="space-y-4">
      <div><label className="tool-label">HTML 表格</label><textarea className="tool-input h-32 font-mono text-sm" value={html} onChange={e => setHtml(e.target.value)} /></div>
      <div><label className="tool-label">CSV 輸出</label><div className="tool-result font-mono text-sm whitespace-pre">{convert()}</div></div>
    </div>
  );
}

function DocWordCount() {
  const [text, setText] = useState("");
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const cjk = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  const sentences = (text.match(/[。！？.!?]+/g) || []).length;
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
  const pages = Math.ceil(charsNoSpace / 500);
  const readTime = Math.ceil((cjk + words) / 300);

  return (
    <div className="space-y-4">
      <div><label className="tool-label">輸入文件內容</label><textarea className="tool-input h-40" value={text} onChange={e => setText(e.target.value)} placeholder="貼上您的文件內容..." /></div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ['總字元', chars], ['不含空白', charsNoSpace], ['中文字', cjk], ['英文字數', words],
          ['句子數', sentences], ['段落數', paragraphs], ['預估頁數', pages], ['閱讀時間', `${readTime} 分鐘`],
        ].map(([l, v]) => (
          <div key={String(l)} className="p-3 rounded-lg bg-muted text-center">
            <div className="text-xs text-muted-foreground">{l}</div>
            <div className="text-lg font-bold">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const DocumentTools = {
  MarkdownToHtml,
  TextToPdf,
  ResumeGen,
  InvoiceGen,
  LetterGen,
  TableToCsv,
  DocWordCount,
};
