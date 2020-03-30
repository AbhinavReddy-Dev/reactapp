import React, { useState } from "react";
import "./TodoItem.css";
import { todo_done } from "../../Actions_Reducers/todos_Actions";
import { useDispatch } from "react-redux";

export const TodoItem = ({ todo }) => {
  console.log(todo);
  const [Todo, setTodo] = useState(todo);
  let textColor;
  if (todo.priority === 1) {
    textColor = "red 4px solid";
  } else if (todo.priority === 2) {
    textColor = "green 4px solid";
  } else {
    textColor = "blue 4px solid";
  }
  // console.log(textColor);
  const dispatch = useDispatch();
  const onDone = e => {
    console.log("done todo");

    e.preventDefault();
    // setTodoClass(!todoClass);
    dispatch({
      type: "TODO_DONE",
      payload: todo
    });
  };
  const onDelete = e => {
    e.preventDefault();
    console.log("delete todo");
    dispatch({
      type: "TODO_DELETE",
      payload: todo.name
    });
    setTodo(null);
  };
  return (
    <li
      className={todo.checked ? "todo-item-done" : null}
      style={{ borderLeft: textColor }}
      onClick={onDone}
    >
      {todo.name}{" "}
      <span onClick={onDelete}>
        <button>X</button>
      </span>
    </li>
  );
};
