import { configureStore } from "@reduxjs/toolkit";

import wordReducer from "../features/wordSlice.js";

export const store = configureStore({
  reducer: wordReducer,
});
