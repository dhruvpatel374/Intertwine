import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromLocalStorage = () => {
  try {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Failed to load favorites from localStorage", error);
    return [];
  }
};

const saveFavoritesToLocalStorage = (items) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save favorites to localStorage", error);
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFavoritesFromLocalStorage(),
  },
  reducers: {
    addToFavorites: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex === -1) {
        state.items.push(action.payload);
        saveFavoritesToLocalStorage(state.items);
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      saveFavoritesToLocalStorage(state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
