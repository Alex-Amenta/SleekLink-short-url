import { Suspense } from "react";
import SkeletonStatistics from "./SkeletonStatistics";
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
      <h3 className="text-4xl font-bold">
        Monitorea el rendimiento de tus URLs con estadísticas de clics en tiempo
        real.
      </h3>
      <Suspense fallback={<Loading />}>
        <div className="mt-10 flex justify-start lg:justify-center items-center flex-wrap gap-10 xl:gap-28">
          <ChartsContainer />
        </div>
      </Suspense>

      <article className="mt-20 flex flex-wrap justify-center items-center gap-16">
        {dataStatistics.map(({ data, description }, index) => (
          <div
            key={index}
            className="relative drop-shadow-xl w-56 h-64 overflow-hidden rounded-xl bg-green-100"
          >
            <div className="absolute flex flex-col items-center justify-center z-[1] opacity-90 rounded-xl inset-0.5 bg-green-50">
              <p className="text-4xl font-bold">{data}</p>
              <p className="text-balance text-black/70 mt-3">{description}</p>
            </div>
            <div className="absolute w-56 h-48 bg-green-500 blur-[50px] -left-1/2 -top-1/2"></div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Statistics;
