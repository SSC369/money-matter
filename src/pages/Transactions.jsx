import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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

  //This state can be removed
  const [editTransactionId, setEditTransactionId] = useState(null);

  const { userId } = useContext(UserContext);

  const handleTransactionDelete = async () => {
    try {
      setIsDeleteLoading(true);
      const url = API_DELETE_TRANSACTION + deleteTransactionId;
      const res = await axios.delete(url, {
        headers: TRANSACTION_HEADERS(userId),
      });

      if (res.status === SUCCESS_OK) {
        toast.success("Transaction deleted");
        transactionsMutate();
        totalDebitCreditTransactionsMutate();
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

  //Move this transations to seperate function
  //Change this function to more readable
  let transactionsData = [];
  transactions?.forEach(
    ({ transaction_name, id, category, amount, date, type }) => {
      //Do conditional encapsulation
      if (activeTab === TAB_OPTIONS.transactions || activeTab === type) {
        transactionsData.push(
          <TransactionItem
            key={id}
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
      return null;
    }
  );

  const renderAllTransactionTypes = () => {
    const data = transactions?.map(
      ({ transaction_name, id, category, amount, date, type }) => {
        return (
          <TransactionItem
            key={id}
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
    const data = transactions?.map(
      ({ transaction_name, id, category, amount, date, type }) => {
        if (type === "credit") {
          return (
            <TransactionItem
              key={id}
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
        return <></>;
      }
    );
    return data;
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
            {transactionsData?.length === 0 ? (
              <EmptyView />
            ) : (
              <ul className="bg-white rounded-xl p-2 px-4 flex flex-col gap-2 mt-2">
                {transactionsData.map((t) => t)}
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
          toggleModal={() => setShowAlertModal(false)}
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
      transactionData = transactions.filter(
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

  if (transactionsError) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-dh w-full p-4 bg-slate-100">
      {RenderTransactions(activeTab)}
      {renderEditTransactionModal()}
      {renderConfirmModal()}
    </div>
  );
};

export default Transactions;
