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
      <SubText>Email</SubText>
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

export const NameField = (props: FieldProps) => {
  return (
    <View>
      <SubText>Nome</SubText>
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
      <SubText>Telefone</SubText>
      <PhoneInput
        onChangeFormattedText={handleChangeFormattedText}
        ref={phoneInput}
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
      <SubText>Data de nascimento</SubText>
      <View style={{padding:10}}>
        <DatePicker
          style={{width: '100%'}}
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
              padding: 10,
              border: 1,
              borderRadius: 10,
              borderColor: props.error === undefined ? 'black' : 'red',
            },
          }}
          onDateChange={value => {
            props.onChangeValue(value);
          }}
        />
      </View>
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
      <SubText>Cargo</SubText>
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
        containerStyle={{
          padding: 10,
        }}
        style={{
          borderRadius: 10,
          borderColor: props.error === undefined ? 'black' : 'red',
        }}
        // onChangeValue={props.onChangeValue}
        // onChangeValue={(value) => console.log("öi",value)}
      />
      <ErrorText>
        {props.error === FieldErrors.empty && 'Este campo é obrigatório'}
        {!props.error && ' '}
      </ErrorText>
    </View>
  );
};
