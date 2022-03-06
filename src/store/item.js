import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: {
    item: false,
    similar: false,
    offset: false,
    toggled: false,
    similarToggled: false,
    searchToggled: false,
  },
  reducers: {
    setItem(state, action) {
      state.item = action.payload;
    },
    setYOffset(state, action) {
      state.offset = action.payload;
    },
    setToggled(state, action) {
      state.toggled = action.payload;
    },
    setSimilar(state, action) {
      state.similar = action.payload;
    },
    setSimilarToggled(state, action) {
      state.similarToggled = action.payload;
    },
    setSearchToggled(state, action) {
      state.searchToggled = action.payload;
    },
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice.reducer;
