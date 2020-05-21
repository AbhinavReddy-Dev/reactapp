import React, { useEffect } from "react";
import "./Todo.css";
import { useDispatch } from "react-redux";
import { AddTodo } from "../AddTodo/AddTodo";
import { TodoList } from "../TodoList/TodoList";
import { TodosQuery } from "../../Queries/queries";
import { useQuery } from "@apollo/react-hooks";

export const Todo = () => {
  // const loginToken = useSelector((state) => state.login);
  // console.log("Login Token from Todo", loginToken);
  const dispatch = useDispatch();
  const todosData = useQuery(TodosQuery);

  useEffect(() => {
    // if (loginToken) {
    try {
      if (!todosData.loading && todosData.data) {
        var mongoData = todosData.data;
        console.log("todos data now available", mongoData.todos);
        dispatch({
          type: "TODO_LIST",
          payload: mongoData.todos,
        });
      }
      if (todosData.error) {
        console.log(todosData.error);
        localStorage.setItem("login", false);
        localStorage.setItem("token", null);
        dispatch({
          type: "LOGOUT",
          payload: {},
        });
      }
    } catch (e) {
      console.log(e);
      // localStorage.setItem("login", false);
      // localStorage.setItem("token", null);
      // dispatch({
      //   type: "LOGOUT",
      //   payload: {},
      // });
    }
    // }
  }, [todosData, dispatch]);

  return (
    <div className="todo">
      <h1>
        Todos{" "}
        <span role="img" aria-label="jsx-a11y/accessible-emoji">
          🔔
        </span>
      </h1>
      <AddTodo />
      {/* Below ternary is mandatory to render the data recieved from GraphQL else it will throw an error while loading the data */}
      {todosData.loading ? <p>Data Loading...</p> : <TodoList />}
    </div>
  );
};
