import { useState, useMemo } from "react";

/* ───────────────── Kubernetes YAML 產生器 ───────────────── */
function KubernetesGen() {
  const [name, setName] = useState("my-app");
  const [image, setImage] = useState("nginx:latest");
  const [replicas, setReplicas] = useState(3);
  const [port, setPort] = useState(80);
  const [serviceType, setServiceType] = useState<"ClusterIP" | "NodePort" | "LoadBalancer">("ClusterIP");
  const [includeIngress, setIncludeIngress] = useState(false);
  const [host, setHost] = useState("example.com");

  const yaml = useMemo(() => {
    let y = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}
  labels:
    app: ${name}
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${name}
  template:
    metadata:
      labels:
        app: ${name}
    spec:
      containers:
      - name: ${name}
        image: ${image}
        ports:
        - containerPort: ${port}
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: ${name}-service
spec:
  type: ${serviceType}
  selector:
    app: ${name}
  ports:
  - port: ${port}
    targetPort: ${port}
    protocol: TCP
`;
    if (includeIngress) {
      y += `---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${name}-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: ${host}
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ${name}-service
            port:
              number: ${port}
`;
    }
    return y;
  }, [name, image, replicas, port, serviceType, includeIngress, host]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="tool-label">應用名稱</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="tool-input" />
        </div>
        <div>
          <label className="tool-label">Container Image</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} className="tool-input" />
        </div>
        <div>
          <label className="tool-label">副本數</label>
          <input type="number" min={1} value={replicas} onChange={(e) => setReplicas(Number(e.target.value))} className="tool-input" />
        </div>
        <div>
          <label className="tool-label">Port</label>
          <input type="number" value={port} onChange={(e) => setPort(Number(e.target.value))} className="tool-input" />
        </div>
        <div className="col-span-2">
          <label className="tool-label">Service 類型</label>
          <select value={serviceType} onChange={(e) => setServiceType(e.target.value as any)} className="tool-input">
            <option value="ClusterIP">ClusterIP（內部）</option>
            <option value="NodePort">NodePort（節點埠）</option>
            <option value="LoadBalancer">LoadBalancer（雲端負載平衡）</option>
          </select>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={includeIngress} onChange={(e) => setIncludeIngress(e.target.checked)} />
        包含 Ingress 設定
      </label>
      {includeIngress && (
        <div>
          <label className="tool-label">Host</label>
          <input value={host} onChange={(e) => setHost(e.target.value)} className="tool-input" />
        </div>
      )}
      <div>
        <div className="flex justify-between mb-1">
          <label className="tool-label mb-0">k8s.yaml</label>
          <button onClick={() => navigator.clipboard.writeText(yaml)} className="text-xs text-primary hover:underline">📋 複製</button>
        </div>
        <pre className="tool-result whitespace-pre-wrap text-xs">{yaml}</pre>
      </div>
    </div>
  );
}

/* ───────────────── CI/CD 配置產生器 ───────────────── */
function CicdGen() {
  const [provider, setProvider] = useState<"github" | "gitlab" | "circleci">("github");
  const [language, setLanguage] = useState<"node" | "python" | "go">("node");
  const [includeDeploy, setIncludeDeploy] = useState(true);

  const config = useMemo(() => {
    if (provider === "github") {
      const setup =
        language === "node"
          ? `      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
      - run: npm run build`
          : language === "python"
          ? `      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: pytest`
          : `      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - run: go test ./...
      - run: go build -o app`;
      return `name: CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
${setup}
${includeDeploy ? `
  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: echo "🚀 部署到 production"` : ""}`;
    }
    if (provider === "gitlab") {
      return `stages:
  - test
  - build
${includeDeploy ? "  - deploy" : ""}

test:
  stage: test
  image: ${language === "node" ? "node:20" : language === "python" ? "python:3.11" : "golang:1.22"}
  script:
    ${language === "node" ? "- npm ci\n    - npm test" : language === "python" ? "- pip install -r requirements.txt\n    - pytest" : "- go test ./..."}

build:
  stage: build
  image: ${language === "node" ? "node:20" : language === "python" ? "python:3.11" : "golang:1.22"}
  script:
    ${language === "node" ? "- npm run build" : language === "python" ? '- echo "build"' : "- go build -o app"}
${includeDeploy ? `
deploy:
  stage: deploy
  only:
    - main
  script:
    - echo "🚀 部署到 production"` : ""}`;
    }
    return `version: 2.1
jobs:
  build:
    docker:
      - image: cimg/${language === "node" ? "node:20.10" : language === "python" ? "python:3.11" : "go:1.22"}
    steps:
      - checkout
      ${language === "node" ? "- run: npm ci\n      - run: npm test" : language === "python" ? "- run: pip install -r requirements.txt\n      - run: pytest" : "- run: go test ./...\n      - run: go build -o app"}

workflows:
  build_and_deploy:
    jobs:
      - build`;
  }, [provider, language, includeDeploy]);

  const filename = provider === "github" ? ".github/workflows/ci.yml" : provider === "gitlab" ? ".gitlab-ci.yml" : ".circleci/config.yml";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="tool-label">CI/CD 平台</label>
          <select value={provider} onChange={(e) => setProvider(e.target.value as any)} className="tool-input">
            <option value="github">GitHub Actions</option>
            <option value="gitlab">GitLab CI</option>
            <option value="circleci">CircleCI</option>
          </select>
        </div>
        <div>
          <label className="tool-label">語言</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value as any)} className="tool-input">
            <option value="node">Node.js</option>
            <option value="python">Python</option>
            <option value="go">Go</option>
          </select>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={includeDeploy} onChange={(e) => setIncludeDeploy(e.target.checked)} />
        包含部署階段
      </label>
      <div>
        <div className="flex justify-between mb-1">
          <label className="tool-label mb-0">{filename}</label>
          <button onClick={() => navigator.clipboard.writeText(config)} className="text-xs text-primary hover:underline">📋 複製</button>
        </div>
        <pre className="tool-result whitespace-pre-wrap text-xs">{config}</pre>
      </div>
    </div>
  );
}

/* ───────────────── Crontab 解析器 ───────────────── */
function CrontabParser() {
  const [expr, setExpr] = useState("0 9 * * 1-5");

  const PRESETS = [
    { label: "每分鐘", val: "* * * * *" },
    { label: "每小時整點", val: "0 * * * *" },
    { label: "每天午夜", val: "0 0 * * *" },
    { label: "工作日早上 9 點", val: "0 9 * * 1-5" },
    { label: "每週一", val: "0 0 * * 1" },
    { label: "每月 1 號", val: "0 0 1 * *" },
  ];

  const parse = (cron: string): { ok: boolean; desc: string; next: string[] } => {
    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) return { ok: false, desc: "❌ 格式錯誤：必須為 5 個欄位（分 時 日 月 週）", next: [] };
    const [m, h, dom, mon, dow] = parts;

    const describe = (v: string, type: "min" | "hour" | "dom" | "mon" | "dow") => {
      const names = {
        min: "分", hour: "時", dom: "日", mon: "月", dow: "週",
      };
      if (v === "*") return `每${names[type]}`;
      if (v.startsWith("*/")) return `每 ${v.slice(2)} ${names[type]}`;
      if (v.includes("-")) return `${names[type]} ${v}`;
      if (v.includes(",")) return `${names[type]} ${v}`;
      return `${names[type]} ${v}`;
    };

    const desc = `${describe(m, "min")}、${describe(h, "hour")}、${describe(dom, "dom")}、${describe(mon, "mon")}、${describe(dow, "dow")}`;

    // 簡易計算下次執行時間（僅支援 *、固定數字、*/N）
    const matchField = (val: string, current: number, max: number): boolean => {
      if (val === "*") return true;
      if (val.startsWith("*/")) return current % parseInt(val.slice(2)) === 0;
      if (val.includes(",")) return val.split(",").map(Number).includes(current);
      if (val.includes("-")) {
        const [a, b] = val.split("-").map(Number);
        return current >= a && current <= b;
      }
      return parseInt(val) === current;
    };

    const next: string[] = [];
    const now = new Date();
    now.setSeconds(0, 0);
    let cur = new Date(now.getTime() + 60000);
    let safety = 0;
    while (next.length < 5 && safety < 525600) {
      if (
        matchField(m, cur.getMinutes(), 59) &&
        matchField(h, cur.getHours(), 23) &&
        matchField(dom, cur.getDate(), 31) &&
        matchField(mon, cur.getMonth() + 1, 12) &&
        matchField(dow, cur.getDay(), 6)
      ) {
        next.push(cur.toLocaleString("zh-TW"));
      }
      cur = new Date(cur.getTime() + 60000);
      safety++;
    }

    return { ok: true, desc, next };
  };

  const result = parse(expr);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">Cron 表達式</label>
        <input value={expr} onChange={(e) => setExpr(e.target.value)} className="tool-input font-mono" placeholder="0 9 * * 1-5" />
      </div>
      <div>
        <label className="tool-label">常用範例</label>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((p) => (
            <button key={p.val} onClick={() => setExpr(p.val)} className="tool-btn-secondary text-xs">
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-muted/50 p-3 text-xs space-y-1">
        <div className="grid grid-cols-5 gap-1 font-mono text-center">
          <div>分 0-59</div><div>時 0-23</div><div>日 1-31</div><div>月 1-12</div><div>週 0-6</div>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-3 space-y-2">
        <div>
          <p className="text-xs text-muted-foreground">解讀</p>
          <p className="text-sm font-medium">{result.desc}</p>
        </div>
        {result.ok && result.next.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mt-2">未來 5 次執行時間</p>
            <ul className="text-sm font-mono space-y-1 mt-1">
              {result.next.map((t, i) => (
                <li key={i}>⏰ {t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export const DevOpsToolsExtra = {
  KubernetesGen,
  CicdGen,
  CrontabParser,
};
