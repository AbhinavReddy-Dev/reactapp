import React, { useState } from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import "./TodoList.css";
import { useSelector } from "react-redux";

export const TodoList = () => {
  const todos = useSelector(state => state.todos);
  console.log(todos);
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
