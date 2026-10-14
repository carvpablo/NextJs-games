import { GENRES } from "@/lib/games";

interface GameFilterProps {
  onSelectGender: (genre: string) => void;
  onSelectName: (name: string) => void;
}

export default function GameFilters({
  onSelectGender,
  onSelectName,
}: GameFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
      {/* Input de Pesquisa */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id="name"
          type="text"
          placeholder="Buscar jogo pelo título..."
          onChange={(e) => onSelectName(e.target.value)}
          className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
        />
      </div>

      {/* Select de Gênero */}
      <div className="sm:w-64">
        <div className="relative">
          <select
            onChange={(e) => onSelectGender(e.target.value)}
            defaultValue="all"
            className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none cursor-pointer pr-10"
          >
            {GENRES.map((genre) => (
              <option key={genre.slug} value={genre.slug} className="bg-neutral-900 text-neutral-200">
                {genre.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
