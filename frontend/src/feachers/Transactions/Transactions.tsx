import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTransactions, selectWallet } from './TransactionsSlice';
import { getTransactions, getWallet } from './TransactionsThunks';
import Wallet from '../../components/wallet/Wallet';
import Transaction from '../../components/Transaction/Transaction';

const Transactions = () => {
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
      <div>
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
