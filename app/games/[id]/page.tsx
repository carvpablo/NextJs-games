import { fetchGameDetails } from "@/lib/games";
import { notFound } from "next/navigation";
import { Game } from "@/types/GameTypes";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export interface GameDetailsType extends Game {
  description_raw: string;
  website: string;
  metacritic?: number;
  playtime?: number;
}

export default async function GameDetails({ params }: PageProps) {
  const { id } = await params;
  const game: GameDetailsType | null = await fetchGameDetails(id);

  if (!game) {
    notFound();
  }

  const formattedDate = game.released
    ? new Date(game.released).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Não informada";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Barra Superior de Ações */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 px-4 py-2 rounded-xl transition-all"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Voltar para o catálogo
        </Link>

        <FavoriteButton game={game} />
      </div>

      {/* Hero com Banner e Infos Principais */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40">
        {game.background_image && (
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-full object-cover opacity-20 blur-sm scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
          </div>
        )}

        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Poster / Imagem principal */}
          {game.background_image && (
            <div className="w-full md:w-80 shrink-0 aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-700/50 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Dados do Jogo */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap gap-2">
              {game.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {game.name}
            </h1>

            {/* Badges de Métricas */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 px-3.5 py-2 rounded-xl">
                <span className="text-amber-400 text-lg">★</span>
                <div>
                  <div className="text-xs text-neutral-400 font-medium leading-none">Avaliação</div>
                  <div className="text-sm font-bold text-white mt-0.5">{game.rating || "N/A"} / 5</div>
                </div>
              </div>

              {game.metacritic && (
                <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 px-3.5 py-2 rounded-xl">
                  <span className="text-emerald-400 font-bold text-sm">MC</span>
                  <div>
                    <div className="text-xs text-neutral-400 font-medium leading-none">Metacritic</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">{game.metacritic}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 px-3.5 py-2 rounded-xl">
                <div>
                  <div className="text-xs text-neutral-400 font-medium leading-none">Lançamento</div>
                  <div className="text-sm font-bold text-white mt-0.5">{formattedDate}</div>
                </div>
              </div>
            </div>

            {game.website && (
              <div className="pt-2">
                <a
                  href={game.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 hover:underline"
                >
                  Visitar Website Oficial
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sobre o Jogo / Descrição */}
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-500" />
          Sobre o jogo
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
          {game.description_raw || "Nenhuma descrição disponível para este jogo."}
        </p>
      </div>
    </div>
  );
}
