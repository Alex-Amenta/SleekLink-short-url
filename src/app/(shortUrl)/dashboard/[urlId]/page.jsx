"use client";

import { ClicksOverTimeChart } from "@/components/graphics/ClicksOverTimeChart";
import PulseLoader from "@/components/ui/loader/PulseLoader";
import SkeletonUrlCard from "@/components/ui/SkeletonUrlCard";
import TooltipUrl from "@/components/ui/TooltipUrl";
import { calculateDaysReamiming, formatDate } from "@/helpers/formatDate";
import { useUrlStore } from "@/zustand/store";
import { MousePointerClickIcon } from "lucide-react";
import { useEffect } from "react";

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
                  <span className="inline-flex align-middle"><PulseLoader isActive={url.active} /></span>
                  {url.title}
                </h3>

                <article className="mt-5 grid grid-cols-2 grid-rows-6 md:grid-cols-3 md:grid-rows-5 gap-4 ">
                  <div className="row-span-2 flex flex-col justify-between items-start rounded-md p-4 bg-black/10 dark:bg-white/10">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-black/80 dark:text-white/80">
                        Clicks totales
                      </p>
                      <p>
                        <MousePointerClickIcon />
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
                        <MousePointerClickIcon />
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold text-4xl">{url.countClick}</p>
                      <p className="text-sm ml-1">clicks</p>
                    </div>
                  </div>

                  <div className="max-md:col-span-2 row-span-2 max-md:row-start-3 md:row-span-5 flex flex-col justify-start space-y-5 items-start rounded-md p-4 bg-black/10 dark:bg-white/10 text-sm">
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
                  <div className="rounded-md col-span-2 row-span-2 row-start-5 md:row-span-3 md:row-start-3 p-4 bg-black/10 dark:bg-white/10">
                    {/* <ClicksOverTimeChart urlId={urlId} /> */}
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
