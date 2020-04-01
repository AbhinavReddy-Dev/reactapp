import React from "react";
import "./Todo.css";
import { useDispatch } from "react-redux";
import { AddTodo } from "../AddTodo/AddTodo";
import { TodoList } from "../TodoList/TodoList";
import { TodosQuery } from "../../Queries/queries";
import { useQuery } from "@apollo/react-hooks";

export const Todo = () => {
  const dispatch = useDispatch();
  const data = useQuery(TodosQuery);
  var Cdata = data.data;
  console.log(data.loading);
  console.log(Cdata);
  if (data.loading) {
    console.log("data loading");
  } else {
    console.log("data available", Cdata.todos);
    dispatch({
      type: "TODO_LIST",
      payload: Cdata.todos
    });
  }
  return (
    <div className="todo">
      <h1>Another Todo App</h1>
      <AddTodo />
      {data.loading ? <p>Data Loading</p> : <TodoList />}
    </div>
  );
};
