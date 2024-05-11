import React from 'react';
import ProfileAvatar from '../../components/ui/ProfileAvatar/ProfileAvatar';
import image from '../../assets/card.png';

const UserProfile = () => {
  return (
    <div>
      <ProfileAvatar src={image} height={150} width={150} button />
    </div>
  );
};

export default UserProfile;
