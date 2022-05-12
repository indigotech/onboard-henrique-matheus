import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {FieldErrors} from '../utils/errors';
import {SubText, TextBox, ErrorText} from '../utils/style';
import PhoneInput, {
  isValidNumber,
  getCountryCode,
} from 'react-native-phone-number-input';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export const EmailField = props => {
  return (
    <View>
      <SubText>Email</SubText>
      <TextBox
        placeholder={'email@exemple.com'}
        autoCapitalize="none"
        onChangeText={props.setvalue}
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

export const NameField = props => {
  return (
    <View>
      <SubText>Nome</SubText>
      <TextBox
        autoCapitalize="none"
        onChangeText={props.setvalue}
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

export const PhoneField = props => {
  const phoneInput = useRef<PhoneInput>(null);

  return (
    <View>
      <SubText>Telefone</SubText>
      <PhoneInput
        onChangeFormattedText={value => {
          props.setvalue(value);
          isValidNumber(value, phoneInput.current?.getCountryCode(value))
            ? props.setError(undefined)
            : props.setError(FieldErrors.structure);
        }}
        ref={phoneInput}
      />
      <ErrorText>{props.value}</ErrorText>
      <ErrorText>
        {props.error === FieldErrors.empty && 'Este campo é obrigatório'}
        {props.error === FieldErrors.structure && 'Número inválido'}
        {!props.error && ' '}
      </ErrorText>
    </View>
  );
};

export const DateField = props => {
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let minDate = today.getFullYear() - 120 + '-01-01';

  return (
    <View>
      <SubText>Data de nascimento</SubText>
      <DatePicker
        style={{width: '100%'}}
        date={props.value}
        mode="date"
        placeholder="Seleciona uma data"
        format="YYYY-MM-DD"
        minDate={minDate}
        maxDate={date}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        useNativeDriver={false}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 15,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 51,
            margin: 10,
            padding: 10,
            border: 1,
            borderRadius: 10,
            borderColor: props.error === undefined ? 'black' : 'red',
          },
        }}
        onDateChange={value => {
          props.setValue(value);
        }}
      />
      <ErrorText>
        {props.error === FieldErrors.empty && 'Este campo é obrigatório'}
        {!props.error && ' '}
      </ErrorText>
    </View>
  );
};

export const UserRoleField = props => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'admin', value: 'admin'},
    {label: 'user', value: 'user'}
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
        setValue={props.setValue}
        setItems={setItems}
        onChangeValue={(value) => {
          console.log(value);
        }}
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
      />
      <ErrorText>
        {props.error === FieldErrors.empty && 'Este campo é obrigatório'}
        {!props.error && ' '}
      </ErrorText>
    </View>
  );
};
