import "./globals.css";
import Link from "next/link";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-violet-600 selection:text-white flex flex-col font-sans">
        <FavoritesProvider>
          <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800/80 px-4 sm:px-8 py-3.5 transition-all">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:scale-105 transition-transform duration-200">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent group-hover:from-violet-400 group-hover:to-indigo-300 transition-colors">
                    PixelVault
                  </span>
                  <span className="text-[10px] block font-medium uppercase tracking-wider text-violet-400 -mt-1">
                    Game Discovery
                  </span>
                </div>
              </Link>

              <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium">
                <Link
                  href="/"
                  className="text-neutral-400 hover:text-white hover:bg-neutral-800/60 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Catálogo
                </Link>
                <Link
                  href="/favorites"
                  className="text-neutral-400 hover:text-rose-400 hover:bg-neutral-800/60 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>♥</span> Favoritos
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          <footer className="border-t border-neutral-900 bg-neutral-950/50 py-6 text-center text-xs text-neutral-500">
            <p>
              Desenvolvido com Next.js & Tailwind CSS. Dados fornecidos por{" "}
              <a
                href="https://rawg.io/apidocs"
                target="_blank"
                rel="noreferrer"
                className="text-violet-400 hover:underline"
              >
                RAWG API
              </a>
              .
            </p>
          </footer>
        </FavoritesProvider>
      </body>
    </html>
  );
}
