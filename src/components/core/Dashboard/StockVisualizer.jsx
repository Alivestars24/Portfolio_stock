import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const USD_TO_INR_RATE = 81.5;

const StockVisualizer = ({ stockData }) => {
  const [tickers, setTickers] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState("");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extract tickers from stockData
    const extractedTickers = stockData.map((stock) => stock.ticker);
    setTickers(extractedTickers);
    if (extractedTickers.length > 0) setSelectedTicker(extractedTickers[0]); // Default ticker
  }, [stockData]);

  useEffect(() => {
    if (selectedTicker) {
      fetchStockData(selectedTicker);
    }
  }, [selectedTicker]);

  const fetchStockData = async (ticker) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=K8T0KEFBHQV6JJWQ`
      );
      const data = await response.json();
      if (data["Time Series (Daily)"]) {
        const timeSeries = data["Time Series (Daily)"];
        const labels = [];
        const prices = [];

        // Extract the most recent 30 days of data
        const sortedDates = Object.keys(timeSeries).sort((a, b) => new Date(b) - new Date(a));
        sortedDates.slice(0, 30).forEach((date) => {
          const day = new Date(date).getDate(); // Extract the day only
          labels.unshift(day); // Add day to labels
          const priceInUSD = parseFloat(timeSeries[date]["4. close"]); // Closing price in USD
          prices.unshift(priceInUSD * USD_TO_INR_RATE); // Convert to INR and add to prices
        });

        setChartData({
          labels,
          datasets: [
            {
              label: `Stock Prices for ${ticker} (Last 30 Days)`,
              data: prices,
              borderColor: "rgba(0, 82, 209, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.15,
            },
          ],
        });
      } else {
        console.error("Invalid response: No 'Time Series (Daily)' in API response.");
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
    setLoading(false);
  };
  return (
    <div className="container mx-auto py-1 w-3/4 ">
        <div className="flex flex-row  justify-between items-center">
        <h1 className="text-xl font-semibold text-center mb-2">Historical Data of Stocks</h1>
      <div className="flex justify-center items-center mb-2">
        <label htmlFor="ticker-select" className="mr-4 font-semibold">
          Select Ticker:
        </label>
        <select
          id="ticker-select"
          value={selectedTicker}
          onChange={(e) => setSelectedTicker(e.target.value)}
          className="px-2 py-1 border rounded-md"
        >
          {tickers.map((ticker) => (
            <option key={ticker} value={ticker}>
              {ticker}
            </option>
          ))}
        </select>
      </div>
        </div>
      {loading ? (
        <p className="text-center">Loading data...</p>
      ) : chartData ? (
        <div className="bg-white shadow-md rounded-md">
          <Line data={chartData} />
        </div>
      ) : (
        <p className="text-center">No data available for the selected ticker.</p>
      )}
    </div>
  );
};

export default StockVisualizer;
