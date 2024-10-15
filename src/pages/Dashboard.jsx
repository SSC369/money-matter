import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import ConfirmModal from "../components/ConfirmModal";
import EditTransactionModal from "../components/EditTransactionModal";
import { TransactionContext } from "../context/transactionContext";
import TransactionItem from "../components/TransactionItem";
import Loader from "../components/Loader";
import EmptyView from "../components/EmptyView";
import ChartComponent from "./Chart";
import { UserContext } from "../context/userContext";
import { API_DELETE_TRANSACTION, SUCCESS_OK } from "../constants";
import ErrorPage from "../components/ErrorPage";
import TotalDebitCredit from "./TotalDebitCredit";
import { TRANSACTION_HEADERS } from "../utils/headerUtils";

const Dashboard = () => {
  const {
    latestTransactions,
    isTransactionsLoading,
    transactionsMutate,
    totalDebitCreditTransactionsMutate,
    deleteTransactionId,
    setDeleteTransactionId,
    showEditTransactionModal,
    setShowEditTransactionModal,
    transactionsError,
    transactions,
  } = useContext(TransactionContext);
  const [editTransactionId, setEditTransactionId] = useState(null);

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [showAlertModal, setShowAlertModal] = useState(false);
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
      } else {
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteTransactionId(null);
      setIsDeleteLoading(false);
      setTimeout(() => {
        setShowAlertModal(false);
      }, 1000);
    }
  };

  const getTransactionsData = () => {
    const transactionsData = latestTransactions?.map(
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

    return transactionsData;
  };

  const renderAlertModal = () => {
    if (showAlertModal) {
      return (
        <ConfirmModal
          toggleModal={() => setShowAlertModal(false)}
          setActionId={setDeleteTransactionId}
          actionLoading={isDeleteLoading}
          action={"delete"}
          actionHandler={() => handleTransactionDelete()}
        />
      );
    }
    return <></>;
  };

  const getEditTransaction = () => {
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
      const data = getEditTransaction();
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
      <TotalDebitCredit />
      <h1
        className="font-semibold mt-4"
        style={{ color: "rgba(51, 59, 105, 1)" }}
      >
        Last Transactions
      </h1>

      {isTransactionsLoading ? (
        <div className="flex items-center justify-center h-[60dvh]">
          <Loader />
        </div>
      ) : (
        <>
          {isTransactionsLoading === false &&
          latestTransactions?.length === 0 ? (
            <EmptyView />
          ) : (
            <ul className="bg-white rounded-xl p-2 px-4 flex flex-col gap-2 mt-2">
              {getTransactionsData().map((t) => t)}
            </ul>
          )}
        </>
      )}

      {/* <ChartComponent /> */}

      {renderAlertModal()}

      {renderEditTransactionModal()}
    </div>
  );
};

export default Dashboard;
