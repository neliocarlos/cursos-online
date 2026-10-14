import { Categoria } from "@/mocks/categorias";

type CardCursoProps = {
    id: number;
    nomeCurso: string;
    areaCurso: Categoria;
    cargaHorario: string;
    descricao: string;
}

export default CardCursoProps;