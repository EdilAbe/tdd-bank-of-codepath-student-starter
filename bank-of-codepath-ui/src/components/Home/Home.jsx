import * as React from "react";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import { useEffect } from "react";
import axios from "axios";

export default function Home({
  isLoading,
  setIsLoading,
  transactions,
  setTransactions,
  transfers,
  setTransfers,
  error,
  setError,
  filterInputValue,
  newTransactionForm,
  setNewTransactionForm,
  isCreating,
  setIsCreating,
}) {
  async function handleOnCreateTransaction() {
    setIsCreating(true);
    setError(null);
    try {
      let response = await axios.post(
        "http://localhost:3001/bank/transactions",
        {
          transaction: { ...newTransactionForm },
        }
      );
      await setTransactions((transactions) => [
        ...transactions,
        { ...response.data.transaction },
      ]);
      setNewTransactionForm({
        category: "",
        description: "",
        amount: 0,
      });
    } catch (err) {
      setError(err);
      setIsCreating(false);
    }

    setIsCreating(false);
  }

  const handleOnSubmitNewTransaction = (event) => {
    handleOnCreateTransaction();
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    async function getResults() {
      try {
        let transactionsResponse = await axios.get(
          "http://localhost:3001/bank/transactions"
        );
        transactionsResponse = transactionsResponse.data.transactions;
        setTransactions(transactionsResponse);
        let transfersResponse = await axios.get(
          "http://localhost:3001/bank/transfers"
        );
        transfersResponse = transfersResponse.data.transfers;
        setTransfers(transfersResponse);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    getResults();
    setIsLoading(false);
  }, []);

  const filteredTransactions = transactions?.filter((transaction) => {
    return filterInputValue.length
      ? transaction.description
          ?.toLowerCase()
          .includes(filterInputValue?.toLowerCase())
      : transactions;
  });

  const filteredTransfers = transfers?.filter((transfer) => {
    return filterInputValue.length
      ? transfer.description
          ?.toLowerCase()
          .includes(filterInputValue?.toLowerCase())
      : transfers;
  });

  return (
    <div className="home">
      {error ? <h2>{error}</h2> : null}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <BankActivity
          transactions={filteredTransactions}
          transfers={filteredTransfers}
        />
      )}
      <AddTransaction
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        form={newTransactionForm}
        setForm={setNewTransactionForm}
        handleOnSubmit={handleOnSubmitNewTransaction}
      />
    </div>
  );
}
