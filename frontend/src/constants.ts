import { INavigationItem } from './types';

export const BASE_URL = 'http://localhost:8000';

export enum WalletType {
  card = 'card',
  crypto = 'crypto',
  wallet = 'wallet',
}

export const navigationItems: INavigationItem[] = [
  {
    title: 'Profile',
    icon: 'User',
    type: 'link',
    path: '/profile',
  },
  {
    title: 'Wallets',
    icon: 'Wallet',
    type: 'link',
    path: '/wallets',
  },
  {
    title: 'Transactions',
    icon: 'Swap',
    type: 'link',
    path: '/transactions',
  },
  {
    title: 'Analitics',
    icon: 'ChartBar',
    type: 'link',
    path: '/analitics',
  },
  {
    title: 'Logout',
    icon: 'SignOut',
    type: 'button',
  },
];
