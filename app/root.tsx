import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap",
  },
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          {error.status === 404 ? (
            <>
              <h2 className="text-3xl font-bold text-red-500">404 - Page Not Found</h2>
              <p className="mt-4 text-lg text-gray-700 mb-5">Sorry, we couldn't find the page you were looking for.</p>
              <Link to="/" className="px-4 py-2 bg-transparent text-green-500 border-2 border-green-500 rounded-lg hover:bg-green-500 hover:text-white focus:outline-none transition-all duration-300 ease-in-out">
                Go Back to Home
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-red-500">Oops! Something went wrong.</h2>
              <p className="mt-4 text-lg text-gray-700 mb-5">An unexpected error occurred. Please try again later.</p>
              <Link to="/" className="px-4 py-2 bg-transparent text-green-500 border-2 border-green-500 rounded-lg hover:bg-green-500 hover:text-white focus:outline-none transition-all duration-300 ease-in-out">
                Go Back to Home
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  // You can optionally handle non-Route errors here as a fallback, if needed
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-red-500">Something went wrong!</h2>
        <p className="mt-4 text-lg text-gray-700 mb-5">We encountered an issue. Please try again later.</p>
        <Link to="/" className="px-4 py-2 bg-transparent text-green-500 border-2 border-green-500 rounded-lg hover:bg-green-500 hover:text-white focus:outline-none transition-all duration-300 ease-in-out">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
