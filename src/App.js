import React from "react";
import "./App.css";
import { Todo } from "./components/Todo/Todo";
import todoimg from "../src/components/assets/todoimg.png";

function App() {
  return (
    <div className="bghalf-one">
      <div className="container">
        <Todo />
        <img src={todoimg} alt="todoimg"></img>
      </div>
    </div>
  );
}

export default App;
