import { createSlice } from "@reduxjs/toolkit";

export const FavSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    addToFav: (state, action) => {
      console.log("Reducer reached: Before dispatching...");
      state.favourites.push({ ...action.payload });
      console.log("Reducer reached: After dispatching...");
    },
    removeFromFav: (state, action) => {
      state.favourites = state.favourites.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addToFav, removeFromFav } = FavSlice.actions;

export default FavSlice.reducer;
