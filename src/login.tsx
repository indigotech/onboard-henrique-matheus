/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Background, MainText, FieldsCell, SubText, ButtonText, ErrorText, LoginButton, TextBox } from './utils/style';
import { validateEmail, validatePassword } from './utils/string-validation';
import { useLogin } from './utils/login-service';
import { LoadingLayer } from './components/loading-layer';
import { FieldErrors} from './utils/errors';
import { EmailField } from './components/form-fields';

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
        <MainText>Bem-vind@ à Taqtile!</MainText>
        <FieldsCell>
          <EmailField setvalue={setEmail} value={email} error={emailError}/>
          <View>
            <SubText>Senha</SubText>
            <TextBox
              secureTextEntry
              autoCapitalize='none'
              onChangeText={setPassword}
              defaultvalue={password}
              status={passwordError}
            />
            <ErrorText>
              { passwordError === FieldErrors.empty && "Este campo é obrigatório" }
              { passwordError === FieldErrors.structure && "Senha deve conter letras e números" }
              { passwordError === FieldErrors.length && "Senha deve ter pelo menos 7 caracteres" }
              { !passwordError && " " }
            </ErrorText>
          </View>
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
