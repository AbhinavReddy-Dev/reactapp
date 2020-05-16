import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { client } from "../../index";
import { useLazyQuery } from "@apollo/react-hooks";
import { LogoutQuery } from "../../Queries/queries";

export const NavBar = () => {
  const [loginToken, setLoginToken] = useState(
    useSelector((store) => store.login.token)
  );
  console.log(loginToken);
  // useSelector((store) => console.log("from navbar store", store));
  const dispatch = useDispatch();
  let [logout, { called, loading, data }] = useLazyQuery(LogoutQuery);

  useEffect(() => {
    if (loading && called) {
      console.log("logging you out");
    }
    if (!loading && data) {
      console.log("logout, yo!");
      setLoginToken(null);
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
      {useSelector((store) => store.login.token) && (
        <button className="nav-bar-button" onClick={logoutHandle}>
          Logout
        </button>
      )}
    </div>
  );
};
