import * as React from "react";
import "./AddTransaction.css";

export default function AddTransaction({
  isCreating,
  setIsCreating,
  form,
  setForm,
  handleOnSubmit,
}) {
  const handleOnFormFieldChange = (event) => {
    const { name, value } = event.target;
    //const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        form={form}
        handleOnFormFieldChange={handleOnFormFieldChange}
        handleOnSubmit={handleOnSubmit}
      />
    </div>
  );
}

export function AddTransactionForm(props) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input
            name="description"
            placeholder="Enter a description"
            type="text"
            value={props.form?.description}
            onChange={props.handleOnFormFieldChange}
          />
        </div>
        <div className="field">
          <label>Category</label>
          <input
            name="category"
            placeholder="Enter a category"
            type="text"
            value={props.form?.category}
            onChange={props.handleOnFormFieldChange}
          />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input
            name="amount"
            type="number"
            value={props.form?.amount}
            onChange={props.handleOnFormFieldChange}
          />
        </div>

        <button
          className="btn add-transaction"
          type="submit"
          onClick={props.handleOnSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
}
