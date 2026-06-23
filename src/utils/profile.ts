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
  const firstChar = firstName?.trim()?.[0] ?? "";
  const lastChar = lastName?.trim()?.[0] ?? "";

  return `${firstChar}${lastChar}`.toUpperCase() || "U";
}

export function getFullName(firstName?: string, lastName?: string): string {
  const normalizedFirstName = firstName?.trim() ?? "";
  const normalizedLastName = lastName?.trim() ?? "";
  return `${normalizedFirstName} ${normalizedLastName}`.trim() || "User Profile";
}