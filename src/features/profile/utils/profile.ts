import {
  type DBProfile,
  Gender,
  type ProfileFormValues,
} from "@/features/profile/types/profile";

export function toGender(value?: string | null): Gender {
  if (!value) return Gender.Other;
  const normalized = value.trim().toLowerCase();
  if (normalized === "male") return Gender.Male;
  if (normalized === "female") return Gender.Female;
  return Gender.Other;
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
