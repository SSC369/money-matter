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
import { API_DELETE_TRANSACTION, TRANSACTION_HEADERS } from "../contants";
import ErrorPage from "../components/ErrorPage";
import TotalDebitCredit from "./TotalDebitCredit";

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
  } = useContext(TransactionContext);
  const [editTransactionData, setEditTransactionData] = useState({
    name: "",
    type: "",
    category: "",
    amount: 0,
    date: "",
    id: "",
  });

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [showAlertModal, setShowAlertModal] = useState(false);
  const { userId } = useContext(UserContext);

  const handleTransactionDelete = async () => {
    try {
      setIsDeleteLoading(true);
      const url = API_DELETE_TRANSACTION + deleteTransactionId;

      const res = await axios.delete(url, {
        headers: TRANSACTION_HEADERS(userId),
      });

      if (res.status === 200) {
        toast.success("Transaction deleted");
        transactionsMutate();
        totalDebitCreditTransactionsMutate();
      } else {
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteTransactionId("");
      setIsDeleteLoading(false);
      setTimeout(() => {
        setAlertModal(false);
      }, 1000);
    }
  };

  //Move this to function
  let transactionsData = [];
  latestTransactions?.forEach(
    ({ transaction_name, id, category, amount, date, type }) => {
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
          setEditTransactionData={setEditTransactionData}
          setShowEditTransactionModal={setShowEditTransactionModal}
          setShowAlertModal={setShowAlertModal}
          setDeleteTransactionId={setDeleteTransactionId}
        />
      );
    }
  );

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
  };

  const renderEditTransactionModal = () => {
    if (showEditTransactionModal) {
      return (
        <EditTransactionModal
          onClose={() => {
            setShowEditTransactionModal(false);
            setEditTransactionData({
              name: "",
              type: "",
              category: "",
              amount: 0,
              date: "",
              id: "",
            });
          }}
          data={editTransactionData}
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
              {transactionsData.map((t) => t)}
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
