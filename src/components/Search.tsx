"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

type SearchResult = {
  id: string | number;
  name: string;
  slug?: string;
  price: number | null;
};

const Search = () => {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (!q) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    timeoutRef.current = window.setTimeout(async () => {
      // Замініть 'products' і поля під вашу БД
      const { data, error } = await supabase
        .from("products")
        .select("id,name,slug,price")
        .ilike("name", `%${q}%`)
        .limit(6);

      setLoading(false);
      if (error) {
        setResults([]);
        setOpen(false);
        console.error("Search error:", error);
        return;
      }
      setResults(data || []);
      setOpen(true);
    }, 300);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [q]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex items-center gap-2 border rounded-md px-2 py-1 bg-white dark:bg-zinc-900">
        <SearchIcon className="h-4 w-4 text-zinc-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="ml-1 outline-none bg-transparent w-full text-sm"
          onFocus={() => q && results.length > 0 && setOpen(true)}
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-950 border rounded-md shadow z-50">
          {loading ? (
            <div className="p-2 text-sm text-zinc-500">Loading...</div>
          ) : results.length === 0 ? (
            <div className="p-2 text-sm text-zinc-500">No results</div>
          ) : (
            results.map((r) => (
              <Link
                key={r.id}
                href={`/products/${r.id}`}
                onClick={() => {
                  setQ("");
                  setOpen(false);
                }}
                className="block px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm"
              >
                <div className="font-medium">{r.name}</div>
                {r.price != null && (
                  <div className="text-xs text-zinc-500">{r.price} грн</div>
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
