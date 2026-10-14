import axios from "axios";

export default async function fetchGames() {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching data");
  }
}

export async function fetchGameDetails(id: string) {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: {
        key: process.env.API_KEY,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const GENRES = [
  { slug: "all", name: "Todos os Gêneros" },
  { slug: "action", name: "Ação (Action)" },
  { slug: "indie", name: "Indie" },
  { slug: "adventure", name: "Aventura (Adventure)" },
  { slug: "role-playing-games-rpg", name: "RPG" },
  { slug: "strategy", name: "Estratégia (Strategy)" },
  { slug: "shooter", name: "Tiro (Shooter)" },
  { slug: "casual", name: "Casual" },
  { slug: "simulation", name: "Simulação (Simulation)" },
  { slug: "puzzle", name: "Puzzle" },
  { slug: "arcade", name: "Arcade" },
  { slug: "platformer", name: "Plataforma (Platformer)" },
  { slug: "racing", name: "Corrida (Racing)" },
  { slug: "sports", name: "Esportes (Sports)" },
  { slug: "fighting", name: "Luta (Fighting)" },
  { slug: "family", name: "Família (Family)" },
];
