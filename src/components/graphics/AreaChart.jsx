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
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function ClicksInTime() {
  const chartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril"], // Etiquetas ficticias para los meses
    datasets: [
      {
        fill: true,
        label: "Clics",
        data: [120, 80, 150, 200], // Datos ficticios de clics
        backgroundColor: "rgb(54 235 78 / 50%)", // Color de fondo de las áreas
        borderColor: "rgb(54 235 78 / 100%)", // Color del borde de las áreas
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: false,
      },
      title: {
        display: true,
        text: "Número de Clics a lo Largo del Tiempo",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  };

  return (
    <div className="w-[500px] h-full">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
