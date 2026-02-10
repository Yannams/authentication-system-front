import { api } from "@/services/api";

export const getUsers = async () => api.get("/users");  
export const createUser = async (firstName: string, lastName: string, email: string, password: string, role: "USER" | "ADMIN") => api.post("/users", { firstName, lastName, email, password, role });
export const deleteUser = async (userId: number) => api.delete(`/users/${userId}`);
export const updateUserInfo = async (userId: number, firstName: string, lastName: string, email: string) =>
  api.patch(`/users/${userId}`, { firstName, lastName, email });
export const updateUserPassword = async (userId: number, password: string) =>
  api.patch(`/users/${userId}`, { password });
export const updateUserRole = async (userId: number, role: "USER" | "ADMIN") =>
  api.patch(`/users/${userId}`, { role });