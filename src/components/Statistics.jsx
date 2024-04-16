import { Suspense } from "react";
import SkeletonStatistics from "./SkeletonStatistics";
import ChartsContainer from "./graphics/ChartsContainer";
import Loading from "@/app/Loading";

const Statistics = () => {
  return (
    <section className="my-44">
      <h3 className="text-4xl font-bold">
      Monitorea el rendimiento de tus URLs con estadísticas de clics en tiempo real.
      </h3>
      <Suspense fallback={<Loading />}>

        <div className="mt-10 flex justify-start lg:justify-center items-center flex-wrap gap-10 xl:gap-28">
          <ChartsContainer />
        </div>
      </Suspense>

    </section>
  );
};

export default Statistics;
