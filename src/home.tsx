import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getUserToken } from './components/cache';

export const HomePage = () => {

  const [token, setToken] = useState('');
  useEffect(() => {
    const loadUserToken = async () => {
      setToken(await getUserToken());
    } 
    loadUserToken();
  });

  return (
    <View style={styles.root}>
      <Text>Hello React Native Navigation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});