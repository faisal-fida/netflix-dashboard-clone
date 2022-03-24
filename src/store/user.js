import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: false,
    userId: null,
    editUser: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setEditUser(state, action) {
      state.editUser = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
