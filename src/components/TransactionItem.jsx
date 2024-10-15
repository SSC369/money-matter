import dayjs from "dayjs";
import React from "react";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

const TransactionItem = ({
  data,
  setEditTransactionData,
  setShowEditTransactionModal,
  setAlertModal,
  setDeleteTransactionId,
}) => {
  const { transaction_name, id, category, amount, date, type } = data;

  const renderButtons = () => {
    return (
      <>
        <button
          onClick={() => {
            setEditTransactionData({
              category,
              amount,
              date,
              name: transaction_name,
              type,
              id,
            });
            setShowEditTransactionModal(true);
          }}
        >
          <MdOutlineModeEdit className="text-xl text-blue-400" />
        </button>
        <button
          onClick={() => {
            setAlertModal(true);
            setDeleteTransactionId(id);
          }}
        >
          <MdDeleteOutline className="text-xl text-red-400" />
        </button>
      </>
    );
  };

  const renderTransactionAmount = () => {
    if (type === "credit") {
      return <span className="text-green-500">+${amount}</span>;
    } else {
      return <span className="text-red-500">-${amount}</span>;
    }
  };

  const renderTransactionIcon = () => {
    if (type === "credit") {
      return <IoArrowUpCircleOutline className="text-xl text-green-500" />;
    } else {
      return <IoArrowDownCircleOutline className="text-xl text-red-500" />;
    }
  };

  return (
    <li
      className={`flex items-center gap-2 border-b-2 p-2 text-sm last:border-none`}
    >
      {renderTransactionIcon()}
      <p className="flex-grow">{transaction_name}</p>
      <div className="flex items-start justify-between gap-3 max-w-[500px] w-2/4">
        <p className="text-slate-400 w-1/4 first-letter:capitalize whitespace-normal">
          {category}
        </p>
        <p className="text-slate-400 w-[30%]">
          {dayjs(date).format("DD MMM YY, hh:mm A")}
        </p>

        <p className="font-semibold w-1/4">{renderTransactionAmount()}</p>

        {renderButtons()}
      </div>
    </li>
  );
};

export default TransactionItem;
