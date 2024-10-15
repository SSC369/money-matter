import React, { useContext } from "react";
import { TransactionContext } from "../context/transactionContext";
import creditImage from "../assets/credit.png";
import debitImage from "../assets/debit.png";
import Loader from "../components/Loader";
import { TRANSACTION_TYPES_OBJECT } from "../constants";

const TotalDebitCredit = () => {
  const {
    totalDebitCreditTransactionsData,
    isTotalDebitCreditTransactionsLoading,
    totalDebitCreditTransactionsError,
  } = useContext(TransactionContext);

  if (totalDebitCreditTransactionsError) {
    return <h1>Something went wrong !!!</h1>;
  }

  const renderImage = (isTypeCredit) => {
    if (isTypeCredit) {
      return (
        <img
          className="h-24"
          src={creditImage}
          alt={TRANSACTION_TYPES_OBJECT.credit}
        />
      );
    }
    return (
      <img
        className="h-24"
        src={debitImage}
        alt={TRANSACTION_TYPES_OBJECT.debit}
      />
    );
  };

  return (
    <div>
      {isTotalDebitCreditTransactionsLoading ? (
        <div className="flex items-center justify-center h-[100px]">
          <Loader />
        </div>
      ) : (
        <div className="flex items-center gap-4 justify-around mx-auto">
          {totalDebitCreditTransactionsData?.map((total, index) => {
            const { type, sum } = total;

            const isTypeCredit = type === TRANSACTION_TYPES_OBJECT.credit;

            return (
              <div
                key={index}
                className="flex items-start bg-white rounded-xl p-2 pl-6 justify-between w-2/4 "
              >
                <div>
                  <p
                    className="text-3xl font-semibold"
                    style={
                      isTypeCredit
                        ? { color: "rgba(22, 219, 170, 1)" }
                        : { color: "rgba(254, 92, 115, 1)" }
                    }
                  >
                    ${sum}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(113, 142, 191, 1)" }}
                  >
                    {type}
                  </p>
                </div>

                {renderImage(isTypeCredit)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TotalDebitCredit;
