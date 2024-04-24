import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import Icon from '../../components/Icon/Icon';
import './Wallets.scss'


const Wallets = () => {
  const { category } = useParams();

  return (
    <div className="Wallets">
      {category ? (
        <Icon type={category} displayStyleClassName="Wallets__icon" />
      ) : null}
      <Typography>{category}</Typography>
    </div>
  );
};

export default Wallets;
