"use client";

import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/constants/routes";
import useDebounce from "@/hooks/useDebounce";
import useOpenState from "@/hooks/useOpenState";
import useProductsSearch from "@/features/product/hooks/useProductsSearch";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isOpen, open, close } = useOpenState();

  const debounced = useDebounce(searchValue, 300);
  const { data: results = [], isLoading } = useProductsSearch({
    search: debounced,
    limit: 40,
  });

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex items-center gap-2 ">
        <SearchIcon className="h-4 w-4 text-zinc-500" />
        <Input
          variant="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search products..."
          className="ml-1"
          onFocus={() => searchValue && results.length > 0 && open()}
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-950 border rounded-md shadow z-50">
          {isLoading ? (
            <div className="p-2 text-sm text-zinc-500">Loading...</div>
          ) : results.length === 0 ? (
            <div className="p-2 text-sm text-zinc-500">No results</div>
          ) : (
            results.map((result) => (
              <Link
                key={result.id}
                href={ROUTES.products.product(String(result.id))}
                onClick={() => {
                  setSearchValue("");
                  close();
                }}
                className="block px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm"
              >
                <div className="font-medium">{result.title}</div>
                {!!result.price && (
                  <div className="text-xs text-zinc-500">
                    ${result.price.toFixed(2)}
                  </div>
                )}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
