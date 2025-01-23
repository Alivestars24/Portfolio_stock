import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../api"
import Cookies from 'js-cookie';
import { fetchStocks } from "./stockAPI"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
} = endpoints

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            })
            console.log("SENDOTP API RESPONSE............", response)

            console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    navigate,
    userName
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                username: userName, 
                email,
                password,
                confirmPassword,
            });

            console.log("SIGNUP API RESPONSE............", response);
            if (response.status!==201) {
                throw new Error(response.data.message);
            }
            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            console.error("SIGNUP API ERROR............", error);
            toast.error(error.response?.data?.message || "Signup Failed");
            navigate("/signup");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Logging in...");
        dispatch(setLoading(true));
        try {
            // Ensure the body is correctly formatted for your backend API
            const response = await apiConnector("POST", LOGIN_API, {
                usernameOrEmail: email, // Same key as required by the backend
                password: password
            });

            console.log("Login form response :", response);

            if (response.status !== 200) {
                throw new Error(response.data.message || "Login failed");
            }

            toast.success("Login Successful!", { id: toastId });

            // Extract token and user data from the response
            const token = response.data.accessToken;
            const user = response.data.userDetails;

            // Dispatch user and token to store
            await dispatch(setUser(user));
            dispatch(setToken(token));

            // Store the token in cookies for persistence
            Cookies.set("token", token, { expires: 7 });
            Cookies.set("storeToken", response.data.storeToken, { expires: 7 });
            dispatch(fetchStocks());
            navigate('/dashboard/my-profile');
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Login Failed", { id: toastId });
        } finally {
            dispatch(setLoading(false));
        }
    };
}


export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        Cookies.remove('token');
        Cookies.remove('storeToken')
        toast.success("Logged Out")
        navigate("/")
    }
}