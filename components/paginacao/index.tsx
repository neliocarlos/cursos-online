"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type PaginacaoProps = {
  paginaAtual: number;
  totalPaginas: number;
  basePath?: string; 
  onMudarPagina?: (pagina: number) => void;
  className?: string;
};

const base = "py-2 px-4 rounded-md";
const ativo = `${base} bg-blue-950 text-white`;
const normal = `${base} bg-white text-slate-900 border border-slate-300 hover:bg-slate-100 cursor-pointer`;
const seta = `${base} bg-blue-950 text-white hover:bg-blue-900 cursor-pointer`;
const setaOff = `${base} bg-blue-950 text-white opacity-40 cursor-not-allowed`;

export default function Paginacao({
  paginaAtual,
  totalPaginas,
  basePath,
  onMudarPagina,
  className,
}: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  function href(pagina: number) {
    const path = basePath ?? "";
    return pagina === 1 ? path : `${path}?pagina=${pagina}`;
  }

  function controle(
    pagina: number,
    estilo: string,
    conteudo: ReactNode,
    atual = false,
  ) {
    const ariaCurrent = atual ? "page" : undefined;

    if (onMudarPagina) {
      return (
        <button
          type="button"
          onClick={() => onMudarPagina(pagina)}
          aria-current={ariaCurrent}
          className={estilo}
        >
          {conteudo}
        </button>
      );
    }

    return (
      <Link
        href={href(pagina)}
        prefetch={false}
        aria-current={ariaCurrent}
        className={estilo}
      >
        {conteudo}
      </Link>
    );
  }

  return (
    <nav
      aria-label="Paginação de cursos"
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`}
    >
      {paginaAtual > 1 ? (
        controle(paginaAtual - 1, seta, "Anterior")
      ) : (
        <span aria-disabled="true" className={setaOff}>
          Anterior
        </span>
      )}

      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
        <span key={n} className="contents">
          {controle(n, n === paginaAtual ? ativo : normal, n, n === paginaAtual)}
        </span>
      ))}

      {paginaAtual < totalPaginas ? (
        controle(paginaAtual + 1, seta, "Próxima")
      ) : (
        <span aria-disabled="true" className={setaOff}>
          Próxima
        </span>
      )}
    </nav>
  );
}