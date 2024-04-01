import { combineReducers, configureStore } from '@reduxjs/toolkit';
import FavReducer from './FavReducer';
import CartReducer from './CartReducer';

// Combine reducers
const rootReducer = combineReducers({
  favourites: FavReducer,
  cart: CartReducer,
  // Add other reducers if any
});

// Create Redux store
const store = configureStore({
  reducer: rootReducer,
  // Add any middleware or enhancers if needed
});

export default store;