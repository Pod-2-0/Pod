import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  discountedListings: [],
  categories: ['groceries', 'tech', 'entertainment', 'clothing', 'beauty', 'halloween'],
  searchInput: '',
  dropdown: true,
  signedIn: false,
  categoryChange: false
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
    },
    signedInSwitch: (state, action) => {
      state.signedIn = action.payload;
    },
    categoryChangeSwitch: (state, action) => {
      state.categoryChange = action.payload;
    }
  },
});

export const { populateDiscounted, clearDiscounted, dropdownSwitch, signedInSwitch, categoryChangeSwitch} = homeSlice.actions;

export default homeSlice.reducer;