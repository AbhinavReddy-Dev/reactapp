import { InitialStateTodos } from "../index";

export default (state = InitialStateTodos, action) => {
  // Switch cases for each type of dispatch with payload in action object to update the state of the store
  // console.log("from t red initialstate", InitialStateTodos);
  switch (action.type) {
    case "TODO_LIST":
      console.log("from reducer", action.payload);
      return {
        ...state,
        todos: action.payload,
      };
    case "TODO_ADD":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "TODO_CHECKTOGGLE":
      const tempTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      const todoCheck = { ...action.payload, checked: !action.payload.checked };
      console.log("reducer todocheck", todoCheck.checked);
      tempTodos.push(todoCheck);
      // console.log("reducer toggle check", action.payload.checked);
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
