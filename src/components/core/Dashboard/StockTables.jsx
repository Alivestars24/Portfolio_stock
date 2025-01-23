import React, { useEffect, useState } from "react";
import axios from "axios";

const StockTables = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo"); // Replace with your API endpoint
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const renderChange = (changePercentage) => {
    const isPositive = !changePercentage.startsWith("-");
    const arrow = isPositive ? "▲" : "▼";
    const color = isPositive ? "text-caribbean-green-25" : "text-red-600";
    return (
      <span className={color}>
        {arrow} {changePercentage}
      </span>
    );
  };

  return (
    <div className="mt-4 py-1 w-3/5">
      <h1 className="text-2xl font-bold mb-2">Stock Market Highlights</h1>

      {/* Top Gainers Table */}
      <h2 className="text-lg font-semibold mb-2">Top Gainers</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="border border-gray-300 px-4 py-1">Ticker</th>
            <th className="border border-gray-300 px-4 py-1">Price</th>
            <th className="border border-gray-300 px-4 py-1">Change</th>
          </tr>
        </thead>
        <tbody>
          {data.top_gainers.slice(0, 3).map((gainer, index) => (
            <tr key={index}>
              <td className="border bg-blue-5 border-gray-300 px-4 py-1">{gainer.ticker}</td>
              <td className="border border-gray-300 px-4 py-1">${gainer.price}</td>
              <td className="border bg-blue-5 border-gray-300 px-4 py-1">
                {renderChange(gainer.change_percentage)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Most Actively Traded Table */}
      <h2 className="text-lg font-semibold mb-2">Most Actively Traded</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="border border-gray-300 px-4 py-1">Ticker</th>
            <th className="border border-gray-300 px-4 py-1">Price</th>
            <th className="border border-gray-300 px-4 py-1">Change</th>
          </tr>
        </thead>
        <tbody>
          {data.top_losers.slice(0, 3).map((loser, index) => (
            <tr key={index}>
              <td className="border bg-blue-5 border-gray-300 px-4 py-2">{loser.ticker}</td>
              <td className="border  border-gray-300 px-4 py-2">${loser.price}</td>
              <td className="border bg-blue-5 border-gray-300 px-4 py-2">
                {renderChange(loser.change_percentage)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTables;
