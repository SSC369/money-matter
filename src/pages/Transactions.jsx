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
  TAB_OPTIONS,
  TRANSACTION_HEADERS,
} from "../contants";
import { UserContext } from "../context/userContext";
import ErrorPage from "../components/ErrorPage";

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
  const [editTransactionData, setEditTransactionData] = useState({
    name: "",
    type: "",
    category: "",
    amount: 0,
    date: "",
    id: "",
  });

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
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleteLoading(false);
      //set this as null
      setDeleteTransactionId("");
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
            setEditTransactionData={setEditTransactionData}
            setShowEditTransactionModal={setShowEditTransactionModal}
            setShowAlertModal={setShowAlertModal}
            setDeleteTransactionId={setDeleteTransactionId}
          />
        );
      }
      return null;
    }
  );

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
      {RenderTransactions(activeTab)}
      {renderEditTransactionModal()}
      {renderConfirmModal()}
    </div>
  );
};

export default Transactions;
