import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  discountListings: []
};

export const homeDiscountSlice = createSlice({
  name: 'homeDiscount',
  initialState,
  reducers: {
    populate: (state, action) => {
      state.discountListings.push(action.payload)
    }
  },
});

export const { populate } = homeDiscountSlice.actions;

export default homeDiscountSlice.reducer;