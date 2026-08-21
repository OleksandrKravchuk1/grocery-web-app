import type React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  icon: React.ReactNode;
  iconClassName?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon,
  iconClassName,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8 flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400",
          iconClassName,
        )}
      >
        {icon}
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h1>
        {description && (
          <div className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
