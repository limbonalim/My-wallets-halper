import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks.ts';
import { logout } from '../../feachers/Users/usersThunks.ts';
import AvatarImage from '../ui/Avatar/AvatarImage.tsx';
import type { IUser } from '../../types';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    navigate('/profile')
  };

  return (
    <>
      <Button color="inherit" onClick={onClick}>
        <Typography> Hello, {user.displayName}</Typography>
        {user.avatar ? (
          <AvatarImage user={user} />
        ) : (
          <AccountCircleIcon sx={{ mx: 1 }} />
        )}
      </Button>
    </>
  );
};

export default UserMenu;
