import { createSlice } from '@reduxjs/toolkit';
import { createWallet, getWallets } from './WalletsThunks';
import { ApiError, IWallet } from '../../types';
import { RootState } from '../../app/store';

interface WalletsState {
  wallets: IWallet[];
  isLoading: boolean;
  error: ApiError | null;
  showForm: boolean;
  isCreateLoading: boolean;
  createError: ApiError | null;
}

const initialState: WalletsState = {
  wallets: [],
  isLoading: false,
  error: null,
  showForm: false,
  isCreateLoading: false,
  createError: null,
};

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    showForm: (state) => {
      state.showForm = true;
    },
    closeForm: (state) => {
      state.showForm = false;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWallets.pending, (state) => {
        state.isLoading = true;
        state.wallets = [];
        state.error = null;
      })
      .addCase(getWallets.fulfilled, (state, { payload: wallets }) => {
        state.wallets = wallets;
        state.isLoading = false;
      })
      .addCase(getWallets.rejected, (state, { payload: error }) => {
        state.isLoading = false;
        state.error = error || null;
      });

    builder
      .addCase(createWallet.pending, (state) => {
        state.isCreateLoading = true;
        state.createError = null;
      })
      .addCase(createWallet.fulfilled, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createWallet.rejected, (state, { payload: error }) => {
        state.isCreateLoading = false;
        state.createError = error || null;
      });
  },
});

export const selectWallets = (state: RootState) => state.wallets.wallets;
export const selectIsLoading = (state: RootState) => state.wallets.isLoading;
export const selectError = (state: RootState) => state.wallets.error;
export const selectShowForm = (state: RootState) => state.wallets.showForm;
export const selectIsCreateLoading = (state: RootState) =>
  state.wallets.isCreateLoading;
export const selectCreateError = (state: RootState) =>
  state.wallets.createError;

export const { showForm, closeForm } = walletsSlice.actions;

export const walletsReduser = walletsSlice.reducer;
