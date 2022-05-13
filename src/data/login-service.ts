import { gql, useMutation } from '@apollo/client';
import { saveUserToken } from '../utils/cache';
import { Navigation } from 'react-native-navigation';
import { navigateToHome } from './navigation-service';

export const useLogin = () => {

    // Define mutation
  const LOGIN = gql`
  mutation ($email: String!, $password: String!){
  login(data: {email: $email, password: $password}){
    token
    user{
    id
    name
    }
  }
  }
  `;

  const [mutateFunction,  { loading, error }] = useMutation(LOGIN);

  const login = (email, password, setLoginError, componentID) => {
    return (
      mutateFunction({
        variables: {email: email, password: password}
      })
      .then(resp => {
        if(!resp.data){
          setLoginError('Email ou senha inválidos');
          saveUserToken('');
        } else {
          setLoginError('');
          saveUserToken(resp.data.login.token);
          navigateToHome(componentID);
        }
      })
      .catch((e) => {
        setLoginError(e.graphQLErrors[0].message);
        saveUserToken('');
      })
    );
  };

  return { login, loading };
}