import { useState } from "react";
import { Button } from "@/components/ui/button";

const Input = ({ ...p }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...p} className={`w-full rounded-lg border bg-card p-3 text-sm font-mono ${p.className ?? ""}`} />
);

const ResultBox = ({ data }: { data: Record<string, any> }) => (
  <div className="space-y-2 text-sm">
    {Object.entries(data).map(([k, v]) => (
      <div key={k} className="flex gap-2">
        <span className="font-medium min-w-[140px] capitalize">{k}:</span>
        <span className="tool-result flex-1 font-mono break-all">
          {typeof v === "object" ? JSON.stringify(v) : String(v ?? "—")}
        </span>
      </div>
    ))}
  </div>
);

function IpLookup() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const lookup = async (target?: string) => {
    setLoading(true); setErr(""); setData(null);
    try {
      const url = target ? `https://ipapi.co/${target}/json/` : "https://ipapi.co/json/";
      const r = await fetch(url);
      const j = await r.json();
      if (j.error) throw new Error(j.reason || "查詢失敗");
      setData({
        IP: j.ip, 國家: `${j.country_name} (${j.country_code})`,
        城市: j.city, 區域: j.region, 郵遞區號: j.postal,
        經緯度: `${j.latitude}, ${j.longitude}`, 時區: j.timezone,
        ISP: j.org, ASN: j.asn, 貨幣: j.currency,
      });
    } catch (e: any) { setErr(e.message); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={ip} onChange={e => setIp(e.target.value)} placeholder="輸入 IP 或網域 (留空=查我自己)" />
        <Button onClick={() => lookup(ip.trim() || undefined)} disabled={loading}>
          {loading ? "查詢中..." : "查詢"}
        </Button>
      </div>
      {err && <p className="text-sm text-destructive">{err}</p>}
      {data && <ResultBox data={data} />}
    </div>
  );
}

