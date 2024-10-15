import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

import { UserContext } from "./userContext";
import {
  API_ALL_TRANSACTIONS,
  API_TOTAL_DEBIT_CREDIT_TRANSACTIONS,
  INITIAL_ACTIVE_TAB,
  NUMBER_OF_TRANSACTIONS,
  TRANSACTION_HEADERS,
} from "../contants";

export const TransactionContext = createContext();

//This function is not required as we are already doing null check in the above component
const getUserDetails = () => {
  const { userId } = useContext(UserContext);
  if (!userId) {
    throw new Error("userId is not defined");
  } else {
    return { userId };
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(INITIAL_ACTIVE_TAB);
  const { userId } = getUserDetails();
  const [showEditTransactionModal, setShowEditTransactionModal] =
    useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState(null);

  //No magic numbers
  const transactionsFetcher = async (url) => {
    try {
      const res = await axios({
        method: "get",
        baseURL: url,
        params: {
          limit: 100,
          offset: 0,
        },
        headers: {
          "Content-Type": "application/json",
          ...TRANSACTION_HEADERS(userId), //move this to utils and add the proper naming format
        },
      });
      if (res.status === 200) {
        const { data } = res;
        const { transactions } = data;
        return transactions;
      } else {
        toast.error("Responded with status" + res.status);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    mutate: transactionsMutate,
    error: transactionsError,
  } = useSWR(API_ALL_TRANSACTIONS, transactionsFetcher);

  const totalDebitCreditTransactionsFetcher = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          ...TRANSACTION_HEADERS(userId),
        },
      });
      if (res.status === 200) {
        const { data } = res;
        const { totals_credit_debit_transactions } = data;
        return totals_credit_debit_transactions;
      } else {
        toast.error("Responded with status" + res.status);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: totalDebitCreditTransactionsData,
    isLoading: isTotalDebitCreditTransactionsLoading,
    mutate: totalDebitCreditTransactionsMutate,
    error: totalDebitCreditTransactionsError,
  } = useSWR(
    API_TOTAL_DEBIT_CREDIT_TRANSACTIONS,
    totalDebitCreditTransactionsFetcher
  );

  let latestTransactions = [];

  if (!isTransactionsLoading) {
    latestTransactions = transactions
      ?.sort((first, second) => new Date(second.date) - new Date(first.date))
      .slice(0, NUMBER_OF_TRANSACTIONS);
  }

  return (
    <TransactionContext.Provider
      value={{
        activeTab,
        setActiveTab,
        latestTransactions,
        isTransactionsLoading,
        transactions,
        transactionsMutate,
        totalDebitCreditTransactionsData,
        isTotalDebitCreditTransactionsLoading,
        totalDebitCreditTransactionsMutate,
        showEditTransactionModal,
        setShowEditTransactionModal,
        deleteTransactionId,
        setDeleteTransactionId,
        transactionsError,
        totalDebitCreditTransactionsError,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
