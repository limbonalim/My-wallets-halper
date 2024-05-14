import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { IWallet } from '../../types';
import './Wallet.scss';
import {
  CreditCard,
  CurrencyBtc,
  Pencil,
  Wallet as WalletIcon,
} from '@phosphor-icons/react';
import WalletForm from '../AddWalletForm/WalletForm';

const Wallet: React.FC<IWallet> = ({ _id, name, amount, type }) => {
  const path = `/transactions/${type}/${_id}`;
  const [edit, setEdit] = useState<boolean>(false);
  let icon;

  switch (type) {
    case 'crypto':
      icon = <CurrencyBtc size={25} color="#030303" />;
      break;
    case 'wallet':
      icon = <WalletIcon size={25} color="#030303" />;
      break;
    case 'card':
      icon = <CreditCard size={25} color="#030303" />;
      break;
  }

  const closeEditForm = () => {
    setEdit(false);
  };

  return (
    <div className="Wallet">
      <Link to={path} className="Wallet__link">
        {icon}
        <Typography>
          {name} - {amount} KGC
        </Typography>
      </Link>
      <button
        className="Base_batton Wallet__button"
        onClick={() => setEdit((prev) => !prev)}
      >
        <Pencil size={32} color="#030303" />
      </button>
      <WalletForm
        title="Edit"
        show={edit}
        type={type}
        onClose={closeEditForm}
        editData={{ _id, name, amount, type }}
      />
    </div>
  );
};

export default Wallet;
