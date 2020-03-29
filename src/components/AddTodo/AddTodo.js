import React, { useState } from "react";
import "./AddTodo.css";

export const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const [priority, setpriority] = useState(undefined);
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="todo-add" onSubmit={() => handleSubmit}>
        <input
          className="input"
          placeholder="Enter the Todo"
          value={todo}
          onChange={e => setTodo(e.target.value)}
        ></input>
        <select value={priority} onChange={e => setpriority(e.target.value)}>
          <option>Task Priority</option>
          <option className="input-option" value="1">
            Priority- I
          </option>
          <option className="input-option" value="2">
            Priority- II
          </option>
          <option className="input-option" value="3">
            Priority- III
          </option>
        </select>
        <button className="input-button" type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};
