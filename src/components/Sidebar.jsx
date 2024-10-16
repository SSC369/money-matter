import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

import SidebarOption from "./SidebarOption";
import ConfirmModal from "./ConfirmModal";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import {
  ACTION_TYPES,
  API_PROFILE_URL,
  LOCALSTORAGE_KEY,
  LOGIN_ROUTE,
  SIDEBAR_OPTIONS,
  SUCCESS_OK,
} from "../constants";
import { removeDataFromLocalStorage } from "../utils/localStorageUtils";
import { TRANSACTION_HEADERS } from "../utils/headerUtils";
import { sidebarContainer } from "../styles";

const Sidebar = () => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const { userId, showMenu, setShowMenu } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  function handleProfileFetchSuccess(res) {
    const { data } = res;
    const userDetails = data.users[0];
    setUserData(userDetails);
  }

  const fetchUserProfile = async () => {
    try {
      const url = API_PROFILE_URL;
      const res = await axios.get(url, {
        headers: TRANSACTION_HEADERS(userId),
      });

      if (res.status === SUCCESS_OK) {
        handleProfileFetchSuccess(res);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    try {
      setIsLogoutLoading(true);
      removeDataFromLocalStorage(LOCALSTORAGE_KEY);
      toast.success("Logout successful", { duration: 1000 });
      navigate(LOGIN_ROUTE);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const renderHeader = () => {
    return (
      <h1
        style={{ color: "rgba(248, 154, 35, 1)" }}
        className="font-bold hidden md:block text-xl text-center mb-6"
      >
        Money{" "}
        <span className="" style={{ color: "rgba(2, 150, 156, 1)" }}>
          Matters
        </span>
      </h1>
    );
  };

  const renderOptions = () => {
    const options = Object.keys(SIDEBAR_OPTIONS);
    return (
      <ul className="flex flex-col w-full">
        {options.map((option) => (
          <SidebarOption key={option} option={option} />
        ))}
      </ul>
    );
  };

  const handleShowAlertModal = () => {
    setShowAlertModal(true);
  };

  const renderProfile = () => {
    return (
      <div className="flex gap-2 items-start px-2 mt-auto">
        <FaCircleUser className="text-2xl text-blue-600" />

        <div className="flex flex-col flex-grow text-xs">
          <p className="font-medium dark:text-white">{userData?.name}</p>
          <p className="font-medium text-slate-400">{userData?.email}</p>
        </div>

        {/* //Give this "setAlertModal" call back to button onclick */}
        <button onClick={handleShowAlertModal}>
          <LuLogOut color="rgba(113, 142, 191, 1)" className="text-lg " />
        </button>
      </div>
    );
  };

  const renderConfirmModal = () => {
    if (showAlertModal) {
      return (
        <ConfirmModal
          onClose={() => setShowAlertModal(false)}
          isLoading={isLogoutLoading}
          action={ACTION_TYPES.logout}
          actionHandler={handleLogout}
        />
      );
    }
    return <></>;
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  let isMenuClosable = showMenu || window.innerWidth >= 768;
  return (
    <div
      style={
        isMenuClosable
          ? { display: "flex", justifyContent: "space-between" }
          : { display: "none" }
      }
      className={sidebarContainer}
    >
      {renderHeader()}

      <button onClick={handleMenuClose} className="md:hidden self-end mr-2">
        <IoClose className="text-xl dark:text-white" />
      </button>
      {renderOptions()}
      {renderProfile()}
      {renderConfirmModal()}
    </div>
  );
};

export default Sidebar;
