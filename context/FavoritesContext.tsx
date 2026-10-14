"use client";

import { createContext, useContext, useSyncExternalStore, ReactNode } from "react";
import { type Game } from "@/types/GameTypes";

interface FavoritesContextType {
  favorites: Game[];
  isLoaded: boolean;
  addFavorite: (game: Game) => void;
  removeFavorite: (gameId: number) => void;
  isFavorite: (gameId: number) => boolean;
  toggleFavorite: (game: Game) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "pixelvault_favorites";

// Funções para sincronização do localStorage com useSyncExternalStore
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("pixelvault_favorites_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("pixelvault_favorites_updated", callback);
  };
}

function getSnapshot(): string {
  return localStorage.getItem(LOCAL_STORAGE_KEY) || "[]";
}

function getServerSnapshot(): string {
  return "[]";
}

function saveFavoritesToLocalStorage(games: Game[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(games));
  window.dispatchEvent(new Event("pixelvault_favorites_updated"));
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore garante sincronização segura com SSR e localStorage sem hydration mismatch
  const favoritesString = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const isServer = useSyncExternalStore(
    () => () => {},
    () => false,
    () => true
  );

  let favorites: Game[] = [];
  try {
    favorites = JSON.parse(favoritesString);
  } catch {
    favorites = [];
  }

  const isLoaded = !isServer;

  function addFavorite(game: Game) {
    if (favorites.some((item) => item.id === game.id)) return;
    saveFavoritesToLocalStorage([...favorites, game]);
  }

  function removeFavorite(gameId: number) {
    saveFavoritesToLocalStorage(favorites.filter((item) => item.id !== gameId));
  }

  function isFavorite(gameId: number) {
    return favorites.some((item) => item.id === gameId);
  }

  function toggleFavorite(game: Game) {
    if (isFavorite(game.id)) {
      removeFavorite(game.id);
    } else {
      addFavorite(game);
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoaded,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de um FavoritesProvider");
  }
  return context;
}
