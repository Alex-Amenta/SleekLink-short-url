"use client";

import { ClickCounterBarChart } from "@/components/graphics/BarChart";
import CursorClick from "@/components/ui/icons/others/CursorClick";
import EyeShow from "@/components/ui/icons/others/EyeShow";
import PulseLoader from "@/components/ui/loader/PulseLoader";
import SkeletonUrlCard from "@/components/ui/SkeletonUrlCard";
import TooltipUrl from "@/components/ui/TooltipUrl";
import { calculateDaysReamiming, formatDate } from "@/helpers/formatDate";
import { useUrlStore } from "@/zustand/store";
import { Suspense, useEffect } from "react";

const UrlDetailsPage = ({ params }) => {
  const { getUrlById, selectedUrl, loading } = useUrlStore();
  const { urlId } = params;

  console.log(selectedUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUrlById(urlId);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [getUrlById, urlId]);

  return (
    <section className="min-h-screen mt-[4rem]">
      <div className="bg-white dark:bg-[#131313] rounded-md p-4">
        {loading ? (
          <SkeletonUrlCard />
        ) : (
          selectedUrl?.map((url) => (
            <>
              <div key={url.id} className="">
                <h3 className="font-bold text-xl">
                  <PulseLoader isActive={url.active} />
                  {url.title}
                </h3>

                <article className="mt-5 grid grid-cols-4 grid-rows-5 gap-4 ">
                  <div className="row-span-2 flex flex-col justify-between items-start rounded-md p-4 bg-black/10 dark:bg-white/10">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-black/80 dark:text-white/80">
                        Views totales
                      </p>
                      <p>
                        <EyeShow />
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold text-4xl">32</p>
                      <p className="text-sm ml-1">views</p>
                    </div>
                  </div>
                  <div className="row-span-2 flex flex-col justify-between items-start rounded-md p-4 bg-black/10 dark:bg-white/10">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-black/80 dark:text-white/80">
                        Clicks totales
                      </p>
                      <p>
                        <CursorClick />
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold text-4xl">{url.countClick}</p>
                      <p className="text-sm ml-1">clicks</p>
                    </div>
                  </div>

                  <div className="row-span-2 flex flex-col justify-between items-start rounded-md p-4 bg-black/10 dark:bg-white/10">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-black/80 dark:text-white/80">
                        Clicks totales
                      </p>
                      <p>
                        <CursorClick />
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold text-4xl">{url.countClick}</p>
                      <p className="text-sm ml-1">clicks</p>
                    </div>
                  </div>

                  <div className="row-span-5 flex flex-col justify-start space-y-5 items-start rounded-md p-4 bg-black/10 dark:bg-white/10 text-sm">
                    <TooltipUrl textHover={"ShortUrl"} content={url.shortUrl} />
                    <TooltipUrl
                      textHover={"OriginalUrl"}
                      content={url.originalUrl}
                    />

                    <p className="">
                      Fecha de creacion:{" "}
                      <span className="text-black/70 dark:text-white/70">
                        {formatDate(url.createdAt)}
                      </span>
                    </p>
                    <p>
                      Expira en:{" "}
                      <strong className="text-red-600">
                        {calculateDaysReamiming(url.expirationDate)} days
                      </strong>
                    </p>
                  </div>
                  <div className=" rounded-md col-span-3 row-span-3 row-start-3 p-4 bg-black/10 dark:bg-white/10">
                    <ClickCounterBarChart />
                  </div>
                </article>
              </div>
            </>
          ))
        )}
      </div>
    </section>
  );
};

export default UrlDetailsPage;
