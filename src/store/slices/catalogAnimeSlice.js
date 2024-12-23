import { createSlice } from "@reduxjs/toolkit";
import { fetchCatalogAnime } from "../actions/animeActions";

const catalogAnimeSlice = createSlice({
  name: "catalogAnime",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeCategory: 0,
    page: 1,
    loadingPage: 0,
  },
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
      state.items = [];
      state.page = 1;
    },
    clearAnime(state, action) {
      state.items = [];
      state.page = 1;
    },
    incrementPage(state) {
      state.page += 1;
    },
    setSearchResults(state, action) {
      state.items = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCatalogAnime.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCatalogAnime.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = [...state.items, ...action.payload];
      state.loadingPage = state.page;
    });
    builder.addCase(fetchCatalogAnime.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export const { setActiveCategory, incrementPage, clearAnime, setSearchResults } =
  catalogAnimeSlice.actions;
export default catalogAnimeSlice.reducer;
