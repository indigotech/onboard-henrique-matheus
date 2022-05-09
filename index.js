/**
 * @format
 */

import Login from './src/login';
import Home from './src/home';
import {name as appName} from './src/app.json';
import React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache()
});
  
class RenderComponent extends React.Component {
  render() {
    return (
      <View>
        {this.props.render()}
      </View>
    );
  }
}

function encapsulateComponent(Component) {
  const myRender = () => (
    <Component {...this.props} client={client} />
  );
  return class extends React.Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <RenderComponent render={() => (
            <Component {...this.props} client={client} />
          )}/>
        </ApolloProvider>
      );
    }
  }
}

Navigation.registerComponent('Login', () => encapsulateComponent(Login));
Navigation.registerComponent('Home', () => encapsulateComponent(Home));

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
                  visible: false
                }
              }
            }
          }
        ]
      }
    }
  });
});