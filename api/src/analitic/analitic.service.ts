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
import { Wallet, WalletDocument } from 'src/schemas/wallet.schema';

@Injectable()
export class AnaliticService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectModel(Wallet.name)
    private walletModel: Model<WalletDocument>,
  ) {}
  private today = new Date();

  private getPrevWeekDate() {
    let prevWeek = new Date();
    prevWeek.setDate(this.today.getDate() - 7);
    return prevWeek.toISOString();
  }

  private getPrevMounthDate() {
    let prevMount = new Date();
    prevMount.setDate(this.today.getDate() - 30);
    return prevMount.toISOString();
  }

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

  async getDataForWeek(wallet: string, user: string) {
    const checkResult = this.walletAndUserCheck(wallet, user);

    if (!checkResult) {
      throw new BadRequestException('Something was wrong!');
    }
    const wallets = await this.walletModel.findOne(checkResult);
    if (!wallets) {
      throw new NotFoundException('Wallet is not found');
    }
    const answer = await this.transactionModel
      .find({
        dataTime: {
          $gte: this.getPrevWeekDate(),
          $lte: this.today.toISOString(),
        },
        wallet: checkResult._id,
      })
      .exec();
    return answer;
  }

  async getDataForMounth(wallet: string, user: string) {
    const checkResult = this.walletAndUserCheck(wallet, user);

    if (!checkResult) {
      throw new BadRequestException('Something was wrong!');
    }
    const wallets = await this.walletModel.findOne(checkResult);
    if (!wallets) {
      throw new NotFoundException('Wallet is not found');
    }
    const answer = await this.transactionModel
      .find({
        dataTime: {
          $gte: this.getPrevMounthDate(),
          $lte: this.today.toISOString(),
        },
        wallet: checkResult._id,
      })
      .exec();
    return answer;
  }
}
