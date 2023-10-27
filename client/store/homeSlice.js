import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  discountedListings: [],
  categories: ['groceries', 'tech', 'entertainment', 'clothing', 'beauty', 'halloween'],
  searchInput: '',
  dropdown: true
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
    },
    dropdownSwitch: (state, action) => {
      state.dropdown = action.payload;
    }
  },
});

export const { populateDiscounted, clearDiscounted, dropdownSwitch } = homeSlice.actions;

export default homeSlice.reducer;