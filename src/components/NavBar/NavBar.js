import React from "react";
import { useDispatch } from "react-redux";
import "./NavBar.css";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const loginToken = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const logoutHandle = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
      payload: {},
    });
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
