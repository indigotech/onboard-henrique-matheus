/**
 * @format
 */

import { LoginPage } from './src/login';
import { HomePage } from './src/home';
import {name as appName} from './src/app.json';
import React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

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

function withApollo(Component) {
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

Navigation.registerComponent('Login', () => withApollo(LoginPage));
Navigation.registerComponent('Home', () => withApollo(HomePage));

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
