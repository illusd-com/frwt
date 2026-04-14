import { useState } from "react";

function DockerCompose() {
  const [services, setServices] = useState([
    { name: "web", image: "nginx:latest", ports: "80:80", volumes: "" },
    { name: "db", image: "postgres:15", ports: "5432:5432", volumes: "pgdata:/var/lib/postgresql/data" },
  ]);

  const addService = () => setServices([...services, { name: "", image: "", ports: "", volumes: "" }]);
  const update = (i: number, key: string, val: string) => {
    const s = [...services]; (s[i] as any)[key] = val; setServices(s);
  };
  const remove = (i: number) => setServices(services.filter((_, j) => j !== i));

  const yaml = `version: '3.8'\nservices:\n${services.filter(s => s.name && s.image).map(s => {
    let y = `  ${s.name}:\n    image: ${s.image}\n`;
    if (s.ports) y += `    ports:\n${s.ports.split(",").map(p => `      - "${p.trim()}"`).join("\n")}\n`;
    if (s.volumes) y += `    volumes:\n${s.volumes.split(",").map(v => `      - ${v.trim()}`).join("\n")}\n`;
    return y;
  }).join("")}${services.some(s => s.volumes) ? `volumes:\n${[...new Set(services.flatMap(s => s.volumes.split(",").filter(Boolean).map(v => v.trim().split(":")[0])).filter(v => !v.startsWith(".")))].map(v => `  ${v}:`).join("\n")}` : ""}`;

  return (
    <div className="space-y-4">
      {services.map((s, i) => (
        <div key={i} className="rounded-lg border p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">服務 #{i + 1}</span>
            <button className="text-xs text-destructive" onClick={() => remove(i)}>移除</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input className="rounded border bg-card p-2 text-sm" placeholder="服務名稱" value={s.name} onChange={e => update(i, "name", e.target.value)} />
            <input className="rounded border bg-card p-2 text-sm" placeholder="映像檔" value={s.image} onChange={e => update(i, "image", e.target.value)} />
            <input className="rounded border bg-card p-2 text-sm" placeholder="端口 (80:80)" value={s.ports} onChange={e => update(i, "ports", e.target.value)} />
            <input className="rounded border bg-card p-2 text-sm" placeholder="Volumes" value={s.volumes} onChange={e => update(i, "volumes", e.target.value)} />
          </div>
        </div>
      ))}
      <button className="tool-btn-secondary" onClick={addService}>+ 新增服務</button>
      <div>
        <label className="tool-label">docker-compose.yml</label>
        <pre className="tool-result whitespace-pre-wrap text-xs">{yaml}</pre>
      </div>
      <button className="tool-btn" onClick={() => navigator.clipboard.writeText(yaml)}>複製</button>
    </div>
  );
}

function EnvGen() {
  const [vars, setVars] = useState([
    { key: "DATABASE_URL", value: "postgresql://user:pass@localhost:5432/mydb", comment: "資料庫連線" },
    { key: "PORT", value: "3000", comment: "伺服器端口" },
    { key: "NODE_ENV", value: "development", comment: "環境" },
  ]);
  const add = () => setVars([...vars, { key: "", value: "", comment: "" }]);
  const update = (i: number, k: string, v: string) => { const a = [...vars]; (a[i] as any)[k] = v; setVars(a); };
  const remove = (i: number) => setVars(vars.filter((_, j) => j !== i));

  const result = vars.filter(v => v.key).map(v => `${v.comment ? `# ${v.comment}\n` : ""}${v.key}=${v.value}`).join("\n\n");

  return (
    <div className="space-y-4">
      {vars.map((v, i) => (
        <div key={i} className="grid grid-cols-12 gap-2 items-center">
          <input className="col-span-3 rounded border bg-card p-2 text-sm font-mono" placeholder="KEY" value={v.key} onChange={e => update(i, "key", e.target.value)} />
          <input className="col-span-4 rounded border bg-card p-2 text-sm" placeholder="value" value={v.value} onChange={e => update(i, "value", e.target.value)} />
          <input className="col-span-4 rounded border bg-card p-2 text-sm" placeholder="註釋" value={v.comment} onChange={e => update(i, "comment", e.target.value)} />
          <button className="col-span-1 text-destructive text-sm" onClick={() => remove(i)}>✕</button>
        </div>
      ))}
      <button className="tool-btn-secondary" onClick={add}>+ 新增變數</button>
      <pre className="tool-result whitespace-pre-wrap text-xs">{result}</pre>
      <button className="tool-btn" onClick={() => navigator.clipboard.writeText(result)}>複製 .env</button>
    </div>
  );
}

function NginxConfig() {
  const [domain, setDomain] = useState("example.com");
  const [port, setPort] = useState("3000");
  const [ssl, setSsl] = useState(true);
  const [gzip, setGzip] = useState(true);
  const [ws, setWs] = useState(false);

  const config = `server {
    listen ${ssl ? "443 ssl" : "80"};
    server_name ${domain};
${ssl ? `
    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;
` : ""}${gzip ? `
    gzip on;
    gzip_types text/plain application/json application/javascript text/css;
` : ""}
    location / {
        proxy_pass http://127.0.0.1:${port};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;${ws ? `
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";` : ""}
    }
}${ssl ? `\n\nserver {
    listen 80;
    server_name ${domain};
    return 301 https://$server_name$request_uri;
}` : ""}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">域名</label><input className="w-full rounded border bg-card p-2 text-sm" value={domain} onChange={e => setDomain(e.target.value)} /></div>
        <div><label className="tool-label">後端端口</label><input className="w-full rounded border bg-card p-2 text-sm" value={port} onChange={e => setPort(e.target.value)} /></div>
      </div>
      <div className="flex gap-4 flex-wrap">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={ssl} onChange={e => setSsl(e.target.checked)} />SSL</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={gzip} onChange={e => setGzip(e.target.checked)} />Gzip</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={ws} onChange={e => setWs(e.target.checked)} />WebSocket</label>
      </div>
      <pre className="tool-result whitespace-pre-wrap text-xs">{config}</pre>
      <button className="tool-btn" onClick={() => navigator.clipboard.writeText(config)}>複製</button>
    </div>
  );
}

function YamlValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const validate = () => {
    try {
      const lines = input.split("\n");
      let errors: string[] = [];
      let indent = 0;
      lines.forEach((line, i) => {
        if (!line.trim() || line.trim().startsWith("#")) return;
        const spaces = line.match(/^(\s*)/)?.[1].length || 0;
        if (spaces % 2 !== 0) errors.push(`第 ${i + 1} 行: 縮排應為 2 的倍數`);
        if (line.includes("\t")) errors.push(`第 ${i + 1} 行: 不應使用 Tab 縮排`);
      });
      setResult(errors.length ? errors.join("\n") : "✓ YAML 格式正確（基本檢查通過）");
    } catch (e: any) { setResult("錯誤: " + e.message); }
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[200px]" value={input} onChange={e => setInput(e.target.value)} placeholder="貼上 YAML..." />
      <button className="tool-btn" onClick={validate}>驗證</button>
      {result && <div className="tool-result whitespace-pre-wrap">{result}</div>}
    </div>
  );
}

function JsonValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const validate = () => {
    try {
      JSON.parse(input);
      setResult("✓ JSON 格式正確");
    } catch (e: any) { setResult("✗ " + e.message); }
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[200px]" value={input} onChange={e => setInput(e.target.value)} placeholder="貼上 JSON..." />
      <button className="tool-btn" onClick={validate}>驗證</button>
      {result && <div className={`tool-result ${result.startsWith("✓") ? "text-green-600" : "text-destructive"}`}>{result}</div>}
    </div>
  );
}

function ChangelogGen() {
  const [version, setVersion] = useState("1.0.0");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [added, setAdded] = useState("新功能 A\n新功能 B");
  const [changed, setChanged] = useState("改進項目 A");
  const [fixed, setFixed] = useState("修復 Bug A");
  const [removed, setRemoved] = useState("");

  const sections = [
    { title: "Added", items: added },
    { title: "Changed", items: changed },
    { title: "Fixed", items: fixed },
    { title: "Removed", items: removed },
  ].filter(s => s.items.trim());

  const result = `## [${version}] - ${date}\n\n${sections.map(s => `### ${s.title}\n${s.items.split("\n").filter(Boolean).map(i => `- ${i}`).join("\n")}`).join("\n\n")}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">版本號</label><input className="w-full rounded border bg-card p-2 text-sm" value={version} onChange={e => setVersion(e.target.value)} /></div>
        <div><label className="tool-label">日期</label><input type="date" className="w-full rounded border bg-card p-2 text-sm" value={date} onChange={e => setDate(e.target.value)} /></div>
      </div>
      <div><label className="tool-label">新增 (Added)</label><textarea className="tool-textarea" value={added} onChange={e => setAdded(e.target.value)} rows={2} /></div>
      <div><label className="tool-label">變更 (Changed)</label><textarea className="tool-textarea" value={changed} onChange={e => setChanged(e.target.value)} rows={2} /></div>
      <div><label className="tool-label">修復 (Fixed)</label><textarea className="tool-textarea" value={fixed} onChange={e => setFixed(e.target.value)} rows={2} /></div>
      <div><label className="tool-label">移除 (Removed)</label><textarea className="tool-textarea" value={removed} onChange={e => setRemoved(e.target.value)} rows={2} /></div>
      <pre className="tool-result whitespace-pre-wrap text-xs">{result}</pre>
      <button className="tool-btn" onClick={() => navigator.clipboard.writeText(result)}>複製</button>
    </div>
  );
}

