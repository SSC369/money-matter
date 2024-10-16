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
      <div className="flex items-center gap-2 absolute right-4 top-2 md:static">
        <button onClick={handleEditClick}>
          <MdOutlineModeEdit className="text-xl text-blue-400" />
        </button>
        <button onClick={handleDeleteClick}>
          <MdDeleteOutline className="text-xl text-red-400" />
        </button>
      </div>
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
    <li className="flex flex-col md:flex-row md:justify-between w-full md:items-center gap-2 bg-white dark:bg-slate-700 md:bg-transparent md:rounded-none rounded-lg md:border-b-2 p-2 text-sm last:border-none relative dark:border-slate-600">
      <div className="flex items-center gap-2 text-xs md:text-sm">
        {renderTransactionIcon()}
        <p className="max-w-[200px] dark:text-white font-medium">
          {transaction_name}
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-between text-xs gap-2 max-w-[500px] md:w-3/4 md:text-sm dark:text-slate-200">
        <p className=" w-1/4 first-letter:capitalize whitespace-normal">
          {category}
        </p>
        <p className=" md:w-[30%]">{dayjs(date).format(DATE_FORMAT)}</p>

        <p className="font-semibold w-1/4">{renderTransactionAmount()}</p>
        {renderButtons()}
      </div>
    </li>
  );
};

export default TransactionItem;
