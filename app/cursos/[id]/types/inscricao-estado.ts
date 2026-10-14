export type InscricaoEstado = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"nome" | "email" | "telefone" | "cidade", string[]>>;
  values?: Record<string, string>;
};
