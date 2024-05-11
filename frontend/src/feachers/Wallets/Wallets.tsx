import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { Typography } from '@mui/material';
import Icon from '../../components/Icon/Icon';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectError, selectIsLoading, selectShowForm, selectWallets, showForm } from './WalletsSlice';
import { getWallets } from './WalletsThunks';
import './Wallets.scss';
import AddButton from '../../components/ui/AddButton/AddButton';
import WalletForm from '../../components/AddWalletForm/WalletForm';


const Wallets = () => {
  const { type } = useParams();
  const dispatch = useAppDispatch();
  const wallets = useAppSelector(selectWallets);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const showFormState = useAppSelector(selectShowForm);

  useEffect(() => {
    if (type) {
      dispatch(getWallets(type));
    }
  }, [type, dispatch]);

  const showFormFields = () => {
    dispatch(showForm())
  }

  return (
    <div className="Wallets">
      <div className="Wallets__title">
        {type ? (
          <Icon type={type} displayStyleClassName="Wallets__icon" />
        ) : null}
        <Typography>{type}</Typography>
      </div>
      <div></div>
      <div className="Wallets__formWrapper">
        <WalletForm title="Create" show={showFormState} type={type} />
      </div>
      <AddButton onClick={showFormFields} />
    </div>
  );
};

export default Wallets;
