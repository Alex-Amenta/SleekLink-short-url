"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useUrlStore } from "@/zustand/store";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function ClicksOverTimeChart({ urlId }) {
    const { clicksData, getClicksForUrl } = useUrlStore();

    useEffect(() => {
      if (urlId) {
        getClicksForUrl(urlId);
      }
    }, [urlId]);
  
  
    const chartData = {
        labels: clicksData.length > 0 
        ? clicksData.map(click => new Date(click.clickedAt).toLocaleString()) 
        : [], // Etiquetas con fechas de clics
        datasets: [
          {
            fill: true,
            label: 'Clics over time',
            data: clicksData.length > 0 
            ? clicksData.map(() => 1) 
            : [],// Cada clic representa un punto
            backgroundColor: 'rgb(54, 235, 78, 0.5)', // Color de fondo de las áreas
            borderColor: 'rgb(54, 235, 78)', // Color del borde de las áreas
            borderWidth: 2,
          },
        ],
      };
    
      const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Número de Clics a lo Largo del Tiempo',
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Fecha',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Número de Clics',
            },
            ticks: {
              beginAtZero: true,
            },
          },
        },
      };
  

  //   const chartData = {
  //     labels: ["Enero", "Febrero", "Marzo", "Abril"], // Etiquetas ficticias para los meses
  //     datasets: [
  //       {
  //         fill: true,
  //         label: "Clics",
  //         data: [120, 80, 150, 200], // Datos ficticios de clics
  //         backgroundColor: "rgb(54 235 78 / 50%)", // Color de fondo de las áreas
  //         borderColor: "rgb(54 235 78 / 100%)", // Color del borde de las áreas
  //         borderWidth: 2,
  //       },
  //     ],
  //   };

  //   const chartOptions = {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         position: false,
  //       },
  //       title: {
  //         display: true,
  //         text: "Número de Clics a lo Largo del Tiempo",
  //         font: {
  //           size: 16,
  //           weight: "bold",
  //         },
  //       },
  //     },
  //   };

  return (
    <div className="w-full md:w-[500px] h-full">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
