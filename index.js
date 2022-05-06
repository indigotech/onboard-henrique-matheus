/**
 * @format
 */

import Login from './src/login';
import {name as appName} from './src/app.json';
import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Login client={client}/>
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
