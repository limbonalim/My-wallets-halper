import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import { ApiError, GetAnaliticsData, ITransaction, IWallet } from '../../types';

export const getWallets = createAsyncThunk<
  IWallet[],
  void,
  { rejectValue: ApiError }
>('analitics/getWallets', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get(`/wallets/all`);
    return await response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    if (isAxiosError(e) && e.response && e.response.status === 404) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const getWallet = createAsyncThunk<
  IWallet,
  string,
  { rejectValue: ApiError }
>('analitics/getWallet', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get(`/wallets/${id}`);
    return await response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    if (isAxiosError(e) && e.response && e.response.status === 404) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const getAnalitics = createAsyncThunk<
  ITransaction[],
  GetAnaliticsData,
  { rejectValue: ApiError }
>('analitics/getTransaction', async (data, { rejectWithValue }) => {
  try {
    const response = axiosApi.get(`/analitics/${data.interval}/${data.wallet}`);
    return (await response).data;
  } catch (e) {
    throw e;
  }
});
