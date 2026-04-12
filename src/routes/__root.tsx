import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FreeWebTools — 免費線上工具集" },
      { name: "description", content: "50+ 免費線上工具，文字處理、編碼解碼、格式化、產生器、轉換器、計算器等。" },
      { name: "author", content: "FreeWebTools" },
      { property: "og:title", content: "FreeWebTools — 免費線上工具集" },
      { property: "og:description", content: "50+ 免費線上工具，文字處理、編碼解碼、格式化、產生器、轉換器、計算器等。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "FreeWebTools — 免費線上工具集" },
      { name: "twitter:description", content: "50+ 免費線上工具，文字處理、編碼解碼、格式化、產生器、轉換器、計算器等。" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5df02089-17d2-4523-8546-ab8c03f4f839/id-preview-4ebed921--3123b998-46a1-4321-8556-946379f45180.lovable.app-1775999296875.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5df02089-17d2-4523-8546-ab8c03f4f839/id-preview-4ebed921--3123b998-46a1-4321-8556-946379f45180.lovable.app-1775999296875.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
