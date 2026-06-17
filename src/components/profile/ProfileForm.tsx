"use client";

import { CalendarIcon, Loader2Icon, PhoneIcon, UserIcon } from "lucide-react";
import { ProfileFormField } from "@/components/profile/ProfileFormField";
import { Button } from "@/components/ui/Button";
import { formatBirthdayInput } from "@/utils/formatBithdayInput";
import { GenderSelect } from "./GenderSelect";

interface ProfileFormProps {
  form: any;
  isSaving: boolean;
}

export function ProfileForm({ form, isSaving }: ProfileFormProps) {
  return (
    <div className="md:col-span-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 border-b border-zinc-100 pb-3 dark:border-zinc-900">
        Personal Information
      </h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="mt-6 space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field name="firstName">
            {(field) => (
              <ProfileFormField
                id="first-name"
                label="First Name"
                icon={UserIcon}
                field={field}
                placeholder="Name"
                required
              />
            )}
          </form.Field>

          <form.Field name="lastName">
            {(field) => (
              <ProfileFormField
                id="last-name"
                label="Last Name"
                icon={UserIcon}
                field={field}
                placeholder="Surname"
              />
            )}
          </form.Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field name="birthday">
            {(field: string) => (
              <ProfileFormField
                id="birthday"
                label="Birthday"
                icon={CalendarIcon}
                field={field}
                placeholder="YYYY-MM-DD"
                maxLength={10}
                onChangeText={formatBirthdayInput}
              />
            )}
          </form.Field>

          <form.Field name="phone">
            {(field) => (
              <ProfileFormField
                id="phone-number"
                label="Phone Number"
                icon={PhoneIcon}
                field={field}
                placeholder="+380 XX XXX XX XX"
                type="tel"
              />
            )}
          </form.Field>
        </div>

        <form.Field name="gender">
          {(field: any) => <GenderSelect field={field} />}
        </form.Field>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 py-3 h-11 text-base font-semibold cursor-pointer"
          >
            {isSaving && <Loader2Icon className="h-4 w-4 animate-spin" />}
            {isSaving ? "Saving changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
