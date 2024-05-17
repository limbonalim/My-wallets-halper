import { Alert, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ApiError } from '../../types';
import { TransactionTypeSelectData } from '../../constants';
import FormSubmitButton from '../ui/FormSubmitButton/FormSubmitButton';
import { XCircle } from '@phosphor-icons/react';

export interface TransactionFormMutation {
  type: string;
  category: string;
  dateTime: string;
}

interface Props {
  title: 'Edit' | 'Create';
  show: boolean;
}

const TransactionForm: React.FC<Props> = ({title, show}) => {
  const [state, setState] = useState<TransactionFormMutation>({
    type: '',
    category: '',
    dateTime: '',
  });

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
  };

  const buttonCloseHandler = () => {

  }

  return (
    show && (
      <>
        {/* {error ? (
            <Alert severity="error" sx={{ margin: '15px 0' }}>
              {error?.message}
            </Alert>
          ) : null} */}
        <div>
          <div className="WalletForm__header">
            <Typography>{title} wallet</Typography>
            <button className="Base_batton" onClick={buttonCloseHandler}>
              <XCircle size={32} color="#030303" />
            </button>
          </div>
          <form onSubmit={formSubmitHandler}>
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
              {TransactionTypeSelectData.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label form="category">
              <Typography>Category</Typography>
            </label>
            <select
              onChange={inputChangeHandler}
              value={state.category}
              id="category"
              name="category"
              className="Base_input Base_input_select"
              required
            >
              <option value="">empty</option>
              {TransactionTypeSelectData.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label form="dateTime">
              <Typography>Data</Typography>
            </label>
            <input
              onChange={inputChangeHandler}
              value={state.dateTime}
              id="dateTime"
              name="dateTime"
              type="date"
            />
            <FormSubmitButton isLoading={isLoading} title={title} />
          </form>
        </div>
      </>
    )
  );
};

export default TransactionForm;
