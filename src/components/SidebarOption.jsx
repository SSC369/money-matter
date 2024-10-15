import React, { useContext } from "react";
import { GoHomeFill } from "react-icons/go";
import { TbReceiptDollar } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";
import { SIDEBAR_OPTIONS } from "../constants";

const SidebarOption = ({ option }) => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const { isAdmin } = useContext(UserContext);
  const currentPath = "/" + option;

  //convert the if conditions to switch case
  const renderOption = () => {
    switch (option) {
      case SIDEBAR_OPTIONS.dashboard:
        return (
          <>
            <GoHomeFill className="text-xl" />
            <p className="font-medium text-base">{SIDEBAR_OPTIONS.dashboard}</p>
          </>
        );

      case SIDEBAR_OPTIONS.transactions:
        return (
          <>
            <TbReceiptDollar className="text-xl" />
            <p className="font-medium text-base first-letter:capitalize">
              {isAdmin
                ? "All " + SIDEBAR_OPTIONS.transactions
                : SIDEBAR_OPTIONS.transactions}
            </p>
          </>
        );
      default:
        return <></>;
    }
  };

  const isCurrentPath = path === currentPath;
  //Add the confition into a boolean variable (Conditional encapsulation)
  const renderPointer = () => {
    if (isCurrentPath) {
      return (
        <div className="w-2 h-14 bg-blue-600 absolute left-0 rounded-e-lg"></div>
      );
    }
    return <></>;
  };

  return (
    <li
      onClick={() => navigate(currentPath)}
      style={isCurrentPath ? { color: "rgba(45, 96, 255, 1)" } : {}}
      className="flex items-center gap-3 text-slate-500 relative pl-8 h-16 cursor-pointer"
    >
      {renderPointer()}
      {renderOption()}
    </li>
  );
};

export default SidebarOption;
