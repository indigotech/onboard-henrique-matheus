/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TouchableOpacity, Text, View, TextInput} from 'react-native';
import styled from 'styled-components';

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
  border-color: ${(props) => props.status === undefined ? 'black' : 'red'};
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
const ErrorText = styled.Text`
  font-size: 12px;
  color: red;
  align-self: center;
`;

// Types of errors on field validation
type FieldErrors = 'structure' | 'empty' | 'length';

// Field validation warnings
const MandatoryFieldWarning = <ErrorText>Este campo é obrigatório</ErrorText>
const InvalidEmailWarning = <ErrorText>Email inválido</ErrorText>
const NoErrorText = <ErrorText> </ErrorText>
const InvalidPasswordWarning = <ErrorText>Senha deve conter letras e números</ErrorText>
const PasswordlengthWarning = <ErrorText>Senha deve ter pelo menos 7 caracteres</ErrorText>



const Login = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<FieldErrors>();
  const [passwordError, setPasswordError] = useState<FieldErrors>();

  function containsAnyLetter(str: string) {
    return /[a-zA-Z]/.test(str);
  }
  function containsAnyDigit(str: string) {
    return /[1-9]/.test(str);
  }

  const validateEmail = () => {
    if (email.length === 0){
      setEmailError('empty');
    } else if (email.search('@') === -1){
      setEmailError('structure');
    } else {
      var emailSplited = email.split('@',2);
      if (!emailSplited[1].endsWith('.com') || emailSplited[1].length <= 4 || emailSplited[0].length === 0 ){
        setEmailError('structure');
      } else {
        setEmailError(undefined);
      }
    }
  };

  const validatePassword = () => {
    if (password.length === 0){
      setPasswordError('empty');
    } else if (password.length < 7){
      setPasswordError('length');
    } else if (containsAnyLetter(password) && containsAnyDigit(password)){
      setPasswordError(undefined);
    } else {
      setPasswordError('structure');
    } 
  };

  const validateLogin = () => {
    validateEmail();
    validatePassword();
  };

  return (
    <Background>
      <MainText>Bem-vind@ à Taqtile!</MainText>
      <FieldsCell>
        <View>
          <SubText>Email</SubText>
          <TextBox
            placeholder={'exemple@exemple.com'}
            onChangeText={(value) => setEmail(value)}
            defaultvalue={email}
            status={emailError}
          />
          {emailError === 'empty' ? MandatoryFieldWarning :
            emailError === 'structure' ? InvalidEmailWarning : NoErrorText
          }
        </View>
        <View>
          <SubText>Senha</SubText>
          <TextBox
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            defaultvalue={password}
            status={passwordError}
          />
          {passwordError === 'empty' ? MandatoryFieldWarning :
            passwordError === 'structure' ? InvalidPasswordWarning :
            passwordError === 'length' ? PasswordlengthWarning: NoErrorText
          }
        </View>
        <LoginButton>
          <ButtonText onPress={() => validateLogin()}>Entrar</ButtonText>
        </LoginButton>
      </FieldsCell>
    </Background>
  );
};

export default Login;
