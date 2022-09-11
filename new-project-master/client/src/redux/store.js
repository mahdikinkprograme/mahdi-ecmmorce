import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import cartSlice from "./features/cartSlice";
import productsSlice from "./features/productsSlice";
import wishSlice from "./features/wishSlice";
const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    wish: wishSlice,
    auth: authSlice,
  },
});
export default store;
