import React, { useState } from "react";
import "./AddTodo.css";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export const AddTodo = () => {
  const [name, setName] = useState("");
  const [priority, setpriority] = useState(undefined);
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    console.log(name, priority);
    const newTodo = {
      id: uuidv4(),
      name,
      priority: +priority,
      checked: false,
      date: Date.now
    };
    console.log(newTodo);
    dispatch({
      type: "TODO_ADD",
      payload: newTodo
    });
    setName("");
    setpriority("");
  };

  return (
    <div>
      <form className="todo-add" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Enter the Todo"
          value={name}
          onChange={e => setName(e.target.value)}
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
