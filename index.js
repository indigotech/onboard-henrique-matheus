/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Login from './src/login';
import Home from './src/home';
import {name as appName} from './src/app.json';
// import { Navigation } from 'react-native-navigation';

// AppRegistry.registerComponent(appName, () => Login);
// AppRegistry.registerComponent('Home', () => Home);

// Navigation.events().registerAppLaunchedListener(async () => {
//     Navigation.setRoot({
//       root: {
//         stack: {
//           children: [
//             {
//               component: {
//                 name: appName
//               }
//             }
//           ]
//         }
//       }
//     });
//   });

import React from 'react';
import { Navigation } from 'react-native-navigation';
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

// Home screen declaration
const HomeScreen = (props) => {
  return (
    <View style={styles.root}>
      <Text>Hello React Native Navigation 👋</Text>
      <Button
        title='Push Settings Screen'
        color='#710ce3'
        onPress={() => Navigation.push(props.componentId, {
          component: {
            name: 'Settings',
            options: {
              topBar: {
                title: {
                  text: 'Settings'
                }
              }
            }
          }
        })}/>
    </View>
  );
};
HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
      color: 'white'
    },
    background: {
      color: '#4d089a'
    }
  }
};

// Settings screen declaration - this is the screen we'll be pushing into the stack
const SettingsScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Settings Screen</Text>
    </View>
  );
}

// Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Settings', () => SettingsScreen);
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Home', () => Home);


Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login'
            }
          }
        ]
      }
    }
  });
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});