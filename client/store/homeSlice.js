import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  discountedListings: [],
  categories: ['groceries', 'tech', 'entertainment', 'clothing', 'beauty', 'holiday']
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    populateDiscounted: (state, action) => {
      state.discountedListings = [...action.payload];
    },
    clearDiscounted: (state) => {
      state.discountedListings = [];
    }
  },
});

export const { populateDiscounted, clearDiscounted } = homeSlice.actions;

export default homeSlice.reducer;