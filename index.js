/**
 * @format
 */

import { LoginPage } from './src/login';
import { HomePage } from './src/home';
import { AddUserPage } from './src/add-user';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
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
