import React, { useState } from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import "./TodoList.css";
// import { useSelector } from "react-redux";
import { store } from "../../index";

export const TodoList = () => {
  // useSelector from react-redux to access particular data object in the store state for the initial render of component data when there is only one reducer
  // const initialTodos = useSelector((state) => state.todos);
  // const initialTodos = store.getState().todos.todos;
  // console.log(todos);
  // useState to update the todos within the component
  const [todoslist, setTodos] = useState([]);

  // Separating checked todos and unchecked todos
  const [todosDone, settodosDone] = useState(
    todoslist.filter((todo) => todo.checked === true)
  );
  const [todosCurrent, settodosCurrent] = useState(
    todoslist.filter((todo) => todo.checked !== true)
  );

  // Subscribing to the store to stay updated with the state after initial state render
  store.subscribe(() => {
    const todoslist = store.getState().todos.todos;
    console.log("from todolist subscription ", todoslist);
    // setTodos, settodosDone, settodosCurrent staying updated after every store state update
    setTodos(todoslist);
    settodosDone(todoslist.filter((todo) => todo.checked === true));
    settodosCurrent(todoslist.filter((todo) => todo.checked !== true));
  });
  return (
    <div className="todo-list">
      <div>
        <h3>Finished Todos</h3>

        {todosDone.length > 0 ? (
          <ul>
            {todosDone.map((todo) => (
              <TodoItem key={todo.id + "1"} todo={todo} />
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
            {todosCurrent.map((todo) => (
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
