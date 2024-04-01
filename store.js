import {combineReducers, configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";
import FavReducer from "./redux/FavReducer";

const rootReducer = combineReducers({
    favourites: FavReducer,
    cart: CartReducer,
  });

  const store = configureStore({
    reducer: rootReducer,
  });
  
  export default store;