import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import toast from "react-hot-toast";

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
  TRANSACTION_HEADERS,
} from "../contants";

const Sidebar = () => {
  //Boolean naming format
  const [alertModal, setAlertModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const url = API_PROFILE_URL;
      const res = await axios.get(url, {
        headers: TRANSACTION_HEADERS(userId),
      });

      if (res.status === 200) {
        const userDetails = res.data.users[0]
        setUserData(userDetails]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const handleLogout = () => {
    try {
      setLogoutLoading(true);
      localStorage.removeItem(LOCALSTORAGE_KEY);
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
        className="font-bold text-xl text-center"
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
      <ul className="flex flex-col w-full mt-6">
        {options.map((option) => (
          <SidebarOption key={option} option={option} />
        ))}
      </ul>
    );
  };

  const renderProfile = () => {
    return (
      <div className="flex gap-2 items-start px-2 mt-auto">
        <FaCircleUser className="text-2xl text-blue-600" />

        <div className="flex flex-col flex-grow text-xs">
          <p className="font-medium" style={{ color: "rgba(80, 88, 135, 1)" }}>
            {userData?.name}
          </p>
          <p
            className="font-medium"
            style={{ color: "rgba(113, 142, 191, 1)" }}
          >
            {userData?.email}
          </p>
        </div>

{/* //Give this "setAlertModal" call back to button onclick */}
        <button>
          <LuLogOut
            onClick={() => setAlertModal(true)}
            color="rgba(113, 142, 191, 1)"
            className="text-lg "
          />
        </button>
      </div>
    );
  };

  const renderConfirmModal = () => {
    if (alertModal) {
      //Rename toggleModal prop to close model
      return (
        <ConfirmModal
          toggleModal={() => setAlertModal(false)}
          isLoading={logoutLoading}
          action={ACTION_TYPES.logout}
          actionHandler={handleLogout}
        />
      );
    }
  };

  return (
    <div className="min-w-[200px] z-50 fixed flex flex-col bg-white py-4 min-h-dvh border-r-2 border-r-slate-100">
      {renderHeader()}
      {renderOptions()}
      {renderProfile()}
      {renderConfirmModal()}
    </div>
  );
};

export default Sidebar;
