import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import popularAnimeReducer from "./slices/popularAnimeSlice";
import catalogAnimeReducer from "./slices/catalogAnimeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    popularAnime: popularAnimeReducer,
    catalogAnime: catalogAnimeReducer,
  },
});
