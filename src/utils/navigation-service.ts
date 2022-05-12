import React from 'react';
import {Navigation} from 'react-native-navigation';

export const returnPage = componentId => {
  Navigation.pop(componentId);
}

export const navigateToHome = componentId => {
  Navigation.push(componentId, {
    component: {
      name: 'Home',
      options: {
        topBar: {
          title: {
            text: 'Home',
          },
        },
      },
    },
  });
};

export const navigateToAddUser = componentId => {
  Navigation.push(componentId, {
    component: {
      name: 'AddUser',
      options: {
        topBar: {
          title: {
            text: 'Adiciona usuário',
          },
        },
      },
    },
  });
};
