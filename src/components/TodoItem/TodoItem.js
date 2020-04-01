import React, { useState } from "react";
import "./TodoItem.css";
import { useDispatch } from "react-redux";
import {
  CheckTodoQuery,
  DeleteTodoQuery,
  TodosQuery
} from "../../Queries/queries";
import { useMutation } from "@apollo/react-hooks";

export const TodoItem = ({ todo }) => {
  // console.log(todo);
  // const [Todo, setTodo] = useState(todo);
  const [checkTodo] = useMutation(CheckTodoQuery);
  const [deleteTodo] = useMutation(DeleteTodoQuery);
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
  const onCheck = e => {
    console.log("done todo");

    e.preventDefault();
    checkTodo({
      variables: {
        id: todo.id,
        checked: !todo.checked
      }
    });
    // setTodoClass(!todoClass);
    dispatch({
      type: "TODO_DONE",
      payload: todo
    });
  };
  const onDelete = e => {
    e.preventDefault();
    deleteTodo({
      variables: {
        id: todo.id
      },
      refetchQueries: [{ query: TodosQuery }]
    });
    console.log("delete todo");
    dispatch({
      type: "TODO_DELETE",
      payload: todo.name
    });
  };
  return (
    <div className="todo-item">
      <li
        className={todo.checked ? "todo-item-done" : null}
        style={{ borderLeft: textColor }}
        onClick={onCheck}
      >
        {todo.name}{" "}
      </li>
      <button onClick={onDelete}>X</button>
    </div>
  );
};
