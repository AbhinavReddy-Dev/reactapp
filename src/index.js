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
  console.log("from middleware 1", loginToken);
  loginToken = localStorage.getItem("token");
  console.log("from middleware 1", loginToken);
  operation.setContext({
    headers: {
      authorization: loginToken ? "Bearer " + loginToken : "Bearer",
    },
    credentials: "include",
  });
  console.log("from middleware 2");

  return forward(operation);
});

//
const afterwareLink = new ApolloLink((operation, forward) => {
  console.log("afterwarelink start");
  return forward(operation).map((response) => {
    console.log("response", response);
    const context = operation.getContext();
    console.log("context", context);

    const {
      response: { headers },
    } = context;

    if (headers) {
      const newToken = headers.get("x-token");
      if (newToken && localStorage.getItem("login") === true) {
        localStorage.setItem("token", newToken);
        console.log("afterwarelink", newToken);
      }
    }
    return response;
  });
});
//

// Apollo Client to connect to the server side GrapghQL queries and mutations
const httpLink = new HttpLink({
  uri: "https://git.heroku.com/anothertodoapp7.git",
});
export const client = new ApolloClient({
  link: ApolloLink.from([authMiddleware, afterwareLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  // ApolloProvider that lets the components interact with the client
  <Provider store={store}>
    <ApolloProvider client={client}>
      {/* Redux Provider that lets all ccomponents access the store which gets updated when useDispatch runs code inside Reducer's switch case */}
      <App loginToken={loginToken} />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
