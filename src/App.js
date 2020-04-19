import React from "react";
import "./App.css";
import { Todo } from "./components/Todo/Todo";
import { LoginSignup } from "./components/Login/LoginSignup";
import todoimg from "../src/components/assets/todoimg.png";
import { useSelector } from "react-redux";

function App() {
  const loginToken = useSelector((state) => state.loginToken);

  return (
    <div className="bghalf-one">
      <div className="container">
        {loginToken ? <Todo /> : <LoginSignup />}
        <img src={todoimg} alt="todoimg"></img>
      </div>
    </div>
  );
}

export default App;
