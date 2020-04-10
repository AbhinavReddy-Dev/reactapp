import { gql } from "apollo-boost";

// Defining GraphQL queries on client side

export const TodosQuery = gql`
  {
    todos {
      id
      name
      priority
      checked
    }
  }
`;

export const AddTodoQuery = gql`
  mutation($name: String!, $priority: Int!) {
    addTodo(name: $name, priority: $priority) {
      id
      name
      priority
      checked
    }
  }
`;

export const CheckTodoQuery = gql`
  mutation($id: ID!, $checked: Boolean!) {
    checkTodo(id: $id, checked: $checked) {
      id
      name
      priority
      checked
    }
  }
`;

export const DeleteTodoQuery = gql`
  mutation($id: ID!) {
    deleteTodo(id: $id) {
      id
      name
      priority
      checked
    }
  }
`;
