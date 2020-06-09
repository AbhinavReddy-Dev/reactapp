import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import todos_Reducer from "./Actions_Reducers/todos_Reducer";
import loginsignup_Reducer from "./Actions_Reducers/loginsignup_Reducer";
import { ApolloProvider } from "react-apollo";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "apollo-boost";

export var loginToken;

// Initial State of the data tree for the application
export const InitialStateTodos = {
  todos: [],
  error: null,
  loading: undefined,
};
export const InitialStateLogin = {
  isLoggedin: Boolean,
  token:
    localStorage.getItem("token") !== ("null" || null)
      ? localStorage.getItem("token")
      : null,
  userId: null,
  sessionExpiration: null,
};
// Defining store for our application which uses InitialState to begin with

// For multiple reducers we use the below commented method
const allReducers = combineReducers({
  todos: todos_Reducer,
  login: loginsignup_Reducer,
});
export const store = createStore(allReducers);

const authMiddleware = new ApolloLink((operation, forward) => {
  // console.log("from middleware 1", loginToken);
  // loginToken = localStorage.getItem("token");
  // console.log("from middleware 1", loginToken);
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token")
        ? "Bearer " + localStorage.getItem("token")
        : "Bearer",
    },
    credentials: "include",
  });
  // console.log("from middleware 2");

  return forward(operation);
});

// This middleware checks for headers and set the localstorage token value which wll again be used to replace authorization header on every request to server
const afterwareLink = new ApolloLink((operation, forward) => {
  // console.log("afterwarelink start");
  return forward(operation).map((response) => {
    // console.log("response", response);
    const context = operation.getContext();
    // console.log("context", context);

    const {
      response: { headers },
    } = context;

    if (headers) {
      // console.log("Headers here", headers.get("x-token"));
      var newToken = headers.get("x-token");
      // console.log(localStorage.getItem("login"));
      // console.log(headers.get("x-token"), localStorage.getItem("token"));

      if (localStorage.getItem("login")) {
        localStorage.setItem("token", newToken);
        // console.log("afterwarelink", newToken);
      }
    }
    return response;
  });
});
//

// Apollo Client to connect to the server side GrapghQL queries and mutations
//below httplink is for production using same server for client and serverside
const httpLink = new HttpLink({ uri: "/graphql" });

//below httplink is for running the app locally
// const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" });

//
// For Netlify client deploy
// const httpLink = new HttpLink({
// uri: "https://anothertodoapp7.herokuapp.com/graphql",
// });

export const client = new ApolloClient({
  link: ApolloLink.from([authMiddleware, afterwareLink, httpLink]),
  cache: new InMemoryCache(),
});

// console.log(client.store.cache.data);

ReactDOM.render(
  // ApolloProvider that lets the components interact with the client
  <Provider store={store}>
    <ApolloProvider client={client}>
      {/* Redux Provider that lets all ccomponents access the store which gets updated when useDispatch runs code inside Reducer's switch case */}
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
