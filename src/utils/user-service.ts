import { gql, useLazyQuery } from '@apollo/client';

const GET_CLIENTS_LIST = gql`
  query($offset: Int!, $limit: Int!){
    users(pageInfo: {offset: $offset, limit: $limit}){
      nodes{
        name
        email
      }
    },
  }
`;

export const useUserList = (token, offset, limit) => {

  const [getClientList,resp] = useLazyQuery(GET_CLIENTS_LIST, {
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