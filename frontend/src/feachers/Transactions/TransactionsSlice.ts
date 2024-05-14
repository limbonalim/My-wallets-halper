import { createSlice } from '@reduxjs/toolkit';
import { ApiError, ITransaction, IWallet } from '../../types';
import { RootState } from '../../app/store';
import { getWallet } from './TransactionsThunks';

interface TransactionState {
  wallet: IWallet | null;
  transactions: ITransaction[];
  isWalletLoading: boolean;
  walletError: ApiError | null;
}

const initialState: TransactionState = {
  wallet: null,
  transactions: [],
  isWalletLoading: false,
  walletError: null,
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
  },
});

export const selectWallet = (state: RootState) => state.transactions.wallet;
export const selectTransactions = (state: RootState) =>
  state.transactions.transactions;

export const transactionsReduser = transactionsSlice.reducer;
