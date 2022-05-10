import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaViewBase, SafeAreaView } from 'react-native';
import { ClientCard } from './components/client-card';
import { getUserToken } from './utils/cache';
import { MainContainer } from './utils/style';
import { useUserList } from './utils/user-service';
import { isTypeSystemDefinitionNode } from 'graphql';

export const HomePage = (props) => {

  const [token, setToken] = useState<any>();
  const { loading, error, clientList } = useUserList(token);

  useEffect(() => {
    const loadUserToken = async () => {
      const userToken = await getUserToken();
      setToken(userToken);
    } 
    loadUserToken();
  },[]);

  return (
    <SafeAreaView>
      <MainContainer>
      <Text>Lista de clientes</Text>
      {!loading &&
        <FlatList
          data={clientList}
          renderItem={({ item }) => (
            <ClientCard client={item}/>
          )}
        />
      }
      {!loading && <Text>{error}</Text>}
      {loading && <Text>Loading...</Text>}
    </MainContainer>
    </SafeAreaView>
  );
};
