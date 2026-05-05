"use client";

import { testUserData } from "@/data/entityData";
import { useTranslations } from "next-intl";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { USER_DATA_STORAGE_KEY, USER_ID_STORAGE_KEY } from "../constants";
import { RegisterInfo, UserContextInterface, UserInfo } from "../types";
import { useExercise } from "./exerciseContext/exerciseContext";

const UserContext = createContext<UserContextInterface | undefined>(undefined);

const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const t = useTranslations();
  const [userData, setUserData] = useState<UserInfo[]>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<number | undefined>(undefined);
  const exercise = useExercise();

  useEffect(() => {
    const userData = sessionStorage.getItem(USER_DATA_STORAGE_KEY);
    const storedLoggedInUserId = sessionStorage.getItem(USER_ID_STORAGE_KEY);
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
    sessionStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    if (loggedInUserId === undefined) {
      sessionStorage.removeItem(USER_ID_STORAGE_KEY);
    } else {
      sessionStorage.setItem(USER_ID_STORAGE_KEY, JSON.stringify(loggedInUserId));
    }
  }, [loggedInUserId]);

  const attemptLogin = (email: string, password: string) => {
    const user = userData.find((user) => user.email === email && user.password === password);
    if (user) {
      setLoggedInUserId(user.id);
      if (user.email == testUserData.email && user.password == testUserData.password) {
        exercise.completeStep("loginDefault");
      }
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
      return { error: t("RegisterPage.emailAlreadyInUseErrorText"), userId: undefined };
    }

    if (registerInfo.password !== registerInfo.confirmPassword) {
      return { error: t("RegisterPage.passwordMismatchErrorText"), userId: undefined };
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
    return { error: "", userId: newUser.id };
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
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used inside UserDataProvider");
  }

  return context;
};

export { UserDataProvider, useUserContext };
