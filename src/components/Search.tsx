"use client";

import Link from "next/link";
import {  useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import useProductsSearch from "@/hooks/useProductsSearch";
import { ROUTES } from "./Navbar/navbar.constants";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

const debounced = useDebounce(searchValue, 300);
const {data: results = [], isLoading} = useProductsSearch(debounced, 40);

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex items-center gap-2 border rounded-md px-2 py-1 bg-white dark:bg-zinc-900">
        <SearchIcon className="h-4 w-4 text-zinc-500" />
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search products..."
          className="ml-1 outline-none bg-transparent w-full text-sm"
          onFocus={() => searchValue && results.length > 0 && setOpen(true)}
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-950 border rounded-md shadow z-50">
          {isLoading ? (
            <div className="p-2 text-sm text-zinc-500">Loading...</div>
          ) : results.length === 0 ? (
            <div className="p-2 text-sm text-zinc-500">No results</div>
          ) : (
            results.map((result) => (
              <Link
                key={result.id}
                href={`/${ROUTES.products}/${result.id}`}
                onClick={() => {
                  setSearchValue("");
                  setOpen(false);
                }}
                className="block px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm"
              >
                <div className="font-medium">{result.name}</div>
                {result.price != null && (
                  <div className="text-xs text-zinc-500">${result.price.toFixed(2)}</div>
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
