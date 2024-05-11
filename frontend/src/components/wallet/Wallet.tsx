import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { IWallet } from '../../types';
import './Wallet.scss';

const Wallet: React.FC<IWallet> = ({ _id, name, amount, type }) => {
  const path = `/transactions/${type}/${_id}`;
  return (
    <Link to={path}>
      <Typography>
        {' '}
        {name} - {amount} KGC
      </Typography>
    </Link>
  );
};

export default Wallet;
