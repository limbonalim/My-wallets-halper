import { Alert, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ApiError } from '../../types';
import { TransactionTypeSelectData } from '../../constants';

export interface TransactionFormMutation {
  type: string;
  category: string;
  dateTime: string;
}

const TransactionForm = () => {
  const show = true;
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

  return (
    show && (
      <>
        {/* {error ? (
            <Alert severity="error" sx={{ margin: '15px 0' }}>
              {error?.message}
            </Alert>
          ) : null} */}
        <div>
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
          </form>
        </div>
      </>
    )
  );
};

export default TransactionForm;
