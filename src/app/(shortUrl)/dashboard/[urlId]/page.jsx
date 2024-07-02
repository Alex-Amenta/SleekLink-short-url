"use client";

import { ClickCounterBarChart } from "@/components/graphics/BarChart";
import CursorClick from "@/components/ui/icons/CursorClick";
import EyeShow from "@/components/ui/icons/EyeShow";
import PulseLoader from "@/components/ui/loader/PulseLoader";
import { useUrlStore } from "@/zustand/store";
import { useEffect } from "react";

const UrlDetailsPage = ({ params }) => {
  const { getUrlById, selectedUrl } = useUrlStore();
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
      <div className="bg-white rounded-md p-4">
        {selectedUrl?.map((url) => (
          <>
            <div key={url.id} className="">
              <h3 className="font-bold text-xl"><PulseLoader isActive={url.active}/>{url.title}</h3>

              <article className="mt-5 grid grid-cols-4 grid-rows-5 gap-4 ">

                <div className="row-span-2 flex flex-col justify-between items-start rounded-md p-4 bg-black/10">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-black/80">Views totales</p>
                    <p><EyeShow /></p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-4xl">32</p>
                    <p className="text-sm ml-1">views</p>
                  </div>
                </div>
                <div className="row-span-2 flex flex-col justify-between items-start rounded-md p-4 bg-black/10">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-black/80">Clicks totales</p>
                    <p>
                      <CursorClick />
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-4xl">{url.countClick}</p>
                    <p className="text-sm ml-1">clicks</p>
                  </div>
                </div>

                <div className="row-span-2 flex flex-col justify-between items-start rounded-md p-4 bg-black/10">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-black/80">Clicks totales</p>
                    <p>
                      <CursorClick />
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-4xl">{url.countClick}</p>
                    <p className="text-sm ml-1">clicks</p>
                  </div>
                </div>

                <div className="row-span-5 flex flex-col justify-between items-start rounded-md p-4 bg-black/10"></div>
                <div className=" rounded-md col-span-3 row-span-3 row-start-3 p-4 bg-black/10">
                <ClickCounterBarChart /></div>
              </article>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default UrlDetailsPage;
