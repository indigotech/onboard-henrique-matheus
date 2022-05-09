import styled from 'styled-components/native';
import {TouchableOpacity, Text, View, TextInput, Dimensions} from 'react-native';

const WindowHeight = Dimensions.get("screen").height;

export const Background = styled.View`
  padding: 20px;
  padding-top: 100px;
  height: ${WindowHeight};
`;
export const FieldsCell = styled.View`
  padding-top: 100px;
`;
export const TextBox = styled.TextInput`
  margin: 10px;
  padding: 10px;
  border: 1px;
  border-radius: 10px;
  border-color: ${(props) => props.status === undefined ? 'black' : 'red'};
`;
export const MainText = styled.Text`
  font-size: 30px;
  text-align: center;
  padding: 10px;
  color: black;
`;
export const SubText = styled.Text`
  font-size: 15px;
  color: grey;
`;
export const LoginButton = styled.TouchableOpacity`
  background-color: #6d50f2;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
`;
export const ButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: white;
`;
export const ErrorText = styled.Text`
  font-size: 12px;
  color: red;
  align-self: center;
`;
export const LoadingBackground= styled.View`
  background-color: #6d50f2;
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