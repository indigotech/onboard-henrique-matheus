import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import { Background, ButtonText, ErrorText, LoginButton, TextBox } from '../utils/style';
import {validateEmail, validateEmptyString} from '../data/string-validation';
import {LoadingLayer} from '../components/loading-layer';
import {FieldErrors} from '../data/errors';
import { EmailField, NameField, PhoneField, DateField, UserRoleField } from '../components/form-fields';
import { useAddUser, UserErrorInterface, UserInterface, UserRole } from '../data/user-service';
import { getUserToken } from '../utils/cache';

export const AddUserPage = props => {

  const [user, setUser] = useState<UserInterface>();
  const [error, setError] = useState<UserErrorInterface>();
  const [role, setRole] = useState<UserRole>();
  const [addUserError, setAddUserError] = useState<string>('');

  const setUserName = (value) => setUser((currentUser) => ({...currentUser, name: value}));
  const setUserEmail = (value) => setUser((currentUser) => ({...currentUser, email: value}));
  const setUserPhone = (value) => setUser((currentUser) => ({...currentUser, phone: value}));
  const setUserBirthDate = (value) => setUser((currentUser) => ({...currentUser, birthDate: value}));
  const setUserRole = (value) => setUser((currentUser) => ({...currentUser, role: value}));

  const setEmailError = (value) => setError((currentError) => ({...currentError, email: value}));
  const setNameError = (value) => setError((currentError) => ({...currentError, name: value}));
  const setPhoneError = (value) => setError((currentError) => ({...currentError, phone: value}));
  const setBirthDateError = (value) => setError((currentError) => ({...currentError, birthDate: value}));
  const setRoleError = (value) => setError((currentError) => ({...currentError, role: value}));

  const { addUser, loading } = useAddUser();

  useEffect(() => {
    setUserRole(role);
  },[role])

  const addUserInfo = () => {
    setAddUserError('');
    const validEmail = validateEmail(user?.email, setEmailError);
    const validPhone = error?.phone == FieldErrors.structure ? false : validateEmptyString(user?.phone, setPhoneError);
    const validDate = validateEmptyString(user?.birthDate, setBirthDateError);
    const validName = validateEmptyString(user?.name,setNameError);
    const validRole = validateEmptyString(user?.role,setRoleError);
    console.log(user?.role);

    if (validEmail && validPhone && validDate && validName && validRole) {
      const myUser = user;
      myUser.phone = myUser.phone?.replace('+', '')
      addUser(myUser, setAddUserError,props.componentId);
    }
  };

  return (
    <View>
      <Background>
          <NameField onChangeValue={setUserName} value={user?.name} error={error?.name} />
          <PhoneField onChangeValue={setUserPhone} value={user?.phone} error={error?.phone} onChangeError={setPhoneError}/>
          <DateField onChangeValue={setUserBirthDate} value={user?.birthDate} error={error?.birthDate} />
          <EmailField onChangeValue={setUserEmail} value={user?.email} error={error?.email} />
          <UserRoleField onChangeValue={setRole} value={role} error={error?.role}/>
          <LoginButton>
            <ButtonText onPress={addUserInfo}>Cadastrar</ButtonText>
          </LoginButton>
          <ErrorText>{addUserError}</ErrorText>
      </Background>
      {loading && <LoadingLayer text={'Realizando cadastro...'} />}
    </View>
  );
};
