import {
  TransactionCategorySelectData,
  TransactionType,
} from '../../constants';
import { ITransaction } from '../../types';

class StatusBarCounter {
  constructor(public data: ITransaction[]) {}

  public amount = this.data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );

  public incomeAmount = this.data.reduce((accumulator, currentValue) => {
    if (currentValue.type === TransactionType.income) {
      return accumulator + currentValue.amount;
    }
    return accumulator;
  }, 0);

  public outcomeAmount = this.data.reduce((accumulator, currentValue) => {
    if (currentValue.type === TransactionType.outcome) {
      return accumulator + currentValue.amount;
    }
    return accumulator;
  }, 0);

  getPercent() {
    return {
      outcomePercent: (this.outcomeAmount / this.amount) * 100,
      incomePercent: (this.incomeAmount / this.amount) * 100,
    };
  }

  getStatistic() {
    return TransactionCategorySelectData.map((category) => {
      let amount = 0;
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].category === category) {
          amount += this.data[i].amount;
        }
      }
      return { category, amount, percent: (amount / this.amount) * 100 };
    });
  }
}

export default StatusBarCounter;
