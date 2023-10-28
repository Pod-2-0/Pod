import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import homeReducer from './homeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    home: homeReducer,
  },
});
