import { Alert, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  ITransaction,
  TransactionFormData,
  TransactionFormState,
  TransactionFormStateMutation,
  UpdateTransactionFormData,
} from '../../types';
import {
  TransactionCategorySelectData,
  TransactionTypeSelectData,
} from '../../constants';
import FormSubmitButton from '../ui/FormSubmitButton/FormSubmitButton';
import { XCircle } from '@phosphor-icons/react';
import './TransactionForm.scss';
import FormatDate from '../ui/FormatDate/FormatDdate';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  createTransaction,
  getTransactions,
  getWallet,
  updateTransaction,
} from '../../feachers/Transactions/TransactionsThunks';
import {
  selectCreateError,
  selectIsCreateLoading,
} from '../../feachers/Transactions/TransactionsSlice';

interface Props {
  title: 'Edit' | 'Create';
  show: boolean;
  onClose: () => void;
  wallet: string;
  editTransaction?: ITransaction;
}

const TransactionForm: React.FC<Props> = ({
  title,
  show,
  onClose,
  wallet,
  editTransaction,
}) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<TransactionFormState>({
    type: '',
    category: '',
    amount: '',
    dataTime: '',
  });
  const isLoading = useAppSelector(selectIsCreateLoading);
  const error = useAppSelector(selectCreateError);

  useEffect(() => {
    if (editTransaction) {
      const dataTime = new FormatDate(
        editTransaction.dataTime,
      ).getInputFormatDate();
      setState({
        type: editTransaction.type,
        category: editTransaction.category,
        amount: editTransaction.amount.toString(),
        dataTime,
      });
    }
  }, [editTransaction]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const transaction: TransactionFormStateMutation = {
      type: state.type,
      dataTime: new Date(state.dataTime).toISOString(),
      category: state.category,
      amount: parseFloat(state.amount),
    };
    const data: TransactionFormData = {
      wallet,
      transaction,
    };
    if (editTransaction) {
      const updateData: UpdateTransactionFormData = {
        ...data,
        transactionId: editTransaction._id,
      };
      await dispatch(updateTransaction(updateData)).unwrap();
    } else {
      await dispatch(createTransaction(data)).unwrap();
    }
    await dispatch(getWallet(wallet));
    await dispatch(getTransactions(wallet));
  };

  const buttonCloseHandler = () => {
    onClose();
  };

  return (
    show && (
      <>
        {error ? (
          <Alert severity="error" sx={{ margin: '15px 0' }}>
            {error?.message}
          </Alert>
        ) : null}

        <div className="TransactionForm__header">
          <Typography>{title} transaction</Typography>
          <button className="Base_batton" onClick={buttonCloseHandler}>
            <XCircle size={32} color="#030303" />
          </button>
        </div>
        <form onSubmit={formSubmitHandler}>
          <div className="TransactionForm">
            <label form="type">
              <Typography>Type</Typography>
            </label>
            <select
              onChange={inputChangeHandler}
              value={state.type}
              id="type"
              name="type"
              className="Base_input Base_input_select"
              required
            >
              <option value="">empty</option>
              {TransactionTypeSelectData.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label form="category">
              <Typography>Category</Typography>
            </label>
            <select
              onChange={inputChangeHandler}
              value={state.category}
              id="category"
              name="category"
              className="Base_input Base_input_select"
              required
            >
              <option value="">empty</option>
              {TransactionCategorySelectData.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label form="dateTime">
              <Typography>Amount</Typography>
            </label>
            <input
              onChange={inputChangeHandler}
              value={state.amount}
              id="amount"
              name="amount"
              type="number"
              className="Base_input"
            />
            <label form="dataTime">
              <Typography>Date</Typography>
            </label>
            <input
              onChange={inputChangeHandler}
              value={state.dataTime}
              id="dataTime"
              name="dataTime"
              type="date"
              className="Base_input"
            />
            <FormSubmitButton isLoading={isLoading} title={title} />
          </div>
        </form>
      </>
    )
  );
};

export default TransactionForm;
