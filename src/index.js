import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import todos_Reducer from "./Actions_Reducers/todos_Reducer";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({ uri: "http://localhost:5000/graphql" });
// console.log(client);

export const InitialState = {
  todos: [],
  error: null,
  loading: undefined
};

console.log(InitialState);
// const allReducers = combineReducers({ todos });

export const store = createStore(todos_Reducer);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
