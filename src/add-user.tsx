import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  Background,
  MainText,
  FieldsCell,
  SubText,
  ButtonText,
  ErrorText,
  LoginButton,
  TextBox,
} from './utils/style';
import {validateEmail, validatePassword} from './utils/string-validation';
import {useLogin} from './utils/login-service';
import {LoadingLayer} from './components/loading-layer';
import {FieldErrors} from './utils/errors';
import { EmailField, NameField, PhoneField } from './components/form-fields';

export const AddUserPage = props => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [nameError, setNameError] = useState<FieldErrors>();
  const [emailError, setEmailError] = useState<FieldErrors>();
  const [phoneError, setPhoneError] = useState<FieldErrors>();
  const [loginError, setLoginError] = useState<string>('');

  const {login, loading} = useLogin();

  const validateLogin = () => {
    setLoginError('');
    const validEmail = validateEmail(email, setEmailError);
    // const validPassword = validatePassword(password, setPasswordError);
    // if (validEmail && validPassword) {
    //   login(email, password, setLoginError, props.componentId);
    // }
  };

  return (
    <View>
      <Background>
        <FieldsCell>
          <NameField setvalue={setName} value={name} error={nameError} />
          <EmailField setvalue={setEmail} value={email} error={emailError} />
          <PhoneField setvalue={setPhone} value={phone} error={phoneError} />
          <LoginButton>
            <ButtonText onPress={() => validateLogin()}>Cadastrar</ButtonText>
          </LoginButton>
          <ErrorText>{loginError}</ErrorText>
        </FieldsCell>
      </Background>
      {loading && <LoadingLayer text={'Realizando Login...'} />}
    </View>
  );
};
