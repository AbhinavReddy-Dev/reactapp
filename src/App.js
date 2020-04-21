import React from "react";
import "./App.css";
import { NavBar } from "../src/components/NavBar/NavBar";
import { Todo } from "./components/Todo/Todo";
import { LoginSignup } from "./components/Login/LoginSignup";
import todoimg from "../src/components/assets/todoimg.png";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const loginToken = useSelector((state) => state.login);
  console.log("Login Token from app", loginToken);
  return (
    <div className="bghalf-one">
      <div className="container">
        <BrowserRouter>
          <NavBar />

          <Switch>
            {!loginToken.token && (
              <Redirect from="/" to="/login" exact></Redirect>
            )}
            {loginToken.token && (
              <Redirect from="/login" to="/todos" exact></Redirect>
            )}
            {!loginToken.token && (
              <Redirect from="/todos" to="/login" exact></Redirect>
            )}
            <Route path="/login" component={LoginSignup} />
            {loginToken.token && <Route path="/todos" component={Todo} />}
          </Switch>
        </BrowserRouter>
        <img src={todoimg} alt="todoimg"></img>
      </div>
    </div>
  );
}

export default App;
