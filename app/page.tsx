import Link from "next/dist/client/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center font-sans bg-gray-100">
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-bold text-gray-800">Bem-vindo ao Cursos Digitais</h1>
        <p className="text-gray-600 mt-4">Explore nossos cursos e aprimore suas habilidades.</p>
      </div>
      <Link href="/cursos" className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
        Confira nossos cursos
      </Link>
    </div>
  );
}
