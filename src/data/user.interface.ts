import { FieldErrors } from "./errors"

export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export interface UserInterface{
  email?: string,
  name?: string,
  phone?: string,
  birthDate?: string,
  role?: UserRole
}

export interface UserErrorInterface{
  email?: FieldErrors,
  name?: FieldErrors,
  phone?: FieldErrors,
  birthDate?: FieldErrors,
  role?: FieldErrors
}