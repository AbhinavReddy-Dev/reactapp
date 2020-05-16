import React from "react";
import "./App.css";
import { NavBar } from "../src/components/NavBar/NavBar";
import { Todo } from "./components/Todo/Todo";
import { LoginSignup } from "./components/Login/LoginSignup";
import todoimg from "../src/components/assets/todoimg.png";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  // const loginToken = useSelector((store) => store.login.token);

  // console.log("on refresh from app", loginToken);

  return (
    <div className="bghalf-one">
      <div className="container">
        <BrowserRouter>
          <NavBar />
          <Switch>
            {!useSelector((store) => store.login.token) && (
              <Redirect from="/" to="/login" exact></Redirect>
            )}
            {useSelector((store) => store.login.token) && (
              <Redirect from="/" to="/todos" exact></Redirect>
            )}
            {useSelector((store) => store.login.token) && (
              <Redirect from="/login" to="/todos" exact></Redirect>
            )}
            {!useSelector((store) => store.login.token) && (
              <Redirect from="/todos" to="/login" exact></Redirect>
            )}
            {!useSelector((store) => store.login.token) && (
              <Route path="/login" component={LoginSignup} />
            )}
            {useSelector((store) => store.login.token) && (
              <Route path="/todos" component={Todo} />
            )}
          </Switch>
        </BrowserRouter>
        <img src={todoimg} alt="todoimg"></img>
      </div>
    </div>
  );
}

export default App;
