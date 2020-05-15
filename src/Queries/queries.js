import { gql } from "apollo-boost";

// Defining GraphQL queries on client side

export const AddUserQuery = gql`
  mutation addUser(
    $name: String!
    $password: String!
    $email: String!
    $phone: String!
  ) {
    addUser(name: $name, password: $password, email: $email, phone: $phone) {
      id
      token
      sessionExpiration
    }
  }
`;
export const LoginQuery = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
      sessionExpiration
    }
  }
`;

export const UserCheckQuery = gql`
  query userCheck {
    userCheck {
      id
      token
      sessionExpiration
    }
  }
`;

export const LogoutQuery = gql`
  query logout {
    logout
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
  mutation($name: String!, $priority: Int) {
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
