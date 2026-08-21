import type { LucideIcon } from "lucide-react";

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string | null;
  phone: string | null;
  gender: string | null;
  birthday: Date | null;
}

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
  field: any;
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
};
