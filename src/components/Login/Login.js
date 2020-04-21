import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import { LoginQuery } from "../../Queries/queries";
import { useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/react-hooks";

export const Login = () => {
  // dispatch to make calls to Reducers to update the state of the store
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Using useLazyQuery from apollo/react-hooks to get the data from mongodb through server side GraphQL only when we need it
  let [login, { called, loading, data }] = useLazyQuery(LoginQuery, {
    variables: {
      email: email,
      password: password,
    },
  });

  useEffect(() => {
    if (loading && called) {
      console.log("login token loading");
    }
    if (!loading && data) {
      console.log("login", data.login);
      dispatch({
        type: "LOGIN_SIGNUP",
        payload: data.login,
      });
    }
  }, [data, loading, called, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    login({
      variables: {
        email: email,
        password: password,
      },
    });
    setEmail("");
    setPassword("");
  };

  return (
    <form className="todo-add" onSubmit={handleLogin}>
      <input
        type="text"
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        className="input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button className="input-button" type="submit">
        Login
      </button>
    </form>
  );
};
