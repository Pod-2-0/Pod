import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    items : [],
    totalPrice : 0,
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
           state.items = action.payload.items;
           state.loaded = true;
        }



    },
});

export const {add} = cartSlice.actions;

export default cartSlice.reducer;