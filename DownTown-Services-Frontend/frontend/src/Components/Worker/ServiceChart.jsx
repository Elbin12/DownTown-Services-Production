import React from "react";
import { Line } from "react-chartjs-2";

const ServiceChart = () => {
  const data = {
    labels: ["01", "02", "03", "04", "05", "06"],
    datasets: [
      {
        label: "Last 6 days",
        data: [2, 4, 3, 5, 2, 6],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: "Last Week",
        data: [3, 2, 4, 3, 4, 5],
        borderColor: "rgba(200, 200, 200, 1)",
        backgroundColor: "rgba(200, 200, 200, 0.2)",
        tension: 0.4,
        pointRadius: 5,
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Services Completed</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ServiceChart;
