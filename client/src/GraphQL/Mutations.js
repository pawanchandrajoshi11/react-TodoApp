import { gql } from "@apollo/client";

export const CREATE_TODO_MUTATION = gql`
  mutation createTodo(
    $todoContent: String!
  ) {
    createTodo(
      todoContent: $todoContent
    ) {
      id
    }
  }
`;

export const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo(
    $id: Int!
  ) {
    deleteTodo(
      id: $id
    ) {
      id
    }
  }
`;
