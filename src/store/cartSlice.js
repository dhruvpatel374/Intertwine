import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage", error);
    return [];
  }
};

const saveCartToLocalStorage = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
};

const initialState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({
          item: action.payload,
          quantity: 1,
        });
      }
      saveCartToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (cartItem) => cartItem.item.id !== action.payload.id
      );
      saveCartToLocalStorage(state.items);
    },

    increaseItemQuantity: (state, action) => {
      const itemToIncrease = state.items.find(
        (cartItem) => cartItem.item.id === action.payload.id
      );

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        saveCartToLocalStorage(state.items);
      }
    },

    decreaseItemQuantity: (state, action) => {
      const itemToDecrease = state.items.find(
        (cartItem) => cartItem.item.id === action.payload.id
      );

      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
        saveCartToLocalStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },

    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.item.id === id);

      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
        saveCartToLocalStorage(state.items);
      }
    },
  },
});

export const selectItemsInCart = (state) => state.cart.items;

export const selectTotalPrice = (state) =>
  state.cart.items.reduce(
    (total, cartItem) => total + cartItem.item.itemPrice * cartItem.quantity,
    0
  );

export const {
  addToCart,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  updateItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
