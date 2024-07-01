import Footer from "@/components/Footer";
import FrequentQuestions from "@/components/FrequentQuestions";
import Statistics from "@/components/Statistics";
import UrlManager from "@/components/UrlManager";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <div>
        <h1 className="text-6xl text-center text-pretty font-bold mt-16 mb-6 bg-gradient-to-r from-slate-950 to-green-500 inline-block text-transparent bg-clip-text">
          Acorta tus enlaces de manera elegante y comparte con facilidad
        </h1>
        <p className="text-lg text-center text-black/65">
          SleekLink es tu compañero perfecto para transformar URLs largas y
          complicadas en enlaces cortos y fáciles de compartir. ¡Simplemente
          pega tu URL, obtén tu enlace corto y compártelo con el mundo!
        </p>
      </div>

      
      <UrlManager showButtons={true} isAuthenticated={false} />
      <Statistics />
      <FrequentQuestions />
      <Footer />
    </main>
  );
}
