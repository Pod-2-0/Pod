import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import homeDiscountReducer from "./cartSlice";

export const store = configureStore({
    reducer : {
        cart : cartReducer,
        homeDiscount: homeDiscountReducer
    }
});