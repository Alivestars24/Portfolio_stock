import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import stockReducer from "../slices/stockSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  stock:stockReducer,
})

export default rootReducer