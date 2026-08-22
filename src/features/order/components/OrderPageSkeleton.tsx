export function OrderPageSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-4xl animate-pulse">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="space-y-1.5">
            <div className="h-7 w-40 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-56 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>

        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 bg-zinc-50/50 p-4 px-6 dark:border-zinc-800 dark:bg-zinc-900/20 gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                  <div className="h-5 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 max-w-xs rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
