import React, { useState } from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import "./TodoList.css";
import { useSelector } from "react-redux";
import { store } from "../../index";

export const TodoList = () => {
  const initialTodos = useSelector(state => state.todos);
  const [todos, setTodos] = useState(initialTodos);
  const [todosDone, settodosDone] = useState(
    todos.filter(todo => todo.checked === true)
  );
  const [todosCurrent, settodosCurrent] = useState(
    todos.filter(todo => todo.checked !== true)
  );
  store.subscribe(() => {
    const todos = store.getState().todos;
    console.log("from todolist subscription ", todos);
    setTodos(todos);
    settodosDone(todos.filter(todo => todo.checked === true));
    settodosCurrent(todos.filter(todo => todo.checked !== true));
  });
  return (
    <div className="todo-list">
      <div>
        <h3>Finished Todos</h3>

        {todosDone.length > 0 ? (
          <ul>
            {todosDone.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
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
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        ) : (
          <p>you don't have any current todos</p>
        )}
      </div>
    </div>
  );
};

// export default graphql(TodosQuery)(TodoList);
