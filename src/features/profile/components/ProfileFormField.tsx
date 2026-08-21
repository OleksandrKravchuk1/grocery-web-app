"use client";

import { Input } from "@/components/ui/Input";
import type { ProfileFormFieldProps } from "@/features/profile/types/profile";

export function ProfileFormField({
  id,
  label,
  icon: Icon,
  field,
  placeholder,
  type = "text",
  required,
  maxLength,
  onChangeText,
}: ProfileFormFieldProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-zinc-500 dark:text-zinc-400"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <Icon className="absolute left-3 h-4 w-4 text-zinc-400" />
        <Input
          id={id}
          type={type}
          maxLength={maxLength}
          value={field.state.value}
          onChange={(e) => {
            const rawVal = e.target.value;
            const finalVal = onChangeText ? onChangeText(rawVal) : rawVal;
            field.handleChange(finalVal);
          }}
          className="pl-10"
          placeholder={placeholder}
          required={required}
        />
      </div>
      {field.state.meta.errors.length > 0 && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400 animate-in fade-in duration-300">
          {field.state.meta.errors[0]?.toString()}
        </p>
      )}
    </div>
  );
}
