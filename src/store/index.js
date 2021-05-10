import { configureStore } from "@reduxjs/toolkit";
import signedSlice from "./signed-slice.js";

const store = configureStore({
  reducer: { signed: signedSlice.reducer },
});

export default store;