import { gql } from '@apollo/client';
export const QUERY_ME = gql`
  query {
    me {
      _id
      username
      email
      Todos{
          _id
          input
      }
    }
  }
`;