"use client";

import Link from "next/link";
import { type Game } from "@/types/GameTypes";
import { useFavorites } from "@/context/FavoritesContext";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(game.id);

  const formattedDate = game.released
    ? new Date(game.released).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Data indisponível";

  const ratingColor =
    game.rating >= 4.5
      ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
      : game.rating >= 3.5
      ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
      : "text-rose-400 border-rose-500/30 bg-rose-500/10";

  return (
    <div className="group relative flex flex-col rounded-2xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-950/40 transition-all duration-300 hover:-translate-y-1">
      {/* Imagem do jogo */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-800">
        {game.background_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={game.background_image}
            alt={game.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
            Sem Imagem
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />

        {/* Botão de Favoritar */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(game);
          }}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm backdrop-blur-md transition-all active:scale-90 ${
            favorite
              ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-lg shadow-rose-950/50"
              : "bg-neutral-900/70 text-neutral-400 hover:text-white border border-neutral-700/50 hover:bg-neutral-900"
          }`}
        >
          {favorite ? "♥" : "♡"}
        </button>

        {/* Badge de Avaliação */}
        <div
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border flex items-center gap-1 shadow-md ${ratingColor}`}
        >
          <span>★</span>
          <span>{game.rating ? game.rating.toFixed(1) : "N/A"}</span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="flex flex-1 flex-col p-5 justify-between">
        <div>
          {/* Tags de Gêneros */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {game.genres?.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className="text-[11px] font-medium text-neutral-400 bg-neutral-800/70 border border-neutral-700/40 px-2 py-0.5 rounded-md"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Nome do jogo */}
          <h3 className="font-bold text-base text-neutral-100 group-hover:text-violet-300 transition-colors line-clamp-1">
            {game.name}
          </h3>

          <p className="text-xs text-neutral-400 mt-1">
            Lançamento: <span className="text-neutral-300">{formattedDate}</span>
          </p>
        </div>

        {/* Botão de ação */}
        <div className="mt-5 pt-3 border-t border-neutral-800/80">
          <Link
            href={`/games/${game.id}`}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-violet-600 text-neutral-200 hover:text-white transition-all duration-200 active:scale-[0.98]"
          >
            Ver detalhes
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
