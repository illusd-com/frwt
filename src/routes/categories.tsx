import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { categories, getToolsByCategory, tools } from "@/data/tools";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "工具分類 — FreeWebTools" },
      { name: "description", content: "瀏覽所有工具分類" },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold mb-8">工具分類</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(cat => {
            const catTools = getToolsByCategory(cat.id);
            return (
              <div key={cat.id} className="rounded-xl border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-primary">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{cat.name}</h2>
                    <p className="text-xs text-muted-foreground">{catTools.length} 個工具</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {catTools.map(tool => (
                    <Link
                      key={tool.id}
                      to="/tools/$toolId"
                      params={{ toolId: tool.id }}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-0.5"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
