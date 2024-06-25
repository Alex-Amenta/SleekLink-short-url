import { Suspense } from "react";
import SkeletonStatistics from "./ui/SkeletonStatistics";
import ChartsContainer from "./graphics/ChartsContainer";
import Loading from "@/app/Loading";

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
    <section className="my-44">
      <h3 className="text-4xl text-center font-bold">
        Monitorea el rendimiento de tus URLs con estadísticas de clics en tiempo
        real.
      </h3>
      <Suspense fallback={<Loading />}>
        <div className="mt-10 flex justify-start md:justify-center items-center flex-wrap gap-10 xl:gap-28">
          <ChartsContainer />
        </div>
      </Suspense>

      <article className="mt-20 flex flex-wrap justify-center xl:justify-around items-center gap-16">
        {dataStatistics.map(({ data, description }, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-green-400 to-green-700 p-6 w-full md:w-[17rem] 
            shadow-md rounded-md text-white flex flex-col items-center justify-center opacity-90"
          >
            <p className="text-4xl font-bold">{data}</p>
            <p className="text-balance text-white/80">{description}</p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Statistics;
