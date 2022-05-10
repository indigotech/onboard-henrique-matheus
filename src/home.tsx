import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ClientCard } from './components/client-card';
import { getUserToken } from './utils/cache';
import styled from 'styled-components/native';
import { MainContainer } from './utils/style';

export const HomePage = () => {

  const [token, setToken] = useState('');

  useEffect(() => {
    const loadUserToken = async () => {
      setToken(await getUserToken());
    } 
    loadUserToken();
  });

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
    <MainContainer>
      <Text>Lista de clientes</Text>
      {clientsList.map((client) => (
        <ClientCard key={client.email} client={client}/>
      ))}
    </MainContainer>
  );
};
