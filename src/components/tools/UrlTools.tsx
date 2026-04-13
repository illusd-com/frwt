import { useState } from "react";

function UrlParser() {
  const [url, setUrl] = useState("");
  let parsed: URL | null = null;
  try { parsed = new URL(url); } catch {}

  return (
    <div className="space-y-4">
      <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="輸入 URL..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      {parsed && (
        <div className="space-y-2 text-sm">
          {[
            ["協定", parsed.protocol],
            ["主機", parsed.hostname],
            ["端口", parsed.port || "(預設)"],
            ["路徑", parsed.pathname],
            ["查詢參數", parsed.search],
            ["Hash", parsed.hash],
            ["來源", parsed.origin],
          ].map(([k, v]) => (
            <div key={k as string} className="flex gap-2"><span className="font-medium min-w-[80px]">{k}:</span><span className="tool-result flex-1">{v as string}</span></div>
          ))}
        </div>
      )}
    </div>
  );
}

function UrlBuilder() {
  const [protocol, setProtocol] = useState("https");
  const [host, setHost] = useState("");
  const [path, setPath] = useState("");
  const [params, setParams] = useState([{ key: "", value: "" }]);

  const addParam = () => setParams(p => [...p, { key: "", value: "" }]);
  const updateParam = (i: number, field: "key" | "value", val: string) => {
    setParams(p => p.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  };

  const buildUrl = () => {
    const base = `${protocol}://${host}${path ? (path.startsWith("/") ? path : "/" + path) : ""}`;
    const qs = params.filter(p => p.key).map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join("&");
    return qs ? `${base}?${qs}` : base;
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <select value={protocol} onChange={e => setProtocol(e.target.value)} className="rounded-lg border bg-card p-2 text-sm">
          <option value="https">https</option>
          <option value="http">http</option>
        </select>
        <input type="text" value={host} onChange={e => setHost(e.target.value)} placeholder="example.com" className="flex-1 rounded-lg border bg-card p-2 text-sm" />
      </div>
      <input type="text" value={path} onChange={e => setPath(e.target.value)} placeholder="/path" className="w-full rounded-lg border bg-card p-2 text-sm" />
      <div className="space-y-2">
        <label className="tool-label">查詢參數</label>
        {params.map((p, i) => (
          <div key={i} className="flex gap-2">
            <input type="text" value={p.key} onChange={e => updateParam(i, "key", e.target.value)} placeholder="key" className="flex-1 rounded-lg border bg-card p-2 text-sm" />
            <input type="text" value={p.value} onChange={e => updateParam(i, "value", e.target.value)} placeholder="value" className="flex-1 rounded-lg border bg-card p-2 text-sm" />
          </div>
        ))}
        <button onClick={addParam} className="tool-btn-secondary text-xs">+ 新增參數</button>
      </div>
      {host && <div className="tool-result break-all">{buildUrl()}</div>}
    </div>
  );
}

function UtmBuilder() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const buildUtm = () => {
    if (!url) return "";
    const params = new URLSearchParams();
    if (source) params.set("utm_source", source);
    if (medium) params.set("utm_medium", medium);
    if (campaign) params.set("utm_campaign", campaign);
    if (term) params.set("utm_term", term);
    if (content) params.set("utm_content", content);
    const qs = params.toString();
    return qs ? `${url}${url.includes("?") ? "&" : "?"}${qs}` : url;
  };

  return (
    <div className="space-y-3">
      <div><label className="tool-label">網址</label><input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">來源 (utm_source)</label><input type="text" value={source} onChange={e => setSource(e.target.value)} placeholder="google" className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">媒介 (utm_medium)</label><input type="text" value={medium} onChange={e => setMedium(e.target.value)} placeholder="cpc" className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">活動 (utm_campaign)</label><input type="text" value={campaign} onChange={e => setCampaign(e.target.value)} placeholder="spring_sale" className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">關鍵字 (utm_term)</label><input type="text" value={term} onChange={e => setTerm(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">內容 (utm_content)</label><input type="text" value={content} onChange={e => setContent(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      {url && <div className="tool-result break-all">{buildUtm()}</div>}
    </div>
  );
}

function UrlValidator() {
  const [url, setUrl] = useState("");
  let isValid = false;
  try { new URL(url); isValid = true; } catch {}

  return (
    <div className="space-y-4">
      <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="輸入 URL..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      {url && (
        <div className={`tool-result ${isValid ? "text-green-600" : "text-red-500"}`}>
          {isValid ? "✅ URL 格式正確" : "❌ URL 格式不正確"}
        </div>
      )}
    </div>
  );
}

function UrlShortenerPlaceholder() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");

  const shorten = () => {
    if (!url) return;
    const hash = btoa(url).slice(0, 8);
    setShort(`https://fwt.link/${hash}`);
  };

  return (
    <div className="space-y-4">
      <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="輸入要縮短的網址..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      <button onClick={shorten} disabled={!url} className="tool-btn">縮短網址</button>
      {short && (
        <div className="space-y-2">
          <div className="tool-result">{short}</div>
          <p className="text-xs text-muted-foreground">※ 此為前端示範，實際縮網址需要後端服務支援</p>
        </div>
      )}
    </div>
  );
}

function UrlCompare() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");

  let diff: { key: string; v1: string; v2: string; same: boolean }[] = [];
  try {
    const a = new URL(url1), b = new URL(url2);
    const keys = ["protocol", "hostname", "port", "pathname", "search", "hash"] as const;
    diff = keys.map(k => ({ key: k, v1: a[k], v2: b[k], same: a[k] === b[k] }));
  } catch {}

  return (
    <div className="space-y-4">
      <input type="text" value={url1} onChange={e => setUrl1(e.target.value)} placeholder="URL 1" className="w-full rounded-lg border bg-card p-3 text-sm" />
      <input type="text" value={url2} onChange={e => setUrl2(e.target.value)} placeholder="URL 2" className="w-full rounded-lg border bg-card p-3 text-sm" />
      {diff.length > 0 && (
        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead><tr className="bg-muted"><th className="p-2 text-left">部分</th><th className="p-2 text-left">URL 1</th><th className="p-2 text-left">URL 2</th></tr></thead>
          <tbody>
            {diff.map(d => (
              <tr key={d.key} className={d.same ? "" : "bg-destructive/10"}><td className="p-2 font-medium">{d.key}</td><td className="p-2 font-mono text-xs">{d.v1 || "-"}</td><td className="p-2 font-mono text-xs">{d.v2 || "-"}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export const UrlTools = {
  UrlShortener: UrlShortenerPlaceholder,
  UrlParser,
  UrlBuilder,
  UtmBuilder,
  UrlValidator,
  UrlCompare,
};
