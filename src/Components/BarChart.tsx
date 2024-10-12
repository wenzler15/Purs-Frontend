// src/components/BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { generateRandomColors } from "../utils/generateRandomColors";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChart = ({ data, type }) => {
  const colors = generateRandomColors(data.answers.length);

  const chartData = {
    labels: data.answers,
    datasets: [
      {
        label: "Respostas",
        data: data.count,
        backgroundColor: colors.map((color) => color.replace("0.6", "1")),
        borderColor: colors.map((color) => color.replace("0.6", "1")),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: type === "horizontal" ? "y" : "x",
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const labelValue = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${labelValue} (${value})`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Eixo X",
        },
        ticks: {
          beginAtZero: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "Eixo Y",
        },
      },
    },
  };

  return (
    <div className="w-full flex justify-center h-[300px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
