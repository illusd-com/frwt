import { useState } from "react";

function CsvEditor() {
  const [csv, setCsv] = useState("名稱,數量,價格\n蘋果,5,30\n香蕉,10,15\n橘子,3,25");
  const rows = csv.split("\n").map(r => r.split(","));

  const updateCell = (ri: number, ci: number, val: string) => {
    const newRows = rows.map((r, i) => i === ri ? r.map((c, j) => j === ci ? val : c) : r);
    setCsv(newRows.map(r => r.join(",")).join("\n"));
  };

  const addRow = () => setCsv(csv + "\n" + rows[0].map(() => "").join(","));
  const addCol = () => setCsv(rows.map(r => [...r, ""].join(",")).join("\n"));

  return (
    <div className="space-y-4">
      <div className="overflow-auto border rounded-lg">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={ri === 0 ? "bg-muted font-medium" : ""}>
                {row.map((cell, ci) => (
                  <td key={ci} className="border-r border-b p-0">
                    <input type="text" value={cell} onChange={e => updateCell(ri, ci, e.target.value)} className="w-full p-2 text-sm bg-transparent focus:outline-none focus:bg-accent/30" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button onClick={addRow} className="tool-btn-secondary text-xs">+ 新增列</button>
        <button onClick={addCol} className="tool-btn-secondary text-xs">+ 新增欄</button>
      </div>
      <textarea readOnly value={csv} className="tool-textarea" />
    </div>
  );
}

function JsonViewer() {
  const [input, setInput] = useState('{"name":"FreeWebTools","version":1,"features":["text","encode","format"],"nested":{"key":"value"}}');
  let parsed: any = null;
  try { parsed = JSON.parse(input); } catch {}

  const renderValue = (val: any, depth = 0): JSX.Element => {
    if (val === null) return <span className="text-muted-foreground">null</span>;
    if (typeof val === "boolean") return <span className="text-orange-500">{val.toString()}</span>;
    if (typeof val === "number") return <span className="text-blue-500">{val}</span>;
    if (typeof val === "string") return <span className="text-green-600">"{val}"</span>;
    if (Array.isArray(val)) {
      return (
        <div style={{ paddingLeft: depth * 16 }}>
          {"["}
          {val.map((item, i) => <div key={i} style={{ paddingLeft: 16 }}>{renderValue(item, depth + 1)}{i < val.length - 1 ? "," : ""}</div>)}
          {"]"}
        </div>
      );
    }
    if (typeof val === "object") {
      const entries = Object.entries(val);
      return (
        <div style={{ paddingLeft: depth * 16 }}>
          {"{"}
          {entries.map(([k, v], i) => (
            <div key={k} style={{ paddingLeft: 16 }}>
              <span className="text-purple-500">"{k}"</span>: {renderValue(v, depth + 1)}{i < entries.length - 1 ? "," : ""}
            </div>
          ))}
          {"}"}
        </div>
      );
    }
    return <span>{String(val)}</span>;
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="貼上 JSON..." className="tool-textarea min-h-[120px]" />
      {parsed !== null ? (
        <div className="tool-result font-mono text-xs overflow-auto max-h-[400px]">{renderValue(parsed)}</div>
      ) : input && (
        <p className="text-destructive text-sm">JSON 格式不正確</p>
      )}
    </div>
  );
}

function DataFilter() {
  const [csv, setCsv] = useState("名稱,分數,等級\nAlice,95,A\nBob,78,B\nCarol,88,A\nDave,65,C\nEve,92,A");
  const [filterCol, setFilterCol] = useState(0);
  const [filterVal, setFilterVal] = useState("");

  const rows = csv.split("\n").map(r => r.split(","));
  const headers = rows[0] || [];
  const data = rows.slice(1);
  const filtered = filterVal ? data.filter(r => r[filterCol]?.toLowerCase().includes(filterVal.toLowerCase())) : data;

  return (
    <div className="space-y-4">
      <textarea value={csv} onChange={e => setCsv(e.target.value)} className="tool-textarea" placeholder="貼上 CSV 資料..." />
      <div className="flex gap-2">
        <select value={filterCol} onChange={e => setFilterCol(+e.target.value)} className="rounded-lg border bg-card p-2 text-sm">
          {headers.map((h, i) => <option key={i} value={i}>{h}</option>)}
        </select>
        <input type="text" value={filterVal} onChange={e => setFilterVal(e.target.value)} placeholder="篩選值..." className="flex-1 rounded-lg border bg-card p-2 text-sm" />
      </div>
      <div className="overflow-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead><tr className="bg-muted">{headers.map((h, i) => <th key={i} className="p-2 text-left">{h}</th>)}</tr></thead>
          <tbody>{filtered.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className="p-2 border-t">{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">顯示 {filtered.length} / {data.length} 筆</p>
    </div>
  );
}

function JsonDiff() {
  const [json1, setJson1] = useState('{"a":1,"b":2,"c":3}');
  const [json2, setJson2] = useState('{"a":1,"b":5,"d":4}');

  let diff: { key: string; v1: string; v2: string; status: string }[] = [];
  try {
    const a = JSON.parse(json1), b = JSON.parse(json2);
    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
    allKeys.forEach(k => {
      const inA = k in a, inB = k in b;
      if (inA && inB && JSON.stringify(a[k]) === JSON.stringify(b[k])) {
        diff.push({ key: k, v1: JSON.stringify(a[k]), v2: JSON.stringify(b[k]), status: "相同" });
      } else if (inA && inB) {
        diff.push({ key: k, v1: JSON.stringify(a[k]), v2: JSON.stringify(b[k]), status: "修改" });
      } else if (inA) {
        diff.push({ key: k, v1: JSON.stringify(a[k]), v2: "-", status: "刪除" });
      } else {
        diff.push({ key: k, v1: "-", v2: JSON.stringify(b[k]), status: "新增" });
      }
    });
  } catch {}

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <textarea value={json1} onChange={e => setJson1(e.target.value)} placeholder="JSON 1" className="tool-textarea" />
        <textarea value={json2} onChange={e => setJson2(e.target.value)} placeholder="JSON 2" className="tool-textarea" />
      </div>
      {diff.length > 0 && (
        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead><tr className="bg-muted"><th className="p-2">Key</th><th className="p-2">JSON 1</th><th className="p-2">JSON 2</th><th className="p-2">狀態</th></tr></thead>
          <tbody>
            {diff.map(d => (
              <tr key={d.key} className={d.status === "修改" ? "bg-yellow-50" : d.status === "新增" ? "bg-green-50" : d.status === "刪除" ? "bg-red-50" : ""}>
                <td className="p-2 font-mono">{d.key}</td><td className="p-2 font-mono text-xs">{d.v1}</td><td className="p-2 font-mono text-xs">{d.v2}</td><td className="p-2">{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function XmlToJson() {
  const [xml, setXml] = useState('<root><item>Hello</item><item>World</item></root>');
  const [result, setResult] = useState("");

  const convert = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");
      const xmlToObj = (node: Element): any => {
        const obj: any = {};
        if (node.children.length === 0) return node.textContent;
        const childNames: Record<string, any[]> = {};
        Array.from(node.children).forEach(child => {
          const name = child.tagName;
          if (!childNames[name]) childNames[name] = [];
          childNames[name].push(xmlToObj(child));
        });
        Object.entries(childNames).forEach(([k, v]) => { obj[k] = v.length === 1 ? v[0] : v; });
        return obj;
      };
      setResult(JSON.stringify(xmlToObj(doc.documentElement), null, 2));
    } catch { setResult("轉換失敗"); }
  };

  return (
    <div className="space-y-4">
      <textarea value={xml} onChange={e => setXml(e.target.value)} className="tool-textarea" placeholder="貼上 XML..." />
      <button onClick={convert} className="tool-btn">轉換</button>
      {result && <textarea readOnly value={result} className="tool-textarea min-h-[200px]" />}
    </div>
  );
}

function YamlToJson() {
  const [yaml, setYaml] = useState("name: FreeWebTools\nversion: 1\nfeatures:\n  - text\n  - encode\n  - format");
  const [result, setResult] = useState("");

  const convert = () => {
    try {
      const obj: any = {};
      let current = obj;
      const stack: any[] = [];
      yaml.split("\n").forEach(line => {
        if (!line.trim()) return;
        const indent = line.search(/\S/);
        const trimmed = line.trim();
        if (trimmed.startsWith("- ")) {
          const key = Object.keys(current).pop()!;
          if (!Array.isArray(current[key])) current[key] = [];
          current[key].push(trimmed.slice(2));
        } else if (trimmed.includes(": ")) {
          const [k, ...v] = trimmed.split(": ");
          current[k] = v.join(": ");
        } else if (trimmed.endsWith(":")) {
          const k = trimmed.slice(0, -1);
          current[k] = {};
        }
      });
      setResult(JSON.stringify(obj, null, 2));
    } catch { setResult("轉換失敗（簡易解析器）"); }
  };

  return (
    <div className="space-y-4">
      <textarea value={yaml} onChange={e => setYaml(e.target.value)} className="tool-textarea" placeholder="貼上 YAML..." />
      <button onClick={convert} className="tool-btn">轉換為 JSON</button>
      {result && <textarea readOnly value={result} className="tool-textarea" />}
    </div>
  );
}

export const DataTools = {
  CsvEditor,
  JsonViewer,
  DataFilter,
  JsonDiff,
  XmlToJson,
  YamlToJson,
};
