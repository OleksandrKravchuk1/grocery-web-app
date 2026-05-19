import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border border-zinc-300 bg-white px-3 py-3 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500",
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
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export default Input;
