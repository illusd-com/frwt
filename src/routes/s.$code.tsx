import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getShare } from "@/lib/share-service";
import { useState, useEffect } from "react";
import { Download, ExternalLink, Copy, Eye } from "lucide-react";
import type { ShareItem } from "@/lib/share-service";

export const Route = createFileRoute("/s/$code")({
  component: SharePage,
});

function SharePage() {
  const { code } = Route.useParams();
  const [item, setItem] = useState<ShareItem | null | undefined>(undefined);

  useEffect(() => {
    setItem(getShare(code));
  }, [code]);

  if (item === undefined) return null;

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">😕</h1>
            <h2 className="text-xl font-bold mb-2">找不到此分享</h2>
            <p className="text-muted-foreground text-sm mb-4">此連結可能已過期或不存在</p>
            <Link to="/" className="text-primary hover:underline">返回首頁</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-8">
        <div className="rounded-xl border bg-card p-6">
          {item.type === "url" && (
            <div className="space-y-4">
              <h1 className="text-lg font-bold">🔗 短網址</h1>
              <div className="flex items-center gap-2">
                <a href={item.content} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all flex-1">{item.content}</a>
                <a href={item.content} target="_blank" rel="noopener noreferrer" className="tool-btn text-xs"><ExternalLink className="w-4 h-4" /> 前往</a>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="w-3 h-3" /> 瀏覽 {item.views} 次</p>
            </div>
          )}

          {item.type === "text" && (
            <div className="space-y-4">
              <h1 className="text-lg font-bold">📝 文字分享</h1>
              <pre className="tool-textarea whitespace-pre-wrap">{item.content}</pre>
              <button onClick={() => navigator.clipboard.writeText(item.content)} className="tool-btn text-xs"><Copy className="w-4 h-4" /> 複製</button>
            </div>
          )}

          {item.type === "image" && (
            <div className="space-y-4">
              <h1 className="text-lg font-bold">🖼️ 圖片分享</h1>
              <img src={item.content} alt={item.fileName || "Shared image"} className="max-w-full rounded-lg" />
              <a href={item.content} download={item.fileName || "image.png"} className="tool-btn inline-flex text-xs"><Download className="w-4 h-4" /> 下載</a>
            </div>
          )}

          {item.type === "file" && (
            <div className="space-y-4">
              <h1 className="text-lg font-bold">📁 檔案分享</h1>
              <p className="text-sm">檔案名稱: {item.fileName}</p>
              <a href={item.content} download={item.fileName} className="tool-btn inline-flex text-xs"><Download className="w-4 h-4" /> 下載檔案</a>
            </div>
          )}

          <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
            建立時間: {new Date(item.createdAt).toLocaleString("zh-TW")}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
