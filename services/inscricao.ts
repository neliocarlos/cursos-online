import db from "@/db/database";
import { InscricaoConteudo, InscricaoRegistro } from "@/types/inscricao-types";

export async function enviarInscricao(payload: InscricaoConteudo) {
  db.prepare(
    `INSERT INTO Inscricoes (curso_id, nome, email, telefone, cidade)
     VALUES (@cursoId, @nome, @email, @telefone, @cidade)`,
  ).run(payload);
}

export function listarInscricoes(): InscricaoRegistro[] {
  return db
    .prepare(
      `SELECT id, curso_id AS cursoId, nome, email, telefone, cidade,
              criado_em AS criadoEm
       FROM Inscricoes
       ORDER BY id DESC`,
    )
    .all() as InscricaoRegistro[];
}