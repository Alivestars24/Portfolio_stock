//const BASE_URL = "https://transpectra-backend.onrender.com/api/v1"
const BASE_URL="http://localhost:8080/api"
console.log("this is base url", BASE_URL);

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/signin",
  GET_STOCKS_API:BASE_URL+"/stocks",
}

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/details",
}

