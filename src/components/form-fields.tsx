import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {FieldErrors} from '../utils/errors';
import {SubText, TextBox, ErrorText} from '../utils/style';
import PhoneInput, {
  isValidNumber,
  getCallingCode,
  getCountryCode,
} from 'react-native-phone-number-input';
import styled from 'styled-components/native';

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
  const [valid, setValid] = useState(false);

  return (
    <View>
      <SubText>Telefone</SubText>
      <PhoneInput
        onChangeFormattedText={value => {
          props.setvalue(value);
          setValid(
            isValidNumber(value, phoneInput.current?.getCountryCode(value)),
          );
        }}
        ref={phoneInput}
      />
      <ErrorText>
        {props.error === FieldErrors.empty && 'Este campo é obrigatório'}
        {!props.error && ' '}
      </ErrorText>
    </View>
  );
};
