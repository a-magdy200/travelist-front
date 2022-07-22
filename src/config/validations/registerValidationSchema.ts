import {object, string} from "yup";

export const registerValidationSchema = object({
  name: string().min(3).required(),
  email: string().email().required(),
  password: string().min(6).required(),
  type: string().oneOf(["traveler","company", "admin"]).required(),
});
