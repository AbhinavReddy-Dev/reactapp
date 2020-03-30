import React, { useState } from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import "./TodoList.css";
import { useSelector } from "react-redux";
import { todo_done } from "../../Actions_Reducers/todos_Actions";

export const TodoList = () => {
  const todos = useSelector(state => state.todos);
  console.log(todos);
  const todosDone = todos.filter(todo => todo.checked === true);
  const todosCurrent = todos.filter(todo => todo.checked !== true);

  return (
    <div className="todo-list">
      <div>
        <h3>Finished Todos</h3>

        {todosDone.length > 0 ? (
          <ul>
            {todosDone.map(todo => (
              <TodoItem key={todo.date} todo={todo} />
            ))}
          </ul>
        ) : (
          <p>you don't have any finished todos</p>
        )}
      </div>
      <div>
        <h3>Current Todos</h3>
        {todosCurrent.length > 0 ? (
          <ul>
            {todosCurrent.map(todo => (
              <TodoItem key={todo.date} todo={todo} />
            ))}
          </ul>
        ) : (
          <p>you don't have any current todos</p>
        )}
      </div>
    </div>
  );
};
