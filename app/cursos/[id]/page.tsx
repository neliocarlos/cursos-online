import { Suspense } from "react";
import { cursosMock } from "@/mocks/cursos";
import { notFound } from "next/navigation";
import { FormInscricao } from "./components/form-inscricao";
import BotaoVoltar from "@/components/botaoVoltar";

type DetalhesCursoProps = {
  params: Promise<{ id: string }>;
};

async function ConteudoCurso({ params }: DetalhesCursoProps) {
  const { id } = await params;
  const curso = cursosMock.find((curso) => curso.id === Number(id));

  if (!curso) {
    notFound();
  }

  return (
    <div className="flex lg:flex-row flex-col flex-1 py-10 lg:justify-between bg-gray-100 w-full">
      <div className="flex flex-col w-full gap-2 font-sans sm:px-20 px-5">
        <BotaoVoltar href="/cursos" />
        <span className="text-2xl font-semibold text-slate-900 mt-5">
          {curso.nomeCurso}
        </span>
        <p className="text-md text-slate-700">
          Carga horária: {curso.cargaHorario}
        </p>
        <p className="text-lg pt-5 text-justify text-slate-700 indent-4">
          {curso.descricao}
        </p>
      </div>

      <div className="flex flex-col w-full items-center font-sans sm:px-20 px-5 lg:mt-0 mt-5 lg:pt-0 pt-5 text-slate-900 lg:border-l border-l-0 lg:border-t-0 border-t border-slate-300">
        <span className="text-2xl font-semibold text-slate-900">
          Formulário de cadastro para interessados
        </span>
        <FormInscricao cursoId={curso.id} />
      </div>
    </div>
  );
}

export default function DetalhesCurso({ params }: DetalhesCursoProps) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col flex-1 items-center font-sans bg-gray-100">
          <p className="text-md text-slate-700">Carregando curso...</p>
        </div>
      }
    >
      <ConteudoCurso params={params} />
    </Suspense>
  );
}