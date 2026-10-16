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

export function contarInscricoesPorCurso(): Record<number, number> {
  const linhas = db
    .prepare(
      `SELECT curso_id AS cursoId, COUNT(*) AS total
       FROM inscricoes
       GROUP BY curso_id`,
    )
    .all() as { cursoId: number; total: number }[];

  return Object.fromEntries(linhas.map((l) => [l.cursoId, l.total]));
}

export function listarInscricoesPorCurso(cursoId: number): InscricaoRegistro[] {
  return db
    .prepare(
      `SELECT id, curso_id AS cursoId, nome, email, telefone, cidade,
              criado_em AS criadoEm
       FROM inscricoes
       WHERE curso_id = ?
       ORDER BY id DESC`,
    )
    .all(cursoId) as InscricaoRegistro[];
}
