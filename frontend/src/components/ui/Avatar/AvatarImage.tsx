import React from 'react';
import { Avatar } from '@mui/material';
import { BASE_URL } from '../../../constants.ts';
import { IUser } from '../../../types';

type IUserMutation = Pick<IUser, 'displayName' | 'avatar'>;

interface Props {
  user: IUserMutation | null;
}

const AvatarImage: React.FC<Props> = ({ user }) => {
  let avatar = BASE_URL + user?.avatar;
  if (user?.avatar?.slice(0, 5) === 'https') {
    avatar = user.avatar;
  }

  return (
    <Avatar
      alt={user?.displayName ? user?.displayName : ''}
      src={avatar}
      sx={{ mx: 1 }}
    />
  );
};

export default AvatarImage;
