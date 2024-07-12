import { Suspense } from "react";
import SkeletonStatistics from "./ui/SkeletonStatistics";
import ChartsContainer from "./graphics/ChartsContainer";
import Loading from "@/app/Loading";
import ArrowHearth from "./ui/icons/navigation/ArrowHearth";

const dataStatistics = [
  {
    data: "+230",
    description: "clicks en la URL acortada!",
  },
  {
    data: "30%",
    description: "más de visitas",
  },
  {
    data: "+150",
    description: "visitas en total",
  },
];

const Statistics = () => {
  return (
    <section className="my-44 relative">
      <div className="absolute top-0 left-0 size-72 blur-3xl bg-green-300 dark:bg-green-900 rounded-full opacity-70 -z-50 -inset-32"></div>
      <div className="absolute right-0 bottom-0 size-60 blur-3xl bg-green-300 dark:bg-green-900 rounded-full opacity-70 -z-50"></div>

      <h3 className="text-4xl text-start md:text-center font-bold">
        Monitorea el rendimiento de tus URLs con estadísticas de clics en tiempo
        real.
      </h3>
      <Suspense fallback={<Loading />}>
        <div className="mt-10 flex justify-start md:justify-center items-center flex-wrap gap-10 xl:gap-28">
          <ChartsContainer />
        </div>
      </Suspense>

      <article className="mt-20 flex flex-wrap justify-center xl:justify-around items-center gap-16 relative">
        {dataStatistics.map(({ data, description }, index) => (
          <div
            key={index}
            className="border border-black/20 dark:border-white/20 bg-black/10 dark:bg-white/10 p-6 w-full md:w-[17rem] 
            shadow-md rounded-md text-black dark:text-white flex flex-col items-center justify-center opacity-90"
          >
            <ArrowHearth/>
            <p className="mt-2 text-4xl font-bold">{data}</p>
            <p className="text-balance text-black/80 dark:text-white/80">{description}</p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Statistics;
