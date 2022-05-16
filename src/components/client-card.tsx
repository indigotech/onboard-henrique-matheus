import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../utils/colors';
import { PIXEL_MARGINS } from '../utils/margin';

const ClientContainer = styled.View`
    padding: ${PIXEL_MARGINS.x_medium};
    border-radius: ${PIXEL_MARGINS.x_small};
    align-text: left;
    background: ${COLORS.lightGray};
    margin-left: ${PIXEL_MARGINS.x_small};
    margin-right: ${PIXEL_MARGINS.x_small};
    margin-top: ${PIXEL_MARGINS.x_small};
`;

export const ClientCard = ({ client }) => {
    return (
        <ClientContainer>
            <Text>{client.name}</Text>
            <Text>{client.email}</Text>
        </ClientContainer>
    )
};
