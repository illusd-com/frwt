import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "freewebtools-favorites";

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const toggle = useCallback((toolId: string) => {
    setFavorites(prev => {
      const next = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((toolId: string) => favorites.includes(toolId), [favorites]);

  return { favorites, toggle, isFavorite };
}
