"use client";

import { getAllUrls } from "@/helpers/actions";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [urlData, setUrlData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUrls();
        setUrlData(res);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return <></>;
};

export default DashboardPage;
