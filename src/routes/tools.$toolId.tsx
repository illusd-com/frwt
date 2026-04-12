import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getToolById, categories } from "@/data/tools";
import { ToolRenderer } from "@/components/tools/ToolRenderer";

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
          </div>
          <h1 className="text-2xl font-bold mb-1">{tool.name}</h1>
          <p className="text-muted-foreground text-sm">{tool.description}</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <ToolRenderer toolId={toolId} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
