import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { TransactionContextProvider } from "../context/transactionContext";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, []);

  if (localStorage.getItem("userData")) {
    return (
      <TransactionContextProvider>
        <div className="relative">
          <Sidebar />
          <div className="ml-[200px]">
            <Header />
            <Outlet />
          </div>
        </div>
      </TransactionContextProvider>
    );
  }
  return;
};

export default Home;
