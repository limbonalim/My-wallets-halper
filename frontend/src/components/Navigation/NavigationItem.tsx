import React from 'react';
import { ChartBar, SignOut, Swap, User, Wallet } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import { INavigationItem } from '../../types';

interface Props {
  item: INavigationItem;
  index: number;
}
const NavigationItem: React.FC<Props> = ({ item, index }) => {
  let icon;
  switch (item.icon) {
    case 'User':
      icon = <User size={32} color="#030303" />;
      break;
    case 'Wallet':
      icon = <Wallet size={32} color="#030303" />;
      break;
    case 'Swap':
      icon = <Swap size={32} color="#030303" />;
      break;
    case 'ChartBar':
      icon = <ChartBar size={32} color="#030303" />;
      break;
    case 'SignOut':
      icon = <SignOut size={32} color="#030303" />;
      break;
  }
  if (item.type === 'link' && item.path) {
    return (
      <li key={index} className="Navigation__li">
        <NavLink to={item.path} className="Navigation__link">
          {icon}
          <Typography className="Navigation__link__text">
            {item.title}
          </Typography>
        </NavLink>
      </li>
    );
  } else if (item.type === 'button') {
    return (
      <li key={index} className="Navigation__li">
        <button className="Navigation__link button">
          {icon}
          <Typography className="Navigation__link__text">
            {item.title}
          </Typography>
        </button>
      </li>
    );
  }
  return null;
};

export default NavigationItem;
