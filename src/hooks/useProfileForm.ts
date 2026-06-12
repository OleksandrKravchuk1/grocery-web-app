import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { profileFormSchema } from "@/schemas/profile";
import type { GenderOption } from "@/types/profile";

export function useProfileForm() {
  const { profileDefaults, isLoading, isSaving, saveProfile } = useProfile();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      gender: "Other" as GenderOption,
      birthday: "",
    },
    validators: {
      onChange: ({ value }) => {
        const result = profileFormSchema.safeParse(value);
        if (result.success) return null;
        if (result.error.issues.length > 0) {
          return result.error.issues[0].message;
        }
        return "Invalid profile values";
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
