import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { TransactionContextProvider } from "../context/transactionContext";
import { DASHBOARD_ROUTE } from "../contants";
import { UserContextProvider } from "../context/userContext";

const Home = () => {
  //Remove unused variables
  const navigate = useNavigate();

  return (
    <UserContextProvider>
      <TransactionContextProvider>
        <div className="relative">
          <Sidebar />
          <div className="ml-[200px]">
            <Header />
            <Outlet />
          </div>
        </div>
      </TransactionContextProvider>
    </UserContextProvider>
  );
};

export default Home;
