/**
 * @format
 */

import { LoginPage } from './src/login';
import { HomePage } from './src/home';
import { DetailsPage } from './src/details';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { addApollo } from './src/components/apollo-service';

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
