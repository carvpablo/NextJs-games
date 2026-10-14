"use client";

import { type Game } from "@/types/GameTypes";
import { useState } from "react";
import GameList from "./GameList";
import GameFilters from "./GameFilters";

export interface GameListProps {
  gameList: Game[];
}

export default function GameCatalog({ gameList }: GameListProps) {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [searchedGame, setSearchedGame] = useState<string | null>(null);

  const filteredGamesByGenre =
    selectedGenre === "all"
      ? gameList
      : gameList.filter((game) =>
          game.genres?.some((genre) => genre.slug === selectedGenre),
        );

  const filteredGamesByName = !searchedGame
    ? filteredGamesByGenre
    : filteredGamesByGenre.filter((game) =>
        game.name
          .toLowerCase()
          .trim()
          .includes(searchedGame?.toLowerCase().trim()),
      );

  function handleSelectedGenre(genre: string) {
    setSelectedGenre(genre);
  }

  function handleSelectName(name: string) {
    setSearchedGame(name);
  }

  return (
    <div className="space-y-8">
      {/* Hero / Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-950/60 via-neutral-900/80 to-indigo-950/50 border border-neutral-800/80 p-8 sm:p-10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
            🔥 Jogos Populares
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Explore os melhores jogos do mundo
          </h1>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Pesquise por títulos, filtre por gêneros e descubra notas, datas de lançamento e informações completas dos seus games favoritos.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Barra de Filtros */}
      <GameFilters
        onSelectGender={handleSelectedGenre}
        onSelectName={handleSelectName}
      />

      {/* Resultados e Lista */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-neutral-400 px-1">
          <span>
            Exibindo{" "}
            <strong className="text-white font-medium">
              {filteredGamesByName.length}
            </strong>{" "}
            {filteredGamesByName.length === 1 ? "jogo" : "jogos"}
          </span>
        </div>
        <GameList gameList={filteredGamesByName} />
      </div>
    </div>
  );
}
