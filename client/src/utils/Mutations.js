import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_TODO = gql`
    mutation saveTodo($input: String!){
        saveTodo( input: $input){
            _id
            Todos{
              _id
              input
          }
        }
    }`;

export const UPDATE_TODO = gql`
    mutation updateTodo($input: String!, $_id: String!){
        updateTodo( input: $input, _id: $_id){
            _id
            Todos{
              _id
              input
          }
        }
    }`
export const REMOVE_TODO = gql`
    mutation removeTodo($_id: String!){
        removeTodo( _id: $_id){
            _id
        }
    }`
