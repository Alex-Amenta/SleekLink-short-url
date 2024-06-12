import CustomizeUrl from "@/components/CustomizeUrl";
import Footer from "@/components/Footer";
import FormCreateUrl from "@/components/FormCreateUrl";
import FrequentQuestions from "@/components/FrequentQuestions";
import Statistics from "@/components/Statistics";
import { createUrl } from "@/helpers/actions";

export default function Home() {
  return (
    <main className="min-h-screen px-10 lg:px-48">
      <div>
        <h1 className="text-5xl text-pretty font-bold mt-16 mb-6 bg-gradient-to-r from-slate-950 to-green-500 inline-block text-transparent bg-clip-text">
          ¡SleekLink: Acorta tus enlaces de manera elegante, amplía tus posibilidades!
        </h1>
        <p className="text-lg text-black/65">
          SleekLink es tu compañero perfecto para transformar URLs largas y
          complicadas en enlaces cortos y fáciles de compartir. ¡Simplemente
          pega tu URL, obtén tu enlace corto y compártelo con el mundo!
        </p>
      </div>

      <FormCreateUrl />
      <CustomizeUrl />
      <Statistics />
      <FrequentQuestions />
      <Footer />
    </main>
  );
}
