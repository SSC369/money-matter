import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LOCALSTORAGE_KEY, LOGIN_ROUTE } from "../constants";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const localStorageUserData = localStorage.getItem(LOCALSTORAGE_KEY);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorageUserData);

  useEffect(() => {
    if (!localStorageUserData) {
      navigate(LOGIN_ROUTE);
    }
  }, []);

  if (userData?.userId) {
    const { userId, admin } = userData;
    return (
      <UserContext.Provider value={{ userId, isAdmin: admin }}>
        {children}
      </UserContext.Provider>
    );
  } else {
    return <></>;
  }
};
