import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
  TransactionType,
} from 'src/schemas/transaction.schema';
import { CreateTransactionDto } from './create-transaction.dto';
import { Wallet, WalletDocument } from 'src/schemas/wallet.schema';
import { UpdateTransactionDto } from './update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectModel(Wallet.name)
    private walletModel: Model<WalletDocument>,
  ) {}

  private walletAndUserCheck(wallet: string, user: string) {
    let walletId;
    let userId;
    try {
      walletId = new Types.ObjectId(wallet);
      userId = new Types.ObjectId(user);
      return { _id: walletId, user: userId };
    } catch (e) {
      return null;
    }
  }

  async getByWallet(wallet: string, user: string) {
    const checkResult = this.walletAndUserCheck(wallet, user);
    if (!checkResult) {
      throw new BadRequestException('Something was wrong!');
    }

    const wallets = await this.walletModel.findOne(checkResult);
    if (!wallets) {
      throw new NotFoundException('Wallet is not found');
    }

    const answer = await this.transactionModel.find({
      wallet: checkResult._id,
    });
    if (!answer[0]) {
      throw new NotFoundException('Transactions is not found');
    }
    return answer;
  }

  async getAll(user: string) {
    let userId;
    try {
      userId = new Types.ObjectId(user);
    } catch (e) {
      throw new BadRequestException('Something was wrong!');
    }
    const wallets = await this.walletModel.find({ user: userId });
    if (!wallets[0]) {
      throw new NotFoundException('Wallets is not found');
    }

    const promises = wallets.map((item) => {
      return this.transactionModel.find({
        wallet: item._id,
      });
    });

    const answer = await Promise.all(promises).then((values) => {
      return values.flat();
    });
    return answer;
  }

  async createOne(
    transactionDto: CreateTransactionDto,
    user: string,
    wallet: string,
  ) {
    const checkResult = this.walletAndUserCheck(wallet, user);
    if (!checkResult) {
      throw new BadRequestException('Something was wrong!');
    }

    const findInBase = await this.walletModel.findOne(checkResult);
    if (!findInBase) {
      throw new NotFoundException('Wallet is not found');
    }
    const answer = await this.transactionModel.create({
      type: transactionDto.type,
      dataTime: transactionDto.dataTime,
      amount: transactionDto.amount,
      category: transactionDto.category,
      wallet: checkResult._id,
    });

    if (transactionDto.type === TransactionType.income) {
      await this.walletModel.updateOne(checkResult, {
        amount: findInBase.amount + answer.amount,
      });
    } else if (transactionDto.type === TransactionType.outcome) {
      await this.walletModel.updateOne(checkResult, {
        amount: findInBase.amount - answer.amount,
      });
    }

    return answer;
  }

  async updateOne(
    data: UpdateTransactionDto,
    user: string,
    wallet: string,
    transaction: string,
  ) {
    const checkResult = this.walletAndUserCheck(wallet, user);
    if (!checkResult) {
      throw new BadRequestException('Something was wrong!');
    }

    const currentWallet = await this.walletModel.findOne(checkResult);
    if (!currentWallet) {
      throw new NotFoundException('Wallet is not found');
    }

    const currentTransaction = await this.transactionModel.findOne({
      _id: new Types.ObjectId(transaction),
      wallet: checkResult._id,
    });
    if (!currentWallet) {
      throw new NotFoundException('Transaction is not found');
    }

    const answer = await this.transactionModel.updateOne(
      { wallet: checkResult._id },
      {
        type: data.type,
        category: data.category,
        dataTime: data.dataTime,
        amount: data.amount,
      },
    );
    if (answer.matchedCount === 1) {
      if (currentTransaction.type === TransactionType.income) {
        await this.walletModel.updateOne(checkResult, {
          amount: currentWallet.amount - currentTransaction.amount,
        });
      } else if (currentTransaction.type === TransactionType.outcome) {
        await this.walletModel.updateOne(checkResult, {
          amount: currentWallet.amount + currentTransaction.amount,
        });
      }
      const updatedWallet = await this.walletModel.findOne(checkResult);
      if (data.type === TransactionType.income) {
        await this.walletModel.updateOne(checkResult, {
          amount: updatedWallet.amount + data.amount,
        });
      } else if (data.type === TransactionType.outcome) {
        await this.walletModel.updateOne(checkResult, {
          amount: updatedWallet.amount - data.amount,
        });
      }
      return { message: 'seccsess' };
    }
    return new NotFoundException({ messaage: 'Transaction is not found!' });
  }

  async deleteOne(user: string, transaction: string) {
    let transactionId;
    let userId;
    try {
      transactionId = new Types.ObjectId(transaction);
      userId = new Types.ObjectId(user);
    } catch (e) {
      throw new BadRequestException('Something was wrong!');
    }

    const answer = await this.transactionModel.deleteOne({
      _id: transactionId,
    });
    if (answer.deletedCount === 1) {
      return { message: 'seccsess' };
    }
    return new NotFoundException({ messaage: 'Transaction is not found!' });
  }
}
