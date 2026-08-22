export function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="space-y-1.5">
            <div className="h-7 w-36 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-52 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="mb-4 h-16 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-5 w-28 rounded-md bg-zinc-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
