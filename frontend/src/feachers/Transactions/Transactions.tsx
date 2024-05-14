import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTransactions, selectWallet } from './TransactionsSlice';
import { getWallet } from './TransactionsThunks';
import Wallet from '../../components/wallet/Wallet';

const Transactions = () => {
  const { type, id } = useParams();
  const wallet = useAppSelector(selectWallet);
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  const getData = () => {
    if (id) {
      dispatch(getWallet(id));
    }
  };

  useEffect(() => {
    void getData();
  }, [dispatch, id]);

  return (
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
  );
};

export default Transactions;
