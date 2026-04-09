"use client";

import { testUserData } from "@/data/entityData";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserContextInterface, UserInfo } from "./types";

const UserContext = createContext<UserContextInterface | undefined>(undefined);

export function UserDataProvider({ children }: { children: ReactNode }) {
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

  return (
    <UserContext.Provider
      value={{
        userData,
        loggedInUserId,
        attemptLogin,
        logout,
        getLoggedInUserData,
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
