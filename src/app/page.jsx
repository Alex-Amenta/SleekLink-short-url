import CustomizeUrl from "@/components/CustomizeUrl";
import FrequentQuestions from "@/components/FrequentQuestions";
import Statistics from "@/components/Statistics";

export default function Home() {
  return (
    <main className="min-h-screen px-10 lg:px-48">
      <div>
        <h1 className="text-5xl text-pretty font-bold mt-40 mb-6 bg-gradient-to-r from-slate-950 to-green-500 inline-block text-transparent bg-clip-text">¡ShortURL: Acorta tus enlaces, amplía tus posibilidades!</h1>
        <p className="text-lg text-black/65">ShortURL es tu compañero perfecto para transformar URLs largas y complicadas en enlaces cortos y fáciles de compartir. ¡Simplemente pega tu URL, obtén tu enlace corto y compártelo con el mundo!</p>
      </div>

      <div className="mt-10 flex justify-start items-center gap-4 flex-wrap">
        <input className="p-2 border border-l-8 bg-white border-black rounded max-w-[600px] w-full focus-visible:border-green-400 shadow-lg" type="text" placeholder="Ejemplo: https://tusitio.com/tu-url" required/>
        
        <button className="bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg">
          <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          Acortar URL
        </button>
      </div>

      <CustomizeUrl/>

      <Statistics/>
      <FrequentQuestions/>
    </main>
  );
}
