/**
 * @format
 */

import { LoginPage } from './src/modules/login';
import { HomePage } from './src/modules/home';
import { AddUserPage } from './src/modules/add-user';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {getUserToken} from './src/utils/cache';

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

const asyncAuthLink = setContext(async(_request, { headers }) => {
  const token = await getUserToken();

  return{
    headers: {
      ...headers,
      authorization: token,
    }
  }
});

const client = new ApolloClient({
  link: asyncAuthLink.concat(httpLink),
  cache: new InMemoryCache()
});

Navigation.registerComponent('Login', () => (props) =>
  <ApolloProvider client={client}>
    <LoginPage {...props} />
  </ApolloProvider>,
  () => LoginPage
);
Navigation.registerComponent('Home', () => (props) =>
  <ApolloProvider client={client}>
    <HomePage {...props} />
  </ApolloProvider>,
  () => HomePage
);
Navigation.registerComponent('AddUser', () => (props) =>
  <ApolloProvider client={client}>
    <AddUserPage {...props} />
  </ApolloProvider>,
  () => AddUserPage
);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  visible: false,
                }
              }
            }
          }
        ]
      }
    }
  });
});
