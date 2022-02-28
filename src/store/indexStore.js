import { configureStore } from "@reduxjs/toolkit";

import itemSlice from "./item";

const store = configureStore({
  reducer: { item: itemSlice },
});

export default store;
