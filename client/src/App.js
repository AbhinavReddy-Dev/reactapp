import React, { useState } from "react";
import "./App.css";
import { NavBar } from "../src/components/NavBar/NavBar";
import { Todo } from "./components/Todo/Todo";
import { LoginSignup } from "./components/Login/LoginSignup";
import todoimg from "../src/components/assets/todoimg.png";
import { useSelector } from "react-redux";
import {
  HashRouter,
  // BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { store } from "../src/index";

function App() {
  const [loginToken, setLoginToken] = useState(
    useSelector((store) => store.login.token)
  );
  store.subscribe(() => {
    const token = store.getState().login.token;
    // console.log("login state at app.js", store.getState().login);
    // setTodos, settodosDone, settodosCurrent staying updated after every store state update
    setLoginToken(token);
  });

  // console.log("on refresh from app", loginToken);

  return (
    <div>
      <div className="bghalf-one">
        {" "}
        <div />
        <div className="container">
          <HashRouter>
            <NavBar />
            <Switch>
              {!loginToken && <Redirect from="/" to="/login" exact></Redirect>}
              {loginToken && <Redirect from="/" to="/todos" exact></Redirect>}
              {loginToken && (
                <Redirect from="/login" to="/todos" exact></Redirect>
              )}
              {!loginToken && (
                <Redirect from="/todos" to="/login" exact></Redirect>
              )}
              {!loginToken && <Route path="/login" component={LoginSignup} />}
              {loginToken && <Route path="/todos" component={Todo} />}
            </Switch>
          </HashRouter>
          <img src={todoimg} alt="todoimg"></img>
        </div>
      </div>
    </div>
  );
}

export default App;
