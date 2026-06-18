import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { profileFormSchema } from "@/schemas/profile";
import { toFormValues } from "@/utils/profile";

import { AppMessage, MessageVariant } from "@/types/profile";

export function useProfileForm() {
  const { profileDefaults, isLoading, isSaving, saveProfile } = useProfile();
  const [message, setMessage] = useState<AppMessage | null>(null);

  const form = useForm({
    defaultValues: toFormValues(profileDefaults),
    validators: {
      onChange: ({ value }) => {
        const result = profileFormSchema.safeParse(value);
        if (result.success) return null;
        return result.error.issues[0].message;
      },
    },
    onSubmit: async ({ value }) => {
      setMessage(null);
      try {
        await saveProfile(value);
        setMessage({
          type: MessageVariant.Success,
          text: "Profile details updated successfully!",
        });
      } catch (err) {
        setMessage({
          type: MessageVariant.Error,
          text:
            err instanceof Error
              ? err.message
              : "Failed to save profile changes.",
        });
      }
    },
  });

  useEffect(() => {
    if (!isLoading && profileDefaults) {
      form.reset(profileDefaults);
    }
  }, [isLoading, profileDefaults, form.reset]);

  return {
    form,
    isLoading,
    isSaving,
    message,
    setMessage,
  };
}
