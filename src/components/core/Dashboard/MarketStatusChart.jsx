import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

const API_KEY = "2AQYDBR2NPMCVFWJ";

const MarketStatusChart = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMarketStatus = async () => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo`
      );

      console.log("API Response:", response.data); // Debug log for API response

      if (response.data && response.data.markets) {
        setMarketData(response.data.markets); // Ensure markets field exists
      } else {
        setMarketData([]); // Fallback to empty array if data is missing
        setError("Unexpected data structure received from API.");
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching market status data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketStatus();
  }, []);

  if (loading) return <p>Loading market data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Safely process data only if marketData is an array
  const marketTypes = ["Equity", "Forex", "Cryptocurrency"];
  const openCounts = marketTypes.map((type) =>
    Array.isArray(marketData)
      ? marketData.filter(
          (market) => market.market_type === type && market.current_status === "open"
        ).length
      : 0
  );
  const closedCounts = marketTypes.map((type) =>
    Array.isArray(marketData)
      ? marketData.filter(
          (market) => market.market_type === type && market.current_status === "closed"
        ).length
      : 0
  );

  const chartData = {
    labels: marketTypes,
    datasets: [
      {
        label: "Open Markets",
        data: openCounts,
        backgroundColor: ["#93c5fd", "#60a5fa", "#2563eb"], // Light blue shades for open
      },
      {
        label: "Closed Markets",
        data: closedCounts,
        backgroundColor: ["#bfdbfe", "#3b82f6", "#1d4ed8"], // Dark blue shades for closed
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          color: "#1e293b",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const status = context.dataset.label;
            const count = context.raw;
            return `${status}: ${count}`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-5 w-2/5 py-1">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">
        Market Status Overview
      </h2>
      <div className="bg-white py-2">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MarketStatusChart;
