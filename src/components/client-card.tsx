import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

const ClientContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 5px;
  align-text: left;
  background: lightgrey;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
`;

interface UserCardInterface{
  client: {
    name: string,
    email: string
  },
  onClientTap: (() => void)
}

export const ClientCard = ({ client, onClientTap }: UserCardInterface) => {
  return (
    <ClientContainer onPress={() => onClientTap()}>
      <Text>{client.name}</Text>
      <Text>{client.email}</Text>
    </ClientContainer>
  )
};
