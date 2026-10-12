import { Suspense } from "react";
import { cursosMock } from "@/mocks/cursos";
import { notFound } from "next/navigation";

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
    <div className="flex flex-col flex-1 items-center font-sans bg-gray-100">
      <h1 className="text-2xl font-semibold text-slate-900">
        Detalhes do Curso
      </h1>
      <p className="text-md text-slate-700">
        Nome do curso: {curso.nomeCurso}
      </p>
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