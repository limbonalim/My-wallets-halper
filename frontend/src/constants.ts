import { useAppDispatch } from './app/hooks';
import { INavigationItem } from './types';

export const BASE_URL = 'http://localhost:8000';

export enum WalletType {
  card = 'card',
  crypto = 'crypto',
  wallet = 'wallet',
}

export enum TransactionType {
  income = 'income',
  outcome = 'outcome',
}

export enum TransactionCategory {
  food = 'food',
  clothes = 'clothes',
  rent = 'rent',
  paymentForServices = 'payment for services',
  mobilePayment = 'mobile payment',
  internetPayment = 'internet payment',
  translations = 'translations',
  salary = 'salary',
  grocery = 'grocery',
  other = 'other',
}

export const WalletTypeSelectData = Object.values(WalletType);
export const TransactionTypeSelectData = Object.values(TransactionType);
export const TransactionCategorySelectData = Object.values(TransactionCategory);
