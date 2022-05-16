import React, { useEffect } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { UserRoleField } from '../components/form-fields';
import { FieldErrors } from './errors';
import { navigateToHome, returnPage } from './navigation-service';
import { ADD_USER, GET_CLIENTS_LIST } from './user-query';

export const useUserList = (offset, limit) => {

  const [getClientList,resp] = useLazyQuery(GET_CLIENTS_LIST, {
    variables: {
      offset: offset, limit: limit
    },
  });

  useEffect(() => {
    const loadUserToken = () => {
      getClientList();
    };
    loadUserToken();
  }, []);

  const loading = resp.loading
  const error = resp.error?.message;
  const clientList = resp.data?.users.nodes;

  return { loading, error, clientList }

}

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