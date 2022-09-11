import { createSlice } from "@reduxjs/toolkit";
const wishSlice = createSlice({
  name: "wish",
  initialState: {
    wishItems: localStorage.getItem("wishItems")
      ? JSON.parse(localStorage.getItem("wishItems"))
      : [],
  },
  reducers: {
    addTowish: (state, { payload }) => {
      const itemIndex = state.wishItems.findIndex(
        (item) => item._id === payload._id
      );
      if (itemIndex >= 0) {
        alert("Sorry. You Have Already Added The Product To Your Wish List");
        state.wishItems = state.wishItems;
      } else {
        state.wishItems.push(payload);
      }
      localStorage.setItem("wishItems", JSON.stringify(state.wishItems));
    },
    removeFromwish: (state, { payload }) => {
      const wishItemsClone = [...state.wishItems];
      const newwishItems = wishItemsClone.filter(
        (item) => item._id != payload._id
      );
      state.wishItems = newwishItems;
      localStorage.setItem("wishItems", JSON.stringify(state.wishItems));
    },
  },
});

export const { addTowish, removeFromwish } = wishSlice.actions;
export default wishSlice.reducer;
