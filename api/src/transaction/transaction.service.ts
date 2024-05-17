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

    const answer = [];
    wallets.forEach(async (item) => {
      const result = await this.transactionModel.find({
        wallet: item._id,
      });
      answer.push(...result);
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

    const findInBase = this.walletModel.findOne(checkResult);
    if (!findInBase) {
      throw new NotFoundException('Wallet is not found');
    }

    return await this.transactionModel.create({
      type: transactionDto.type,
      dataTime: transactionDto.dataTime,
      category: transactionDto.category,
      wallet: checkResult._id,
    });
  }

  async updateOne(data: UpdateTransactionDto, wallet: string, user: string) {
    const checkResult = this.walletAndUserCheck(wallet, user);
    if (!checkResult) {
      throw new BadRequestException('Something was wrong!');
    }

    const findInBase = this.walletModel.findOne(checkResult);
    if (!findInBase) {
      throw new NotFoundException('Wallet is not found');
    }

    const answer = await this.transactionModel.updateOne(
      { wallet: checkResult._id },
      { type: data.type, category: data.category, dataTime: data.dataTime },
    );
    if (answer.matchedCount === 1) {
      return { message: 'seccsess' };
    }
    return new NotFoundException({ messaage: 'Transaction is not found!' });
  }

  async deleteOne(wallet: string, user: string) {
    const checkResult = this.walletAndUserCheck(wallet, user);
    if (!checkResult) {
      throw new BadRequestException('Something was wrong!');
    }

    const findInBase = this.walletModel.findOne(checkResult);
    if (!findInBase) {
      throw new NotFoundException('Wallet is not found');
    }

    const answer = await this.transactionModel.deleteOne({
      wallet: checkResult._id,
    });
    if (answer.deletedCount === 1) {
      return { message: 'seccsess' };
    }
    return new NotFoundException({ messaage: 'Transaction is not found!' });
  }
}
