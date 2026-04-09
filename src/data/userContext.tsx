"use client";

import { testUserData } from "@/data/entityData";
import { useTranslations } from "next-intl";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { RegisterInfo, UserContextInterface, UserInfo } from "./types";

const UserContext = createContext<UserContextInterface | undefined>(undefined);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const [userData, setUserData] = useState<UserInfo[]>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    const storedLoggedInUserId = sessionStorage.getItem("loggedInUserId");
    let parsedUserData: UserInfo[] = [];

    if (userData) {
      parsedUserData = JSON.parse(userData);
    }

    const testDataAlreadyExists = parsedUserData.some((user) => testUserData.id === user.id);
    setUserData(testDataAlreadyExists ? parsedUserData : [...parsedUserData, testUserData]);

    if (storedLoggedInUserId) {
      setLoggedInUserId(JSON.parse(storedLoggedInUserId));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    if (loggedInUserId === undefined) {
      sessionStorage.removeItem("loggedInUserId");
    } else {
      sessionStorage.setItem("loggedInUserId", JSON.stringify(loggedInUserId));
    }
  }, [loggedInUserId]);

  const attemptLogin = (email: string, password: string) => {
    const user = userData.find((user) => user.email === email && user.password === password);
    if (user) {
      setLoggedInUserId(user.id);
      return user.id;
    }
    return undefined;
  };

  const logout = () => {
    setLoggedInUserId(undefined);
  };

  const getLoggedInUserData = () => {
    return userData.find((user) => user.id === loggedInUserId);
  };

  const attemptRegistration = (registerInfo: RegisterInfo) => {
    if (userData.some((user) => user.email === registerInfo.email)) {
      return t("RegisterPage.emailAlreadyInUseErrorText");
    }

    if (registerInfo.password !== registerInfo.confirmPassword) {
      return t("RegisterPage.passwordMismatchErrorText");
    }

    const newUser: UserInfo = {
      id: Date.now(),
      firstName: registerInfo.firstName,
      lastName: registerInfo.lastName,
      email: registerInfo.email,
      phoneNumber: registerInfo.phoneNumber,
      password: registerInfo.password,
      gender: registerInfo.gender,
    };

    setUserData((userData) => [...userData, newUser]);
    setLoggedInUserId(newUser.id);
    return "";
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        loggedInUserId,
        attemptLogin,
        logout,
        getLoggedInUserData,
        attemptRegistration,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  return context;
}
