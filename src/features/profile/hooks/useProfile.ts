"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { fetchProfile, saveProfile } from "@/features/profile/services/profile";
import type { ProfileFormValues } from "@/features/profile/types/profile";
import { toFormValues } from "@/features/profile/utils/profile";

export function useProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: QUERY_KEYS.profile(user?.id),
    queryFn: () => {
      if (!user?.id) throw new Error("User not logged in");
      return fetchProfile(user.id);
    },
    enabled: !!user?.id,
    select: toFormValues,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: (values: ProfileFormValues) => {
      if (!user?.id) throw new Error("User not logged in");
      return saveProfile(user.id, values);
    },
    onSuccess: () => {
      if (user?.id) {
        void queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.profile(user.id),
        });
      }
    },
  });

  return {
    profileDefaults: query.data ?? toFormValues(),
    isLoading: query.isLoading,
    isError: query.isError,
    isSaving: mutation.isPending,
    saveProfile: mutation.mutateAsync,
    error: mutation.error,
    resetMutation: mutation.reset,
  };
}
