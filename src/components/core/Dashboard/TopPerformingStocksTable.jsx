import React from "react";

const TopPerformingStocksTable = ({ stockDetails }) => {
  // Extract stocks and calculate performance
  const stockArray = Object.values(stockDetails).map((stock) => {
    const purchaseValue = stock.buyingPrice * stock.quantity;
    const currentValue = stock.currentPrice * stock.quantity;
    const changePercentage =
      ((currentValue - purchaseValue) / purchaseValue) * 100;

    return {
      name: stock.stockName,
      purchaseValue,
      currentValue,
      changePercentage,
    };
  });

  // Sort by performance (highest percentage change first)
  const sortedStocks = stockArray.sort(
    (a, b) => b.changePercentage - a.changePercentage
  );

  // Ensure table has 5 rows, even if there are fewer stocks
  const displayedStocks =
  sortedStocks.length < 5
    ? [...sortedStocks, ...Array(5 - sortedStocks.length).fill(null)]
    : sortedStocks.slice(0, 5);

  return (
    <div className="mt-7 w-2/3">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Top Performing Stocks in your Portfolio</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-blu text-white">
              <th className="py-3 px-3 text-left font-semibold border-b">Stock Name</th>
              <th className="py-3 px-3 text-left font-semibold border-b">Purchase Value (₹)</th>
              <th className="py-3 px-3 text-left font-semibold border-b">Current Value (₹)</th>
              <th className="py-3 px-3 text-left font-semibold border-b">Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {displayedStocks.map((stock, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-blue-5" : "bg-white"
                } border-b `}
              >
                {stock ? (
                  <>
                    <td className="py-2 px-3 text-center">{stock.name}</td>
                    <td className="py-2 px-3 text-center">{stock.purchaseValue.toFixed(2)}</td>
                    <td className="py-2 px-3 text-center">{stock.currentValue.toFixed(2)}</td>
                    <td
                      className={`py-2 px-3 text-center font-semibold ${
                        stock.changePercentage >= 0
                          ? "text-caribbeangreen-300"
                          : "text-pink-400"
                      }`}
                    >
                      {stock.changePercentage.toFixed(2)}%
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-3">&nbsp;</td>
                    <td className="py-2 px-3">&nbsp;</td>
                    <td className="py-2 px-3">&nbsp;</td>
                    <td className="py-2 px-3">&nbsp;</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPerformingStocksTable;
