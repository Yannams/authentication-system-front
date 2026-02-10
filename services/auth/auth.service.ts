import { api } from "../api";

export const login = async (email: string, password: string) => api.post("/auth/login", { email, password });
export const register = async (firstName: string, lastName: string,  email: string, password: string) => api.post("/auth/register", { firstName, lastName, email, password });
export const forgotPassword = async (email: string) => api.post("/auth/forgot-password", { email });
export const resetPassword = async (token: string, newPassword: string) => api.post("/auth/reset-password", { token, newPassword });
export const logout = async () => api.post("/auth/logout");
export const refreshToken = () => api.post("/auth/refresh");
export const authMe = () => api.get("/auth/me")
