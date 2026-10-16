import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cursosMock } from "@/mocks/cursos";
import { InscricaoRegistro } from "@/types/inscricao-types";
import { listarInscricoesPorCurso } from "@/services/inscricao";
import { phoneMask } from "@/helpers/phoneMask";
import { IoReturnUpBack } from "@react-icons/all-files/io5/IoReturnUpBack";

type Props = { params: Promise<{ cursoId: string }> };

function formatarData(utc: string) {
  return new Date(utc.replace(" ", "T") + "Z").toLocaleString("pt-BR", {
    timeZone: "America/Cuiaba",
  });
}

async function TabelaInscricoes({ params }: Props) {
  await connection();

  const { cursoId } = await params;
  const curso = cursosMock.find((c) => c.id === Number(cursoId));

  if (!curso) {
    notFound();
  }

  const inscricoes = listarInscricoesPorCurso(curso.id);

  return (
    <>
      <div className="flex flex-col gap-1">
        <Link
          href="/admin"
          className="bg-blue-950 flex items-center w-fit text-white py-2 px-4 rounded-md hover:bg-blue-900 cursor-pointer -mt-5 mb-5"
        >
          <IoReturnUpBack className="text-2xl mr-2" /> Voltar
        </Link>
        <h1 className="text-2xl font-semibold text-slate-900">
          {curso.nomeCurso}
        </h1>
        <p className="text-slate-600">
          {inscricoes.length}{" "}
          {inscricoes.length === 1 ? "inscrição" : "inscrições"}
        </p>
      </div>

      {inscricoes.length === 0 ? (
        <p className="text-slate-700">Nenhuma inscrição neste curso ainda.</p>
      ) : (
        <>
          <ul className="flex flex-col gap-3 md:hidden">
            {inscricoes.map((i: InscricaoRegistro) => (
              <li
                key={i.id}
                className="bg-white rounded-md p-4 text-slate-900 text-sm"
              >
                <p className="font-semibold">{i.nome}</p>
                <p>{i.email}</p>
                <p>
                  {phoneMask(i.telefone)} · {i.cidade}
                </p>
                <p className="text-slate-500">{formatarData(i.criadoEm)}</p>
              </li>
            ))}
          </ul>

          <table className="w-full text-left text-slate-900 bg-white md:inline-table hidden">
            <thead className="bg-blue-950 text-white">
              <tr>
                <th className="p-3">Data</th>
                <th className="p-3">Nome</th>
                <th className="p-3">E-mail</th>
                <th className="p-3">Telefone</th>
                <th className="p-3">Cidade</th>
              </tr>
            </thead>
            <tbody>
              {inscricoes.map((i: InscricaoRegistro) => (
                <tr key={i.id} className="border-t border-slate-200">
                  <td className="p-3">{formatarData(i.criadoEm)}</td>
                  <td className="p-3">{i.nome}</td>
                  <td className="p-3">{i.email}</td>
                  <td className="p-3">{phoneMask(i.telefone)}</td>
                  <td className="p-3">{i.cidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default function AdminInscricoesDoCurso({ params }: Props) {
  return (
    <div className="flex flex-col gap-4 p-10 font-sans bg-gray-100 flex-1">
      <Suspense fallback={<p className="text-slate-700">Carregando...</p>}>
        <TabelaInscricoes params={params} />
      </Suspense>
    </div>
  );
}