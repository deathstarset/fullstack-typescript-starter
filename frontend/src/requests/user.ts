import { API_URL } from "@/constants";
import {
  CreateUserSchemaType,
  LoginSchemaType,
  RegisterSchemaType,
  User,
} from "@/types/user";
import authAxios from "@/util/auth";
import axios from "axios";
export const loginUser = async (data: LoginSchemaType) => {
  const res = await axios.post(`${API_URL}/api/v1/auth/login`, data);
  return { data: res.data, status: res.status };
};
export const getUsers = async (): Promise<{
  users: User[];
  status: number;
}> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const res = await authAxios.get(`${API_URL}/api/v1/users`);
      resolve({ users: res.data.users, status: res.status });
    }, 2000);
  });
};

export const RegisterUser = async (data: RegisterSchemaType) => {
  const res = await axios.post(`${API_URL}/api/v1/auth/register`, data);
  return { data: res.data, status: res.status };
};

export const createUser = async (data: CreateUserSchemaType) => {
  const res = await axios.post(`${API_URL}/api/v1/users`, data);
  return { data: res.data, status: res.status };
};
