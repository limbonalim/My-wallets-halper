import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { PencilLine, Trash } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteTransaction,
  getTransactions,
} from '../../feachers/Transactions/TransactionsThunks';
import TransactionForm from '../TransactionForm/TransactionForm';
import FormatDate from '../ui/FormatDate/FormatDdate';
import { ITransaction } from '../../types';
import TransactionStyle from './Transaction-style';
import './Transaction.scss';
import { selectWallet } from '../../feachers/Transactions/TransactionsSlice';

const Transaction: React.FC<ITransaction> = ({
  _id,
  type,
  dataTime,
  category,
  amount,
}) => {
  const [isShowEditForm, setIsShowEditForm] = useState<boolean>(false);
  const wallet = useAppSelector(selectWallet);
  const dispatch = useAppDispatch();
  const data = new FormatDate(parseFloat(dataTime));
  const sum = type === 'income' ? `${amount}` : `-${amount}`;
  const amountColor =
    type === 'income'
      ? TransactionStyle.amountIncome
      : TransactionStyle.amountOutcome;

  const deleteHandler = async () => {
    if (wallet) {
      await dispatch(deleteTransaction(_id)).unwrap();
      await dispatch(getTransactions(wallet._id)).unwrap();
    }
  };

  const editTransaction = () => {
    setIsShowEditForm((prev) => !prev);
  };

  return (
    <div className="Transaction">
      <div className="Transaction__flex">
        <Typography sx={{ ...TransactionStyle.amount, ...amountColor }}>
          {type}
        </Typography>
        <Typography sx={{ ...TransactionStyle.amount, ...amountColor }}>
          {sum}
        </Typography>
        <Typography>{category}</Typography>
        <Typography>{data.getFormatDate()}</Typography>
      </div>
      <div className="Transaction__buttons">
        <button className="Base_batton" onClick={editTransaction}>
          <PencilLine size={25} color="#030303" />
        </button>
        <button className="Base_batton_delete" onClick={deleteHandler}>
          <Trash size={25} color="#030303" />
        </button>
      </div>
      <TransactionForm
        title="Edit"
        show={isShowEditForm}
        onClose={editTransaction}
        wallet={wallet?._id || ''}
        editTransaction={{
          _id,
          type,
          dataTime,
          category,
          amount,
        }}
      />
    </div>
  );
};

export default Transaction;
