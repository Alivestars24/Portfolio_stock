import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  stock: null,
  loading: false,
}

const stockSlice = createSlice({
  name: "stock",
  initialState: initialState,
  reducers: {
    setStock(state, value) {
      state.stock = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
  },
})

export const { setStock, setLoading } = stockSlice.actions

export default stockSlice.reducer