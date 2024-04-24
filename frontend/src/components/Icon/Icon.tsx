import React from 'react';
import wallet from '../../assets/wallet.png';
import crypto from '../../assets/crypto.png';
import card from '../../assets/card.png';
import { WalletType } from '../../constants';

interface Props {
  type: string;
  displayStyleClassName: string;
}

const Icon: React.FC<Props> = ({ type, displayStyleClassName }) => {
  let icon;
  switch (type) {
    case WalletType.card:
      icon = (
        <img
          src={card}
          alt={WalletType.card}
          className={displayStyleClassName}
        />
      );
      break;
    case WalletType.crypto:
      icon = (
        <img
          src={crypto}
          alt={WalletType.crypto}
          className={displayStyleClassName}
        />
      );
      break;
    case WalletType.wallet:
      icon = (
        <img
          src={wallet}
          alt={WalletType.wallet}
          className={displayStyleClassName}
        />
      );
      break;
  }
  return <>{icon}</>;
};

export default Icon;
