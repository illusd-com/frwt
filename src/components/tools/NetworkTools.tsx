import { useState } from "react";

function SubnetCalc() {
  const [ip, setIp] = useState("192.168.1.0");
  const [cidr, setCidr] = useState(24);

  const ipToNum = (s: string) => s.split(".").reduce((a, b) => (a << 8) + parseInt(b), 0) >>> 0;
  const numToIp = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");

  const mask = cidr > 0 ? (~0 << (32 - cidr)) >>> 0 : 0;
  const network = ipToNum(ip) & mask;
  const broadcast = network | (~mask >>> 0);
  const hosts = Math.max(0, Math.pow(2, 32 - cidr) - 2);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={ip} onChange={e => setIp(e.target.value)} placeholder="IP 位址" className="flex-1 rounded-lg border bg-card p-3 text-sm font-mono" />
        <span className="self-center">/</span>
        <input type="number" min="0" max="32" value={cidr} onChange={e => setCidr(+e.target.value)} className="w-20 rounded-lg border bg-card p-3 text-sm" />
      </div>
      <div className="space-y-2 text-sm">
        {[
          ["子網路遮罩", numToIp(mask)],
          ["網路位址", numToIp(network)],
          ["廣播位址", numToIp(broadcast)],
          ["第一個可用 IP", numToIp(network + 1)],
          ["最後一個可用 IP", numToIp(broadcast - 1)],
          ["可用主機數", hosts.toLocaleString()],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-2"><span className="font-medium min-w-[120px]">{k}:</span><span className="tool-result flex-1 font-mono">{v}</span></div>
        ))}
      </div>
    </div>
  );
}

function UserAgentParser() {
  const [ua, setUa] = useState(typeof navigator !== "undefined" ? navigator.userAgent : "");

  const parse = (s: string) => {
    const browser = s.match(/(Chrome|Firefox|Safari|Edge|Opera|MSIE|Trident)[\/ ]([\d.]+)/);
    const os = s.match(/(Windows NT|Mac OS X|Linux|Android|iOS|iPhone OS) ?([\d._]*)/);
    const mobile = /Mobile|Android|iPhone/.test(s);
    return {
      瀏覽器: browser ? `${browser[1]} ${browser[2]}` : "未知",
      作業系統: os ? `${os[1]} ${os[2]}`.replace(/_/g, ".") : "未知",
      裝置類型: mobile ? "行動裝置" : "桌面電腦",
      引擎: s.includes("Gecko") ? "Gecko" : s.includes("WebKit") ? "WebKit" : "未知",
    };
  };

  const info = parse(ua);

  return (
    <div className="space-y-4">
      <textarea value={ua} onChange={e => setUa(e.target.value)} className="tool-textarea" placeholder="貼上 User Agent..." />
      <div className="space-y-2 text-sm">
        {Object.entries(info).map(([k, v]) => (
          <div key={k} className="flex gap-2"><span className="font-medium min-w-[80px]">{k}:</span><span className="tool-result flex-1">{v}</span></div>
        ))}
      </div>
    </div>
  );
}

function HttpStatusCodes() {
  const [search, setSearch] = useState("");
  const codes: [number, string][] = [
    [100, "Continue"], [101, "Switching Protocols"],
    [200, "OK"], [201, "Created"], [202, "Accepted"], [204, "No Content"],
    [301, "Moved Permanently"], [302, "Found"], [304, "Not Modified"], [307, "Temporary Redirect"], [308, "Permanent Redirect"],
    [400, "Bad Request"], [401, "Unauthorized"], [403, "Forbidden"], [404, "Not Found"], [405, "Method Not Allowed"], [408, "Request Timeout"], [409, "Conflict"], [410, "Gone"], [413, "Payload Too Large"], [422, "Unprocessable Entity"], [429, "Too Many Requests"],
    [500, "Internal Server Error"], [501, "Not Implemented"], [502, "Bad Gateway"], [503, "Service Unavailable"], [504, "Gateway Timeout"],
  ];

  const filtered = search ? codes.filter(([c, t]) => String(c).includes(search) || t.toLowerCase().includes(search.toLowerCase())) : codes;

  const getColor = (code: number) => {
    if (code < 200) return "bg-muted";
    if (code < 300) return "bg-green-100";
    if (code < 400) return "bg-blue-100";
    if (code < 500) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="space-y-4">
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="搜尋狀態碼..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      <div className="space-y-1 max-h-[400px] overflow-auto">
        {filtered.map(([code, text]) => (
          <div key={code} className={`flex items-center gap-3 p-2 rounded-lg ${getColor(code)}`}>
            <span className="font-mono font-bold w-12">{code}</span>
            <span className="text-sm">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const NetworkTools = {
  SubnetCalc,
  UserAgentParser,
  HttpStatusCodes,
};
