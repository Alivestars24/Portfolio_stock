import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../Common/ConfirmationModal"
import { useEffect } from "react";
import { addStockToDatabase, deleteStock, editStockToDatabase, fetchStocks } from "../../../services/oparations/stockAPI";

function EditStockModal({ stock, onClose, onSave }) {
  
  const [formData, setFormData] = useState({
    name: stock.stockName,
    ticker: stock.ticker,
    purchasePrice: stock.buyingPrice,
    dateOfPurchase: stock.purchaseDate,
    quantity: stock.quantity,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Stock</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>
          <div className="flex flex-row gap-x-2 items-center justify-between">
          <div>
            <label className="block text-sm font-medium">Ticker</label>
            <input
              type="text"
              name="ticker"
              value={formData.ticker}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          </div>
          <div className="flex flex-row gap-x-2 items-center justify-between">
          <div>
            <label className="block text-sm font-medium">Date of Purchase</label>
            <input
              type="date"
              name="dateOfPurchase"
              value={formData.dateOfPurchase}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div> 
          <div>
            <label className="block text-sm font-medium">Purchase Price</label>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>   
          </div>
        </form>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="px-4 py-2 rounded-md bg-black text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-blu text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function AddStockModal({ onClose, onAdd }) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStock, setSelectedStock] = useState(null);
    const [formData, setFormData] = useState({
      purchasePrice: "",
      quantity: "",
      dateOfPurchase: "",
    });
  
    const api_key = process.env.API_KEY2; // Replace with your API key
  
    const handleSearch = async () => {
      if (searchQuery.trim() === "") return;
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${api_key}`
      );
      const data = await response.json();
      setSearchResults(data.bestMatches || []);
    };
  
    const handleStockSelect = (stock) => {
      setSelectedStock({
        name: stock["2. name"],
        ticker: stock["1. symbol"],
      });
      setSearchResults([]);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    
    const handleAdd = () => {
      if (selectedStock) {
        console.log("In the function for handleADD",formData);
        onAdd({ ...selectedStock, ...formData });
        onClose();
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Add Stock</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Search Stock</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter stock name or ticker"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blu text-white rounded"
              >
                Search
              </button>
            </div>
          </div>
          <ul className="max-h-40 overflow-y-auto border border-gray-300 rounded mb-4">
            {searchResults.map((result, index) => (
              <li
                key={index}
                onClick={() => handleStockSelect(result)}
                className="p-2 cursor-pointer hover:bg-blue-100"
              >
                {result["2. name"]} ({result["1. symbol"]})
              </li>
            ))}
          </ul>
          {selectedStock && (
            <div className="mb-4">
              <p className="text-sm font-medium">Selected Stock:</p>
              <p>
                {selectedStock.name} ({selectedStock.ticker})
              </p>
            </div>
          )}
          <form className="space-y-2">
            <div className="flex flex-row gap-x-2 items-center justify-center">
            <div>
              <label className="block text-sm font-medium">Purchase Price</label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Purchase</label>
              <input
                type="date"
                name="dateOfPurchase"
                value={formData.dateOfPurchase}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </form>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="px-4 py-2 rounded-md bg-black text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-blu text-white"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }

  function PortfolioPage() {
    const { user, loading: profileLoading } = useSelector(
      (state) => state.profile
    );
    const { loading: authLoading } = useSelector((state) => state.auth);
    const stks = useSelector((state) => state.stock?.stock || []); // Fetch the latest stocks from the Redux store
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
    useEffect(() => {
      dispatch(fetchStocks());
    }, [dispatch]);
  
    useEffect(() => {
      console.log("Updated stocks from Redux store:", stks);
    }, [stks]);
  
    const handleEdit = (stock) => {
      setSelectedStock(stock);
    };
  
    const handleAddClick = () => {
      setIsAddModalOpen(true);
    };
  
    const handleSave = async (updatedStock) => {
      try {
        const result = await editStockToDatabase(updatedStock);
        console.log("Stock successfully edited:", result);
        dispatch(fetchStocks());
      } catch (error) {
        console.error("Error editing stock:", error);
      }
    };
  
    const onAdd = async (selectedStock, formData) => {
      try {
        const res = await addStockToDatabase(selectedStock, formData);
        console.log("Response for adding stock is:", res);
        dispatch(fetchStocks());
      } catch (error) {
        console.error("Error adding stock:", error);
      }
    };
  
  return (
    <div className="px-5 py-2">
    <div className="flex items-center justify-between">
  <h1 className="text-3xl font-bold mb-3">Portfolio</h1>
  <div className="relative group">
    <button
      className="w-8 h-8 flex items-center justify-center bg-blue-800 text-white rounded-full hover:bg-blue-900"
      onClick={handleAddClick}
    >
      +
    </button>
    <span className="absolute w-24 bg-[#d8e5fe] bottom-10 left-1/2 transform -translate-x-1/2 text-black text-xs rounded-md px-4 py-1 opacity-0 group-hover:opacity-100">
      Add a stock
    </span>
    <div
      className="absolute w-1 h-1 border-l-4 border-r-4 border-l-transparent border-r-transparent border-t-4 border-[#d3e2ff] bottom-9 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100"
    ></div>
  </div>
</div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-dblue text-white">
            <th className="p-3 text-center">Name</th>
            <th className="p-3 text-center">Ticker</th>
            <th className="p-3 text-center">Purchase Price</th>
            <th className="p-3 text-center">Date of Purchase</th>
            <th className="p-3 text-center">Quantity</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stks.map((stock, index) => (
            <tr
              key={stock.id}
              className={
                index % 2 === 0 ? "bg-[#e0ecfb]" : "bg-blue-5"
              }
            >
              <td className="p-3 text-center">{stock.stockName}</td>
              <td className="p-3 text-center">{stock.ticker}</td>
              <td className="p-3 text-center">{stock.buyingPrice}</td>
              <td className="p-3 text-center">{stock.purchaseDate}</td>
              <td className="p-3 text-center">{stock.quantity}</td>
              <td className="p-3 flex gap-x-2 items-center justify-center">
                <button
                  className="px-6 py-1 bg-blu text-white rounded"
                  onClick={() => handleEdit(stock)}
                >
                  Edit
                </button>
                <button onClick={() =>
                              setConfirmationModal({
                                text1: "Are you sure ?",
                                text2: "You will remove the stock from portfolio.",
                                btn1Text: "delete",
                                btn2Text: "Cancel",
                                btn1Handler: () => {dispatch(deleteStock(stock.ticker));setConfirmationModal(null)},
                                btn2Handler: () => setConfirmationModal(null),
                              })
                            }>
                              <MdDelete className="w-7 h-7"/>
                            </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStock && (
        <EditStockModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
          onSave={handleSave}
        />
      )}
      {isAddModalOpen && (
        <AddStockModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={onAdd}
        />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default PortfolioPage;
