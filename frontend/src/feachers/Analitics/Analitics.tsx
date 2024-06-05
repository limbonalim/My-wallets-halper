import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectIsTransactionLoading,
  selectIsWalletLoading,
  selectIsWalletsLoading,
  selectTransactionError,
  selectTransactions,
  selectWallet,
  selectWalletError,
} from './AnaliticsSlice';
import AnaliticsSelect from '../../components/AnaliticsSelect/AnaliticsSelect';
import Wallet from '../../components/wallet/Wallet';
import StatusBar from '../../components/StatusBar/StatusBar';

const Analitics = () => {
  const dispatch = useAppDispatch();
  const wallet = useAppSelector(selectWallet);
  const analitics = useAppSelector(selectTransactions);
  const isWalletsLoading = useAppSelector(selectIsWalletsLoading);
  const isWalletLaoding = useAppSelector(selectIsWalletLoading);
  const isAnaliticsLoading = useAppSelector(selectIsTransactionLoading);
  const walletError = useAppSelector(selectWalletError);
  const analiticsError = useAppSelector(selectTransactionError);
  console.log(analitics);

  return (
    <div>
      <AnaliticsSelect />
      <div>
        {wallet ? (
          <Wallet
            _id={wallet?._id}
            amount={wallet?.amount}
            name={wallet?.name}
            type={wallet?.type}
          />
        ) : null}
      </div>
      {analitics && wallet ? <StatusBar data={analitics} /> : null}
    </div>
  );
};

export default Analitics;
