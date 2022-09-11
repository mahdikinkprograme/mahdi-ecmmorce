import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/api/products");
    localStorage.setItem("products", JSON.stringify(response.data));
    return response.data;
  }
);
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (_id) => {
    const response = await axios.get(
      `http://localhost:5000/api/products/${_id}`
    );
    return response.data;
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    product: {},
    products: [],
    status: null,
  },
  reducers: {
    filterByCategory: (state, { payload }) => {
      const productsClone = JSON.parse(localStorage.getItem("products"));
      if (payload === "all") state.products = productsClone;
      else {
        const filterProducts = productsClone.filter(
          (item) => item.category === payload
        );
        state.products = filterProducts;
      }
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "Pending";
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.status = "Fulfilled";
      state.products = payload;
    },
    [fetchProducts.rejected]: (state) => {
      state.status = "Rejected";
    },
    [fetchProduct.fulfilled]: (state, { payload }) => {
      state.product = payload;
      state.status = "Fullfilled";
    },
  },
});
export const { filterByCategory } = productsSlice.actions;
export default productsSlice.reducer;
