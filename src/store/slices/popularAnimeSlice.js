import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularAnime } from "../actions/animeActions";

const popularAnimeSlice = createSlice({
  name: "popularAnime",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPopularAnime.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPopularAnime.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchPopularAnime.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default popularAnimeSlice.reducer;
