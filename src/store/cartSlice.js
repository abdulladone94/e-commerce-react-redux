import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../product";

const initialState = {
  ferchProducts: products,
  items: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  cartTabStatus: false,
  searchQuery: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, itemQuentity } = action.payload;
      const findIndex = state.items.findIndex(
        (index) => index.productId === productId
      );
      console.log(state);
      if (findIndex >= 0) {
        state.items[findIndex].itemQuentity += itemQuentity;
      } else {
        state.items.push({ productId, itemQuentity });
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },
    changeQuantity(state, action) {
      const { productId, itemQuentity } = action.payload;
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (itemQuentity > 0) {
        state.items[indexProductId].itemQuentity = itemQuentity;
      } else {
        state.items = state.items.filter(
          (item) => item.productId !== productId
        );
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },
    cartTabToggle(status) {
      if (status.cartTabStatus === false) {
        status.cartTabStatus = true;
      } else {
        status.cartTabStatus = false;
      }
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { addToCart, changeQuantity, cartTabToggle, setSearchQuery } =
  cartSlice.actions;
export default cartSlice.reducer;
