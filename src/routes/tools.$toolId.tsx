import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getToolById, categories, getRelatedTools } from "@/data/tools";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { useFavorites } from "@/hooks/use-favorites";

export const Route = createFileRoute("/tools/$toolId")({
  head: ({ params }) => {
    const tool = getToolById(params.toolId);
    return {
      meta: [
        { title: tool ? `${tool.name} — FreeWebTools` : "工具 — FreeWebTools" },
        { name: "description", content: tool?.description ?? "" },
        { property: "og:title", content: tool ? `${tool.name} — FreeWebTools` : "FreeWebTools" },
        { property: "og:description", content: tool?.description ?? "" },
      ],
    };
  },
  component: ToolPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">找不到此工具</h1>
          <Link to="/" className="text-primary hover:underline">返回首頁</Link>
        </div>
      </div>
      <Footer />
    </div>
  ),
});

function ToolPage() {
  const { toolId } = Route.useParams();
  const tool = getToolById(toolId);
  const { isFavorite, toggle } = useFavorites();

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">找不到此工具</h1>
            <Link to="/" className="text-primary hover:underline">返回首頁</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const category = categories.find(c => c.id === tool.category);
  const related = getRelatedTools(toolId, 6);
  const isFav = isFavorite(toolId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          返回首頁
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {category && <span className="category-badge"><category.icon className="w-3 h-3" />{category.name}</span>}
            <button
              onClick={() => toggle(toolId)}
              className="ml-auto p-1.5 rounded-lg hover:bg-muted transition-colors"
              aria-label={isFav ? "取消收藏" : "加入收藏"}
            >
              <Star className={`w-5 h-5 ${isFav ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-1">{tool.name}</h1>
          <p className="text-muted-foreground text-sm">{tool.description}</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <ToolRenderer toolId={toolId} />
        </div>

        {/* Related Tools */}
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-semibold mb-4">相關工具推薦</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(rt => {
                const RtIcon = rt.icon;
                return (
                  <Link
                    key={rt.id}
                    to="/tools/$toolId"
                    params={{ toolId: rt.id }}
                    className="tool-card-animated block group"
                  >
                    <div className="tool-card-icon">
                      <RtIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">{rt.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{rt.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
