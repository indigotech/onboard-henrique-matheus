import styled from 'styled-components/native';
import {TouchableOpacity, Text, View, TextInput} from 'react-native';
import { COLORS } from './colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PIXEL_MARGINS } from './margin';
import { FONT_SIZE } from './font-size';

export const MainContainer = styled.View`
  padding: ${PIXEL_MARGINS.x_medium};
`;
export const Background = styled.View`
  padding: ${PIXEL_MARGINS.large};
  padding-top: 100px;
  height: 100%;
`;
export const FieldsCell = styled.View`
  padding-top: 100px;
`;
export const TextBox = styled.TextInput`
  padding: ${PIXEL_MARGINS.medium};
  border: 1px;
  border-radius: ${PIXEL_MARGINS.x_medium};
  border-color: ${(props) => props.status === undefined ? COLORS.gray : COLORS.alert};
  color: ${(props) => props.status === undefined ? COLORS.black : COLORS.alert};
`;
export const H1 = styled.Text`
  font-size:  ${FONT_SIZE.large};
  text-align: center;
  margin-top: ${PIXEL_MARGINS.large};
  margin-bottom: ${PIXEL_MARGINS.large};
  color: ${Colors.black};
  font-weight: bold;
`;
export const SubText = styled.Text`
  font-size: ${FONT_SIZE.x_medium};
  font-weight: normal;
  margin-botton: ${PIXEL_MARGINS.medium};
  color: ${(props) => props.status === undefined ? COLORS.gray : COLORS.alert};
`;
export const LoginButton = styled.TouchableOpacity`
  background-color: ${COLORS.purple};
  padding: ${PIXEL_MARGINS.x_medium};
  border-radius: ${PIXEL_MARGINS.x_medium};
  justify-content: center;
  margin-top: ${PIXEL_MARGINS.large};
  height: 44px;
`;
export const ButtonText = styled.Text`
  font-size: ${FONT_SIZE.medium};
  text-align: center;
  color: ${COLORS.white};
  font-weigth: normal;
`;
export const ErrorText = styled.Text`
  font-size: ${FONT_SIZE.x_medium};
  font-weight: normal;
  color: ${COLORS.alert};
  margin-bottom: ${PIXEL_MARGINS.small};
`;
export const LoadingBackground= styled.View`
  background-color: ${COLORS.purple};
  width: 100%;
  height: 100%;
  opacity: 0.7;
  position: absolute;
  justify-content: center;
`;
export const LoadingText = styled.Text`
  font-size: ${FONT_SIZE.x_large};
  text-align: center;
  color: white;
  opacity: 1;
`;
