import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  movies: []
};

const movieReducer = createReducer(initialState, {});

export default movieReducer;
