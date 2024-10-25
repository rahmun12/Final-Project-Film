import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../reducers/movieSlice";
import themeSlice from "../reducers/themeSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    theme: themeSlice,
  },
});
