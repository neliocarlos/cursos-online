// components/lista-cursos.tsx
"use client";

import { useMemo, useState } from "react";
import CardCurso from "@/components/card-curso";
import type { cursosMock } from "@/mocks/cursos";
import { CATEGORIAS } from "@/mocks/categorias";

type Curso = (typeof cursosMock)[number];

const normalizar = (texto: string) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function ListaCursos({ cursos }: { cursos: Curso[] }) {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const cursosFiltrados = useMemo(() => {
    const termo = normalizar(searchTitle.trim());

    return cursos.filter((curso) => {
      const matchTitle = normalizar(curso.nomeCurso).includes(termo);
      const matchCategory = !searchCategory || curso.areaCurso === searchCategory;
      return matchTitle && matchCategory;
    });
  }, [cursos, searchTitle, searchCategory]);

  return (
    <>
      <div className="flex w-full">
        <div className="flex w-full justify-center items-center gap-4 py-10">
          <div className="flex flex-col gap-1">
            <label htmlFor="nome-curso" className="text-slate-900">
              Nome do Curso
            </label>
            <input
              id="nome-curso"
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="border bg-white w-200 border-gray-300 p-2 rounded-md placeholder:text-slate-300 text-slate-800"
              placeholder="Buscar cursos..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="categoria-curso" className="text-slate-900">
              Categoria
            </label>
            <select
              id="categoria-curso"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
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
      </div>

      <div className="w-[80%] grid grid-cols-3">
        {cursosFiltrados.map((curso) => (
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
    </>
  );
}