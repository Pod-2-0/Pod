import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import homeDiscountReducer from "./cartSlice";
import confirmReducer from "./confirmSlice";
import homeReducer from "./homeSlice";

export const store = configureStore({
    reducer : {
        cart : cartReducer,
        confirm: confirmReducer,
        home: homeReducer
    }
});