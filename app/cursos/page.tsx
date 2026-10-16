import ListaCursos from "@/app/cursos/components/lista-cursos";
import { cursosMock } from "@/mocks/cursos";

export default function Cursos() {
  return (
    <div className="flex flex-col flex-1 items-center font-sans bg-gray-100">
      <ListaCursos cursos={cursosMock} />
    </div>
  );
}