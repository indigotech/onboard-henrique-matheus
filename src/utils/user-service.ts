import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { navigateToHome, returnPage } from './navigation-service';

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

export const useUserList = (offset, limit) => {

  const [getClientList,resp] = useLazyQuery(GET_CLIENTS_LIST, {
      variables: {
        offset: offset, limit: limit
      },
    });

  const loading = resp.loading
  const error = resp.error?.message;
  const clientList = resp.data?.users.nodes;

  console.log("ërror",JSON.stringify(error))

  return { loading, error, clientList, getClientList }

}

const ADD_USER = gql`
  mutation($email: String!, $name: String!, $birthDate: Date!,$phone: String!, $role: UserRole!){
    createUser(data: {email: $email, name: $name, birthDate: $birthDate, phone: $phone, role: $role}){
      name
      email
      birthDate
      id
      phone
      role
    },
  }
  `;

export const useAddUser = () => {

  const [mutateFunction,  { loading, error }] = useMutation(ADD_USER);

    const addUser = (email, name, birthDate, phone, role, setError, componentID) => {
      return (
        mutateFunction({
          variables: {email: email, name: name, birthDate: birthDate, phone: phone, role: role},
        })
        .then(resp => {
          if(!resp.data){
            setError('Há informações incorretas, confira os campos novamente');
          } else {
            setError('');
            returnPage(componentID);
          }
        })
        .catch((e) => {
          setError(e.graphQLErrors[0].message);
        })
      );
    };

  return { addUser, loading, error }

}