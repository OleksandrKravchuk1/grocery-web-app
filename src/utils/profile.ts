import { DBProfile, GenderOption, ProfileFormValues } from "@/types/profile";

export function toGender(value?: string | null): GenderOption {
  if (value === "Male" || value === "Female" || value === "Other") return value;
  return "Other";
}

export function toFormValues(profile?: DBProfile | null): ProfileFormValues {
  return {
    firstName: profile?.firstName ?? "",
    lastName: profile?.lastName ?? "",
    phone: profile?.phone ?? "",
    gender: toGender(profile?.gender),
    birthday: profile?.birthday ?? "",
  };
}
