"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useAuth } from "@/hooks/useAuth";
import { fetchProfile, saveProfile } from "@/services/profile";
import type { ProfileFormValues } from "@/types/profile";
import { toFormValues } from "@/utils/profile";

const EMPTY_PROFILE_DEFAULTS = toFormValues();

export function useProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: QUERY_KEYS.profile(user?.id),
    queryFn: () => fetchProfile(),
    enabled: !!user?.id,
    select: toFormValues,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: (values: ProfileFormValues) => {
      if (!user?.id) throw new Error("User not logged in");
      return saveProfile(values);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.profile(user?.id),
      });
    },
  });

  return {
    profileDefaults: query.data ?? EMPTY_PROFILE_DEFAULTS,
    isLoading: query.isLoading,
    isError: query.isError,
    isSaving: mutation.isPending,
    saveProfile: mutation.mutateAsync,
    error: mutation.error,
    resetMutation: mutation.reset,
  };
}
