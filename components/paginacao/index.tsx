import Link from "next/link";

type PaginacaoProps = {
  paginaAtual: number;
  totalPaginas: number;
  basePath: string;
};

function href(basePath: string, pagina: number) {
  return pagina === 1 ? basePath : `${basePath}?pagina=${pagina}`;
}

const base = "py-2 px-4 rounded-md";
const ativo = `${base} bg-blue-950 text-white`;
const normal = `${base} bg-white text-slate-900 border border-slate-300 hover:bg-slate-100`;
const seta = `${base} bg-blue-950 text-white hover:bg-blue-900`;
const setaOff = `${base} bg-blue-950 text-white opacity-40 cursor-not-allowed`;

export default function Paginacao({
  paginaAtual,
  totalPaginas,
  basePath,
}: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  return (
    <nav
      aria-label="Paginação de cursos"
      className="flex flex-wrap items-center justify-center gap-2 pt-4"
    >
      {paginaAtual > 1 ? (
        <Link
          href={href(basePath, paginaAtual - 1)}
          prefetch={false}
          className={seta}
        >
          Anterior
        </Link>
      ) : (
        <span aria-disabled="true" className={setaOff}>
          Anterior
        </span>
      )}

      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={href(basePath, n)}
          prefetch={false}
          aria-current={n === paginaAtual ? "page" : undefined}
          className={n === paginaAtual ? ativo : normal}
        >
          {n}
        </Link>
      ))}

      {paginaAtual < totalPaginas ? (
        <Link
          href={href(basePath, paginaAtual + 1)}
          prefetch={false}
          className={seta}
        >
          Próxima
        </Link>
      ) : (
        <span aria-disabled="true" className={setaOff}>
          Próxima
        </span>
      )}
    </nav>
  );
}