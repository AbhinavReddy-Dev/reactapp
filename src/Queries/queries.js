import { gql } from "apollo-boost";

// Defining GraphQL queries on client side

export const AddUserQuery = gql`
  mutation(
    $name: String!
    $password: String!
    $email: String!
    $phone: Int!
    $verified: Boolean!
  ) {
    addUser(
      name: $name
      password: $password
      email: $email
      phone: $phone
      verified: $verified
    ) {
      id
      token
      tokenExpiration
    }
  }
`;
export const LoginQuery = gql`
  query($email: String!, $password: String!) {
    login(password: $password, email: $email) {
      id
      token
      tokenExpiration
    }
  }
`;

export const TodosQuery = gql`
  {
    todos {
      id
      name
      priority
      checked
      owner_id
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
      owner_id
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
      owner_id
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
      owner_id
    }
  }
`;
