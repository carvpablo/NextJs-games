import fetchGames from "@/lib/games";
import { type Game } from "@/types/GameTypes";
import GameCatalog from "@/components/GameCatalog";

export default async function Home() {
  const data = await fetchGames();
  const games: Game[] = data.results || [];

  return (
    <div>
      <GameCatalog gameList={games} />
    </div>
  );
}
