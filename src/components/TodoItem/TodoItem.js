import React, { useState } from "react";
import "./TodoItem.css";

export const TodoItem = ({ todo }) => {
  console.log(todo);
  const [todoClass, setTodoClass] = useState(Boolean);
  return (
    <li
      className={todoClass ? "todo-item-done" : null}
      onClick={() => setTodoClass(!todoClass)}
    >
      {todo.name}
    </li>
  );
};
