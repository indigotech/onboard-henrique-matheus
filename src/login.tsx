/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Background, MainText, FieldsCell, SubText, ButtonText, ErrorText, LoginButton, TextBox } from './components/style';
import { gql, useMutation } from '@apollo/client';
import { saveUserToken, getUserToken } from './components/cache';

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
  const [loginError, setLoginError] = useState<any>('');

  useEffect(() => {
    const getInfo = async () => {
      await getUserToken();
    } 
    getInfo();
  });

  function containsAnyLetter(str: string) {
    return /[a-zA-Z]/.test(str);
  }
  function containsAnyDigit(str: string) {
    return /[1-9]/.test(str);
  }

  const validateEmail = () => {
    if (email.length === 0){
      setEmailError('empty');
      return false;
    } else if (email.search('@') === -1){
      setEmailError('structure');
      return false;
    } else {
      var emailSplited = email.split('@',2);
      if (!(emailSplited[1].endsWith('.com') || emailSplited[1].endsWith('.com.br')) || emailSplited[1].length <= 4 || emailSplited[0].length === 0 ){
        setEmailError('structure');
        return false;
      } else {
        setEmailError(undefined);
        return true;
      }
    }
  };

  const validatePassword = () => {
    if (password.length === 0){
      setPasswordError('empty');
      return false;
    } else if (password.length < 7){
      setPasswordError('length');
      return false;
    } else if (containsAnyLetter(password) && containsAnyDigit(password)){
      setPasswordError(undefined);
      return true;
    } else {
      setPasswordError('structure');
      return false;
    } 
  };

  const validateLogin = () => {
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    if(validEmail && validPassword){
      callLogin(email, password);
    }
  };
  
  // Define mutation
  const INCREMENT_COUNTER = gql`
    mutation ($email: String!, $password: String!){
      login(data: {email: $email, password: $password}){
        token
        user{
          id
          name
        }
      }
    }
  `;

  const [mutateFunction,  { loading, error }] = useMutation(INCREMENT_COUNTER);

  const callLogin = (email, password) => {
    return (
      mutateFunction({
        variables: {email: email, password: password}
      })
      .then(resp => {
        if(resp.data == null){
          setLoginError('Email ou senha inválidos');
          saveUserToken('');
        } else {
          setLoginError('');
          saveUserToken(resp.data.login.token);
        }
      })
      .catch((e) => {
        setLoginError(e.message);
        saveUserToken('');
      })
    );
  }

  return (
    <Background>
      <MainText>Bem-vind@ à Taqtile!</MainText>
      <FieldsCell>
        <View>
          <SubText>Email</SubText>
          <TextBox
            placeholder={'email@exemple.com'}
            autoCapitalize='none'
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
            autoCapitalize='none'
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
        <ErrorText>{loginError}</ErrorText>
      </FieldsCell>
    </Background>
  );
};

export default Login;
