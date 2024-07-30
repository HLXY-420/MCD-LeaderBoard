import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { NextUIProvider } from "@nextui-org/react";
import { SiteContainer } from "./components/SiteContainer";
import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "./services/auth.server";

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
  let user = useLoaderData();

  return (
    <SiteContainer user={user}>
      <Outlet />
    </SiteContainer>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  if (url.pathname === "/login") return null;

  if (url.pathname === "/logout") return await authenticator.isAuthenticated(request);

  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}
