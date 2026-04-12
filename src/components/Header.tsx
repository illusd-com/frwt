import { Link } from "@tanstack/react-router";
import { Wrench } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Wrench className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          FreeWebTools
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link to="/" className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            首頁
          </Link>
          <Link to="/categories" className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            分類
          </Link>
        </nav>
      </div>
    </header>
  );
}
