import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTransactions, selectWallet } from './TransactionsSlice';
import { getTransactions, getWallet } from './TransactionsThunks';
import Wallet from '../../components/wallet/Wallet';
import Transaction from '../../components/Transaction/Transaction';
import './Transactions.scss';
import TansactionsStyle from './Transactions-style';
import AddButton from '../../components/ui/AddButton/AddButton';
import TransactionForm from '../../components/TransactionForm/TransactionForm';

const Transactions = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { type, id } = useParams();
  const wallet = useAppSelector(selectWallet);
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  const getData = async () => {
    if (id) {
      await dispatch(getWallet(id)).unwrap();
      await dispatch(getTransactions(id)).unwrap();
    } else {
      await dispatch(getTransactions(null)).unwrap();
    }
  };

  useEffect(() => {
    void getData();
  }, [dispatch, id]);

  const onCloseForm = () => {
    setOpenForm((prev) => !prev);
  };

  return (
    <>
      <div>
        {wallet ? (
          <Wallet
            _id={wallet?._id}
            amount={wallet?.amount}
            name={wallet?.name}
            type={wallet?.type}
          />
        ) : null}
      </div>

      {wallet && (
        <>
          <AddButton onClick={onCloseForm} />
          <TransactionForm
            title="Create"
            show={openForm}
            onClose={onCloseForm}
            wallet={wallet?._id}
          />
        </>
      )}

      <div>
        <div className="Transactions__table_head">
          <Typography sx={TansactionsStyle.tableHead}>Type</Typography>
          <Typography sx={TansactionsStyle.tableHead}>Amount</Typography>
          <Typography sx={TansactionsStyle.tableHead}>Category</Typography>
          <Typography sx={TansactionsStyle.tableHead}>Data</Typography>
        </div>
        {transactions.map((item) => (
          <Transaction
            key={item._id}
            _id={item._id}
            category={item.category}
            type={item.type}
            dataTime={item.dataTime}
            amount={item.amount}
          />
        ))}
      </div>
    </>
  );
};

export default Transactions;
