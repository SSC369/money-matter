import React, { useContext } from "react";
import { GoHomeFill } from "react-icons/go";
import { TbReceiptDollar } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { SIDEBAR_OPTIONS } from "../contants";

const SidebarOption = ({ option }) => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const { isAdmin } = useContext(UserContext);
  const currentPath = "/" + option;

  const renderOption = () => {
    if (SIDEBAR_OPTIONS.dashboard === option) {
      return (
        <>
          <GoHomeFill className="text-xl" />
          <p className="font-medium text-base">Dashboard</p>
        </>
      );
    } else if (SIDEBAR_OPTIONS.transactions === option) {
      return (
        <>
          <TbReceiptDollar className="text-xl" />
          <p className="font-medium text-base">
            {isAdmin ? "All Transactions" : "Transactions"}
          </p>
        </>
      );
    }
  };

  const renderPointer = () => {
    if (path === currentPath) {
      return (
        <div className="w-2 h-14 bg-blue-600 absolute left-0 rounded-e-lg"></div>
      );
    }
  };

  return (
    <li
      onClick={() => navigate(currentPath)}
      style={path === currentPath ? { color: "rgba(45, 96, 255, 1)" } : {}}
      className="flex items-center gap-3 text-slate-500 relative pl-8 h-16 cursor-pointer"
    >
      {renderPointer()}
      {renderOption()}
    </li>
  );
};

export default SidebarOption;
