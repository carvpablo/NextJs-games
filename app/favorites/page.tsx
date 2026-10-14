"use client";

import { useFavorites } from "@/context/FavoritesContext";
import GameList from "@/components/GameList";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header dos Favoritos */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/40 via-neutral-900/80 to-neutral-900/40 border border-neutral-800/80 p-8 sm:p-10">
        <div className="relative z-10 max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white mb-4"
          >
            ← Voltar para o catálogo
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 text-lg shadow-lg shadow-rose-950/40">
              ♥
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Meus Favoritos
            </h1>
          </div>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Aqui estão todos os jogos que você marcou com coração. Eles ficam salvos no seu navegador para você não perder nenhum título.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Loading state enquanto lê localStorage */}
      {!isLoaded ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-neutral-900/50 border border-neutral-800 overflow-hidden space-y-4 pb-5"
            >
              <div className="aspect-video w-full bg-neutral-800/60" />
              <div className="px-5 space-y-2.5">
                <div className="h-3.5 w-1/3 bg-neutral-800/80 rounded" />
                <div className="h-5 w-4/5 bg-neutral-800/90 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-neutral-800 rounded-3xl bg-neutral-900/20">
          <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-rose-400 mb-4 text-2xl">
            ♡
          </div>
          <h2 className="text-xl font-bold text-neutral-200">
            Você ainda não tem jogos favoritos
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-md mb-6">
            Explore o catálogo e clique no ícone de coração nos cards para salvar seus jogos preferidos aqui.
          </p>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all shadow-lg shadow-violet-600/25 active:scale-95"
          >
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-neutral-400 px-1">
            Total de salvos:{" "}
            <strong className="text-white font-medium">{favorites.length}</strong>{" "}
            {favorites.length === 1 ? "jogo" : "jogos"}
          </div>
          <GameList gameList={favorites} />
        </div>
      )}
    </div>
  );
}

