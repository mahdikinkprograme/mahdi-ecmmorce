import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// export const fetchOrders = createAsyncThunk("cart/fetchOrders", async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/api/orders");
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// });
// export const fetchOrder = createAsyncThunk("cart/fetchOrder", async (_id) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/api/orders/${_id}`);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// });
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    orderId: null,
    shippingAdress: localStorage.getItem("shippingAdress")
      ? JSON.parse(localStorage.getItem("shippingAdress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    token: "",
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].qty += 1;
      } else {
        const choosenItem = { ...payload, qty: 1 };
        state.cartItems.push(choosenItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, { payload }) => {
      const cartItemsClone = [...state.cartItems];
      const newCartItems = cartItemsClone.filter(
        (item) => item._id != payload._id
      );
      state.cartItems = newCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseQty: (state, { payload }) => {
      const cartItemsClone = [...state.cartItems];
      const itemIndex = cartItemsClone.findIndex(
        (item) => item._id == payload._id
      );
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].qty > 1)
          state.cartItems[itemIndex].qty -= 1;
        else if (state.cartItems[itemIndex].qty == 1) {
          const newCartItems = cartItemsClone.filter(
            (item) => item._id != payload._id
          );
          state.cartItems = newCartItems;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    saveShippingAdress: (state, { payload }) => {
      state.shippingAdress = payload;
    },
    savePaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
    setPrices: (state) => {
      const roundPrice = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
      state.itemsPrice = roundPrice(
        state.cartItems.reduce((a, c) => a + c.qty * c.newprice, 0)
      );
      state.shippingPrice =
        state.itemsPrice > 100 ? roundPrice(0) : roundPrice(10);
      state.taxPrice = roundPrice(0.2 * state.itemsPrice);
      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;
    },
    cartClear: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
  // extraReducers: {
  //   [fetchOrder.fulfilled]: (state, { payload }) => {
  //     state.order = payload;
  //   },
  //   // [fetchOrders.fulfilled]: (state, { payload }) => {
  //   //   state.orders = payload;
  //   // },
  // },
});

export const {
  addToCart,
  decreaseQty,
  removeFromCart,
  saveShippingAdress,
  savePaymentMethod,
  setPrices,
  cartClear,
} = cartSlice.actions;
export default cartSlice.reducer;
