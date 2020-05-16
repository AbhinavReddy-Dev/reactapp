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
  const todosData = useQuery(TodosQuery);
  // console.log(todosData);
  // useEffect(() => {
  //   // try {
  //   if (todosData.data) {
  //     // console.log("data not loading");
  //     var mongoData = todosData.data;
  //     console.log("todos data now available", mongoData.todos);
  //     dispatch({
  //       type: "TODO_LIST",
  //       payload: mongoData.todos,
  //     });
  //   }
  //   if (todosData.error) {
  //     console.log(todosData.error);
  //   }
  //   // } catch (e) {
  //   //   console.log(e.graphQLErrors);
  //   // }
  // }, [todosData, dispatch]);

  var isLoggedin = localStorage.getItem("login");

  // console.log(todosData);
  useEffect(() => {
    try {
      if (todosData.data) {
        // console.log("data not loading");
        // todosData;
        var mongoData = todosData.data;
        console.log("todos data now available", mongoData.todos);
        dispatch({
          type: "TODO_LIST",
          payload: mongoData.todos,
        });
      }
      if (todosData.error) {
        console.log(todosData.error);
      }
    } catch (e) {
      console.log(e);
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
