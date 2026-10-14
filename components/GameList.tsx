import { type GameListProps } from "./GameCatalog";
import GameCard from "./GameCard";

export default function GameList({ gameList }: GameListProps) {
  if (gameList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/20">
        <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 mb-4 text-2xl">
          🎮
        </div>
        <h2 className="text-xl font-bold text-neutral-200">
          Nenhum jogo encontrado
        </h2>
        <p className="text-sm text-neutral-400 mt-1 max-w-sm">
          Tente ajustar sua busca ou mudar o filtro de gênero para encontrar outros títulos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {gameList.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
