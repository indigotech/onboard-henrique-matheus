import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { View } from 'react-native'

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

export function addApollo(Component) {
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
};