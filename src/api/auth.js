import api from "../axios";

export const login = async (credentials) => {
  return await api.post("/api/user/login", credentials);
};

export const register = async (data) => {
  return await api.post("/api/user/register", data);
};

export const logout = async () => {
  localStorage.removeItem("token");
  return api.post("/api/logout");
};