import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});
export default appStore;
