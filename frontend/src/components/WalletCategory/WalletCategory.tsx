import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { WalletType } from '../../constants';
import './WalletCategory.scss';

interface Props {
  type: WalletType;
}

const WalletCategory: React.FC<Props> = ({ type }) => {
  const path = `/wallets/${type}`;

  return (
    <Link to={path} className="WalletCategory__link">
      <div className="WalletCategory">
        <Icon type={type} displayStyleClassName="WalletCategory__icon" />
        <Typography>{type}</Typography>
      </div>
    </Link>
  );
};

export default WalletCategory;
