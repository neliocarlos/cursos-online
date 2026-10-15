import { BsBuilding } from "@react-icons/all-files/bs/BsBuilding";
import { IoMdMenu } from "@react-icons/all-files/io/IoMdMenu";
import Link from "next/dist/client/link";

export default function Header() {
    return (
        <header className="absolute top-0 flex justify-between items-center w-full py-4 sm:px-20 px-7 text-lg bg-blue-950 text-white">
            <Link href="/" className='flex gap-2'><BsBuilding className="text-xl" />Cursos Digitais</Link>
            <Link href="/admin/inscricoes"><IoMdMenu className="text-2xl" /></Link>
        </header>
    )
}