import { createSlice } from '@reduxjs/toolkit';
import { createWallet, getWallets, updateWallet } from './WalletsThunks';
import { ApiError, IWallet } from '../../types';
import { RootState } from '../../app/store';

interface WalletsState {
  wallets: IWallet[];
  isLoading: boolean;
  error: ApiError | null;
  showForm: boolean;
  isFormLoading: boolean;
  formError: ApiError | null;
}

const initialState: WalletsState = {
  wallets: [],
  isLoading: false,
  error: null,
  showForm: false,
  isFormLoading: false,
  formError: null,
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
      state.formError = null;
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
        state.isFormLoading = true;
        state.formError = null;
      })
      .addCase(createWallet.fulfilled, (state) => {
        state.isFormLoading = false;
      })
      .addCase(createWallet.rejected, (state, { payload: error }) => {
        state.isFormLoading = false;
        state.formError = error || null;
      });

      builder
        .addCase(updateWallet.pending, (state) => {
          state.isFormLoading = true;
          state.formError = null;
        })
        .addCase(updateWallet.fulfilled, (state) => {
          state.isFormLoading = false;
        })
        .addCase(updateWallet.rejected, (state, { payload: error }) => {
          state.isFormLoading = false;
          state.formError = error || null;
        });
  },
});

export const selectWallets = (state: RootState) => state.wallets.wallets;
export const selectIsLoading = (state: RootState) => state.wallets.isLoading;
export const selectError = (state: RootState) => state.wallets.error;
export const selectShowForm = (state: RootState) => state.wallets.showForm;
export const selectIsFormLoading = (state: RootState) =>
  state.wallets.isFormLoading;
export const selectFormError = (state: RootState) =>
  state.wallets.formError;

export const { showForm, closeForm } = walletsSlice.actions;

export const walletsReduser = walletsSlice.reducer;
