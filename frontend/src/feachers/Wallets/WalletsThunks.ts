import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiError, IWallet, WalletFormStateMutation } from '../../types';
import { isAxiosError } from 'axios';

export const getWallets = createAsyncThunk<
  IWallet[],
  string,
  { rejectValue: ApiError }
>('wallets/getWallets', async (type, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<IWallet[]>(`/wallets?type=${type}`);
    if (!response.data) {
      return [];
    }
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 404) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const createWallet = createAsyncThunk<
  void,
  WalletFormStateMutation,
  { rejectValue: ApiError }
>('wallets/createWallet', async (wallet, { rejectWithValue }) => {
  try {
    await axiosApi.post('/wallets', wallet);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }
    if (isAxiosError(e) && e.response && e.response.status === 403) {
      return rejectWithValue(e.response.data);
    }
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
