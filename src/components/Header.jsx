import React, { useContext, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

import TransactionOption from "./TransactionOption";
import { DASHBOARD_ROUTE, TAB_OPTIONS, TRANSACTION_ROUTE } from "../constants";
import { TransactionContext } from "../context/transactionContext";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import ToggleButton from "./ToggleButton";

const Header = () => {
  const path = window.location.pathname;
  const { setShowAddTransactionModal } = useContext(TransactionContext);
  const { setShowMenu } = useContext(UserContext);

  const navigate = useNavigate();

  const renderHeaderName = () => {
    switch (path) {
      case DASHBOARD_ROUTE:
        return <p className="font-semibold text-xl">Accounts</p>;

      case TRANSACTION_ROUTE:
        return <p className="font-semibold text-xl">Transactions</p>;
      default:
        break;
    }
  };

  const options = Object.keys(TAB_OPTIONS);

  const renderTabs = () => {
    if (path === TRANSACTION_ROUTE) {
      return (
        <ul
          style={{ color: "rgba(113, 142, 191, 1)" }}
          className="hidden md:flex items-center gap-6 text-sm absolute bottom-0 "
        >
          {options.map((option) => (
            <TransactionOption key={option} option={option} />
          ))}
        </ul>
      );
    }
    return <></>;
  };

  const handleShowAddTransactionModal = () => {
    setShowAddTransactionModal(true);
  };

  const renderAddTransactionButton = () => {
    return (
      <div className="flex items-center gap-2">
        <ToggleButton />
        <button
          onClick={handleShowAddTransactionModal}
          className="bg-blue-600 dark:bg-slate-700 text-white rounded-lg flex items-center p-1 pr-2"
        >
          <IoIosAdd className="text-xl md:text-2xl" />{" "}
          <span className="text-xs">Add Transaction</span>
        </button>
      </div>
    );
  };

  const handleOpenMenu = () => {
    setShowMenu(true);
  };

  const renderHeader = () => {
    return (
      <h1
        onClick={handleClickLogo}
        style={{ color: "rgba(248, 154, 35, 1)" }}
        className="font-semibold md:hidden text-base text-center mr-auto ml-4 cursor-pointer"
      >
        Money{" "}
        <span className="" style={{ color: "rgba(2, 150, 156, 1)" }}>
          Matters
        </span>
      </h1>
    );
  };

  const handleClickLogo = () => {
    navigate("/dashboard");
  };

  return (
    <header className="min-h-[80px] dark:bg-slate-800 py-4 px-4 border-b-2 relative flex items-center md:block dark:border-b-slate-600">
      <div className="hidden dark:text-slate-200 md:flex items-center justify-between">
        {renderHeaderName()}
        {renderAddTransactionButton()}
      </div>
      {renderTabs()}

      <div className="md:hidden flex items-center justify-between w-full">
        <button onClick={handleOpenMenu}>
          <IoMenu className="text-2xl dark:text-white" />
        </button>

        {renderHeader()}
        {renderAddTransactionButton()}
      </div>
    </header>
  );
};

export default Header;
