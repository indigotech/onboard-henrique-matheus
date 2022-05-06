import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

const Home = () => {
    return (
      <View style={styles.root}>
        <Text>Hello React Native Navigation</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});

export default Home;