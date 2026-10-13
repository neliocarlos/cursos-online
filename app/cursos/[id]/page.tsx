import { Suspense } from "react";
import { cursosMock } from "@/mocks/cursos";
import { notFound } from "next/navigation";
import { IoReturnUpBack } from "@react-icons/all-files/io5/IoReturnUpBack";
import Link from "next/link";

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
    <div className="flex py-30 h-screen justify-between bg-gray-100">
      <div className="flex flex-col w-full gap-2 font-sans px-20">
        <Link
          href="/cursos"
          className="bg-blue-950 flex items-center w-fit text-white py-2 px-4 rounded-md hover:bg-blue-900 cursor-pointer -mt-5">
            <IoReturnUpBack className="text-2xl mr-2" /> Voltar
          </Link>
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
      <div className="flex flex-col w-full items-center font-sans px-20 text-slate-900 border-l border-slate-300">
        <span className="text-2xl font-semibold text-slate-900">Formulário de Cadastro</span>
        <div className="flex flex-col w-full gap-4 p-4">
          <div className="flex flex-col gap-1">
            <label className="text-md text-slate-700">Nome:</label>
            <input type="text" className="border border-slate-300 rounded-md p-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md text-slate-700">Email:</label>
            <input type="email" className="border border-slate-300 rounded-md p-2" />
          </div>
          <div className="flex gap-2 w-full items-center">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-md text-slate-700">Telefone:</label>
              <input type="tel" className="border border-slate-300 rounded-md p-2" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-md text-slate-700">Cidade:</label>
              <input type="text" className="border border-slate-300 rounded-md p-2" />
            </div>
          </div>
          <div className="flex w-full justify-end">
            <button className="bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-40">
              Cadastrar
            </button>
          </div>
        </div>
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