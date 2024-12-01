import { createAsyncThunk } from "@reduxjs/toolkit";
import { animeAPI } from "../../api/api";

export const fetchPopularAnime = createAsyncThunk(
  "anime/fetchPopularAnime",
  async () => {
    const response = await animeAPI.getPopularAnime();
    return response.data;
  }
);

export const fetchCatalogAnime = createAsyncThunk(
  "catalog/fetchCatalogAnimes",
  async ({ page, status }, { rejectWithValue }) => {
    try {
      const response = await animeAPI.getAllAnimes(status, page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
