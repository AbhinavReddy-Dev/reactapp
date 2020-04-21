import React, { useEffect } from "react";
import "./Todo.css";
import { useDispatch, useSelector } from "react-redux";
import { AddTodo } from "../AddTodo/AddTodo";
import { TodoList } from "../TodoList/TodoList";
import { TodosQuery } from "../../Queries/queries";
import { useQuery } from "@apollo/react-hooks";

export const Todo = () => {
  const loginToken = useSelector((state) => state.login);
  console.log("Login Token from Todo", loginToken);
  const dispatch = useDispatch();
  const todosData = useQuery(TodosQuery);
  // console.log(todosData);
  useEffect(() => {
    if (!todosData.loading) {
      // console.log("data not loading");
      var mongoData = todosData.data;
      console.log("data now available", mongoData.todos);
      dispatch({
        type: "TODO_LIST",
        payload: mongoData.todos,
      });
    }
  }, [todosData, dispatch]);

  return (
    <div className="todo">
      <h1>Your Todos</h1>
      <AddTodo />
      {/* Below ternary is mandatory to render the data recieved from GraphQL */}
      {todosData.loading ? <p>Data Loading...</p> : <TodoList />}
    </div>
  );
};
