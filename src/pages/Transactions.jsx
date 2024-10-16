import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { v4 } from "uuid";

import { TransactionContext } from "../context/transactionContext";
import ConfirmModal from "../components/ConfirmModal";
import EditTransactionModal from "../components/EditTransactionModal";
import TransactionItem from "../components/TransactionItem";
import Loader from "../components/Loader";
import EmptyView from "../components/EmptyView";
import {
  ACTION_TYPES,
  API_DELETE_TRANSACTION,
  SUCCESS_OK,
  TAB_OPTIONS,
} from "../constants";
import { UserContext } from "../context/userContext";
import ErrorPage from "../components/ErrorPage";
import { TRANSACTION_HEADERS } from "../utils/headerUtils";
import TransactionOption from "../components/TransactionOption";

const Transactions = () => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const {
    activeTab,
    transactions,
    isTransactionsLoading,
    transactionsMutate,
    totalDebitCreditTransactionsMutate,
    deleteTransactionId,
    setDeleteTransactionId,
    showEditTransactionModal,
    setShowEditTransactionModal,
    transactionsError,
  } = useContext(TransactionContext);

  const [editTransactionId, setEditTransactionId] = useState(null);

  const { userId } = useContext(UserContext);

  const handleTransactionDeleteSuccess = () => {
    toast.success("Transaction deleted");
    transactionsMutate();
    totalDebitCreditTransactionsMutate();
  };

  const handleTransactionDelete = async () => {
    try {
      setIsDeleteLoading(true);
      const url = API_DELETE_TRANSACTION + deleteTransactionId;
      const res = await axios.delete(url, {
        headers: TRANSACTION_HEADERS(userId),
      });

      if (res.status === SUCCESS_OK) {
        handleTransactionDeleteSuccess();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleteLoading(false);
      setDeleteTransactionId(null);
      setTimeout(() => {
        setShowAlertModal(false);
      }, 1000);
    }
  };

  const renderAllTransactionTypes = () => {
    if (transactions.length === 0 || !transactions) {
      return <EmptyView />;
    }
    const data = transactions?.map(
      ({ transaction_name, id, category, amount, date, type }) => {
        return (
          <TransactionItem
            key={v4()}
            data={{
              transaction_name,
              id,
              category,
              amount,
              date,
              type,
            }}
            setEditTransactionId={setEditTransactionId}
            setShowEditTransactionModal={setShowEditTransactionModal}
            setShowAlertModal={setShowAlertModal}
            setDeleteTransactionId={setDeleteTransactionId}
          />
        );
      }
    );

    return data;
  };

  const renderCreditTransactions = () => {
    let filteredData = [];
    transactions?.forEach((data) => {
      if (data.type === TAB_OPTIONS.credit) {
        filteredData.push(
          <TransactionItem
            key={v4()}
            data={{
              ...data,
            }}
            setEditTransactionId={setEditTransactionId}
            setShowEditTransactionModal={setShowEditTransactionModal}
            setShowAlertModal={setShowAlertModal}
            setDeleteTransactionId={setDeleteTransactionId}
          />
        );
      }
    });
    console.log(filteredData);
    if (filteredData.length === 0) {
      return <EmptyView />;
    }
    return filteredData;
  };

  const renderDebitTransactions = () => {
    const filteredData = [];
    transactions?.forEach(
      ({ transaction_name, id, category, amount, date, type }) => {
        if (type === TAB_OPTIONS.debit) {
          filteredData.push(
            <TransactionItem
              key={v4()}
              data={{
                transaction_name,
                id,
                category,
                amount,
                date,
                type,
              }}
              setEditTransactionId={setEditTransactionId}
              setShowEditTransactionModal={setShowEditTransactionModal}
              setShowAlertModal={setShowAlertModal}
              setDeleteTransactionId={setDeleteTransactionId}
            />
          );
        }
      }
    );

    if (filteredData.length === 0) {
      return <EmptyView />;
    }
    return filteredData;
  };

  const renderTransactionDataByTab = () => {
    switch (true) {
      case activeTab === TAB_OPTIONS.transactions:
        return renderAllTransactionTypes();
      case activeTab === TAB_OPTIONS.credit:
        return renderCreditTransactions();
      case activeTab === TAB_OPTIONS.debit:
        return renderDebitTransactions();
      default:
        break;
    }
  };

  const RenderTransactions = () => {
    return (
      <>
        {isTransactionsLoading ? (
          <div className="flex items-center justify-center h-[60dvh]">
            <Loader />
          </div>
        ) : (
          <>
            {transactions?.length === 0 ? (
              <EmptyView />
            ) : (
              <ul className="flex gap-2 md:gap-0 md:flex-col flex-wrap md:bg-white rounded-xl p-2 px-4 mt-2">
                {renderTransactionDataByTab()}
              </ul>
            )}
          </>
        )}
      </>
    );
  };

  const renderConfirmModal = () => {
    if (showAlertModal) {
      return (
        <ConfirmModal
          onClose={() => setShowAlertModal(false)}
          setActionId={setDeleteTransactionId}
          isLoading={isDeleteLoading}
          action={ACTION_TYPES.delete}
          actionHandler={() => handleTransactionDelete()}
        />
      );
    }
  };

  const getTransaction = () => {
    let transactionData;
    if (editTransactionId) {
      transactionData = transactions.find(
        (transaction) => transaction.id === editTransactionId
      );
    }
    return transactionData;
  };

  const renderEditTransactionModal = () => {
    if (showEditTransactionModal) {
      const data = getTransaction();
      return (
        <EditTransactionModal
          onClose={() => {
            setShowEditTransactionModal(false);
            setEditTransactionId(null);
          }}
          data={data}
        />
      );
    }
  };

  const renderTransactionTabs = () => {
    const options = Object.keys(TAB_OPTIONS);
    return (
      <ul
        style={{ color: "rgba(113, 142, 191, 1)" }}
        className="flex md:hidden items-center gap-6 text-sm mx-auto w-fit mb-6"
      >
        {options.map((option) => (
          <TransactionOption key={option} option={option} />
        ))}
      </ul>
    );
  };

  if (transactionsError) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-dh w-full p-4 bg-slate-100 dark:bg-slate-800">
      <h1 className="md:none text-xl dark:text-slate-200 font-semibold text-center mb-4">
        Transactions
      </h1>
      {renderTransactionTabs()}
      {RenderTransactions(activeTab)}
      {renderEditTransactionModal()}
      {renderConfirmModal()}
    </div>
  );
};

export default Transactions;
