import {object, string} from "yup";

export const userValidationSchema = object({
  name: string().min(3).required(),
  address: string().min(3).required(),
});

export const passwordValidationSchema = object({
  password: string().min(6).required(),
});
