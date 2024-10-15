import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOCALSTORAGE_KEY, LOGIN_ROUTE } from "../contants";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const localStorageUserData = localStorage.getItem(LOCALSTORAGE_KEY);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorageUserData);
  let isAdmin;

  useEffect(() => {
    if (!localStorageUserData) {
      navigate(LOGIN_ROUTE);
    } else {
      const { userId, admin } = userData;
      isAdmin = admin;
      setUserId(userId);
    }
  }, [userId]);

  //Remove unused code (setUserId)
  if (userId) {
    return (
      <UserContext.Provider value={{ userId, setUserId, isAdmin: userData }}>
        {children}
      </UserContext.Provider>
    );
  } else {
    return <></>;
  }
};
