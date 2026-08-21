import { cva, type VariantProps } from "class-variance-authority";
import type { InputHTMLAttributes, Ref } from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border border-zinc-300 bg-white px-3 py-3 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus-visible:border-transparent focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500",
  {
    variants: {
      variant: {
        default: "",
        search:
          "border-0 bg-transparent px-0 py-0 text-sm text-zinc-950 shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:text-zinc-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({
  className,
  variant,
  type = "text",
  ref,
  ...props
}: InputProps) => (
  <input
    ref={ref}
    type={type}
    className={cn(inputVariants({ variant }), className)}
    {...props}
  />
);
