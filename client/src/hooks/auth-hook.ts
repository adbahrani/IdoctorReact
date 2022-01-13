import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export interface UserData {
  uid: string;
  username: string;
  name: string;
  email: string;
  token: string;
  loginAt: Date;
  isDeactivated: boolean;
}

export const useAuth = () => {
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [checkedStorage, setCheckingStorage] = useState(false);

  const login = useCallback((user: UserData) => {
    setUserData(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setUserData({} as UserData);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    let storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      let loggedUser: UserData = JSON.parse(storedUserData);
      loggedUser.loginAt = new Date();
      login(loggedUser);
      UpdateLogin(loggedUser);
    }
    setCheckingStorage(true);
  }, [login]);

  let UpdateLogin = async (loggedUser: any) => {
    let res = await axios.get("/api/user/" + loggedUser.uid);
    if (res.status === 200) {
      let { email, name, username } = res.data.user;
      loggedUser = { ...loggedUser, email, name, username };
      login(loggedUser);
    }
  };

  return { login, logout, userData, checkedStorage };
};
