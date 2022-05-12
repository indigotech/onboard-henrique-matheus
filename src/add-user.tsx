import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import { Background, MainText, FieldsCell, SubText, ButtonText, ErrorText, LoginButton, TextBox } from './utils/style';
import {validateEmail, validateEmptyString} from './utils/string-validation';
import {LoadingLayer} from './components/loading-layer';
import {FieldErrors} from './utils/errors';
import { EmailField, NameField, PhoneField, DateField, UserRoleField } from './components/form-fields';
import { useAddUser } from './utils/user-service';
import { getUserToken } from './utils/cache';

export const AddUserPage = props => {

  const [token, setToken] = useState<any>();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const [nameError, setNameError] = useState<FieldErrors>();
  const [emailError, setEmailError] = useState<FieldErrors>();
  const [phoneError, setPhoneError] = useState<FieldErrors>();
  const [birthDateError, setBirthDateError] = useState<FieldErrors>();
  const [roleError, setRoleError] = useState<FieldErrors>();
  const [addUserError, setAddUserError] = useState<string>('');

  const { addUser, loading } = useAddUser();

  useEffect(() => {
    const loadUserToken = async () => {
      const userToken = await getUserToken();
      setToken(userToken);
    };
    loadUserToken();
  }, []);

  const addUserInfo = () => {
    setAddUserError('');
    const validEmail = validateEmail(email, setEmailError);
    const validPhone = phoneError == FieldErrors.structure ? false : validateEmptyString(phone, setPhoneError);
    const validDate = validateEmptyString(birthDate, setBirthDateError);
    const validName = validateEmptyString(name,setNameError);
    const validRole = validateEmptyString(role,setRoleError);

    if (validEmail && validPhone && validDate && validName && validRole) {
      addUser(token, email, name, birthDate, phone.replace('+', ''), role, setAddUserError,props.componentId);
    }
  };

  return (
    <View>
      <Background>
        <FieldsCell>
          <NameField setvalue={setName} value={name} error={nameError} />
          <PhoneField setvalue={setPhone} value={phone} error={phoneError} setError={setPhoneError}/>
          <DateField setValue={setBirthDate} value={birthDate} error={birthDateError} />
          <EmailField setvalue={setEmail} value={email} error={emailError} />
          <UserRoleField setValue={setRole} value={role} error={roleError}/>
          <LoginButton>
            <ButtonText onPress={() => addUserInfo()}>Cadastrar</ButtonText>
          </LoginButton>
          <ErrorText>{addUserError}</ErrorText>
        </FieldsCell>
      </Background>
      {loading && <LoadingLayer text={'Realizando cadastro...'} />}
    </View>
  );
};