function ReadmeGen() {
  const [name, setName] = useState("My Project");
  const [desc, setDesc] = useState("一個很酷的專案");
  const [install, setInstall] = useState("npm install my-project");
  const [usage, setUsage] = useState('import { something } from "my-project"');
  const [license, setLicense] = useState("MIT");

  const result = `# ${name}\n\n${desc}\n\n## 安裝\n\n\`\`\`bash\n${install}\n\`\`\`\n\n## 使用方式\n\n\`\`\`javascript\n${usage}\n\`\`\`\n\n## 授權\n\n${license} License`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">專案名稱</label><input className="w-full rounded border bg-card p-2 text-sm" value={name} onChange={e => setName(e.target.value)} /></div>
        <div><label className="tool-label">授權</label><input className="w-full rounded border bg-card p-2 text-sm" value={license} onChange={e => setLicense(e.target.value)} /></div>
      </div>
      <div><label className="tool-label">描述</label><textarea className="tool-textarea" value={desc} onChange={e => setDesc(e.target.value)} rows={2} /></div>
      <div><label className="tool-label">安裝指令</label><input className="w-full rounded border bg-card p-2 text-sm font-mono" value={install} onChange={e => setInstall(e.target.value)} /></div>
      <div><label className="tool-label">使用範例</label><textarea className="tool-textarea font-mono" value={usage} onChange={e => setUsage(e.target.value)} rows={3} /></div>
      <pre className="tool-result whitespace-pre-wrap text-xs">{result}</pre>
      <button className="tool-btn" onClick={() => navigator.clipboard.writeText(result)}>複製</button>
    </div>
  );
}

function LicenseGen() {
  const [type, setType] = useState("MIT");
  const [name, setName] = useState("");
  const [year] = useState(new Date().getFullYear());

  const licenses: Record<string, string> = {
    MIT: `MIT License\n\nCopyright (c) ${year} ${name || "[作者名稱]"}\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.`,
    "Apache-2.0": `Apache License\nVersion 2.0, January 2004\n\nCopyright ${year} ${name || "[作者名稱]"}\n\nLicensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.`,
    "GPL-3.0": `GNU GENERAL PUBLIC LICENSE\nVersion 3, 29 June 2007\n\nCopyright (C) ${year} ${name || "[作者名稱]"}\n\nThis program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License.`,
    ISC: `ISC License\n\nCopyright (c) ${year} ${name || "[作者名稱]"}\n\nPermission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted.`,
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">授權類型</label>
          <select className="w-full rounded border bg-card p-2 text-sm" value={type} onChange={e => setType(e.target.value)}>
            {Object.keys(licenses).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div><label className="tool-label">作者名稱</label><input className="w-full rounded border bg-card p-2 text-sm" value={name} onChange={e => setName(e.target.value)} /></div>
      </div>
      <pre className="tool-result whitespace-pre-wrap text-xs max-h-[300px] overflow-auto">{licenses[type]}</pre>
      <button className="tool-btn" onClick={() => navigator.clipboard.writeText(licenses[type])}>複製</button>
    </div>
  );
}

function SemverCalc() {
  const [v1, setV1] = useState("1.2.3");
  const [v2, setV2] = useState("2.0.0");
  const [bump, setBump] = useState("patch");

  const parse = (v: string) => {
    const m = v.match(/^(\d+)\.(\d+)\.(\d+)/);
    return m ? [+m[1], +m[2], +m[3]] as const : null;
  };

  const p1 = parse(v1);
  const p2 = parse(v2);

  const bumpVersion = () => {
    if (!p1) return "—";
    const [major, minor, patch] = p1;
    if (bump === "major") return `${major + 1}.0.0`;
    if (bump === "minor") return `${major}.${minor + 1}.0`;
    return `${major}.${minor}.${patch + 1}`;
  };

  const compare = () => {
    if (!p1 || !p2) return "—";
    for (let i = 0; i < 3; i++) {
      if (p1[i] > p2[i]) return `${v1} > ${v2}`;
      if (p1[i] < p2[i]) return `${v1} < ${v2}`;
    }
    return `${v1} = ${v2}`;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">版本 1</label><input className="w-full rounded border bg-card p-2 text-sm font-mono" value={v1} onChange={e => setV1(e.target.value)} /></div>
        <div><label className="tool-label">版本 2</label><input className="w-full rounded border bg-card p-2 text-sm font-mono" value={v2} onChange={e => setV2(e.target.value)} /></div>
      </div>
      <div className="rounded-lg bg-muted/50 p-3"><span className="text-sm font-medium">比較結果：</span><span className="font-mono text-primary">{compare()}</span></div>
      <div className="flex items-end gap-3">
        <div>
          <label className="tool-label">升版類型</label>
          <select className="rounded border bg-card p-2 text-sm" value={bump} onChange={e => setBump(e.target.value)}>
            <option value="major">Major</option><option value="minor">Minor</option><option value="patch">Patch</option>
          </select>
        </div>
        <div className="rounded-lg bg-muted/50 p-3"><span className="text-sm">{v1} → </span><span className="font-mono font-bold text-primary">{bumpVersion()}</span></div>
      </div>
    </div>
  );
}

export const DevOpsTools = { DockerCompose, EnvGen, NginxConfig, YamlValidator, JsonValidator, ChangelogGen, ReadmeGen, LicenseGen, SemverCalc };
