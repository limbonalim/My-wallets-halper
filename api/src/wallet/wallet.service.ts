import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Wallet, WalletDocument } from 'src/schemas/wallet.schema';
import { CreateWalletDto } from './create-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async getByUser(user: string) {
    const userId = new Types.ObjectId(user);
    const result = await this.walletModel.find({ user: userId });
    return result;
  }

  async createOne(walletDto: CreateWalletDto, user: string) {
     const userId = new Types.ObjectId(user);
    return await this.walletModel.create({
      name: walletDto.name,
      type: walletDto.type,
      amount: walletDto.amount,
      user: userId,
    });
  }
}
