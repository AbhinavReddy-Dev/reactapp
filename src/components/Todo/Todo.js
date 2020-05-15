import React, { useEffect } from "react";
import "./Todo.css";
import { useDispatch, useSelector } from "react-redux";
import { AddTodo } from "../AddTodo/AddTodo";
import { TodoList } from "../TodoList/TodoList";
import { TodosQuery } from "../../Queries/queries";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

export const Todo = () => {
  const loginToken = useSelector((state) => state.login);
  console.log("Login Token from Todo", loginToken);
  const dispatch = useDispatch();
  const todosData = useLazyQuery(TodosQuery);
  var isLoggedin = localStorage.getItem("login");

  // console.log(todosData);
  useEffect(() => {
    if (isLoggedin) {
      // console.log("data not loading");
      todosData();
      var mongoData = todosData.data;
      console.log("todos data now available", mongoData.todos);
      dispatch({
        type: "TODO_LIST",
        payload: mongoData.todos,
      });
    }
  }, [todosData, dispatch, isLoggedin]);

  return (
    <div className="todo">
      <h1>Your Todos</h1>
      <AddTodo />
      {/* Below ternary is mandatory to render the data recieved from GraphQL */}
      {todosData.loading ? <p>Data Loading...</p> : <TodoList />}
    </div>
  );
};
