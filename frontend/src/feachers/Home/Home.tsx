import React from 'react'
import Wallet from '../../components/wallet/Wallet';
import { WalletType } from '../../constants';
import WalletCategory from '../../components/WalletCategory/WalletCategory';
import './Home.scss'

const data = {}

const Home = () => {
    return (
      <div className='Home__category'>
        <WalletCategory type={WalletType.card} />
        <WalletCategory type={WalletType.wallet} />
        <WalletCategory type={WalletType.crypto} />
      </div>
    );
};

export default Home;