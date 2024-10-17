import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { TransactionContext } from "../context/transactionContext";
import AddTransactionModal from "../components/AddTransactionModal";
import { ThemeContext } from "../context/themeContext";
import { UserContext } from "../context/userContext";
import { DARK_MODE_KEY, DASHBOARD_ROUTE } from "../constants";

const Home = () => {
  const { showAddTransactionModal, setShowAddTransactionModal } =
    useContext(TransactionContext);
  const { userId } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) [navigate(DASHBOARD_ROUTE)];
  }, []);

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
    <div className={`relative ${theme === DARK_MODE_KEY ? "dark" : ""}`}>
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
