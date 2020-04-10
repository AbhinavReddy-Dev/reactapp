import React, { useState } from "react";
import "./AddTodo.css";
import { useDispatch } from "react-redux";
import { AddTodoQuery } from "../../Queries/queries";
import { useMutation } from "@apollo/react-hooks";

export const AddTodo = () => {
  // component level initial values of name and priority
  const [name, setName] = useState("");
  const [priority, setpriority] = useState(undefined);
  const dispatch = useDispatch();

  // useMutation to make mutation requests to the GraphQL on server side
  const [addTodo] = useMutation(AddTodoQuery);

  // Add Todo client side logic
  const handleSubmit = (e) => {
    e.preventDefault();

    // addTodo Mutation with an obect containing variables of Todo add
    addTodo({
      variables: {
        name,
        priority: +priority,
      },
    });
    console.log(name, priority);
    const newTodo = {
      name,
      priority: +priority,
      checked: false,
      date: Date.now,
    };
    console.log("new todo", newTodo);

    // dispatching the type and payload to Reducer to update the state of the store with new data
    dispatch({
      type: "TODO_ADD",
      payload: newTodo,
    });

    //resetting the values inside the form to " "
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
          onChange={(e) => setName(e.target.value)}
        ></input>
        <select value={priority} onChange={(e) => setpriority(e.target.value)}>
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
