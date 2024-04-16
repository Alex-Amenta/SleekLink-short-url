"use client"

import { useEffect, useState } from "react";
import { ClickCounterBarChart } from "./BarChart";
import { ClicksInTime } from "./AreaChart";

const ChartsContainer = () => {
    const [renderCharts, setRenderCharts] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setRenderCharts(true);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <>
        {renderCharts && <ClickCounterBarChart />}
        {renderCharts && <ClicksInTime />}
      </>
    );
}
 
export default ChartsContainer;