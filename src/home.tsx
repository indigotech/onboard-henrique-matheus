import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { getUserToken } from './components/cache';

const Home = () => {

  const [token, setToken] = useState('');
  useEffect(() => {
    const getInfo = async () => {
      setToken(await getUserToken());
    } 
    getInfo();
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

export default Home;