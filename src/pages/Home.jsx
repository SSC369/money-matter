import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { TransactionContext } from "../context/transactionContext";
import AddTransactionModal from "../components/AddTransactionModal";
import { ThemeContext, ThemeContextProvider } from "../context/themeContext";

const Home = () => {
  const { showAddTransactionModal, setShowAddTransactionModal } =
    useContext(TransactionContext);
  const { isDarkMode } = useContext(ThemeContext);

  const renderAddTransactionModal = () => {
    if (showAddTransactionModal) {
      return (
        <AddTransactionModal
          onClose={() => setShowAddTransactionModal(false)}
        />
      );
    }
    return <></>;
  };

  return (
    <div className={`relative ${isDarkMode ? "dark" : ""}`}>
      <Sidebar />
      <div className="md:ml-[200px] ">
        <Header />
        <Outlet />
      </div>
      {renderAddTransactionModal()}
    </div>
  );
};

export default Home;
