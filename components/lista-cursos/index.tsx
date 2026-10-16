"use client";

import { useMemo, useState } from "react";
import CardCurso from "@/components/card-curso";
import { CATEGORIAS } from "@/mocks/categorias";
import type { cursosMock } from "@/mocks/cursos";
import Paginacao from "../paginacao";

type Curso = (typeof cursosMock)[number];

const CURSOS_POR_PAGINA = 6;

const normalizar = (texto: string) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function ListaCursos({ cursos }: { cursos: Curso[] }) {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pagina, setPagina] = useState(1);

  const cursosFiltrados = useMemo(() => {
    const termo = normalizar(busca.trim());

    return cursos.filter((curso) => {
      const buscaExiste = normalizar(curso.nomeCurso).includes(termo);
      const categoriaExiste = !categoria || curso.areaCurso === categoria;
      return buscaExiste && categoriaExiste;
    });
  }, [cursos, busca, categoria]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(cursosFiltrados.length / CURSOS_POR_PAGINA),
  );
  const paginaAtual = Math.min(pagina, totalPaginas);

  const cursosDaPagina = cursosFiltrados.slice(
    (paginaAtual - 1) * CURSOS_POR_PAGINA,
    paginaAtual * CURSOS_POR_PAGINA,
  );

  function irParaPagina(numero: number) {
    setPagina(numero);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div className="flex md:flex-row flex-col w-[80%] gap-4 py-10">
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="nome-curso" className="text-slate-900">
            Nome do Curso
          </label>
          <input
            id="nome-curso"
            type="text"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPagina(1);
            }}
            className="border bg-white w-full border-gray-300 p-2 rounded-md placeholder:text-slate-300 text-slate-700"
            placeholder="Buscar cursos..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="categoria-curso" className="text-slate-900">
            Categoria
          </label>
          <select
            id="categoria-curso"
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              setPagina(1);
            }}
            className="border bg-white w-56 border-gray-300 p-2 rounded-md text-slate-900"
          >
            <option value="">Todas as categorias</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="sm:w-[80%] w-[90%] grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {cursosDaPagina.map((curso) => (
          <div
            className="col-span-1 flex justify-center items-center p-4"
            key={curso.id}
          >
            <CardCurso {...curso} />
          </div>
        ))}
      </div>

      {cursosFiltrados.length === 0 && (
        <p className="text-slate-700 py-10">Nenhum curso encontrado.</p>
      )}

      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onMudarPagina={irParaPagina}
        className="py-10"
      />
    </>
  );
}