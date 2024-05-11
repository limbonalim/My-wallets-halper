import NavigationItem from './NavigationItem';
import { INavigationItem } from '../../types';
import './Navigation.scss';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../feachers/Users/usersThunks';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const navigationItems: INavigationItem[] = [
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
      onClick: () => {
        dispatch(logout());
      },
    },
  ];
  return (
    <ul className="Navigation">
      {navigationItems.map((item, index) => (
        <NavigationItem key={index} item={item} index={index} />
      ))}
    </ul>
  );
};

export default Navigation;
