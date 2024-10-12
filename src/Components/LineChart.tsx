import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.answers,
    datasets: [
      {
        label: "Respostas",
        data: data.count,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.raw !== null) {
              label += context.raw;
            }
            return label;
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
      },
      y: {
        title: {
          display: true,
          text: "Eixo Y",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="w-full flex justify-center h-[300px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
