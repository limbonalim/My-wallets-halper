import { useAppDispatch } from './app/hooks';
import { INavigationItem } from './types';

export const BASE_URL = 'http://localhost:8000';

export enum WalletType {
  card = 'card',
  crypto = 'crypto',
  wallet = 'wallet',
}