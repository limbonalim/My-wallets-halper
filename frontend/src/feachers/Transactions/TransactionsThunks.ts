import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiError, IWallet } from '../../types';
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
