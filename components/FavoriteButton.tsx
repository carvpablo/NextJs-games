"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { type Game } from "@/types/GameTypes";

interface FavoriteButtonProps {
  game: Game;
}

export default function FavoriteButton({ game }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(game.id);

  return (
    <button
      onClick={() => toggleFavorite(game)}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95 ${
        favorite
          ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
          : "bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-200 border border-neutral-700/50 hover:text-white"
      }`}
    >
      <span className={favorite ? "text-rose-400 text-base" : "text-neutral-400 text-base"}>
        {favorite ? "♥" : "♡"}
      </span>
      {favorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
    </button>
  );
}

