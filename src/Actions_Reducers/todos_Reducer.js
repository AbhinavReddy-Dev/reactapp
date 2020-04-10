import { InitialState } from "../index";

export default (state = InitialState, action) => {
  // Switch cases for each type of dispatch with payload in action object to update the state of the store
  switch (action.type) {
    case "TODO_LIST":
      return {
        ...state,
        todos: action.payload,
      };
    case "TODO_ADD":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "TODO_DONE":
      const tempTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      console.log("temp", tempTodos);
      const todoCheck = {
        id: action.payload.id,
        name: action.payload.name,
        priority: action.payload.priority,
        checked: !action.payload.checked,
      };
      console.log("todocheck", todoCheck);
      tempTodos.push(todoCheck);
      return {
        ...state,
        todos: tempTodos,
      };
    case "TODO_DELETE":
      console.log("todo del");
      console.log(action.payload);
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.name !== action.payload),
      };
    case "ERROR_TODO":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
