import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "./apiHandler";

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async (userData, thunkAPI) => {
    const response = await apiCall(
      "/api/movies/trending",
      thunkAPI.rejectWithValue
    );
    return response;
  }
);

const initialState = {
  trendingMovies: [],
  trendingMoviesLoading: "idle",
  apiCallError: false
};
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTrendingMovies.pending]: (state, action) => {
      if (state.trendingMoviesLoading === "idle") {
        state.trendingMoviesLoading = "pending";
        state.apiCallError = false;
      }
    },
    [fetchTrendingMovies.fulfilled]: (state, action) => {
      if (state.trendingMoviesLoading === "pending") {
        state.trendingMoviesLoading = "idle";
        state.trendingMovies = action.payload;
      }
    },
    [fetchTrendingMovies.rejected]: (state, action) => {
      if (state.trendingMoviesLoading === "pending") {
        state.trendingMoviesLoading = "idle";
        state.trendingMovies = action.payload;
        state.apiCallError = true;
      }
    }
  }
});

export default moviesSlice.reducer;
