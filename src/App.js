import React, { useEffect } from "react";
import "./App.css";
import { NavBar } from "../src/components/NavBar/NavBar";
import { Todo } from "./components/Todo/Todo";
import { LoginSignup } from "./components/Login/LoginSignup";
import todoimg from "../src/components/assets/todoimg.png";
import { UserCheckQuery } from "../src/Queries/queries";
import { useSelector, useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/react-hooks";
// import { loginToken } from "../src/index";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  var isLoggedin = localStorage.getItem("login");

  const loginToken = useSelector((store) => store.login.token);
  // var loginToken = localStorage.getItem("token");

  // const dispatch = useDispatch();
  // const [userData, { loading, data }] = useLazyQuery(UserCheckQuery);
  // useEffect(
  //   () => {
  //     try {
  //       userData();

  //       if (isLoggedin && !loginToken.token) {
  //         console.log("usercheck happening", data);
  //         if (data) {
  //           var tokenData = data;
  //           // loginToken = isLoggedin;
  //           console.log("Login Token from app", tokenData);
  //           console.log(
  //             "data now available",
  //             // loginToken.token,
  //             tokenData.userCheck
  //           );
  //           dispatch({
  //             type: "LOGIN_SIGNUP",
  //             payload: tokenData.userCheck,
  //           });
  //         }
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   },
  //   [userData, dispatch, loading, data],
  //   loginToken,
  //   isLoggedin
  // );
  console.log("on refresh from app", loginToken);

  return (
    <div className="bghalf-one">
      <div className="container">
        <BrowserRouter>
          <NavBar />
          <Switch>
            {!loginToken && <Redirect from="/" to="/login" exact></Redirect>}
            {console.log(loginToken)}
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
