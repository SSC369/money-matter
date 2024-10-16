import dayjs from "dayjs";
import React, { useState } from "react";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import { DATE_FORMAT, TRANSACTION_TYPES_OBJECT } from "../constants";
import { transactionListItem } from "../styles";

const TransactionItem = ({
  data,
  setEditTransactionId,
  setShowEditTransactionModal,
  setShowAlertModal,
  setDeleteTransactionId,
}) => {
  const [showMenu, setShowMenu] = useState(false);
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
    if (showMenu) {
      return (
        <div className="flex items-center gap-2 absolute right-4 top-7 shadow-md rounded-lg p-2 md:static dark:bg-slate-600 bg-slate-100">
          <button onClick={handleEditClick}>
            <MdOutlineModeEdit className="text-xl text-blue-400" />
          </button>
          <button onClick={handleDeleteClick}>
            <MdDeleteOutline className="text-xl text-red-400" />
          </button>
        </div>
      );
    }
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

  const handleClickOptions = () => {
    setShowMenu(!showMenu);
  };

  return (
    <li className={transactionListItem}>
      <div className="flex items-center gap-2 text-xs md:text-sm">
        {renderTransactionIcon()}

        <div className="flex items-center justify-between w-full">
          <p className="max-w-[200px] dark:text-white font-medium">
            {transaction_name}
          </p>
          <button onClick={handleClickOptions} className="md:hidden">
            <BsThreeDotsVertical className="dark:text-slate-200 text-slate-600 text-lg mb-2" />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-between text-xs gap-2 w-full md:max-w-[500px] md:w-3/4 md:text-sm dark:text-slate-200 text-slate-600 text-right">
        <p className="md:w-1/4 first-letter:capitalize whitespace-normal">
          {category}
        </p>
        <p className=" md:w-[30%] absolute right-2 md:static">
          {dayjs(date).format(DATE_FORMAT)}
        </p>
        <p className="font-semibold md:w-1/4 md:static absolute top-2 right-7">
          {renderTransactionAmount()}
        </p>
        {renderButtons()}
      </div>
    </li>
  );
};

export default TransactionItem;
