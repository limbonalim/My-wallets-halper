import { WalletType } from './constants.ts';

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

export interface INavigationItem {
  title: string;
  icon: string;
  type: 'button' | 'link';
  path?: string;
  onClick?: () => void;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface IRegisterForm {
  email: string;
  password: string;
  displayName: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  displayName: string;
  avatar?: string;
  role: string;
  token: string;
}

export interface IWallet {
  _id: string;
  name: string;
  type: WalletType;
  amount: number;
}

export interface WalletFormState {
  name: string;
  type: string;
  amount: string;
}

export interface WalletFormStateMutation {
  name: string;
  type: string;
  amount: number;
}

export interface UpdateWalletFormData {
  wallet: WalletFormStateMutation;
  id: string;
}

export interface ITransaction {
  _id: string;
  type: string;
  dataTime: string;
  category: string;
  amount: number;
}

export interface TransactionFormState {
  type: string;
  category: string;
  amount: string;
  dataTime: string;
}

export interface TransactionFormStateMutation {
  type: string;
  dataTime: string;
  category: string;
  amount: number;
}

export interface TransactionFormData {
  wallet: string;
  transaction: TransactionFormStateMutation;
}

export interface UpdateTransactionFormData extends TransactionFormData {
  transactionId: string;
}

export interface GetAnaliticsData {
  interval: string;
  wallet: string;
}