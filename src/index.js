import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import todos from "../src/Reducers/todos";

const allReducers = combineReducers({ todos });

const store = createStore(todos);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
