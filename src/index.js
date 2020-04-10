import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import todos_Reducer from "./Actions_Reducers/todos_Reducer";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

// Apollo Client to connect to the server side GrapghQL queries and mutations
const client = new ApolloClient({ uri: "http://localhost:5000/graphql" });

// Initial State of the data tree for the application
export const InitialState = {
  todos: [],
  error: null,
  loading: undefined,
};

// Defining store for our application which uses InitialState to begin with

// For multiple reducers we use the below commented method
// const allReducers = combineReducers({ todos_Reducer, ... });
export const store = createStore(todos_Reducer);

ReactDOM.render(
  // ApolloProvider that lets the components interact with the client
  <ApolloProvider client={client}>
    {/* Redux Provider that lets all ccomponents access the store which gets updated when useDispatch runs code inside Reducer's switch case */}
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