function DnsLookup() {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("A");
  const [records, setRecords] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const lookup = async () => {
    if (!domain.trim()) return;
    setLoading(true); setErr(""); setRecords(null);
    try {
      const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`);
      const j = await r.json();
      if (j.Status !== 0) throw new Error("查無記錄或域名錯誤");
      setRecords(j.Answer || []);
    } catch (e: any) { setErr(e.message); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="example.com"
          className="flex-1 min-w-[200px] rounded-lg border bg-card p-3 text-sm font-mono" />
        <select value={type} onChange={e => setType(e.target.value)} className="rounded-lg border bg-card p-3 text-sm">
          {["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA", "CAA"].map(t => <option key={t}>{t}</option>)}
        </select>
        <Button onClick={lookup} disabled={loading}>{loading ? "查詢中..." : "查詢"}</Button>
      </div>
      {err && <p className="text-sm text-destructive">{err}</p>}
      {records && (
        <div className="space-y-2">
          {records.length === 0 && <p className="text-sm text-muted-foreground">無記錄</p>}
          {records.map((r, i) => (
            <div key={i} className="rounded-lg border bg-card p-3 text-sm font-mono space-y-1">
              <div><span className="text-muted-foreground">名稱:</span> {r.name}</div>
              <div><span className="text-muted-foreground">TTL:</span> {r.TTL}s</div>
              <div className="break-all"><span className="text-muted-foreground">資料:</span> {r.data}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HttpHeaders() {
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<Record<string, string> | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchHeaders = async () => {
    if (!url.trim()) return;
    setLoading(true); setErr(""); setHeaders(null); setStatus("");
    try {
      let target = url.trim();
      if (!/^https?:\/\//i.test(target)) target = "https://" + target;
      const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(target)}`;
      const r = await fetch(proxy);
      const j = await r.json();
      setStatus(`${j.status?.http_code ?? "?"} (${j.status?.content_type ?? ""})`);
      // allorigins returns response_headers when available; fall back to status
      const h: Record<string, string> = {};
      if (j.status?.response_headers) Object.assign(h, j.status.response_headers);
      else {
        h["Content-Type"] = j.status?.content_type ?? "";
        h["Content-Length"] = String(j.status?.content_length ?? "");
        h["Final-URL"] = j.status?.url ?? target;
      }
      setHeaders(h);
    } catch (e: any) { setErr(e.message); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" />
        <Button onClick={fetchHeaders} disabled={loading}>{loading ? "查詢中..." : "查詢"}</Button>
      </div>
      {err && <p className="text-sm text-destructive">{err}</p>}
      {status && <div className="text-sm"><span className="font-medium">狀態:</span> <span className="tool-result ml-2">{status}</span></div>}
      {headers && (
        <div className="space-y-1 text-xs font-mono max-h-[400px] overflow-auto">
          {Object.entries(headers).map(([k, v]) => (
            <div key={k} className="flex gap-2 p-2 rounded bg-muted/50">
              <span className="font-bold text-primary min-w-[180px]">{k}:</span>
              <span className="break-all">{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PingTool() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<{ ms: number; ok: boolean }[]>([]);
  const [running, setRunning] = useState(false);

  const ping = async () => {
    if (!url.trim()) return;
    let target = url.trim();
    if (!/^https?:\/\//i.test(target)) target = "https://" + target;
    setRunning(true); setResults([]);
    const arr: { ms: number; ok: boolean }[] = [];
    for (let i = 0; i < 5; i++) {
      const start = performance.now();
      try {
        await fetch(target, { mode: "no-cors", cache: "no-store" });
        arr.push({ ms: Math.round(performance.now() - start), ok: true });
      } catch {
        arr.push({ ms: Math.round(performance.now() - start), ok: false });
      }
      setResults([...arr]);
      await new Promise(r => setTimeout(r, 300));
    }
    setRunning(false);
  };

  const okList = results.filter(r => r.ok);
  const avg = okList.length ? Math.round(okList.reduce((a, b) => a + b.ms, 0) / okList.length) : 0;
  const min = okList.length ? Math.min(...okList.map(r => r.ms)) : 0;
  const max = okList.length ? Math.max(...okList.map(r => r.ms)) : 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" />
        <Button onClick={ping} disabled={running}>{running ? "Ping 中..." : "開始 Ping"}</Button>
      </div>
      <p className="text-xs text-muted-foreground">註：瀏覽器以 HTTP 請求模擬 Ping (含 TLS 與網路延遲)</p>
      {results.length > 0 && (
        <>
          <div className="space-y-1 text-sm font-mono">
            {results.map((r, i) => (
              <div key={i} className="flex justify-between p-2 rounded bg-muted/50">
                <span>第 {i + 1} 次</span>
                <span className={r.ok ? "text-green-600" : "text-destructive"}>
                  {r.ok ? `${r.ms} ms` : `失敗 (${r.ms} ms)`}
                </span>
              </div>
            ))}
          </div>
          {okList.length > 0 && (
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-lg bg-card border p-3"><div className="text-xs text-muted-foreground">最小</div><div className="font-bold">{min} ms</div></div>
              <div className="rounded-lg bg-card border p-3"><div className="text-xs text-muted-foreground">平均</div><div className="font-bold">{avg} ms</div></div>
              <div className="rounded-lg bg-card border p-3"><div className="text-xs text-muted-foreground">最大</div><div className="font-bold">{max} ms</div></div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function WhoisLookup() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const lookup = async () => {
    if (!domain.trim()) return;
    setLoading(true); setErr(""); setData(null);
    try {
      const r = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain.trim())}`);
      if (!r.ok) throw new Error("查無資訊");
      const j = await r.json();
      const events: Record<string, string> = {};
      (j.events || []).forEach((e: any) => { events[e.eventAction] = e.eventDate; });
      setData({
        域名: j.ldhName || domain,
        狀態: (j.status || []).join(", "),
        註冊時間: events.registration,
        到期時間: events.expiration,
        最後更新: events["last changed"],
        DNS: (j.nameservers || []).map((n: any) => n.ldhName).join(", "),
        註冊商: j.entities?.find((e: any) => e.roles?.includes("registrar"))?.vcardArray?.[1]?.find((v: any) => v[0] === "fn")?.[3] || "—",
      });
    } catch (e: any) { setErr(e.message); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={domain} onChange={e => setDomain(e.target.value)} placeholder="example.com" />
        <Button onClick={lookup} disabled={loading}>{loading ? "查詢中..." : "查詢"}</Button>
      </div>
      {err && <p className="text-sm text-destructive">{err}</p>}
      {data && <ResultBox data={data} />}
    </div>
  );
}

function MacLookup() {
  const [mac, setMac] = useState("");
  const [vendor, setVendor] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const lookup = async () => {
    if (!mac.trim()) return;
    setLoading(true); setErr(""); setVendor("");
    try {
      const r = await fetch(`https://api.macvendors.com/${encodeURIComponent(mac.trim())}`);
      if (!r.ok) throw new Error("查無廠商");
      setVendor(await r.text());
    } catch (e: any) { setErr(e.message); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={mac} onChange={e => setMac(e.target.value)} placeholder="00:1A:2B:3C:4D:5E" />
        <Button onClick={lookup} disabled={loading}>{loading ? "查詢中..." : "查詢"}</Button>
      </div>
      {err && <p className="text-sm text-destructive">{err}</p>}
      {vendor && (
        <div className="rounded-lg border bg-card p-4">
          <div className="text-xs text-muted-foreground mb-1">廠商</div>
          <div className="text-lg font-bold">{vendor}</div>
        </div>
      )}
    </div>
  );
}

function PortScanner() {
  const [host, setHost] = useState("");
  const [results, setResults] = useState<{ port: number; status: string; ms: number }[]>([]);
  const [running, setRunning] = useState(false);
  const ports = [21, 22, 25, 53, 80, 110, 143, 443, 587, 993, 995, 3306, 3389, 5432, 6379, 8080, 8443];

  const scan = async () => {
    if (!host.trim()) return;
    setRunning(true); setResults([]);
    const arr: { port: number; status: string; ms: number }[] = [];
    for (const port of ports) {
      const start = performance.now();
      const proto = port === 443 || port === 8443 ? "https" : "http";
      try {
        await Promise.race([
          fetch(`${proto}://${host.trim()}:${port}`, { mode: "no-cors", cache: "no-store" }),
          new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 2000)),
        ]);
        arr.push({ port, status: "可能開放", ms: Math.round(performance.now() - start) });
      } catch (e: any) {
        const ms = Math.round(performance.now() - start);
        arr.push({ port, status: ms < 1500 ? "可能開放" : "封閉/超時", ms });
      }
      setResults([...arr]);
    }
    setRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={host} onChange={e => setHost(e.target.value)} placeholder="example.com" />
        <Button onClick={scan} disabled={running}>{running ? "掃描中..." : "掃描"}</Button>
      </div>
      <p className="text-xs text-muted-foreground">註：瀏覽器限制下僅供參考，無法準確判斷。常見端口：{ports.join(", ")}</p>
      {results.length > 0 && (
        <div className="grid grid-cols-2 gap-2 text-sm font-mono">
          {results.map(r => (
            <div key={r.port} className="flex justify-between p-2 rounded border bg-card">
              <span className="font-bold">:{r.port}</span>
              <span className={r.status === "可能開放" ? "text-green-600" : "text-muted-foreground"}>{r.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CidrCalc() {
  const [cidr, setCidr] = useState("192.168.1.0/24");

  const calc = () => {
    const m = cidr.match(/^(\d+\.\d+\.\d+\.\d+)\/(\d+)$/);
    if (!m) return null;
    const ip = m[1], prefix = parseInt(m[2]);
    if (prefix < 0 || prefix > 32) return null;
    const ipNum = ip.split(".").reduce((a, b) => (a << 8) + parseInt(b), 0) >>> 0;
    const mask = prefix > 0 ? (~0 << (32 - prefix)) >>> 0 : 0;
    const network = (ipNum & mask) >>> 0;
    const broadcast = (network | (~mask >>> 0)) >>> 0;
    const total = Math.pow(2, 32 - prefix);
    const numToIp = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
    return {
      網路位址: numToIp(network),
      廣播位址: numToIp(broadcast),
      子網路遮罩: numToIp(mask),
      萬用遮罩: numToIp(~mask >>> 0),
      第一個主機: numToIp(network + 1),
      最後一個主機: numToIp(broadcast - 1),
      "總 IP 數": total.toLocaleString(),
      "可用主機數": Math.max(0, total - 2).toLocaleString(),
      "二進位遮罩": mask.toString(2).padStart(32, "0").match(/.{8}/g)!.join("."),
    };
  };

  const result = calc();

  return (
    <div className="space-y-4">
      <Input value={cidr} onChange={e => setCidr(e.target.value)} placeholder="192.168.1.0/24" />
      {result ? <ResultBox data={result} /> : <p className="text-sm text-destructive">CIDR 格式錯誤</p>}
    </div>
  );
}

export const NetworkToolsExtra = {
  IpLookup, DnsLookup, HttpHeaders, PingTool, WhoisLookup, MacLookup, PortScanner, CidrCalc,
};
