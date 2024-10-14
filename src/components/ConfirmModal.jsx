import React, { useEffect, useState } from "react";
import { IoClose, IoWarningOutline } from "react-icons/io5";
import { TailSpin } from "react-loader-spinner";

const ConfirmModal = ({
  toggleModal,
  actionLoading,
  action,
  actionHandler,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger the animation when modal is mounted
  }, []);

  const renderActionHeading = () => {
    switch (action) {
      case "delete":
        return (
          <>
            <p className="font-semibold text-lg">
              Are you sure you want to delete?
            </p>
            <p className="text-slate-500 text-xs mt-1">
              This transaction will be deleted immediately. You can’t undo this
              action.
            </p>
          </>
        );
      case "logout":
        return (
          <>
            <p
              style={{ color: "rgba(51, 59, 105, 1)" }}
              className="font-semibold text-lg"
            >
              Are you sure you want to Logout?
            </p>
            <p
              style={{ color: "rgba(80, 88, 135, 1)" }}
              className="text-slate-500 text-xs mt-1"
            >
              You will be logged out immediately.
            </p>
          </>
        );
      default:
        break;
    }
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      toggleModal(); // Close the modal after the animation
    }, 300); // Match the animation duration
  };

  const buttonText = () => {
    if (action === "delete") {
      return "Yes, Delete";
    } else if (action === "logout") {
      return "Yes, Logout";
    }
  };

  const renderModalButtons = () => {
    return (
      <div className="flex items-center gap-4 mt-4 text-sm">
        <button
          onClick={actionHandler}
          className="bg-red-600 text-white rounded-xl py-2 w-[120px] flex items-center justify-center"
        >
          {actionLoading ? (
            <TailSpin
              visible={true}
              height="20"
              width="20"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <p className="text-sm">{buttonText()}</p>
          )}
        </button>
        <button
          onClick={handleCloseModal}
          className="border-slate-200 border-2 w-[120px] text-black rounded-xl py-2"
        >
          No, Leave it
        </button>
      </div>
    );
  };

  const RenderModalIcon = () => {
    return (
      <div className="bg-orange-100 h-[48px] w-[54px] rounded-full flex justify-center items-center">
        <div className="bg-orange-200 h-[36px] w-[36px] rounded-full flex justify-center items-center">
          <IoWarningOutline className="text-orange-600 text-2xl" />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-60 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`relative flex w-[440px] flex-col justify-center rounded-xl bg-white px-4 py-6 transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        <button onClick={handleCloseModal} className="absolute right-6 top-4">
          <IoClose className="text-xl text-slate-600" />
        </button>

        <div className="flex items-start gap-4">
          {RenderModalIcon()}

          <div className="flex flex-col mt-[-4px]">
            {renderActionHeading()}
            {renderModalButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
