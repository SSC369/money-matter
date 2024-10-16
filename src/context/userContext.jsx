import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOCALSTORAGE_KEY, LOGIN_ROUTE } from "../constants";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const userData = getDataFromLocalStorage(LOCALSTORAGE_KEY);

  useEffect(() => {
    if (!userData) {
      navigate(LOGIN_ROUTE);
    }
  }, []);

  if (userData?.userId) {
    const { userId, admin } = userData;
    return (
      <UserContext.Provider
        value={{ userId, isAdmin: admin, showMenu, setShowMenu }}
      >
        {children}
      </UserContext.Provider>
    );
  } else {
    return <></>;
  }
};
