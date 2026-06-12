import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { profileFormSchema } from "@/schemas/profile";
import { Gender } from "@/types/profile";
import { toFormValues } from "@/utils/profile";

type MessageType = {
  type: "success" | "error";
  text: string;
}

export function useProfileForm() {
  const { profileDefaults, isLoading, isSaving, saveProfile } = useProfile();
  const [message, setMessage] = useState<MessageType | null>(null);

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
          type: "success",
          text: "Profile details updated successfully!",
        });
      } catch (err) {
        setMessage({
          type: "error",
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
