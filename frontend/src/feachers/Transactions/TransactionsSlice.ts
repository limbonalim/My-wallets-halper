import { createSlice } from '@reduxjs/toolkit';
import { ApiError, ITransaction, IWallet } from '../../types';
import { RootState } from '../../app/store';
import { getTransactions, getWallet } from './TransactionsThunks';

interface TransactionState {
  wallet: IWallet | null;
  transactions: ITransaction[];
  isWalletLoading: boolean;
  walletError: ApiError | null;
  isTransactionsLoading: boolean;
  transactionsError: ApiError | null;
}

const initialState: TransactionState = {
  wallet: null,
  transactions: [],
  isWalletLoading: false,
  walletError: null,
  isTransactionsLoading: false,
  transactionsError: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWallet.pending, (state) => {
        state.isWalletLoading = true;
        state.wallet = null;
        state.walletError = null;
      })
      .addCase(getWallet.fulfilled, (state, { payload: wallet }) => {
        state.isWalletLoading = false;
        state.wallet = wallet;
      })
      .addCase(getWallet.rejected, (state, { payload: error }) => {
        state.isWalletLoading = false;
        state.walletError = error || null;
      });

    builder
      .addCase(getTransactions.pending, (state) => {
        state.isTransactionsLoading = true;
        state.transactions = [];
        state.transactionsError = null;
      })
      .addCase(
        getTransactions.fulfilled,
        (state, { payload: tracnsctions }) => {
          state.isTransactionsLoading = false;
          state.transactions = tracnsctions;
        },
      )
      .addCase(getTransactions.rejected, (state, { payload: error }) => {
        state.isTransactionsLoading = false;
        state.transactionsError = error || null;
      });
  },
});

export const selectWallet = (state: RootState) => state.transactions.wallet;
export const selectTransactions = (state: RootState) =>
  state.transactions.transactions;
export const selectIsWalletLoading = (state: RootState) =>
  state.transactions.isWalletLoading;
export const selectWalletError = (state: RootState) =>
  state.transactions.walletError;
export const selectIsTransactionsLoading = (state: RootState) =>
  state.transactions.isTransactionsLoading;
export const selectTransactionsError = (state: RootState) =>
  state.transactions.transactionsError;

export const transactionsReduser = transactionsSlice.reducer;
