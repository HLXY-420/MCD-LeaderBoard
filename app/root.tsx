import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { NextUIProvider } from "@nextui-org/react";
import { SiteContainer } from "./components/SiteContainer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-cn">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <main className="light text-foreground bg-background">
            {children}
          </main>
          <ScrollRestoration />
          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <SiteContainer>
      <Outlet />
    </SiteContainer>
  );
}
