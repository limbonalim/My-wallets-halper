import { Alert, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { XCircle } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  closeForm,
  selectFormError,
  selectIsFormLoading,
} from '../../feachers/Wallets/WalletsSlice';
import {
  createWallet,
  getWallets,
  updateWallet,
} from '../../feachers/Wallets/WalletsThunks';
import { WalletTypeSelectData } from '../../constants';
import {
  IWallet,
  UpdateWalletFormData,
  WalletFormState,
  WalletFormStateMutation,
} from '../../types';
import './WalletForm.scss';
import FormSubmitButton from '../ui/FormSubmitButton/FormSubmitButton';

interface Props {
  title: 'Edit' | 'Create';
  show: boolean;
  type?: string;
  onClose?: () => void;
  editData?: IWallet;
}

const WalletForm: React.FC<Props> = ({
  title,
  show,
  type,
  onClose,
  editData,
}) => {
  const [state, setState] = useState<WalletFormState>({
    name: '',
    type: '',
    amount: '',
  });
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsFormLoading);
  const error = useAppSelector(selectFormError);

  useEffect(() => {
    if (editData) {
      setState({
        name: editData.name,
        type: editData.type,
        amount: editData.amount.toString(),
      });
    }
  }, [editData]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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
    
    if (!editData) {
      await dispatch(createWallet(wallet)).unwrap();
      await dispatch(getWallets(type));
    } else {
      const wallet: WalletFormStateMutation = {
        name: state.name,
        amount: parseFloat(state.amount),
        type: state.type
      };
      const data: UpdateWalletFormData = {
        wallet: wallet,
        id: editData._id,
      };
      await dispatch(updateWallet(data)).unwrap();
    }
    onClose ? onClose() : null;
    dispatch(closeForm());
    setState({ name: '', type: '', amount: '' });
  };

  const buttomCloseHandler = () => {
    dispatch(closeForm());
    onClose ? onClose() : null;
    setState({ name: '', type: '', amount: '' });
  };

  return (
    show && (
      <>
        {error ? (
          <Alert severity="error" sx={{ margin: '15px 0' }}>
            {error?.message}
          </Alert>
        ) : null}
        <div className="WalletForm__header">
          <Typography>{title} wallet</Typography>
          <button className="Base_batton" onClick={buttomCloseHandler}>
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
              className="Base_input"
              required
            />
            <label form="type">
              <Typography>Type</Typography>
            </label>
            <select
              onChange={inputChangeHandler}
              value={state.type}
              id="type"
              name="type"
              className="Base_input Base_input_select"
              required
            >
              <option value="">empty</option>
              {WalletTypeSelectData.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label form="amount">
              <Typography>Amount</Typography>
            </label>
            <input
              onChange={inputChangeHandler}
              value={state.amount}
              id="amount"
              name="amount"
              className="Base_input"
              type="number"
              required
            />
            <FormSubmitButton isLoading={isLoading} title={title} />
          </div>
        </form>
      </>
    )
  );
};

export default WalletForm;
