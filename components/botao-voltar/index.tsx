import Link from "next/link";
import { IoReturnUpBack } from "@react-icons/all-files/io5/IoReturnUpBack";

type BotaoVoltarProps = {
  href: string;
  className?: string;
  titulo?: string;
};

export default function BotaoVoltar({ href, className, titulo = "Voltar" }: BotaoVoltarProps) {
    return (
        <Link
          href={href}
          className={`${className} bg-blue-950 flex items-center w-fit text-white py-2 px-4 rounded-md hover:bg-blue-900 cursor-pointer -mt-5`}
        >
          <IoReturnUpBack className="text-2xl mr-2" /> {titulo}
        </Link>
    )
}