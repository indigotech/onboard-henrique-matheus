/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Background, MainText, FieldsCell, SubText, ButtonText, ErrorText, LoginButton, TextBox } from './utils/style';
import { validateEmail, validatePassword } from './utils/string-validation';
import { useLogin } from './utils/login-service';
import { LoadingLayer } from './components/loading-layer';
import { FieldErrors} from './utils/errors';

const MandatoryFieldWarning = <ErrorText>Este campo é obrigatório</ErrorText>
const InvalidEmailWarning = <ErrorText>Email inválido</ErrorText>
const NoErrorText = <ErrorText> </ErrorText>
const InvalidPasswordWarning = <ErrorText>Senha deve conter letras e números</ErrorText>
const PasswordlengthWarning = <ErrorText>Senha deve ter pelo menos 7 caracteres</ErrorText>

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
          <View>
            <SubText>Email</SubText>
            <TextBox
              placeholder={'email@exemple.com'}
              autoCapitalize='none'
              onChangeText={setEmail}
              defaultvalue={email}
              status={emailError}
            />
            <ErrorText>
              { emailError === FieldErrors.empty && "Este campo é obrigatório" }
              { emailError === FieldErrors.structure && "Email inválido" }
              { !emailError && " " }
            </ErrorText>
          </View>
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
