import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { client } from "../../index";
import { logoutSetToken, store } from "../../index";
import { useLazyQuery } from "@apollo/react-hooks";
import { LogoutQuery } from "../../Queries/queries";
import { Router, Redirect } from "react-router-dom";
// import { loginToken } from "../../index";

export const NavBar = () => {
  // var loginToken = {};
  // console.log(localStorage.getItem("login"));
  const loginToken = useSelector((store) => store.login.token);
  console.log(loginToken);
  useSelector((store) => console.log("from navbar store", store));
  const dispatch = useDispatch();
  let [logout, { called, loading, data }] = useLazyQuery(LogoutQuery);
  // const [loginState, setLoginState] = useState(localStorage.getItem("login"));
  // store.subscribe(() => {
  //   const loginState = store.getState().login.isLoggedin;
  //   console.log("from todolist subscription ", loginState);
  //   setLoginState(loginState);
  // });

  useEffect(() => {
    if (loading && called) {
      console.log("logging you out");
    }
    if (!loading && data) {
      console.log("logout, yo!");
      logoutSetToken();
      dispatch({
        type: "LOGOUT",
        payload: {},
      });
    }
  }, [data, loading, called, dispatch]);

  const logoutHandle = (e) => {
    e.preventDefault();
    client.resetStore();
    try {
      logout();
      // setLoginState(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nav-bar">
      <h1 className="nav-bar-title">
        Another Todo App{" "}
        <span role="img" aria-label="jsx-a11y/aria-proptypes">
          🤦🏻‍♂️
        </span>
      </h1>
      {loginToken && (
        <button className="nav-bar-button" onClick={logoutHandle}>
          Logout
        </button>
      )}
    </div>
  );
};
