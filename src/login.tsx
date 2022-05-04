import React from 'react';
import {TouchableOpacity, Text, View, TextInput} from 'react-native';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Background = styled.View`
  padding: 20px;
  padding-top: 100px;
`;
const FieldsCell = styled.View`
  padding-top: 100px;
`;
const TextBox = styled.TextInput`
  margin: 10px;
  padding: 10px;
  border: 1px;
  border-radius: 10px;
`;
const MainText = styled.Text`
  font-size: 30px;
  text-align: center;
  padding: 10px;
  color: black;
`;
const SubText = styled.Text`
  font-size: 15px;
  color: grey;
`;
const LoginButton = styled.TouchableOpacity`
  background-color: #6d50f2;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
`;
const ButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: white;
`;

const Login = () => {
  return (
    <Background>
      <MainText>Bem-vind@ à Taqtile!</MainText>
      <FieldsCell>
        <View>
          <SubText>Email</SubText>
          <TextBox placeholder={'exemple@exemple.com'} />
        </View>
        <View>
          <SubText>Senha</SubText>
          <TextBox secureTextEntry={true} />
        </View>
        <LoginButton>
          <ButtonText>Entrar</ButtonText>
        </LoginButton>
      </FieldsCell>
    </Background>
  );
};

export default Login;
