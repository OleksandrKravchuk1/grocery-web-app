"use server";

import type { ProfileFormValues } from "@/features/profile/types/profile";
import { prisma } from "@/lib/prisma";

export async function fetchProfile(userId: string) {
  if (!userId) return null;

  const profile = await prisma.profile.findUnique({
    where: { id: userId },
  });

  if (!profile) return null;

  return {
    id: profile.id,
    firstName: profile.firstName,
    lastName: profile.lastName ?? "",
    phone: profile.phone ?? "",
    gender: profile.gender ?? "",
    birthday: profile.birthday
      ? profile.birthday.toISOString().slice(0, 10)
      : "",
  };
}

export async function saveProfile(userId: string, values: ProfileFormValues) {
  if (!userId) throw new Error("User ID is required");

  if (values.birthday && Number.isNaN(new Date(values.birthday).getTime())) {
    throw new Error(
      "Invalid date. Please enter a valid date in YYYY-MM-DD format",
    );
  }

  const profile = await prisma.profile.upsert({
    where: { id: userId },
    update: {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim() || null,
      phone: values.phone.trim() || null,
      gender: values.gender,
      birthday: values.birthday ? new Date(values.birthday) : null,
    },
    create: {
      id: userId,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim() || null,
      phone: values.phone.trim() || null,
      gender: values.gender,
      birthday: values.birthday ? new Date(values.birthday) : null,
    },
  });

  return {
    id: profile.id,
    firstName: profile.firstName,
    lastName: profile.lastName ?? "",
    phone: profile.phone ?? "",
    gender: profile.gender ?? "",
    birthday: profile.birthday
      ? profile.birthday.toISOString().slice(0, 10)
      : "",
  };
}
