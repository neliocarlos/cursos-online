// app/cursos/[id]/actions.ts
"use server";

import { enviarInscricao } from "@/services/inscricao";
import { z } from "zod";
import { InscricaoEstado } from "../../../types/inscricao-estado";


const inscricaoSchema = z.object({
    cursoId: z.coerce.number().int().positive(),
    nome: z.string().trim().min(3, "Informe o nome completo"),
    email: z.email("E-mail inválido"),
    telefone: z
        .string()
        .transform((v) => v.replace(/\D/g, ""))
        .pipe(z.string().min(10, "Telefone inválido").max(11, "Telefone inválido")),
    cidade: z.string().trim().min(2, "Informe a cidade"),
});

export async function cadastrarInscricao(
    _prevState: InscricaoEstado,
    formData: FormData,
): Promise<InscricaoEstado> {
    const values = Object.fromEntries(formData) as Record<string, string>;
    const result = inscricaoSchema.safeParse(values);

    if (!result.success) {
        return {
            status: "error",
            errors: z.flattenError(result.error).fieldErrors,
            values,
        };
    }

    try {
        await enviarInscricao(result.data);
        return { status: "success", message: "Inscrição realizada com sucesso!" };
    } catch {
        return {
            status: "error",
            message: "Não foi possível enviar sua inscrição. Tente novamente.",
            values,
        };
    }
}