import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "./apiHandler";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (userData, thunkAPI) => {
    const response = await apiCall(
      `/api/search/${userData.query}`,
      thunkAPI.rejectWithValue
    );
    return response;
  }
);

const initialState = {
  searchResults: {},
  searchResultsLoading: {}
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSearchResults.pending]: (state, action) => {
      state.searchResultsLoading[action.meta.arg.id] = "pending";
    },
    [fetchSearchResults.fulfilled]: (state, action) => {
      state.searchResultsLoading[action.meta.arg.id] = "fetched";
      state.searchResults[action.meta.arg.id] = action.payload;
    },
    [fetchSearchResults.rejected]: (state, action) => {
      state.searchResultsLoading[action.meta.arg.id] = "idle";
    }
  }
});

export default searchSlice.reducer;
