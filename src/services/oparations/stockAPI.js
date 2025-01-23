import { apiConnector } from "../apiConnector"; // Import your API connector function
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { setStock } from "../../slices/stockSlice";
import { endpoints } from "../api"

const {
    GET_STOCKS_API
} = endpoints

export function fetchStocks() {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching stocks...");

        try {
            const token = Cookies.get("token");
            if (!token) {
                throw new Error("Token not found. Please log in again.");
            }
            const response = await apiConnector("GET", GET_STOCKS_API, null, {
                Authorization: `Bearer ${token}`,
            });

            console.log("Stocks API response:", response);

            if (response.status !== 200) {
                throw new Error(response.data.message || "Failed to fetch stocks");
            }

            toast.success("Stocks fetched successfully!", { id: toastId });

            // You can dispatch the fetched data to your store if needed
            const stocks = response.data; // Assuming `stocks` is part of the response
            dispatch(setStock(stocks)); // Assuming you have a `setStocks` action in Redux
        } catch (error) {
            console.error("Error fetching stocks:", error);
            toast.error("Failed to fetch stocks", { id: toastId });
        } finally {
        }
    };
}

export async function addStockToDatabase(selectedStock, formData) {
    const toastId = toast.loading("Adding stock...");
    try {
        console.log("Debugging selectedStock:", selectedStock);
        if (!selectedStock || !selectedStock.name || !selectedStock.ticker) {
            throw new Error("Invalid selected stock. Please check the stock data.");
        }
        const stockPayload = {
            stockName: selectedStock.name,
            ticker: selectedStock.ticker,
            buyingPrice: parseFloat(selectedStock.purchasePrice), // Convert to float
            quantity: parseInt(selectedStock.quantity, 10), // Convert to integer
            purchaseDate: selectedStock.dateOfPurchase, 
        };

        console.log("Payload sent to API:", stockPayload);

        // Fetch token from cookies
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("Authorization token not found. Please log in.");
        }

        // Make API call
        const response = await apiConnector("POST", GET_STOCKS_API, stockPayload, {
            Authorization: `Bearer ${token}`, // Add token to headers
        });

        // Handle successful response
        if (response.status === 201) {
            toast.success("Stock added successfully!", { id: toastId });
            console.log("API Response:", response.data);
            return response.data; // Return response for further processing
        } else {
            throw new Error(response || "Failed to add stock.");
        }
    } catch (error) {
        console.error("Error adding stock:", error);
        toast.error(error.message || "An unexpected error occurred.", { id: toastId });
        throw error; 
    } finally {
        toast.dismiss(toastId);
    }
}

export async function editStockToDatabase(updatedStock) {
    const toastId = toast.loading("Editing stock...");
    try {
        // Debugging logs to inspect input data
        console.log("Debugging updatedStock:", updatedStock);

        // Validate `updatedStock`
        if (!updatedStock || !updatedStock.name || !updatedStock.ticker) {
            throw new Error("Invalid stock data. Please check the stock details.");
        }

        // Prepare the payload for the API
        const stockPayload = {
            stockName: updatedStock.name,
            ticker: updatedStock.ticker,
            buyingPrice: parseFloat(updatedStock.purchasePrice), // Convert to float
            quantity: parseInt(updatedStock.quantity, 10), // Convert to integer
            purchaseDate: updatedStock.dateOfPurchase, // Assume this is already a valid date string
        };

        console.log("Payload sent to API for editing:", stockPayload);

        // Fetch token from cookies
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("Authorization token not found. Please log in.");
        }

        // Make API call to edit stock
        const response = await apiConnector("PUT", `${GET_STOCKS_API}`, stockPayload, {
            Authorization: `Bearer ${token}`, // Add token to headers
        });

        // Handle successful response
        if (response.status === 200) {
            toast.success("Stock edited successfully!", { id: toastId });
            console.log("API Response after editing stock:", response.data);
            return response.data; // Return the updated stock data
        } else {
            throw new Error(response.data.message || "Failed to edit stock.");
        }
    } catch (error) {
        // Handle errors
        console.error("Error editing stock:", error);
        toast.error(error.message || "An unexpected error occurred while editing the stock.", { id: toastId });
        throw error; // Re-throw error to handle it in the component
    } finally {
        // Dismiss the toast
        toast.dismiss(toastId);
    }
}

export function deleteStock(ticker) {
    return async (dispatch) => {
        const toastId = toast.loading("Deleting stock...");
        try {
            // Fetch token from cookies
            const token = Cookies.get("token");
            if (!token) {
                throw new Error("Authorization token not found");
            }
            const response = await apiConnector("DELETE", `${GET_STOCKS_API}/${ticker}`, null, {
                Authorization: `Bearer ${token}`, // Attach Bearer token
            });

            console.log("Delete stock response:", response);

            if (response.status !== 200) {
                throw new Error(response.data.message || "Failed to delete stock");
            }

            toast.success("Stock deleted successfully!", { id: toastId });
            dispatch(fetchStocks());
        } catch (error) {
            console.error("Error deleting stock:", error);
            toast.error("Failed to delete stock", { id: toastId });
        } finally {
        }
    };
}

