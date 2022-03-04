import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: {
    item: "",
    offset: 0,
    toggled: false,
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
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice.reducer;
