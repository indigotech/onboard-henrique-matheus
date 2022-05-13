import styled from 'styled-components/native';
import {TouchableOpacity, Text, View, TextInput} from 'react-native';
import { COLORS } from './colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const MainContainer = styled.View`
  padding: 10px;
`;
export const Background = styled.View`
  padding: 20px;
  padding-top: 100px;
  height: 100%;
`;
export const FieldsCell = styled.View`
  padding-top: 100px;
`;
export const TextBox = styled.TextInput`
  padding: 16px;
  border: 1px;
  border-radius: 10px;
  border-color: ${(props) => props.status === undefined ? COLORS.gray : COLORS.alert};
  color: ${(props) => props.status === undefined ? COLORS.black : COLORS.alert};
`;
export const H1 = styled.Text`
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${Colors.black};
  font-weight: bold;
`;
export const SubText = styled.Text`
  font-size: 12px;
  font-weight: normal;
  margin-botton: 12px;
  color: ${(props) => props.status === undefined ? COLORS.gray : COLORS.alert};
`;
export const LoginButton = styled.TouchableOpacity`
  background-color: ${COLORS.purple};
  padding: 10px;
  border-radius: 10px;
  justify-content: center;
  margin-top: 20px;
  height: 44px;
`;
export const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${COLORS.white};
  font-weigth: normal;
`;
export const ErrorText = styled.Text`
  font-size: 12px;
  font-weight: normal;
  color: ${COLORS.alert};
  margin-bottom: 8px;
`;
export const LoadingBackground= styled.View`
  background-color: ${COLORS.purple};
  width: 100%;
  height: 100%;
  opacity: 0.5;
  position: absolute;
  justify-content: center;
`;
export const LoadingText = styled.Text`
  font-size: 30px;
  text-align: center;
  color: white;
  opacity: 1;
`;
