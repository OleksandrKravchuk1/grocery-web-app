import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { ROUTES } from '@/constants/routes';

type Props = {
  id: number;
  image: string;
  title: string;
  price: number;
  rating: number;
  isFavorite: boolean;
  onAddToFavorites: (id: number) => void;
}

export function ProductCard({ id, image, title, price, rating, isFavorite, onAddToFavorites }: Props) {
  return (
    <article className="relative w-43.75 rounded-[14px] bg-white p-4.5 shadow-sm transition-shadow hover:shadow-md dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20 dark:hover:shadow-black/30">

      <div className="absolute top-4.5 right-4.5 z-10">
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => onAddToFavorites(id)}
        />
      </div>

      <Link href={ROUTES.products.product(id)} className="group block">
        <div className="relative mb-4">
          <div className="flex h-32.5 items-center justify-center rounded-[14px] bg-gray-100 dark:bg-zinc-900 overflow-hidden">
            <Image
              src={image}
              alt={title}
              className="h-[95%] w-[95%] object-contain transition-transform duration-300 group-hover:scale-105"
              width={100}
              height={100}
              unoptimized
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-black dark:text-zinc-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-1">
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
      </Link>
    </article>
  );
}
