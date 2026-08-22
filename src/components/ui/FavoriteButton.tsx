import { Heart } from "lucide-react";

type Props = {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
};

export function FavoriteButton({ isFavorite, onClick, className = "" }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`flex h-9.5 w-9.5 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 ${className}`.trim()}
    >
      <Heart
        className={
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-black dark:text-zinc-100"
        }
        size={20}
      />
    </button>
  );
}
