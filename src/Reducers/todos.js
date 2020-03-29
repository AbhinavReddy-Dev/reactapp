export default (
  state = {
    todos: [
      { id: 1, name: "Test todo", priority: 1, date: Date.now, checked: false }
    ]
  },
  action
) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    default:
      return {
        ...state
      };
  }
};
