import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { getUserToken } from './cache';

const GET_CLIENTS_LIST_QUERY = gql`
  query($offset: Int!, $limit: Int!){
    users(pageInfo: {offset: $offset, limit: $limit}){
      nodes{
        name
        email
        id
      }
    },
  }
`;

export const useUserList = (token, offset, limit) => {

  const [getClientList,resp] = useLazyQuery(GET_CLIENTS_LIST_QUERY, {
      variables: {
        offset: offset, limit: limit
      },
      context: {
        headers: {
          "Authorization": token
        } 
      },
    });

  const loading = resp.loading
  const error = resp.error?.message;
  const clientList = resp.data?.users.nodes;


  return { loading, error, clientList, getClientList }

}

const GET_USER_BY_ID_QUERY = gql`
  query GetUserByIdQuery($id: ID!){
    user(id: $id){
      name
      phone
      birthDate
      email
      role
    }
  }
`;

export const useUserInfo = (token, id) => {

  const [getUserInfo ,resp] = useLazyQuery(GET_USER_BY_ID_QUERY, {
      variables: {
        id: id
      },
      context: {
        headers: {
          "Authorization": token
        } 
      },
    });

  const loading = resp.loading
  const error = resp.error?.message;
  const user = resp.data?.user;


  return { loading, error, user, getUserInfo }

}