import { gql, useMutation } from '@apollo/client';
import { saveUserToken } from './cache';

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

  const login = (email, password, setLoginError) => {
    return (
      mutateFunction({
        variables: {email: email, password: password}
      })
      .then(resp => {
        if(resp.data == null){
          setLoginError('Email ou senha inválidos');
          saveUserToken('');
        } else {
          setLoginError('');
          saveUserToken(resp.data.login.token);
        console.log(resp.data.login.token)
        }
      })
      .catch((e) => {
        setLoginError(e.message);
        saveUserToken('');
      })
    );
  };

  return { login };
}