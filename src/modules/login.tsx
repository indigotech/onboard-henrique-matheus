/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Background, H1, FieldsCell, SubText, ButtonText, ErrorText, LoginButton, TextBox } from '../utils/style';
import { validateEmail, validatePassword } from '../data/string-validation';
import { useLogin } from '../data/login-service';
import { LoadingLayer } from '../components/loading-layer';
import { FieldErrors} from '../data/errors';
import { EmailField, PasswordField } from '../components/form-fields';

export const LoginPage = (props) => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<FieldErrors>();
  const [passwordError, setPasswordError] = useState<FieldErrors>();
  const [loginError, setLoginError] = useState<string>('');
  const { login, loading } = useLogin();

  const validateLogin = () => {
    setLoginError('');
    const validEmail = validateEmail(email, setEmailError);
    const validPassword = validatePassword(password, setPasswordError);
    if(validEmail && validPassword){
      login(email, password, setLoginError, props.componentId);
    }
  };

  return (
    <View>
      <Background>
        <H1>Bem-vind@ à Taqtile!</H1>
        <FieldsCell>
          <EmailField onChangeValue={setEmail} value={email} error={emailError}/>
          <PasswordField onChangeValue={setPassword} value={password} error={passwordError}/>
          <LoginButton>
            <ButtonText onPress={() => validateLogin()}>Entrar</ButtonText>
          </LoginButton>
          <ErrorText>{loginError}</ErrorText>
        </FieldsCell>
      </Background>
      {loading && <LoadingLayer text={"Realizando Login..."}/>}
    </View>
  );
};
