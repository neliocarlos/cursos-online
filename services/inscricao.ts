import { InscricaoConteudo } from "@/types/inscricao-conteudo";

export async function enviarInscricao(payload: InscricaoConteudo) {
  // TODO: trocar pelo endpoint real quando for definido
  // const res = await fetch(`${process.env.API_URL}/inscricoes`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error("Falha ao enviar inscrição");
  // return res.json();

  console.log("Inscrição pronta para envio:", payload);
}