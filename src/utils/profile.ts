import { DBProfile, Gender, ProfileFormValues } from "@/types/profile";

export function toGender(value?: string | null): Gender {
  if (value && Object.values(Gender).includes(value as Gender)) {
    return value as Gender;
  }
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

export function getProfileInitials(firstName?: string, lastName?: string): string {
  const firstChar = firstName?.[0] || "";
  const lastChar = lastName?.[0] || "";

  return `${firstChar}${lastChar}`.toUpperCase() || "U";
}

export function getFullName(firstName?: string, lastName?: string): string {
  return `${firstName} ${lastName}`.trim() || "User Profile";
}
