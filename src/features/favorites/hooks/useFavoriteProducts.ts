"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from "@/features/favorites/services/favorites";

export function useFavoriteProducts() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: QUERY_KEYS.favoriteProducts(user?.id),
    queryFn: () => getFavorites(user?.id || ""),
    enabled: !!user?.id,
  });

  const favoriteIds = favoritesQuery.data ?? [];

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (productId: number) => {
      if (!user) throw new Error("Please sign in to manage favorites.");

      const isAlreadyFavorite = favoriteIds.includes(productId);
      if (isAlreadyFavorite) {
        return deleteFavorite(user.id, productId);
      } else {
        return addFavorite(user.id, productId);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.favoriteProducts(user?.id),
      });
    },
  });

  const handleToggleFavorite = async (productId: number) => {
    if (!user) {
      alert("Please sign in to add products to your favorites.");
      return;
    }
    try {
      await toggleFavoriteMutation.mutateAsync(productId);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return {
    favoriteIds,
    toggleFavorite: handleToggleFavorite,
    isLoading: favoritesQuery.isLoading,
    isError: favoritesQuery.isError,
    isToggling: toggleFavoriteMutation.isPending,
  };
}
