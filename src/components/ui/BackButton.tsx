import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface BackButtonProps {
  href: string;
  label: string;
}

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors
           hover:text-green-600 dark:text-zinc-400 dark:hover:text-green-400"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
}