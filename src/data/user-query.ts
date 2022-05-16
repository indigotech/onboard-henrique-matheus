import { gql } from "@apollo/client";

export const GET_CLIENTS_LIST = gql`
query($offset: Int!, $limit: Int!){
  users(pageInfo: {offset: $offset, limit: $limit}){
    nodes{
      name
      email
    }
  },
}
`;

export const ADD_USER = gql`
  mutation($user: UserInputType!){
    createUser(data: $user){
      name
      email
      birthDate
      id
      phone
      role
    },
  }
`;