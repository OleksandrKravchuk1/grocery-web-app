/* biome-ignore-all lint/suspicious/noExplicitAny: TanStack Form types require 12 generic arguments and implicit any is disallowed by tsc */
"use client";

import { CalendarIcon, Loader2Icon, PhoneIcon, UserIcon } from "lucide-react";
import { ProfileFormField } from "@/components/profile/ProfileFormField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { GenderOption } from "@/types/profile";
import { formatBirthdayInput } from "@/utils/formatBithdayInput";

const genderOptions: GenderOption[] = ["Male", "Female", "Other"];

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
            {(field: any) => (
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
            {(field: any) => (
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
            {(field: any) => (
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
            {(field: any) => (
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
          {(field: any) => (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block">
                Gender
              </span>
              <div className="flex gap-2">
                {genderOptions.map((item) => {
                  const selected = field.state.value === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => field.handleChange(item)}
                      className={cn(
                        "flex-1 py-2.5 rounded-xl border font-semibold transition-all duration-200 text-sm active:scale-98 cursor-pointer",
                        selected
                          ? "border-green-600 bg-green-50/50 text-green-700 dark:border-green-500 dark:bg-green-950/20 dark:text-green-400 shadow-sm"
                          : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
                      )}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {field.state.meta.errors[0]?.toString()}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 py-3 h-11 text-base font-semibold cursor-pointer"
          >
            {isSaving ? <Loader2Icon className="h-4 w-4 animate-spin" /> : null}
            {isSaving ? "Saving changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
