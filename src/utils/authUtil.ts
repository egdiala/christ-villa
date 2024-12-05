import { LoggedInUser } from "@/types/auth";

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  const decryptedToken = JSON.parse(atob(token.split(".")[1]));
  const expirationDate = new Date(decryptedToken?.exp * 1000);
  const isExpired = expirationDate < new Date();

  return !isExpired;
};

export const getAdminData = () => {
  const user = JSON.parse(
    localStorage.getItem("user") as string
  ) as LoggedInUser;

  return user;
};
