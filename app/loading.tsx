export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Skeleton do Hero */}
      <div className="h-44 rounded-3xl bg-neutral-900/60 border border-neutral-800/80" />

      {/* Skeleton dos Filtros */}
      <div className="h-16 rounded-2xl bg-neutral-900/60 border border-neutral-800/80" />

      {/* Grid de Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-neutral-900/50 border border-neutral-800 overflow-hidden space-y-4 pb-5"
          >
            <div className="aspect-video w-full bg-neutral-800/60" />
            <div className="px-5 space-y-2.5">
              <div className="h-3.5 w-1/3 bg-neutral-800/80 rounded" />
              <div className="h-5 w-4/5 bg-neutral-800/90 rounded" />
              <div className="h-3 w-1/2 bg-neutral-800/50 rounded" />
            </div>
            <div className="px-5 pt-2">
              <div className="h-9 w-full bg-neutral-800/70 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
