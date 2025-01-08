import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register all required components
ChartJS.register(...registerables);

const SalesChart = ({revenueLastWeek, ordersLastWeek, labels}) => {

  console.log(revenueLastWeek, ordersLastWeek, 'lllldddd')
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Orders Count",
        data: ordersLastWeek,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Revenue (₹)",
        data: revenueLastWeek,
        backgroundColor: "rgba(200, 200, 200, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalesChart;
