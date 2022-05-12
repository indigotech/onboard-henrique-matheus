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

export const ClientCard = ({ client, func }) => {
    return (
        <ClientContainer onPress={() => func()}>
            <Text>{client.name}</Text>
            <Text>{client.email}</Text>
        </ClientContainer>
    )
};
