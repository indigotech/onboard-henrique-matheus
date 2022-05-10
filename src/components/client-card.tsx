import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const ClientContainer = styled.View`
    padding: 10px;
    border-radius: 5px;
    align-text: left;
    background: lightgrey;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
`;

export const ClientCard = ({ client }) => {
    return(
        <ClientContainer>
            <Text>{client.name}</Text>
            <Text>{client.email}</Text>
        </ClientContainer>
    )
};
