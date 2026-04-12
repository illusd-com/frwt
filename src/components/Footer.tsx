import { Wrench } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Wrench className="w-4 h-4 text-primary" />
            FreeWebTools
          </div>
          <p className="text-sm text-muted-foreground">
            免費線上工具集合 — 所有工具皆在瀏覽器端運行，資料不會上傳至伺服器
          </p>
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} FreeWebTools. All tools run locally in your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
