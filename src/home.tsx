import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaViewBase, SafeAreaView } from 'react-native';
import { ClientCard } from './components/client-card';
import { getUserToken } from './utils/cache';
import { MainContainer } from './utils/style';
import { useUserList } from './utils/user-service';
import { isTypeSystemDefinitionNode } from 'graphql';
import styled from 'styled-components/native';

export const HomePage = (props) => {

  const [token, setToken] = useState<any>();
  const { loading, error, clientList, getClientList } = useUserList(token);

  useEffect(() => {
    const loadUserToken = async () => {
      const userToken = await getUserToken();
      setToken(userToken);
      getClientList();
    } 
    loadUserToken();
  },[]);

  const clientsList = [
    {
      "name": "Yango Reis",
      "email": "Yango16@hotmail.com"
    },
    {
      "name": "Ladislau Pereira",
      "email": "Dalila1@live.com"
    },
    {
      "name": "Sr. Breno Oliveira",
      "email": "Slvia_Carvalho@gmail.com"
    },
    {
      "name": "Mércia Carvalho",
      "email": "Sulen.Batista60@yahoo.com"
    },
    {
      "name": "Mércia Braga Neto",
      "email": "Pedro_Braga@gmail.com"
    },
    {
      "name": "Dr. Bruna Moraes",
      "email": "Ricardo.Pereira@yahoo.com"
    },
    {
      "name": "Víctor Moraes",
      "email": "Pablo96@live.com"
    },
    {
      "name": "César Moreira",
      "email": "Alexandre_Albuquerque65@hotmail.com"
    },
    {
      "name": "Ígor Saraiva",
      "email": "Joo96@live.com"
    },
    {
      "name": "Sirineu Costa",
      "email": "Marcos.Moreira@hotmail.com"
    }
  ];

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
