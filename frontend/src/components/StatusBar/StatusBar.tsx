import React from 'react';
import { ITransaction } from '../../types';
import StatusBarCounter from './StatusBarCounter';
import { Typography } from '@mui/material';

interface Props {
  data: ITransaction[];
}

const StatusBar: React.FC<Props> = ({ data }) => {
  const sum = new StatusBarCounter(data);
  const ammountPercent = sum.getPercent();
  const statistic = sum.getStatistic();

  return (
    <div>
      <Typography>Amount: {sum.amount}</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Outcome: {sum.outcomeAmount}</Typography>
        <Typography>Income: {sum.incomeAmount}</Typography>
      </div>
      <div style={{ display: 'flex', height: '30px' }}>
        <div
          style={{
            background: 'red',
            width: `${ammountPercent.outcomePercent}%`,
          }}
        ></div>
        <div
          style={{
            background: 'green',
            width: `${ammountPercent.incomePercent}%`,
          }}
        ></div>
      </div>
      <ul>
        {statistic.map((item) => (
          <li key={item.category}>
            <Typography>
              {item.category} - {item.amount}
            </Typography>
            <div style={{ display: 'flex', height: '5px' }}>
              <div
                style={{
                  background: 'gray',
                  width: `${item.percent}%`,
                }}
              ></div>
              <div
                style={{
                  background: 'green',
                }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusBar;
