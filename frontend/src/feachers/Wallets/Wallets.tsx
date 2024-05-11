import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { ArrowLeft } from '@phosphor-icons/react';
import Icon from '../../components/Icon/Icon';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectError,
  selectIsLoading,
  selectShowForm,
  selectWallets,
  showForm,
} from './WalletsSlice';
import { getWallets } from './WalletsThunks';
import AddButton from '../../components/ui/AddButton/AddButton';
import WalletForm from '../../components/AddWalletForm/WalletForm';
import Wallet from '../../components/wallet/Wallet';
import './Wallets.scss';


const Wallets = () => {
  const { type } = useParams();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const wallets = useAppSelector(selectWallets);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const showFormState = useAppSelector(selectShowForm);

  useEffect(() => {
    if (type) {
      dispatch(getWallets(type));
    }
  }, [type, dispatch]);

  const showFormFields = () => {
    dispatch(showForm());
  };

  return (
    <div className="Wallets">
      <div className="Wallets__title">
        <button className="Base_batton" onClick={() => navigation('/wallets')}>
          <ArrowLeft size={32} color="#030303" />
        </button>
        <div>
          {type ? (
            <Icon type={type} displayStyleClassName="Wallets__icon" />
          ) : null}
        </div>
        <Typography>{type}</Typography>
      </div>
      <div>
        {wallets.map((item) => (
          <Wallet
            _id={item._id}
            amount={item.amount}
            name={item.name}
            type={item.type}
          />
        ))}
      </div>
      <div className="Wallets__formWrapper">
        <WalletForm title="Create" show={showFormState} type={type} />
      </div>
      <AddButton onClick={showFormFields} />
    </div>
  );
};

export default Wallets;
