import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { client } from "../../index";
import { logoutSetToken } from "../../index";
import { useLazyQuery } from "@apollo/react-hooks";
import { LogoutQuery } from "../../Queries/queries";

export const NavBar = () => {
  const loginToken = useSelector((state) => state.login);
  const dispatch = useDispatch();
  let [logout, { called, loading, data }] = useLazyQuery(LogoutQuery);

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
      {loginToken.token && (
        <button className="nav-bar-button" onClick={logoutHandle}>
          Logout
        </button>
      )}
    </div>
  );
};
