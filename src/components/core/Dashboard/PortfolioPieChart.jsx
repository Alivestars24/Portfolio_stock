import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to generate shades of blue dynamically
const generateBlueShades = (numColors) => {
  const colors = [];
  const startHue = 220; // Base blue color hue
  const endHue = 260; // Slightly lighter blue

  for (let i = 0; i < numColors; i++) {
    const hue = startHue + ((endHue - startHue) / (numColors - 1)) * i;
    colors.push(`hsl(${hue}, 70%, 60%)`); // Adjust saturation and lightness as needed
  }

  return colors;
};

const PortfolioPieChart = ({ stockDetails, totalPortfolioValue }) => {
  if (!stockDetails || !totalPortfolioValue) return null;

  const labels = Object.values(stockDetails).map((stock) => stock.stockName);
  const data = Object.values(stockDetails).map((stock) => stock.valueInINR);

  // Generate colors dynamically based on the number of stocks
  const colors = generateBlueShades(labels.length);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Portfolio Distribution (₹)",
        data,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-7 w-1/3">
      <h2 className="text-md text-center font-semibold text-gray-800">
        Portfolio Distribution
      </h2>
      <div className="w-full mx-auto">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default PortfolioPieChart;
