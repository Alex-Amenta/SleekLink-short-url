"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ClickCounterBarChart() {
  const chartData = {
    labels: ["URL A", "URL B", "URL C", "URL D"],
    datasets: [
      {
        label: "Clics",
        data: [120, 80, 150, 200], // Datos ficticios
        backgroundColor: "rgb(54 235 78 / 50%)", // Color de las barras
        borderColor: "rgb(54 235 78 / 100%)", // Color del borde de las barras
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        title: {
          display: true,
          text: "Total de clics",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Contador de clics",
        font: {
          size: 16,
          weight: "bold",
        },
        position: "top",
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-[500px] h-full">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
