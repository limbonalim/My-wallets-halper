import { Alert, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { XCircle } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  closeForm,
  selectCreateError,
  selectIsCreateLoading,
} from '../../feachers/Wallets/WalletsSlice';
import { createWallet, getWallets } from '../../feachers/Wallets/WalletsThunks';
import { WalletFormState, WalletFormStateMutation } from '../../types';
import './WalletForm.scss';

interface Props {
  title: 'Edit' | 'Create';
  show: boolean;
  type?: string;
}

const MYButton = styled(LoadingButton)(({ theme }) => ({
  border: '1px solid #989898',
  borderRadius: '30px',
  padding: 10,
}));

const WalletForm: React.FC<Props> = ({ title, show, type }) => {
  const [state, setState] = useState<WalletFormState>({ name: '', amount: '' });
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsCreateLoading);
  const error = useAppSelector(selectCreateError);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;
    const wallet: WalletFormStateMutation = {
      name: state.name,
      amount: parseFloat(state.amount),
      type,
    };
    await dispatch(createWallet(wallet)).unwrap();
    await dispatch(getWallets(type));
    dispatch(closeForm());
    setState({ name: '', amount: '' });
  };

  const buttomCloseHandler = () => {
    dispatch(closeForm());
    setState({ name: '', amount: '' });
  };

  return (
    show && (
      <>
        {error ? <Alert severity="error" sx={{margin: '15px 0'}}>{error?.message}</Alert> : null}
        <div className="WalletForm__header">
          <Typography>{title} wallet</Typography>
          <button
            className="WalletForm__closeButton"
            onClick={buttomCloseHandler}
          >
            <XCircle size={32} color="#030303" />
          </button>
        </div>
        <form onSubmit={formSubmitHandler}>
          <div className="WalletForm">
            <label form="name">
              <Typography>Name</Typography>
            </label>
            <input
              onChange={inputChangeHandler}
              value={state.name}
              id="name"
              name="name"
              className="WalletForm__input"
              required
            />
            <label form="amount">
              <Typography>Amount</Typography>
            </label>
            <input
              onChange={inputChangeHandler}
              value={state.amount}
              id="amount"
              name="amount"
              className="WalletForm__input"
              type="number"
              required
            />
            <MYButton loading={isLoading} variant="outlined" type="submit">
              {title}
            </MYButton>
          </div>
        </form>
      </>
    )
  );
};

export default WalletForm;
