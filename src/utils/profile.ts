import { DBProfile, Gender, ProfileFormValues } from "@/types/profile";

export function toGender(value?: string | null): Gender {
  if (value === Gender.Male || value === Gender.Female || value === Gender.Other) {
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
