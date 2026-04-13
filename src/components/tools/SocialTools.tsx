import { useState } from "react";

function SocialImageSize() {
  const sizes = [
    { platform: "Facebook", items: [{ name: "封面照片", w: 820, h: 312 }, { name: "貼文圖片", w: 1200, h: 630 }, { name: "大頭貼", w: 170, h: 170 }] },
    { platform: "Instagram", items: [{ name: "方形貼文", w: 1080, h: 1080 }, { name: "限動/Reels", w: 1080, h: 1920 }, { name: "橫式貼文", w: 1080, h: 566 }] },
    { platform: "Twitter/X", items: [{ name: "貼文圖片", w: 1200, h: 675 }, { name: "標題圖片", w: 1500, h: 500 }, { name: "大頭貼", w: 400, h: 400 }] },
    { platform: "YouTube", items: [{ name: "縮圖", w: 1280, h: 720 }, { name: "頻道橫幅", w: 2560, h: 1440 }, { name: "頻道頭像", w: 800, h: 800 }] },
    { platform: "LinkedIn", items: [{ name: "封面圖片", w: 1584, h: 396 }, { name: "貼文圖片", w: 1200, h: 627 }, { name: "大頭貼", w: 400, h: 400 }] },
  ];

  return (
    <div className="space-y-4">
      {sizes.map(p => (
        <div key={p.platform}>
          <h3 className="font-semibold mb-2">{p.platform}</h3>
          <div className="grid gap-2 sm:grid-cols-3">
            {p.items.map(i => (
              <div key={i.name} className="rounded-lg border bg-card p-3 text-center">
                <p className="text-sm font-medium">{i.name}</p>
                <p className="text-lg font-mono">{i.w} × {i.h}</p>
                <p className="text-xs text-muted-foreground">{(i.w / i.h).toFixed(2)}:1</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function HashtagGen() {
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const generate = () => {
    if (!topic) return;
    const base = topic.toLowerCase().replace(/\s+/g, "");
    const prefixes = ["", "love", "my", "best", "daily", "insta", "trending", "viral", "top"];
    const suffixes = ["", "life", "vibes", "goals", "tips", "hack", "lover", "community", "of2024", "daily"];
    const result = new Set<string>();
    result.add(`#${base}`);
    prefixes.forEach(p => result.add(`#${p}${base}`));
    suffixes.forEach(s => result.add(`#${base}${s}`));
    setTags([...result].slice(0, 20));
  };

  return (
    <div className="space-y-4">
      <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="輸入主題..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      <button onClick={generate} disabled={!topic} className="tool-btn"># 產生 Hashtag</button>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <button key={t} onClick={() => navigator.clipboard.writeText(t)} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-primary hover:text-primary-foreground transition-colors">{t}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function FollowerCount() {
  const [num, setNum] = useState("");
  const format = (n: number) => {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return String(n);
  };

  const n = parseInt(num);

  return (
    <div className="space-y-4">
      <input type="number" value={num} onChange={e => setNum(e.target.value)} placeholder="輸入數字..." className="w-full rounded-lg border bg-card p-3 text-sm" />
      {!isNaN(n) && n >= 0 && (
        <div className="text-center">
          <div className="text-4xl font-bold">{format(n)}</div>
          <div className="text-sm text-muted-foreground mt-2">{n.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}

function EngagementCalc() {
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");

  const f = parseInt(followers) || 0;
  const total = (parseInt(likes) || 0) + (parseInt(comments) || 0) + (parseInt(shares) || 0);
  const rate = f > 0 ? (total / f) * 100 : 0;

  return (
    <div className="space-y-3">
      <div><label className="tool-label">粉絲數</label><input type="number" value={followers} onChange={e => setFollowers(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">按讚數</label><input type="number" value={likes} onChange={e => setLikes(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">留言數</label><input type="number" value={comments} onChange={e => setComments(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      <div><label className="tool-label">分享數</label><input type="number" value={shares} onChange={e => setShares(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      {f > 0 && (
        <div className="tool-result text-center">
          <div className="text-3xl font-bold">{rate.toFixed(2)}%</div>
          <div className="text-sm text-muted-foreground">互動率 ({total.toLocaleString()} / {f.toLocaleString()})</div>
          <div className="text-xs mt-2">{rate > 6 ? "🔥 非常優秀" : rate > 3 ? "👍 良好" : rate > 1 ? "😐 普通" : "📉 需要改善"}</div>
        </div>
      )}
    </div>
  );
}

export const SocialTools = {
  SocialImageSize,
  HashtagGen,
  FollowerCount,
  EngagementCalc,
};
