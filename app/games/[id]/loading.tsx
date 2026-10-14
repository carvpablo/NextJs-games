export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Botão Voltar Skeleton */}
      <div className="h-9 w-44 rounded-xl bg-neutral-900/60 border border-neutral-800/80" />

      {/* Hero Skeleton */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-10 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-80 shrink-0 aspect-video md:aspect-[4/3] rounded-2xl bg-neutral-800/60" />
        <div className="flex-1 space-y-4">
          <div className="h-6 w-32 bg-neutral-800/70 rounded-lg" />
          <div className="h-10 w-3/4 bg-neutral-800/90 rounded-xl" />
          <div className="flex gap-4 pt-2">
            <div className="h-14 w-28 bg-neutral-800/60 rounded-xl" />
            <div className="h-14 w-28 bg-neutral-800/60 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Descrição Skeleton */}
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-6 sm:p-8 space-y-3">
        <div className="h-6 w-40 bg-neutral-800/70 rounded" />
        <div className="h-4 w-full bg-neutral-800/50 rounded" />
        <div className="h-4 w-5/6 bg-neutral-800/50 rounded" />
        <div className="h-4 w-4/6 bg-neutral-800/50 rounded" />
      </div>
    </div>
  );
}
