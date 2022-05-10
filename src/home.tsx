import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ClientCard } from './components/client-card';
import { getUserToken } from './utils/cache';
import { MainContainer } from './utils/style';
import { useClient } from './utils/clients-service';

export const HomePage = (props) => {

  const [token, setToken] = useState<any>();
  const { loading, error, clientList } = useClient(token);

  useEffect(() => {
    const loadUserToken = async () => {
      let userToken = await getUserToken();
      setToken(userToken);
      console.log('opa');
    } 
    loadUserToken();
  },[]);

  return (
    <MainContainer>
      <Text>Lista de clientes</Text>
      {!loading &&
        <FlatList
          data={clientList}
          renderItem={({ item }) => (
            <ClientCard key={item.id} client={item}/>
          )}
        />
      }
      {!loading && <Text>{error}</Text>}
      {loading && <Text>Loading...</Text>}
    </MainContainer>
  );
};
