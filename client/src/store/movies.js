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

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (userData, thunkAPI) => {
    const response = await apiCall(
      "/api/movies/popular",
      thunkAPI.rejectWithValue
    );
    return response;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (userData, thunkAPI) => {
    const response = await apiCall(
      `/api/movies/getDetailsById/${userData.id}`,
      thunkAPI.rejectWithValue
    );
    return response;
  }
);

const initialState = {
  trendingMovies: [],
  trendingMoviesLoading: "idle",
  popularMovies: [],
  popularMoviesLoading: "idle",
  movieDetails: {},
  movieDetailsLoading: "idle",
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
        state.apiCallError = true;
      }
    },
    [fetchPopularMovies.pending]: (state, action) => {
      if (state.popularMoviesLoading === "idle") {
        state.popularMoviesLoading = "pending";
        state.apiCallError = false;
      }
    },
    [fetchPopularMovies.fulfilled]: (state, action) => {
      if (state.popularMoviesLoading === "pending") {
        state.popularMoviesLoading = "idle";
        state.popularMovies = action.payload;
      }
    },
    [fetchPopularMovies.rejected]: (state, action) => {
      if (state.popularMoviesLoading === "pending") {
        state.popularMoviesLoading = "idle";
        state.apiCallError = true;
      }
    },
    [fetchMovieDetails.pending]: (state, action) => {
      if (state.movieDetailsLoading === "idle") {
        state.movieDetailsLoading = "pending";
        state.apiCallError = false;
      }
    },
    [fetchMovieDetails.fulfilled]: (state, action) => {
      if (state.movieDetailsLoading === "pending") {
        state.movieDetailsLoading = "idle";
        state.movieDetails[action.payload.id] = action.payload;
      }
    },
    [fetchMovieDetails.rejected]: (state, action) => {
      if (state.movieDetailsLoading === "pending") {
        state.movieDetailsLoading = "idle";
        state.apiCallError = true;
      }
    }
  }
});

export default moviesSlice.reducer;
