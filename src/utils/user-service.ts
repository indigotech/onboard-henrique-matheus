import { gql, useQuery } from '@apollo/client';

const GET_CLIENTS_LIST = gql`
  query{
      users(pageInfo: {offset: 0, limit: 20}){
      nodes{
          id
          name
          email
      }
    }
  }
`;

export const useUserList = (token) => {

  const resp = useQuery(GET_CLIENTS_LIST, {
    context: {
      headers: {
        "Authorization": token
      } 
    },
    pollInterval: 500,
  });

  const loading = resp.loading
  const error = resp.error?.message;
  const clientList = resp.data?.users.nodes;


  return { loading, error, clientList }

}