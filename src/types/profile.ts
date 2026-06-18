import type { LucideIcon } from "lucide-react";
export type { Profile } from "@/generated/prisma";

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum MessageVariant {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
}

export type AppMessage = {
  type: MessageVariant;
  text: string;
};


export type ProfileFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  gender: Gender;
  birthday: string;
};

export type ProfileFormFieldProps = {
  id: string;
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  onChangeText?: (val: string) => string;
};

export type DBProfile = {
  firstName: string;
  lastName?: string | null;
  phone?: string | null;
  gender?: string | null;
  birthday?: string | null;
}