import * as React from "react";
import { formatAmount, formatDate } from "../../utils/format";
import "./TransactionDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { transactionId } = useParams(null);
  useEffect(() => {
    const fetchTransactionById = async () => {
      setIsLoading(true);
      setHasFetched(false);
      try {
        //http://localhost:3001/bank/transactions
        const response = await axios.get(
          `http://localhost:3001/bank/transactions/${transactionId}`
        );
        if (response.status !== 200) {
          setError(response.data);
        }
        setTransaction(response.data.transaction);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
      setHasFetched(true);
    };

    fetchTransactionById();
  }, []);
  return (
    <div className="transaction-detail">
      <TransactionCard
        transaction={transaction}
        transactionId={transactionId}
        isLoading={isLoading}
        hasFetched={hasFetched}
        error={error}
      />
    </div>
  );
}

export function TransactionCard(props) {
  if (!props.error && props.transaction) {
    return (
      <div className="transaction-card card">
        <div className="card-header">
          <h3>Transaction #{props.transactionId}</h3>
          <p className="category">{props.transaction.category}</p>
        </div>

        <div className="card-content">
          <p className="description">{props.transaction.description}</p>
        </div>

        <div className="card-footer">
          <p
            className={`amount ${props.transaction.amount < 0 ? "minus" : ""}`}
          >
            {formatAmount(props.transaction.amount)}
          </p>
          <p className="date">{formatDate(props.transaction.postedAt)}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card-header">
        <h3>Transaction #{props.transactionId}</h3>
        <h1>Not Found</h1>
      </div>
    );
  }
}
