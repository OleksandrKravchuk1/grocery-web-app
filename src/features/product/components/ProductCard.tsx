import { Star } from "lucide-react";
import Image from "next/image";
import { FavoriteButton } from "@/components/ui/FavoriteButton";

import { cn } from "@/lib/utils";

type Props = {
  id: number;
  image: string;
  title: string;
  price: number;
  rating: number;
  isFavorite: boolean;
  onAddToFavorites: (id: number) => void;
  className?: string;
};

export function ProductCard({
  id,
  image,
  title,
  price,
  rating,
  isFavorite,
  onAddToFavorites,
  className,
}: Props) {
  return (
    <article
      className={cn(
        "w-43.75 rounded-[14px] bg-white p-4.5 shadow-sm transition-shadow hover:shadow-md dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20 dark:hover:shadow-black/30",
        className,
      )}
    >
      <div className="relative mb-4">
        <div className="flex h-32.5 items-center justify-center rounded-[14px] bg-gray-100 dark:bg-zinc-900">
          <Image
            src={image}
            alt={title}
            className="h-[95%] w-[95%] object-contain"
            width={100}
            height={100}
          />
        </div>

        <FavoriteButton
          className="absolute top-px right-0"
          isFavorite={isFavorite}
          onClick={() => onAddToFavorites(id)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-black dark:text-zinc-100">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Star className="fill-[#F5B300] text-[#F5B300]" size={20} />
          <span className="text-base font-semibold text-black dark:text-zinc-100">
            {rating.toFixed(1)}
          </span>
        </div>
        <p className="text-lg font-bold text-black dark:text-zinc-100">
          ${price.toFixed(2)}
        </p>
      </div>
    </article>
  );
}
