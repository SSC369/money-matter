import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import { TransactionContext } from "../context/transactionContext";
import LoadingButton from "./LoadingButton";
import { UserContext } from "../context/userContext";
import {
  ACTION_TYPES,
  API_ADD_TRANSACTION,
  CATEGORY_OPTIONS,
  SUCCESS_OK,
  TRANSACTION_TYPES,
} from "../constants";
import InputContainer, {
  InputElement,
  InputLabel,
  SelectInput,
} from "./InputComponents";
import { TRANSACTION_HEADERS } from "../utils/headerUtils";

const AddTransactionModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    amount: 0,
    date: "",
  });
  const [addLoading, setAddLoading] = useState(false);
  const { totalDebitCreditTransactionsMutate, transactionsMutate } =
    useContext(TransactionContext);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    setIsVisible(true); // Trigger the animation when modal is mounted
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const transactionValidation = () => {
    const { name, category, date, type, amount } = formData;
    const trimmedName = name.trim();

    if (trimmedName === "") {
      toast.error("Please enter name");
      return false;
    } else if (category === "") {
      toast.error("Please enter category");
      return false;
    } else if (date === "") {
      toast.error("Please enter date");
      return false;
    } else if (type === "") {
      toast.error("Please enter type");
      return false;
    } else if (amount === 0) {
      toast.error("Please enter amount");
      return false;
    }

    return true;
  };

  const handleSuccess = () => {
    toast.success("Transaction Added");
    transactionsMutate();
    totalDebitCreditTransactionsMutate();
    setFormData({
      name: "",
      type: "",
      category: "",
      amount: 0,
      date: "",
    });
    onClose();
  };

  const handleAddTransaction = async (e) => {
    try {
      setAddLoading(true);
      e.preventDefault();
      if (transactionValidation()) {
        const { name, category, date, type, amount } = formData;
        const url = API_ADD_TRANSACTION;

        const res = await axios.post(
          url,
          {
            name,
            category,
            date,
            type,
            amount,
            user_id: userId,
          },
          {
            headers: TRANSACTION_HEADERS(userId),
          }
        );

        if (res.status === SUCCESS_OK) {
          handleSuccess();
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAddLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(); // Close the modal after the animation
    }, 300); // Match the animation duration
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`relative flex  w-[400px] flex-col justify-center rounded-xl bg-white px-4 py-6 transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        <h1 className="text-xl font-semibold">Add Transaction</h1>
        <button onClick={handleCloseModal} className="absolute right-6 top-4">
          <IoClose className="text-xl text-slate-600" />
        </button>

        <p className="text-slate-500 text-xs mt-2">Add your transaction</p>

        <form
          onSubmit={handleAddTransaction}
          className="flex flex-col gap-3 mt-3"
        >
          <InputContainer>
            <InputLabel name="Transaction Name" />
            <InputElement
              required
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={handleChange}
              value={formData.name}
            />
          </InputContainer>

          <div className="relative flex flex-col gap-1">
            <InputLabel name="Transaction Type" />
            <SelectInput
              name="type"
              onChange={handleChange}
              value={formData.type}
            >
              {TRANSACTION_TYPES.map((option) => {
                const { name, value } = option;
                return (
                  <option key={value} value={value}>
                    {name}
                  </option>
                );
              })}
            </SelectInput>

            <div className="pointer-events-none absolute top-9 right-3 flex items-center text-slate-600">
              <FiChevronDown className="w-5 h-5" />
            </div>
          </div>

          <div className="relative flex flex-col gap-1">
            <InputLabel name="Category" />
            <SelectInput
              onChange={handleChange}
              value={formData.category}
              name="category"
            >
              {CATEGORY_OPTIONS.map((option) => {
                const { name, value } = option;
                return (
                  <option key={value} value={value}>
                    {name}
                  </option>
                );
              })}
            </SelectInput>

            <div className="pointer-events-none absolute top-9 right-3 flex items-center text-slate-600">
              <FiChevronDown className="w-5 h-5" />
            </div>
          </div>

          <InputContainer>
            <InputLabel name="Amount" />
            <InputElement
              required
              onChange={handleChange}
              value={formData.amount}
              type="number"
              name="amount"
              placeholder="Enter Amount"
            />
          </InputContainer>

          <InputContainer>
            <InputLabel name="Date" />
            <InputElement
              required
              type="datetime-local"
              placeholder="Enter Date"
              onChange={handleChange}
              value={formData.date}
              name="date"
            />
          </InputContainer>

          <LoadingButton action={ACTION_TYPES.add} isLoading={addLoading} />
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
