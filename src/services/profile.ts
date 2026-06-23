"use server";

import { prisma } from "@/lib/prisma";
import type { ProfileFormValues } from "@/types/profile";
import { getCurrentUser } from "@/services/auth.server";

export async function fetchProfile() {
  const user = await getCurrentUser();
  if (!user?.id) return null;

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
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

export async function saveProfile(values: ProfileFormValues) {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Must be logged in to save profile");

  if (values.birthday && Number.isNaN(new Date(values.birthday).getTime())) {
    throw new Error(
      "Invalid date. Please enter a valid date in YYYY-MM-DD format",
    );
  }

  const profile = await prisma.profile.upsert({
    where: { id: user.id },
    update: {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim() || null,
      phone: values.phone.trim() || null,
      gender: values.gender,
      birthday: values.birthday ? new Date(values.birthday) : null,
    },
    create: {
      id: user.id,
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
