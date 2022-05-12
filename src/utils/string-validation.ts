import { FieldErrors } from './errors';

function containsAnyLetter(str: string) {
  return /[a-zA-Z]/.test(str);
}
function containsAnyDigit(str: string) {
  return /[1-9]/.test(str);
}

export const validateEmail = (email, setEmailError) => {
  if (email.length === 0){
    setEmailError(FieldErrors.empty);
    return false;
  } else if (email.search('@') === -1){
    setEmailError(FieldErrors.structure);
    return false;
  } else {
    var emailSplited = email.split('@',2);
    if (!(emailSplited[1].endsWith('.com') || emailSplited[1].endsWith('.com.br')) || emailSplited[1].length <= 4 || emailSplited[0].length === 0 ){
      setEmailError(FieldErrors.structure);
      return false;
    } else {
      setEmailError(undefined);
      return true;
    }
  }
};

export const validatePassword = (password, setPasswordError) => {
  if (password.length === 0){
    setPasswordError(FieldErrors.empty);
    return false;
  } else if (password.length < 7){
    setPasswordError(FieldErrors.length);
    return false;
  } else if (containsAnyLetter(password) && containsAnyDigit(password)){
    setPasswordError(undefined);
    return true;
  } else {
    setPasswordError(FieldErrors.structure);
    return false;
  } 
};

export const validateEmptyString = (value, setValueError) => {
  if (value.length === 0){
    setValueError(FieldErrors.empty);
    return false;
  } else {
    setValueError(undefined);
    return true;
  }
};