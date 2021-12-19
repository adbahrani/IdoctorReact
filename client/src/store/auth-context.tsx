import React from "react";
import { UserData } from "../hooks/auth-hook";
export const AuthContext = React.createContext({
  isLoggedIn: false,
  uid: "",
  username: "",
  name: "",
  token: "",
  email: "",
  loginAt: new Date(),
  isDeactivated: false,
  login: (..._user: UserData[]) => {},
  logout: () => {}
});

export const AuthContextProvider = AuthContext.Provider;
