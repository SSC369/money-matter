import React from "react";
import { TailSpin } from "react-loader-spinner";
import { ACTION_TYPES } from "../constants";

const LoadingButton = ({ action, isLoading }) => {
  const renderButtonText = () => {
    switch (action) {
      case ACTION_TYPES.edit:
        return "Edit Transaction";
      case ACTION_TYPES.add:
        return "Add Transaction";
      default:
        break;
    }
  };

  const renderButtonContent = () => {
    if (isLoading) {
      return (
        <TailSpin
          visible={true}
          height="30"
          width="30"
          color="white"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      );
    }
    return renderButtonText();
  };

  return (
    <button
      type="submit"
      className="flex justify-center items-center mt-5  bg-blue-500 hover:bg-blue-400 text-white font-medium text-sm rounded-lg h-12 w-full "
    >
      {renderButtonContent()}
    </button>
  );
};

export default LoadingButton;
