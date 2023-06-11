import axios from "axios";
import { RegisterFormData } from "@/modules/auth/signup-form";

const usersApi = axios.create({
  baseURL: "http://localhost:3500/api",
});

export const ping = async () => {
  const res = await usersApi.get("/ping");
  return res.data;
};

export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterFormData) => {
  const newUser = await usersApi.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
  });
  return newUser;
};
