import { Suspense } from "react";
import Link from "next/link";
import { contarInscricoesPorCurso } from "@/services/inscricao";
import { cursosMock } from "@/mocks/cursos";
import Paginacao from "@/components/paginacao";
import { connection } from "next/server";

const CURSOS_POR_PAGINA = 9;

type Props = {
  searchParams: Promise<{ pagina?: string }>;
};

async function ListaCursosAdmin({ searchParams }: Props) {
  await connection();

  const { pagina } = await searchParams;

  const totalPaginas = Math.max(
    1,
    Math.ceil(cursosMock.length / CURSOS_POR_PAGINA),
  );

  const numero = Number.parseInt(pagina ?? "1", 10);
  const paginaAtual = Number.isNaN(numero)
    ? 1
    : Math.min(Math.max(numero, 1), totalPaginas);

  const cursosDaPagina = cursosMock.slice(
    (paginaAtual - 1) * CURSOS_POR_PAGINA,
    paginaAtual * CURSOS_POR_PAGINA,
  );

  const contagem = contarInscricoesPorCurso();

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cursosDaPagina.map((curso) => {
          const total = contagem[curso.id] ?? 0;

          return (
            <li key={curso.id}>
              <Link
                href={`/admin/${curso.id}`}
                prefetch={false}
                className="flex flex-col gap-2 h-full bg-white rounded-md p-4 border border-slate-200 hover:border-blue-950 hover:shadow-md transition"
              >
                <span className="text-xs text-slate-500">{curso.areaCurso}</span>
                <span className="text-lg font-semibold text-slate-900">
                  {curso.nomeCurso}
                </span>
                <span
                  className={
                    total > 0
                      ? "mt-auto w-fit bg-blue-950 text-white text-sm rounded-full px-3 py-1"
                      : "mt-auto w-fit bg-slate-200 text-slate-600 text-sm rounded-full px-3 py-1"
                  }
                >
                  {total} {total === 1 ? "inscrição" : "inscrições"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        basePath="/admin"
        className="pt-6"
      />
    </>
  );
}

export default function AdminCursos({ searchParams }: Props) {
  return (
    <div className="flex flex-col gap-4 p-6 md:p-10 font-sans bg-gray-100 flex-1">
      <h1 className="text-2xl font-semibold text-slate-900">
        Inscrições por curso
      </h1>
      <Suspense fallback={<p className="text-slate-700">Carregando...</p>}>
        <ListaCursosAdmin searchParams={searchParams} />
      </Suspense>
    </div>
  );
}