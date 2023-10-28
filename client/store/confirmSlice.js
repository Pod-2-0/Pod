import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    items : [],
    loaded: false,
    saleTotal: 0
}

const confirmSlice = createSlice({
    name : 'confirm',
    initialState,
    reducers : {
   
        loadConfirm: (state, action) => {
           state.items = action.payload;
           state.saleTotal = action.payload[0].sale_total;
           state.loaded = true;
        },
        
    },
});

export const {loadConfirm} = confirmSlice.actions;

export default confirmSlice.reducer;