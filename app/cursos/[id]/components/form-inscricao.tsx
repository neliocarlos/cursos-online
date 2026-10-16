// app/cursos/[id]/form-inscricao.tsx
"use client";

import { useActionState, useState, useEffect } from "react";
import { cadastrarInscricao } from "../actions";
import { phoneMask } from "@/helpers/phoneMask";
import { InscricaoEstado } from "@/types/inscricao-types";

const estadoInicial: InscricaoEstado = { status: "idle" };

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <span className="text-sm text-red-600">{messages[0]}</span>;
}

export function FormInscricao({ cursoId }: { cursoId: number }) {
  const [state, formAction, pending] = useActionState(
    cadastrarInscricao,
    estadoInicial,
  );
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (state.status === "success") setPhone("");
  }, [state.status]);

  return (
    <form action={formAction} className="flex flex-col w-full gap-4 p-4">
      <input type="hidden" name="cursoId" value={cursoId} />

      <div className="flex flex-col gap-1">
        <label htmlFor="nome" className="text-md text-slate-700">Nome:</label>
        <input
          id="nome"
          name="nome"
          type="text"
          autoComplete="name"
          required
          placeholder="Digite seu nome completo"
          defaultValue={state.values?.nome}
          className="border border-slate-300 rounded-md p-2 w-full"
        />
        <FieldError messages={state.errors?.nome} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-md text-slate-700">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Digite seu e-mail"
          defaultValue={state.values?.email}
          className="border border-slate-300 rounded-md p-2 w-full"
        />
        <FieldError messages={state.errors?.email} />
      </div>

      <div className="flex xs:flex-row flex-col gap-2 w-full items-start">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="telefone" className="text-md text-slate-700">Telefone:</label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="(00) 00000-0000"
            maxLength={15}
            value={phone}
            defaultValue={state.values?.telefone}
            onChange={(e) => setPhone(phoneMask(e.target.value))}
            className="border border-slate-300 rounded-md p-2 w-full"
          />
          <FieldError messages={state.errors?.telefone} />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="cidade" className="text-md text-slate-700">Cidade:</label>
          <input
            id="cidade"
            name="cidade"
            type="text"
            autoComplete="address-level2"
            required
            placeholder="Digite sua cidade"
            defaultValue={state.values?.cidade}
            className="border border-slate-300 rounded-md p-2 w-full"
          />
          <FieldError messages={state.errors?.cidade} />
        </div>
      </div>


      <div className="flex w-full items-center justify-end gap-8">
        {state.message && (
          <p
            role="status"
            className={state.status === "success" ? "text-green-700" : "text-red-600"}
          >
            {state.message}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-40 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? "Enviando..." : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}