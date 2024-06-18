"use client";

import UrlCard from "@/components/UrlCard";
import { useUrlStore, useUserStore } from "@/zustand/store";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [urlData, setUrlData] = useState([]);
  const { fetchUrlsByUserId } = useUrlStore();
  const { user } = useUserStore();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchUrlsByUserId(user?.id);
        setUrlData(res);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="min-h-screen px-10 lg:px-48 mt-[4rem]">
      <div>
        {urlData &&
          urlData.map((url) => <UrlCard key={url.id} urlData={url} />)}
      </div>
      <div className="flex flex-col justify-center items-start p-4 rounded bg-white border border-black/50 shadow-lg"></div>
    </section>
  );
};

export default DashboardPage;
