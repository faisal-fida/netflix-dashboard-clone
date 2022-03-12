import { configureStore } from "@reduxjs/toolkit";

import itemSlice from "./item";
import userSlice from "./user";

const store = configureStore({
  reducer: { item: itemSlice, user: userSlice },
});

export default store;
