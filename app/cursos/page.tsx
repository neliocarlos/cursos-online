import CardCurso from "@/components/card-curso";
import { cursosMock } from "@/mocks/cursos";

export default function Cursos() {
    return (
        <div className="flex flex-col flex-1 items-center font-sans bg-gray-100">
            <div className='flex flex-col w-[80%] gap-1 items-start py-10'>
                <label htmlFor="nome-curso" className='text-slate-900'>Nome do Curso</label>
                <input id="nome-curso" type="text" className='border bg-white w-200 border-gray-300 p-2 rounded-md placeholder:text-slate-300' placeholder='Buscar cursos...' />
            </div>
            <div className='w-[80%] grid grid-cols-3'>
                {cursosMock.map((curso) => (
                    <div className='col-span-1 flex justify-center items-center p-4' key={curso.nomeCurso}>
                        <CardCurso {...curso} />
                    </div>
                ))}
            </div>
        </div>
    )
}