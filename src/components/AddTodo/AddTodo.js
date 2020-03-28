import React from "react";
import "./AddTodo.css";
export const AddTodo = () => {
  return (
    <div>
      <form className="todo-add" onSubmit={() => {}}>
        <input className="input" placeholder="Enter the Frog name"></input>
        <select className="input">
          <option className="input-option">Adult Frog</option>
          <option className="input-option">Teenage Frog</option>
          <option className="input-option">Amateur Frog</option>
        </select>
        <button className="input-button">Add Frog</button>
      </form>
    </div>
  );
};
