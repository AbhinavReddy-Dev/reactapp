import React from "react";
import "./Todo.css";
import { useDispatch } from "react-redux";
import { AddTodo } from "../AddTodo/AddTodo";
import { TodoList } from "../TodoList/TodoList";
import { TodosQuery } from "../../Queries/queries";
import { useQuery } from "@apollo/react-hooks";

export const Todo = () => {
  // dispatch to make calls to Reducers to update the state of the store
  const dispatch = useDispatch();

  // Using useQuery from apollo/react-hooks to get the data from mongodb through server side GraphQL
  const todosData = useQuery(TodosQuery);
  console.log(todosData);
  // todos data object from mongodb
  var mongoData = todosData.data;
  console.log(mongoData);

  if (todosData.loading) {
    console.log("data loading");
  } else {
    console.log("data available", mongoData.todos);
    // Using dispatch to update todos from reducer with type and payload
    dispatch({
      type: "TODO_LIST",
      payload: mongoData.todos,
    });
  }
  return (
    <div className="todo">
      <h1>Another Todo App</h1>
      <AddTodo />
      {/* Below ternary is mandatory to render the data recieved from GraphQL */}
      {todosData.loading ? <p>Data Loading</p> : <TodoList />}
    </div>
  );
};
