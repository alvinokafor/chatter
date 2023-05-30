import * as yup from "yup";

export const registerSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required(),
});

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
