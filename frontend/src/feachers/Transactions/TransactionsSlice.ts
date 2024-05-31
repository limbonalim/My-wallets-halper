import { createSlice } from '@reduxjs/toolkit';
import { ApiError, ITransaction, IWallet } from '../../types';
import { RootState } from '../../app/store';
import {
  createTransaction,
  getTransactions,
  getWallet,
  updateTransaction,
} from './TransactionsThunks';

interface TransactionState {
  wallet: IWallet | null;
  transactions: ITransaction[];
  isWalletLoading: boolean;
  walletError: ApiError | null;
  isTransactionsLoading: boolean;
  transactionsError: ApiError | null;
  isCreateLoading: boolean;
  createError: ApiError | null;
}

const initialState: TransactionState = {
  wallet: null,
  transactions: [],
  isWalletLoading: false,
  walletError: null,
  isTransactionsLoading: false,
  transactionsError: null,
  isCreateLoading: false,
  createError: null,
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

    builder
      .addCase(createTransaction.pending, (state) => {
        state.isCreateLoading = true;
        state.createError = null;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createTransaction.rejected, (state, { payload: error }) => {
        state.isCreateLoading = false;
        state.createError = error || null;
      });

      builder
        .addCase(updateTransaction.pending, (state) => {
          state.isCreateLoading = true;
          state.createError = null;
        })
        .addCase(updateTransaction.fulfilled, (state) => {
          state.isCreateLoading = false;
        })
        .addCase(updateTransaction.rejected, (state, { payload: error }) => {
          state.isCreateLoading = false;
          state.createError = error || null;
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
export const selectIsCreateLoading = (state: RootState) =>
  state.transactions.isCreateLoading;
export const selectCreateError = (state: RootState) =>
  state.transactions.createError;

export const transactionsReduser = transactionsSlice.reducer;
