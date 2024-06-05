import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAnalitics, getWallet, getWallets } from './AnaliticsThunks';
import { ApiError, ITransaction, IWallet } from '../../types';

interface AnaliticsState {
  wallets: IWallet[];
  wallet: IWallet | null;
  transactions: ITransaction[];
  isWalletsLoading: boolean;
  isWalletLoading: boolean;
  isTransactionLoading: boolean;
  walletError: ApiError | null;
  transactionError: ApiError | null;
}

const initialState: AnaliticsState = {
  wallets: [],
  wallet: null,
  transactions: [],
  isWalletsLoading: false,
  isWalletLoading: false,
  isTransactionLoading: false,
  walletError: null,
  transactionError: null,
};

const analiticsSlice = createSlice({
  name: 'analitics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWallets.pending, (state) => {
        state.isWalletsLoading = true;
        state.wallets = [];
        state.walletError = null;
      })
      .addCase(
        getWallets.fulfilled,
        (state, { payload: wallets }: PayloadAction<IWallet[]>) => {
          state.isWalletsLoading = false;
          state.wallets = wallets;
        },
      )
      .addCase(getWallets.rejected, (state, { payload: error }) => {
        state.isWalletsLoading = false;
        state.walletError = error || null;
      });

    builder
      .addCase(getWallet.pending, (state) => {
        state.isWalletLoading = true;
        state.wallet = null;
        state.walletError = null;
      })
      .addCase(
        getWallet.fulfilled,
        (state, { payload: wallet }: PayloadAction<IWallet>) => {
          state.isWalletLoading = false;
          state.wallet = wallet;
        },
      )
      .addCase(getWallet.rejected, (state, { payload: error }) => {
        state.isWalletLoading = false;
        state.walletError = error || null;
      });

      builder
        .addCase(getAnalitics.pending, (state) => {
          state.isTransactionLoading = true;
          state.transactions = [];
          state.transactionError = null;
        })
        .addCase(
          getAnalitics.fulfilled,
          (state, { payload: tracnsctions }: PayloadAction<ITransaction[]>) => {
            state.isTransactionLoading = false;
            state.transactions = tracnsctions;
          },
        )
        .addCase(getAnalitics.rejected, (state, { payload: error }) => {
          state.isTransactionLoading = false;
          state.transactionError = error || null;
        });
  },
});

export const selectWallets = (state: RootState) => state.analitics.wallets;
export const selectWallet = (state: RootState) => state.analitics.wallet;
export const selectTransactions = (state: RootState) =>
  state.analitics.transactions;
export const selectIsWalletsLoading = (state: RootState) =>
  state.analitics.isWalletsLoading;
export const selectIsWalletLoading = (state: RootState) =>
  state.analitics.isWalletLoading;
export const selectIsTransactionLoading = (state: RootState) =>
  state.analitics.isTransactionLoading;
export const selectWalletError = (state: RootState) =>
  state.analitics.walletError;
export const selectTransactionError = (state: RootState) =>
  state.analitics.transactionError;

export const analiticsReducer = analiticsSlice.reducer;
