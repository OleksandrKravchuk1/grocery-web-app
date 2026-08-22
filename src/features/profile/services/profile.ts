"use server";

import { api } from "@/api/client";
import type { ProfileFormValues } from "@/features/profile/types/profile";

export async function fetchProfile() {
  try {
    const { data } = await api.get('/users/me');

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      phone: data.phone ?? '',
      gender: data.gender ?? '',
      birthday: data.birthday ? String(data.birthday).slice(0, 10) : '',
    };
  } catch (error) {
    console.error("Failed to fetch profile from backend:", error);
    return null;
  }
}

export async function saveProfile(_userId: string, values: ProfileFormValues) {
  try {
    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      phone: values.phone.trim() || undefined,
      gender: values.gender ? values.gender.toLowerCase() : undefined,
    };

    const { data } = await api.patch("/users/me", payload);

    return {
      id: data.id,
      firstName: data.first_name || data.firstName,
      lastName: data.last_name || data.lastName || "",
      phone: data.phone ?? "",
      gender: data.gender ?? "",
      birthday: data.birthday ? String(data.birthday).slice(0, 10) : "",
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Failed to save profile";
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }
}

