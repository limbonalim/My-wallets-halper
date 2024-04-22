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

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectModel(Wallet.name)
    private walletModel: Model<WalletDocument>,
  ) {}

  async getByWallet(wallet: string, user: string) {
    let walletId;
    let userId;
    try {
      walletId = new Types.ObjectId(wallet);
      userId = new Types.ObjectId(user);
    } catch (e) {
      throw new BadRequestException('Something was wrong!');
    }

    const check = this.walletModel.findOne({
      _id: walletId,
      user: userId,
    });

    if (!check) {
      throw new NotFoundException('Wallet is not found');
    }

    const answer = await this.transactionModel.find({ wallet: walletId });
    if (!answer[0]) {
      throw new NotFoundException('Transactions is not found');
    }
    return answer;
  }

  async createOne(
    transactionDto: CreateTransactionDto,
    user: string,
    wallet: string,
  ) {
    let walletId;
    let userId;
    try {
      walletId = new Types.ObjectId(wallet);
      userId = new Types.ObjectId(user);
    } catch (e) {
      throw new BadRequestException('Something was wrong!');
    }

    const check = this.walletModel.findOne({
      _id: walletId,
      user: userId,
    });

    if (!check) {
      throw new NotFoundException('Wallet is not found');
    }

    return await this.transactionModel.create({
      type: transactionDto.type,
      dataTime: transactionDto.dataTime,
      category: transactionDto.category,
      wallet: walletId,
    });
  }
}
