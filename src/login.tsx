/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Background, MainText, FieldsCell, SubText, ButtonText, ErrorText, LoginButton, TextBox } from './utils/style';
import { validateEmail, validatePassword } from './utils/string-validation';
import { useLogin } from './utils/login-service';
import { Navigation } from 'react-native-navigation';

// Types of errors on field validation
type FieldErrors = 'structure' | 'empty' | 'length';

// Field validation warnings
const MandatoryFieldWarning = <ErrorText>Este campo é obrigatório</ErrorText>
const InvalidEmailWarning = <ErrorText>Email inválido</ErrorText>
const NoErrorText = <ErrorText> </ErrorText>
const InvalidPasswordWarning = <ErrorText>Senha deve conter letras e números</ErrorText>
const PasswordlengthWarning = <ErrorText>Senha deve ter pelo menos 7 caracteres</ErrorText>

const Login = (props) => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<FieldErrors>();
  const [passwordError, setPasswordError] = useState<FieldErrors>();
  const [loginError, setLoginError] = useState<string>('');
  const { login } = useLogin();

  const validateLogin = () => {
    const validEmail = validateEmail(email, setEmailError);
    const validPassword = validatePassword(password, setPasswordError);
    if(validEmail && validPassword){
      login(email, password, setLoginError);
    }
    // validateEmail();
    // validatePassword();
    Navigation.push(props.componentId, {
      component: {
        name: 'Home', // Push the screen registered with the 'Settings' key
        options: { // Optional options object to configure the screen
          topBar: {
            title: {
              text: 'Home' // Set the TopBar title of the new Screen
            }
          }
        }
      }
    });
  };

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
