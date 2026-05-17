export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center px-4">
      <section className="w-full max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
        {children}
      </section>
    </main>
  );
}
