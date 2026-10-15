export type InscricaoRegistro = {
  id: number;
  cursoId: number;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  criadoEm: string;
};

export type InscricaoEstado = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"nome" | "email" | "telefone" | "cidade", string[]>>;
  values?: Record<string, string>;
};

export type InscricaoConteudo = {
  cursoId: number;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
};
