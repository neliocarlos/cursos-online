import CardCursoProps from "@/types/card-curso";
import Link from "next/link";

export default function CardCurso({ id, nomeCurso, areaCurso, cargaHorario, descricao }: CardCursoProps) {
    return (
        <div className='flex flex-col w-150'>
            <div className='flex flex-col gap-1 bg-blue-950 text-white p-4 rounded-t-xl'>
                <div className='text-lg font-semibold line-clamp-1'>{nomeCurso}</div>
                <div className='text-md text-gray-500'>{areaCurso}</div>
            </div>
            <div className='flex flex-col h-60 justify-between bg-amber-50 text-slate-900 p-4 rounded-b-xl gap-4 shadow'>
                <div className='text-md line-clamp-5'>{descricao}</div>
                <div className='flex md:flex-row md:gap-0 gap-2 flex-col justify-between items-center px-6 w-full'>
                    <div className='text-md font-semibold'>Carga Horária: {cargaHorario}</div>
                    <Link href={`/cursos/${id}`}  className='bg-blue-950 text-white p-2 rounded-md hover:bg-blue-900 cursor-pointer'>Ver Detalhes</Link>
                </div>
            </div>
        </div>
    )
}