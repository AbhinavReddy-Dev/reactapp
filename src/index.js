import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import todos_Reducer from "./Actions_Reducers/todos_Reducer";

export const InitialState = {
  todos: [],
  error: null,
  loading: undefined
};

console.log(InitialState);
// const allReducers = combineReducers({ todos });

export const store = createStore(todos_Reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
