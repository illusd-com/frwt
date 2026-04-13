import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Star, Sparkles, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { tools, categories, searchTools, getToolsByCategory } from "@/data/tools";
import { useFavorites } from "@/hooks/use-favorites";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FreeWebTools — 免費線上工具集" },
      { name: "description", content: `${tools.length}+ 免費線上工具：文字處理、編碼解碼、格式化、產生器、轉換器、計算器、圖片處理、影片音訊等，所有工具皆在瀏覽器端運行。` },
      { property: "og:title", content: "FreeWebTools — 免費線上工具集" },
      { property: "og:description", content: `${tools.length}+ 免費線上工具，所有工具皆在瀏覽器端運行，資料不會上傳至伺服器。` },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => query ? searchTools(query) : [], [query]);
  const isSearching = query.length > 0;
  const { favorites, toggle, isFavorite } = useFavorites();
  const favoriteTools = useMemo(() => tools.filter(t => favorites.includes(t.id)), [favorites]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="hero-section py-16 md:py-24 relative overflow-hidden">
        <div className="hero-bg-dots" />
        <div className="mx-auto max-w-3xl px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm px-4 py-1.5 text-sm text-primary-foreground/90 mb-6 animate-fade-in border border-primary-foreground/10">
            <Sparkles className="w-4 h-4" />
            <span>{tools.length}+ 免費工具</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            免費線上工具集
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            超過 {tools.length} 個實用工具，全部免費、無需註冊，資料在瀏覽器端處理
          </p>
          <div className="relative max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="搜尋工具..."
              className="w-full rounded-xl border-0 bg-card py-3.5 pl-12 pr-4 text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10">
        {/* Favorites */}
        {!isSearching && favoriteTools.length > 0 && (
          <section className="mb-10 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <h2 className="text-lg font-semibold">我的收藏</h2>
              <span className="text-xs text-muted-foreground">({favoriteTools.length})</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favoriteTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} isFav onToggleFav={() => toggle(tool.id)} />
              ))}
            </div>
          </section>
        )}

        {isSearching ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">搜尋結果 ({filtered.length})</h2>
            {filtered.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">找不到相關工具，試試其他關鍵字</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map(tool => (
                  <ToolCard key={tool.id} tool={tool} isFav={isFavorite(tool.id)} onToggleFav={() => toggle(tool.id)} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((cat, catIdx) => {
              const catTools = getToolsByCategory(cat.id);
              return (
                <section key={cat.id} className="stagger-section" style={{ animationDelay: `${catIdx * 0.05}s` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <cat.icon className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold">{cat.name}</h2>
                      <span className="text-xs text-muted-foreground">({catTools.length})</span>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {catTools.map((tool, i) => (
                      <ToolCard key={tool.id} tool={tool} isFav={isFavorite(tool.id)} onToggleFav={() => toggle(tool.id)} delay={i * 0.02} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ToolCard({ tool, isFav, onToggleFav, delay = 0 }: { tool: typeof tools[0]; isFav?: boolean; onToggleFav?: () => void; delay?: number }) {
  const Icon = tool.icon;
  return (
    <div className="tool-card-animated block group relative" style={{ animationDelay: `${delay}s` }}>
      {onToggleFav && (
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); onToggleFav(); }}
          className="absolute top-3 right-3 z-10 p-1 rounded-md hover:bg-muted transition-colors"
          aria-label={isFav ? "取消收藏" : "加入收藏"}
        >
          <Star className={`w-4 h-4 transition-colors ${isFav ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/40 hover:text-yellow-500"}`} />
        </button>
      )}
      <Link to="/tools/$toolId" params={{ toolId: tool.id }} className="block">
        <div className="tool-card-icon">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors pr-6">{tool.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
      </Link>
    </div>
  );
}
