import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  discountedListings: [],
  categories: ['groceries', 'tech', 'entertainment', 'clothing', 'beauty', 'halloween'],
  searchInput: ''
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
    },
    changeSearchInput: (state, action) => {
      state.searchInput += action.payload;
    }
  },
});

export const { populateDiscounted, clearDiscounted } = homeSlice.actions;

export default homeSlice.reducer;