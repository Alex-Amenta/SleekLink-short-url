"use client";

import { useUrlStore } from "@/zustand/store";
import { useEffect } from "react";

const useFetchUrls = (userId) => {
  const { urls, getUrlsByUserId } = useUrlStore();

  useEffect(() => {
    const fetchData = async () => {
      if (urls.length === 0) {
        try {
          await getUrlsByUserId(userId);
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchData();
  }, [getUrlsByUserId, userId, urls.length]);

  return urls;
};

export default useFetchUrls;
