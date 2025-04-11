import * as authApi from "../api/auth";

export const AuthService = {
  login: authApi.login,
  register: authApi.register,
  logout: authApi.logout,
};