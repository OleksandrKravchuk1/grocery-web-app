import { StarIcon } from "lucide-react";
import Image from "next/image";
import { FavoriteButton } from "@/components/ui/FavoriteButton";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

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
    <Link href={ROUTES.products.product(id.toString())}>
      <article
        className={cn(
          "group relative overflow-hidden w-43.75 rounded-[14px] bg-white p-4.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20 dark:hover:shadow-black/30",
          className,
        )}
      >
        <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-teal-500/5 opacity-0 
        transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToFavorites(id);
            }}
          />
        </div>

        <div className="relative flex flex-col gap-2">
          <h3 className="text-lg font-bold text-black dark:text-zinc-100 transition-colors duration-300 
          group-hover:text-green-600 dark:group-hover:text-green-400">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <StarIcon className="fill-[#F5B300] text-[#F5B300]" size={20} />
            <span className="text-base font-semibold text-black dark:text-zinc-100">
              {rating.toFixed(1)}
            </span>
          </div>
          <p className="text-lg font-bold text-black dark:text-zinc-100">
            ${price.toFixed(2)}
          </p>
        </div>
      </article>
    </Link>

  );
}
