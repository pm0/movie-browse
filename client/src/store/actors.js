import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "./apiHandler";

export const fetchActorDetails = createAsyncThunk(
  "actors/fetchActorDetails",
  async (userData, thunkAPI) => {
    const response = await apiCall(
      `/api/actors/getDetailsById/${userData.id}`,
      thunkAPI.rejectWithValue
    );
    return response;
  }
);

const initialState = {
  actorDetails: [],
  actorDetailsLoading: "idle"
};
const actorsSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchActorDetails.pending]: (state, action) => {
      if (state.actorDetailsLoading === "idle") {
        state.actorDetailsLoading = "pending";
      }
    },
    [fetchActorDetails.fulfilled]: (state, action) => {
      if (state.actorDetailsLoading === "pending") {
        state.actorDetailsLoading = "idle";
        state.actorDetails[action.payload.id] = action.payload;
      }
    },
    [fetchActorDetails.rejected]: (state, action) => {
      if (state.actorDetailsLoading === "pending") {
        state.actorDetailsLoading = "idle";
      }
    }
  }
});

export default actorsSlice.reducer;
