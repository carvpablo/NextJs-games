import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-20 h-20 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-4xl mb-6 shadow-2xl shadow-violet-950/30">
        👾
      </div>
      <span className="text-violet-400 font-bold text-sm tracking-widest uppercase mb-2">
        Erro 404
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
        Página ou jogo não encontrado
      </h1>
      <p className="text-neutral-400 max-w-md text-sm sm:text-base mb-8">
        O título que você está procurando não existe, foi removido ou o link está incorreto.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all shadow-lg shadow-violet-600/25 active:scale-95"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
