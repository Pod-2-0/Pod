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
        },
        removeCartItem: (state, action) => {
            const cartId = action.payload;
            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i]._id === cartId) {
                    state.items.splice(i, 1);
                    break;
                }
            }
        },
        updateCartQuantity: (state, action) => {
            const cartId = action.payload.cartId;
            const quantity = action.payload.quantity;
            console.log("success to cartSlice updateQuantity");
            console.log("cart id: ", cartId);
            console.log("quantity: ", quantity);
            
            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i]._id === cartId) {
                    state.items[i].quantity = quantity;
                    break;
                }
            }
        },


    },
});

export const {loadCart, removeCartItem, updateCartQuantity} = cartSlice.actions;

export default cartSlice.reducer;