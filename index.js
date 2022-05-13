/**
 * @format
 */

import { LoginPage } from './src/login';
import { HomePage } from './src/home';
import { DetailsPage } from './src/details';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { View } from 'react-native';

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

function addApollo(Component) {
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

Navigation.registerComponent('Login', () => addApollo(LoginPage));
Navigation.registerComponent('Home', () => addApollo(HomePage));
Navigation.registerComponent('UserDetails', () => addApollo(DetailsPage));

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
