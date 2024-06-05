import { Alert, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  getAnalitics,
  getWallet,
  getWallets,
} from '../../feachers/Analitics/AnaliticsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectWallets } from '../../feachers/Analitics/AnaliticsSlice';

const AnaliticsSelect = () => {
  const dispatch = useAppDispatch();
  const wallets = useAppSelector(selectWallets);
  const [walletId, setWalletId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getWallets()).unwrap();
  }, [dispatch]);

  const getAnaliticsData = (interval: string) => {
    setError(null);
    if (walletId) {
      dispatch(getWallet(walletId)).unwrap();
      dispatch(getAnalitics({ interval, wallet: walletId })).unwrap();
    } else {
      setError('wallet should not be empty');
    }
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value } = e.target;
    setWalletId(value);
  };
  return (
    <div>
      {error ? (
        <Alert severity="error" sx={{ margin: '15px 0' }}>
          {error}
        </Alert>
      ) : null}
      <label form="walletId">
        <Typography>Chose wallet</Typography>
      </label>
      <select
        onChange={inputChangeHandler}
        value={walletId}
        id="walletId"
        name="walletId"
        className="Base_input Base_input_select"
      >
        <option value="">empty</option>
        {wallets.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      <button onClick={() => getAnaliticsData('week')}>Week</button>
      <button onClick={() => getAnaliticsData('mounth')}>Mounth</button>
    </div>
  );
};

export default AnaliticsSelect;
