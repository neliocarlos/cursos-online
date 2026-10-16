// app/admin/inscricoes/page.tsx
import { Suspense } from "react";
import { connection } from "next/server";
import { cursosMock } from "@/mocks/cursos";
import { InscricaoRegistro } from "@/types/inscricao-types";
import { listarInscricoes } from "@/services/inscricao";

async function TabelaInscricoes() {
  await connection();
  const inscricoes = listarInscricoes();

  const nomeCurso = (id: number) =>
    cursosMock.find((c) => c.id === id)?.nomeCurso ?? `Curso #${id}`;

  if (inscricoes.length === 0) {
    return <p className="text-slate-700">Nenhuma inscrição ainda.</p>;
  }

  return (
    <>
      <ul className="flex flex-col gap-3 md:hidden">
        {inscricoes.map((i) => (
          <li key={i.id} className="bg-white rounded-md p-4 text-slate-900 text-sm">
            <p className="font-semibold">{i.nome}</p>
            <p className="text-slate-600">{nomeCurso(i.cursoId)}</p>
            <p>{i.email}</p>
            <p>{i.telefone} · {i.cidade}</p>
            <p className="text-slate-500">{i.criadoEm}</p>
          </li>
        ))}
      </ul>
      <table className="w-full text-left text-slate-900 bg-white md:inline-table hidden">
        <thead className="bg-blue-950 text-white">
          <tr>
            <th className="p-3">Data</th>
            <th className="p-3">Curso</th>
            <th className="p-3">Nome</th>
            <th className="p-3">E-mail</th>
            <th className="p-3">Telefone</th>
            <th className="p-3">Cidade</th>
          </tr>
        </thead>
        <tbody>
          {inscricoes.map((i: InscricaoRegistro) => (
            <tr key={i.id} className="border-t border-slate-200">
              <td className="p-3">{i.criadoEm}</td>
              <td className="p-3">{nomeCurso(i.cursoId)}</td>
              <td className="p-3">{i.nome}</td>
              <td className="p-3">{i.email}</td>
              <td className="p-3">{i.telefone}</td>
              <td className="p-3">{i.cidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default function AdminInscricoes() {
  return (
    <div className="flex flex-col gap-4 p-10 font-sans bg-gray-100 flex-1">
      <div className="text-2xl font-semibold text-slate-900">Inscrições</div>
      <Suspense fallback={<p className="text-slate-700">Carregando...</p>}>
        <TabelaInscricoes />
      </Suspense>
    </div>
  );
}