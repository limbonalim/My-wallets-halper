import React from 'react';
import { ITransaction } from '../../types';
import FormatDate from '../ui/FormatDate/FormatDdate';

const Transaction: React.FC<ITransaction> = ({
  _id,
  type,
  dataTime,
  category,
  amount
}) => {
    const data = new FormatDate(parseFloat(dataTime));
    
  return (
    <div>
      <p>{type}</p>
      <p>{category}</p>
      <p>{amount}</p>
      <p>{data.getFormatDate()}</p>
    </div>
  );
};

export default Transaction;
