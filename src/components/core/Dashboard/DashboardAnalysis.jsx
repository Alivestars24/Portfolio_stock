import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PortfolioPieChart from "./PortfolioPieChart";
import TopPerformingStocksTable from "./TopPerformingStocksTable";
import { RiArrowUpSFill, RiArrowDownSFill, RiCoinFill, RiCoinsFill } from "react-icons/ri";
import MarketStatusChart from "./MarketStatusChart";
import StockTables from "./StockTables";
import StockVisualizer from "./StockVisualizer";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaCoins } from "react-icons/fa";

const DashboardAnalysis = () => {
  const dispatch=useDispatch();
  const stks = useSelector((state) => state.stock?.stock || []);  // Fetch the latest stocks from the Redux store
  console.log("Vaishnavi presents dashboard :",stks);
  const stockData=stks;

  const API_KEY = process.env.API_KEY1;
  console.log("This is the API_KEY",API_KEY);

  const USD_TO_INR = 82.50; 

  const [stockDetails, setStockDetails] = useState({});
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalPercentageChange, setTotalPercentageChange] = useState(0);

  const fallbackData = {
    A: {
      "05. price": "24.0700",
    },
  };

  useEffect(() => {
    const fetchStockData = async () => {
      const allData = {};
      let investment = 0;
      let portfolioValue = 0;
    
      // Iterate through each stock in stockData
      for (const stock of stockData) {
        try {
          console.log(`Fetching data for ${stock.ticker}...`);
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Avoid API rate limits
    
          const response = await axios.get(
            `https://www.alphavantage.co/query`,
            {
              params: {
                function: "GLOBAL_QUOTE",
                symbol: stock.ticker, 
                apikey: "K8T0KEFBHQV6JJWQ", 
              },
            }
          );
          console.log(response);
          const stockInfo =
            response.data["Global Quote"] || fallbackData["A"]; // Use fallback data if API fails
          if (!stockInfo) {
            console.warn(`No data available for ${stock.ticker}`);
            continue;
          }
    
          const currentPrice = parseFloat(stockInfo["05. price"]); // Get the current price of the stock
          allData[stock.ticker] = {
            ...stock, // Spread the existing stock details
            currentPrice,
            valueInINR: currentPrice * stock.quantity * USD_TO_INR, // Calculate value in INR
          };
    
          // Update total investment and portfolio value
          investment += stock.buyingPrice * stock.quantity * USD_TO_INR; // Calculate investment in INR
          portfolioValue += currentPrice * stock.quantity * USD_TO_INR; // Calculate current portfolio value in INR
        } catch (error) {
          console.error(`Error fetching data for ${stock.ticker}:`, error.message);
    
          // Use fallback data if API call fails
          const stockInfo = fallbackData[stock.ticker];
          if (!stockInfo) continue; // Skip if no fallback data is available
    
          const currentPrice = parseFloat(stockInfo["05. price"]);
          allData[stock.ticker] = {
            ...stock,
            currentPrice,
            valueInINR: currentPrice * stock.quantity * USD_TO_INR,
          };
    
          investment += stock.buyingPrice * stock.quantity * USD_TO_INR;
          portfolioValue += currentPrice * stock.quantity * USD_TO_INR;
        }
      }
    
      // Update state with calculated data
      setStockDetails(allData);
      setTotalInvestment(investment);
      setTotalPortfolioValue(portfolioValue);
    
      // Calculate and set percentage change
      const percentageChange = ((portfolioValue - investment) / investment) * 100;
      setTotalPercentageChange(percentageChange);
    
      console.log("Stock data fetched successfully:", allData);
      console.log("Total Investment (INR):", investment);
      console.log("Total Portfolio Value (INR):", portfolioValue);
      console.log("Percentage Change:", percentageChange);
    };
    
    console.log("Fetched stocks from Redux:", stockData);
    fetchStockData();
  }, [stockData]);
  

  return (
    <div className="min-h-screen p-2">
      <div className="max-w-full mx-auto bg-white">
        <div className="flex flex-row  gap-x-3 w-full">
          <StockVisualizer stockData={stockData}/>
          <div className="flex flex-col gap-y-2 items-center justify-center pr-2 w-4/12">
          <div className="bg-blu w-full px-3 py-6 border border-lblue shadow-md rounded-lg">
            <div className="flex flex-row items-center justify-between">
            <p className="text-white font-medium opacity-90 text-lg">
              Total Investment
            </p>
            <RiCoinsFill className="text-white w-9 h-9 mr-3"/>
            </div>
            <h3 className="text-white font-semibold text-xl">
              ₹{totalInvestment.toFixed(2)}
            </h3>
          </div>
          <div className="bg-richblue-500 w-full px-3 py-6 border border-lblue-25 shadow-md rounded-lg">
          <div className="flex flex-row items-center justify-between">
            <p className="text-white font-medium opacity-90 text-lg">
              Total Portfolio Value
            </p>
            <FaCoins className="text-white w-9 h-9 mr-3"/>
            </div>
            <h3 className="text-white font-semibold text-xl">
              ₹{totalPortfolioValue.toFixed(2)}
            </h3>
          </div>
          <div className="bg-blu w-full px-3 py-6 border border-lblue shadow-md rounded-lg">
            <div className="flex flex-row items-center justify-between">
            <p className="text-white font-medium opacity-90 text-lg">
              Percentage Change
            </p>
            <BsGraphUpArrow className="text-white w-7 h-7 mr-3"/>
            </div>
            <h3 className="text-white font-semibold text-xl flex items-center">
              {totalPercentageChange >= 0 ? (
                <RiArrowUpSFill className="text-caribbeangreen-25 w-10 h-10" />
              ) : (
                <RiArrowDownSFill className="text-pink-100 w-6 h-6" />
              )}
              {Math.abs(totalPercentageChange).toFixed(2)}%
            </h3>
          </div>
          </div>
        </div>
        <div className="flex flex-row gap-x-3 w-full items-center justify-between">
        <PortfolioPieChart
          stockDetails={stockDetails}
          totalPortfolioValue={totalPortfolioValue}
        />
        <TopPerformingStocksTable stockDetails={stockDetails} />
        </div>
        <div className="flex flex-row gap-x-1 items-center justify-between">
        <MarketStatusChart/>
        <StockTables/>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalysis;
