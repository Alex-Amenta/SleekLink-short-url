import CustomizeUrl from "@/components/CustomizeUrl";
import Footer from "@/components/Footer";
import FrequentQuestions from "@/components/FrequentQuestions";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import UrlManager from "@/components/UrlManager";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <UrlManager isAuthenticated={false} />
      <CustomizeUrl />
      <Statistics />
      <FrequentQuestions />
      <Footer />
    </main>
  );
}
