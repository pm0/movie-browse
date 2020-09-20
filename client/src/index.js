import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/rootReducer";

const store = configureStore({
  reducer: rootReducer
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  rootElement
);
