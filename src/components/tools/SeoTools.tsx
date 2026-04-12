import { useState } from "react";

function MetaGenerator() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");

  const code = [
    title && `<meta name="title" content="${title}">`,
    desc && `<meta name="description" content="${desc}">`,
    keywords && `<meta name="keywords" content="${keywords}">`,
    author && `<meta name="author" content="${author}">`,
    title && `<meta property="og:title" content="${title}">`,
    desc && `<meta property="og:description" content="${desc}">`,
    `<meta property="og:type" content="website">`,
    title && `<meta name="twitter:card" content="summary">`,
    title && `<meta name="twitter:title" content="${title}">`,
    desc && `<meta name="twitter:description" content="${desc}">`,
  ].filter(Boolean).join("\n");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">標題</label><input className="w-full rounded-lg border bg-card p-2 text-sm" value={title} onChange={e => setTitle(e.target.value)} placeholder="網站標題" /></div>
        <div><label className="tool-label">作者</label><input className="w-full rounded-lg border bg-card p-2 text-sm" value={author} onChange={e => setAuthor(e.target.value)} placeholder="作者名稱" /></div>
      </div>
      <div><label className="tool-label">描述</label><textarea className="tool-textarea min-h-[80px]" value={desc} onChange={e => setDesc(e.target.value)} placeholder="網站描述..." /></div>
      <div><label className="tool-label">關鍵字（逗號分隔）</label><input className="w-full rounded-lg border bg-card p-2 text-sm" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="關鍵字1, 關鍵字2" /></div>
      {code && <pre className="tool-result whitespace-pre-wrap text-xs">{code}</pre>}
      <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(code)}>複製</button>
    </div>
  );
}

function RobotsGenerator() {
  const [allow, setAllow] = useState(true);
  const [sitemap, setSitemap] = useState("");
  const [disallow, setDisallow] = useState("/admin\n/private");

  const code = [
    "User-agent: *",
    allow ? "Allow: /" : "Disallow: /",
    ...disallow.split("\n").filter(Boolean).map(p => `Disallow: ${p.trim()}`),
    sitemap && `\nSitemap: ${sitemap}`,
  ].filter(Boolean).join("\n");

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={allow} onChange={e => setAllow(e.target.checked)} className="rounded" />
        允許搜尋引擎爬取
      </label>
      <div><label className="tool-label">禁止路徑（每行一個）</label><textarea className="tool-textarea min-h-[80px]" value={disallow} onChange={e => setDisallow(e.target.value)} /></div>
      <div><label className="tool-label">Sitemap URL</label><input className="w-full rounded-lg border bg-card p-2 text-sm" value={sitemap} onChange={e => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" /></div>
      <pre className="tool-result whitespace-pre-wrap text-xs">{code}</pre>
      <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(code)}>複製</button>
    </div>
  );
}

function OgPreview() {
  const [title, setTitle] = useState("我的網站標題");
  const [desc, setDesc] = useState("這是我的網站描述，會顯示在社群分享時");
  const [url, setUrl] = useState("https://example.com");

  return (
    <div className="space-y-4">
      <div><label className="tool-label">標題</label><input className="w-full rounded-lg border bg-card p-2 text-sm" value={title} onChange={e => setTitle(e.target.value)} /></div>
      <div><label className="tool-label">描述</label><textarea className="tool-textarea min-h-[60px]" value={desc} onChange={e => setDesc(e.target.value)} /></div>
      <div><label className="tool-label">URL</label><input className="w-full rounded-lg border bg-card p-2 text-sm" value={url} onChange={e => setUrl(e.target.value)} /></div>
      <div>
        <label className="tool-label">預覽</label>
        <div className="rounded-lg border overflow-hidden max-w-md">
          <div className="h-40 bg-muted flex items-center justify-center text-muted-foreground text-sm">圖片預覽區域</div>
          <div className="p-3 bg-card">
            <div className="text-xs text-muted-foreground uppercase">{url.replace(/https?:\/\//, "").split("/")[0]}</div>
            <div className="font-semibold text-sm mt-1 line-clamp-2">{title}</div>
            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SitemapGenerator() {
  const [urls, setUrls] = useState("https://example.com\nhttps://example.com/about\nhttps://example.com/contact");
  const [freq, setFreq] = useState("weekly");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.split("\n").filter(Boolean).map(u => `  <url>
    <loc>${u.trim()}</loc>
    <changefreq>${freq}</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n")}
</urlset>`;

  return (
    <div className="space-y-4">
      <div><label className="tool-label">URL 列表（每行一個）</label><textarea className="tool-textarea min-h-[120px]" value={urls} onChange={e => setUrls(e.target.value)} /></div>
      <div>
        <label className="tool-label">更新頻率</label>
        <select className="w-full rounded-lg border bg-card p-2 text-sm" value={freq} onChange={e => setFreq(e.target.value)}>
          {["always","hourly","daily","weekly","monthly","yearly","never"].map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <pre className="tool-result whitespace-pre-wrap text-xs max-h-[300px] overflow-auto">{xml}</pre>
      <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(xml)}>複製</button>
    </div>
  );
}

function SlugGenerator() {
  const [input, setInput] = useState("");

  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u4e00-\u9fff-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <div className="space-y-4">
      <div><label className="tool-label">標題</label><input className="w-full rounded-lg border bg-card p-2 text-sm" value={input} onChange={e => setInput(e.target.value)} placeholder="My Blog Post Title" /></div>
      <div><label className="tool-label">Slug</label><div className="tool-result">{slug || "—"}</div></div>
      {slug && <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(slug)}>複製</button>}
    </div>
  );
}

function CharCounterSeo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const titleOk = title.length > 0 && title.length <= 60;
  const descOk = desc.length > 0 && desc.length <= 160;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium">標題標籤</label>
          <span className={`text-xs font-mono ${titleOk ? "text-green-600" : "text-destructive"}`}>{title.length}/60</span>
        </div>
        <input className="w-full rounded-lg border bg-card p-2 text-sm" value={title} onChange={e => setTitle(e.target.value)} placeholder="頁面標題..." />
        <div className="h-1.5 rounded-full bg-muted mt-2 overflow-hidden">
          <div className={`h-full rounded-full transition-all ${titleOk ? "bg-green-500" : "bg-destructive"}`} style={{ width: `${Math.min(100, title.length / 60 * 100)}%` }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium">描述標籤</label>
          <span className={`text-xs font-mono ${descOk ? "text-green-600" : "text-destructive"}`}>{desc.length}/160</span>
        </div>
        <textarea className="tool-textarea min-h-[80px]" value={desc} onChange={e => setDesc(e.target.value)} placeholder="頁面描述..." />
        <div className="h-1.5 rounded-full bg-muted mt-2 overflow-hidden">
          <div className={`h-full rounded-full transition-all ${descOk ? "bg-green-500" : "bg-destructive"}`} style={{ width: `${Math.min(100, desc.length / 160 * 100)}%` }} />
        </div>
      </div>
      <div>
        <label className="tool-label">Google 搜尋預覽</label>
        <div className="rounded-lg border p-4 bg-card">
          <div className="text-blue-700 text-lg hover:underline cursor-pointer">{title || "頁面標題"}</div>
          <div className="text-green-700 text-sm">https://example.com</div>
          <div className="text-sm text-muted-foreground mt-1">{desc || "頁面描述會顯示在這裡..."}</div>
        </div>
      </div>
    </div>
  );
}

export const SeoTools = { MetaGenerator, RobotsGenerator, OgPreview, SitemapGenerator, SlugGenerator, CharCounterSeo };
