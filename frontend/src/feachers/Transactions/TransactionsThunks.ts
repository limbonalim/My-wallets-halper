import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {
  ApiError,
  ITransaction,
  IWallet,
  TransactionFormData,
  UpdateTransactionFormData,
} from '../../types';
import { isAxiosError } from 'axios';

export const getWallet = createAsyncThunk<
  IWallet,
  string,
  { rejectValue: ApiError }
>('transactions/getWallet', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get(`wallets/${id}`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 404) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const getTransactions = createAsyncThunk<
  ITransaction[],
  string | null,
  { rejectValue: ApiError }
>('transactions/getTransactions', async (walletId, { rejectWithValue }) => {
  try {
    if (walletId) {
      const response = await axiosApi.get(`/transactions/${walletId}`);
      return response.data;
    }
    const response = await axiosApi.get(`/transactions`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 404) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const deleteTransaction = createAsyncThunk<
  void,
  string,
  { rejectValue: ApiError }
>(
  'transactions/deleteTransaction',
  async (transactionId, { rejectWithValue }) => {
    try {
      await axiosApi.delete(`/transactions/${transactionId}`);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const createTransaction = createAsyncThunk<
  void,
  TransactionFormData,
  { rejectValue: ApiError }
>(
  'transactions/createTransaction',
  async (transaction, { rejectWithValue }) => {
    try {
      await axiosApi.post(
        `/transactions/${transaction.wallet}`,
        transaction.transaction,
      );
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const updateTransaction = createAsyncThunk<
  void,
  UpdateTransactionFormData,
  { rejectValue: ApiError }
>('transactions/updateTransaction', async (data, { rejectWithValue }) => {
  try {
    await axiosApi.put(
      `/transactions/${data.transactionId}?wallet=${data.wallet}`,
      data.transaction,
    );
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }
    if (isAxiosError(e) && e.response && e.response.status === 404) {
      return rejectWithValue(e.response.data);
    }
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
