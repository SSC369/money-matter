import dayjs from "dayjs";
import React from "react";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

import { DATE_FORMAT, TRANSACTION_TYPES_OBJECT } from "../constants";

const TransactionItem = ({
  data,
  setEditTransactionId,
  setShowEditTransactionModal,
  setShowAlertModal,
  setDeleteTransactionId,
}) => {
  const { transaction_name, id, category, amount, date, type } = data;

  const handleEditClick = () => {
    setEditTransactionId(id);
    setShowEditTransactionModal(true);
  };

  const handleDeleteClick = () => {
    setShowAlertModal(true);
    setDeleteTransactionId(id);
  };

  const renderButtons = () => {
    return (
      <>
        <button onClick={handleEditClick}>
          <MdOutlineModeEdit className="text-xl text-blue-400" />
        </button>
        <button onClick={handleDeleteClick}>
          <MdDeleteOutline className="text-xl text-red-400" />
        </button>
      </>
    );
  };

  const isCredit = type === TRANSACTION_TYPES_OBJECT.credit;

  const renderTransactionAmount = () => {
    if (isCredit) {
      return <span className="text-green-500">+${amount}</span>;
    }
    return <span className="text-red-500">-${amount}</span>;
  };

  const renderTransactionIcon = () => {
    if (isCredit) {
      return <IoArrowUpCircleOutline className="text-xl text-green-500" />;
    }
    return <IoArrowDownCircleOutline className="text-xl text-red-500" />;
  };

  return (
    <li
      className={`flex items-center gap-2 border-b-2 p-2 text-sm last:border-none`}
    >
      {renderTransactionIcon()}
      <p className="flex-grow">{transaction_name}</p>
      <div className="flex items-start justify-between gap-3 max-w-[500px] w-2/4 text-xs lg:text-sm">
        <p className="text-slate-400 w-1/4 first-letter:capitalize whitespace-normal">
          {category}
        </p>
        <p className="text-slate-400  w-[30%]">
          {dayjs(date).format(DATE_FORMAT)}
        </p>

        <p className="font-semibold w-1/4">{renderTransactionAmount()}</p>

        {renderButtons()}
      </div>
    </li>
  );
};

export default TransactionItem;
