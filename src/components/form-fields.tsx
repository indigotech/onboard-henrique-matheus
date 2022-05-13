import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {FieldErrors} from '../data/errors';
import {SubText, TextBox, ErrorText} from '../utils/style';
import PhoneInput, {
  isValidNumber,
  getCountryCode,
} from 'react-native-phone-number-input';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { UserRole } from '../data/user-service';
import { COLORS } from '../utils/colors';

interface FieldProps {
  value: string | undefined;
  error?: FieldErrors | undefined;
  onChangeValue: (value: string | undefined | UserRole) => void;
}

interface PhoneFieldProps extends FieldProps {
  onChangeError: (error: FieldErrors | undefined) => void;
}

export const EmailField = (props: FieldProps) => {
  return (
    <View>
      <SubText status={props.error} >Email</SubText>
      <TextBox
        placeholder={'email@exemple.com'}
        autoCapitalize="none"
        onChangeText={props.onChangeValue}
        defaultvalue={props.value}
        status={props.error}
      />
      <ErrorText>
        {props.error === FieldErrors.empty && 'Este campo é obrigatório'}
        {props.error === FieldErrors.structure && 'Email inválido'}
        {!props.error && ' '}
      </ErrorText>
    </View>
  );
};

export const PasswordField = (props: FieldProps) => {
  return (
    <View>
      <SubText status={props.error} >Senha</SubText>
      <TextBox
        secureTextEntry
        autoCapitalize='none'
        onChangeText={props.onChangeValue}
        defaultvalue={props.value}
        status={props.error}
      />
      <ErrorText>
        { props.error === FieldErrors.empty && "Este campo é obrigatório" }
        { props.error === FieldErrors.structure && "Senha deve conter letras e números" }
        { props.error === FieldErrors.length && "Senha deve ter pelo menos 7 caracteres" }
        { !props.error && " " }
      </ErrorText>
    </View>
  );
};

export const NameField = (props: FieldProps) => {
  return (
    <View>
      <SubText status={props.error} >Nome</SubText>
      <TextBox
        autoCapitalize="none"
        onChangeText={props.onChangeValue}
        defaultvalue={props.value}
        status={props.error}
      />
      <ErrorText>
        {props.error === FieldErrors.empty && 'Este campo é obrigatório'}
        {!props.error && ' '}
      </ErrorText>
    </View>
  );
};

export const PhoneField = (props: PhoneFieldProps) => {
  const phoneInput = useRef<PhoneInput>(null);

  const handleChangeFormattedText = (value: string) => {
    props.onChangeValue(value);
    isValidNumber(value, phoneInput.current?.getCountryCode(value))
      ? props.onChangeError(undefined)
      : props.onChangeError(FieldErrors.structure);
  };

  return (
    <View>
      <SubText status={props.error} >Telefone</SubText>
      <PhoneInput
        onChangeFormattedText={handleChangeFormattedText}
        ref={phoneInput}
        containerStyle={{ 
          // backgroundColor: 'black',
          borderColor: props.error === undefined ? COLORS.gray : COLORS.alert,
          borderWidth: 1,
          borderRadius: 10,
          width: '100%',
        }}
        textContainerStyle={{
          backgroundColor: COLORS.white,
          borderRadius: 10,
        }}
        textInputStyle={{
          color: props.error === undefined ? COLORS.black : COLORS.alert,
        }}
      />
      <ErrorText>
        {props.error === FieldErrors.empty && 'Este campo é obrigatório'}
        {props.error === FieldErrors.structure && 'Número inválido'}
        {!props.error && ' '}
      </ErrorText>
    </View>
  );
};

export const DateField = (props: FieldProps) => {
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let minDate = today.getFullYear() - 120 + '-01-01';

  return (
    <View>
      <SubText status={props.error} >Data de nascimento</SubText>
      <DatePicker
        style={{width: '100%', height: 55, justifyContent: 'center',}}
        date={props.value}
        mode="date"
        placeholder="Selecione uma data"
        format="YYYY-MM-DD"
        minDate={minDate}
        maxDate={date}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        useNativeDriver={false}
        showIcon={false}
        customStyles={{
          dateInput: {
            border: 1,
            borderRadius: 10,
            height: 50,
            borderColor: props.error === undefined ? COLORS.gray : COLORS.alert,
          },
        }}
        onDateChange={value => {
          props.onChangeValue(value);
        }}
      />
      <ErrorText>
        {props.error === FieldErrors.empty && 'Este campo é obrigatório'}
        {!props.error && ' '}
      </ErrorText>
    </View>
  );
};

export const UserRoleField = (props: FieldProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'admin', value: UserRole.admin},
    {label: 'user', value: UserRole.user}
  ]);

  return (
    <View>
      <SubText status={props.error} >Cargo</SubText>
      <DropDownPicker
        placeholder='Selecione uma opção'
        open={open}
        value={props.value}
        items={items}
        setOpen={setOpen}
        setValue={props.onChangeValue}
        setItems={setItems}
        dropDownDirection="TOP"
        dropDownContainerStyle={{
          backgroundColor: "white",
          alignSelf: 'center',
        }}
        style={{
          borderRadius: 10,
          borderColor: props.error === undefined ? COLORS.gray : COLORS.alert,
        }}
      />
      <ErrorText>
        {props.error === FieldErrors.empty && 'Este campo é obrigatório'}
        {!props.error && ' '}
      </ErrorText>
    </View>
  );
};
