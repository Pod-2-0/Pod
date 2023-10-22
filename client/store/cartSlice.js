import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    items : [],
    loaded: false,
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        // add : (state, action) => {
        //     state.checkout = [...state.checkout];
        //     state.checkout.push(action.payload.name);
        //     state.total += action.payload.price;

        // }

        loadCart: (state, action) => {
           state.items = action.payload;
           state.loaded = true;
        }



    },
});

export const {loadCart} = cartSlice.actions;

export default cartSlice.reducer;