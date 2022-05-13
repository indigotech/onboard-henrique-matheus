import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { UserRoleField } from '../components/form-fields';
import { FieldErrors } from './errors';
import { navigateToHome, returnPage } from './navigation-service';

export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export interface UserInterface{
  email: string | undefined,
  name: string | undefined,
  phone: string | undefined,
  birthDate: string | undefined,
  role: UserRole | undefined
}

export interface UserErrorInterface{
  email: FieldErrors | undefined,
  name: FieldErrors | undefined,
  phone: FieldErrors | undefined,
  birthDate: FieldErrors | undefined,
  role: FieldErrors | undefined
}

export const emptyUser:UserInterface = {name: undefined, birthDate: undefined, email: undefined, role: undefined, phone: undefined};
export const emptyUserErrors:UserErrorInterface = {name: undefined, birthDate: undefined, email: undefined, role: undefined, phone: undefined};

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

  return { loading, error, clientList, getClientList }

}

const ADD_USER = gql`
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

export const useAddUser = () => {

  const [mutateFunction,  { loading, error }] = useMutation(ADD_USER);

    const addUser = (user, setError, componentID) => {
      return (
        mutateFunction({
          variables: {user: user},
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