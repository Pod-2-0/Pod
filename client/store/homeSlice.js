import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  discountedListings: []
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    populateDiscounted: (state, action) => {
      state.discountedListings.push(action.payload)
    }
  },
});

export const { populateDiscounted } = homeSlice.actions;

export default homeSlice.reducer;