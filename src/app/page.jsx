import Link from "next/link";
import Convertingtab from './../components/Convertingtab/index';

const Page = async () => {
  return (
    <main className="bg-gradient-radial from-black to-slate-950">
      <div className="sm:px-16 md:px-32 py-4 text-xl h-screen text-center flex min-h-max justify-center items-center">
        <div className="justify-center items-center sm:w-screen md:w-2/3 lg:w-2/5 rounded-lg overflow-hidden">
          <div className="w-full opacity-95 bg-orange-300 px-2 py-4 shadow-lg text-center">
            <Link href="/"
              className='text-2xl font-bold text-white justify-center'
            >Temperature Converter Kautsar
            </Link>
          </div>
          <Convertingtab />
        </div>
      </div>
    </main>

  );
}

export default Page