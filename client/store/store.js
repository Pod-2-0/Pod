import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import homeDiscountReducer from "./cartSlice";
import confirmReducer from "./confirmSlice";

export const store = configureStore({
    reducer : {
        cart : cartReducer,
        homeDiscount: homeDiscountReducer,
        confirm: confirmReducer,
    }
});