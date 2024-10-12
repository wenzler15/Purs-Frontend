import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { generateRandomColors } from "../utils/generateRandomColors";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ dataProvider, type }) => {
  const labels = dataProvider.answers;
  const dataValues = dataProvider.count;
  const colors = generateRandomColors(labels.length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: dataValues,
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace("0.6", "1")),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";

            if (context.raw !== null) {
              label += ": " + context.raw;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="w-full flex justify-center h-[300px]">
      {type === "pie" ? (
        <Pie data={data} options={options} />
      ) : (
        <Doughnut data={data} options={options} />
      )}
    </div>
  );
};

export default PieChart;
