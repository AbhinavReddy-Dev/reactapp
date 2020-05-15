import React, { useEffect } from "react";
import "./App.css";
import { NavBar } from "../src/components/NavBar/NavBar";
import { Todo } from "./components/Todo/Todo";
import { LoginSignup } from "./components/Login/LoginSignup";
import todoimg from "../src/components/assets/todoimg.png";
import { UserCheckQuery } from "../src/Queries/queries";
import { useSelector, useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/react-hooks";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  var isLoggedin = localStorage.getItem("login");

  // const loginToken = useSelector((state) => state.login);
  var loginToken;

  const dispatch = useDispatch();
  const [userData, { loading, data }] = useLazyQuery(UserCheckQuery);
  useEffect(
    () => {
      try {
        if (isLoggedin) {
          userData();
          console.log("usercheck happening", data);
          if (data) {
            var tokenData = data;
            loginToken = isLoggedin;
            console.log("Login Token from app", loginToken);
            console.log("data now available", loginToken, tokenData.userCheck);
            dispatch({
              type: "LOGIN_SIGNUP",
              payload: tokenData.userCheck,
            });
          }
        }
        // if (!userData.loading) {
        //   // console.log("data not loading");
        //   var tokenData = userData.data;
        //   loginToken = isLoggedin;

        //   console.log("data now available", tokenData.userCheck);
        //   dispatch({
        //     type: "LOGIN_SIGNUP",
        //     payload: tokenData.userCheck,
        //   });
        // }
      } catch (e) {
        console.log(e);
      }
    },
    [userData, dispatch, loading, data],
    isLoggedin,
    loginToken
  );
  // // console.log("login boolean", localStorage.getItem("login"));
  // if (isLoggedin) {
  //   loginToken = isLoggedin;
  //   // userData();
  //   // console.log(todosData);
  // }

  return (
    <div className="bghalf-one">
      <div className="container">
        <BrowserRouter>
          <NavBar />

          <Switch>
            {!loginToken && <Redirect from="/" to="/login" exact></Redirect>}
            {loginToken && (
              <Redirect from="/login" to="/todos" exact></Redirect>
            )}
            {!loginToken && (
              <Redirect from="/todos" to="/login" exact></Redirect>
            )}
            <Route path="/login" component={LoginSignup} />
            {loginToken && <Route path="/todos" component={Todo} />}
          </Switch>
        </BrowserRouter>
        <img src={todoimg} alt="todoimg"></img>
      </div>
    </div>
  );
}

export default App;
