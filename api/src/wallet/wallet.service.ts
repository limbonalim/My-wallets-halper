import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    let userId;
    try {
      userId = new Types.ObjectId(user);
    } catch (e) {
      throw new BadRequestException('Something was wrong!');
    }

    const answer = await this.walletModel.find({ user: userId });
    if (!answer[0]) {
      throw new NotFoundException('Wallet is not found');
    }
    return answer;
  }

  async createOne(walletDto: CreateWalletDto, user: string) {
    let userId;
    try {
      userId = new Types.ObjectId(user);
    } catch (e) {
      throw new BadRequestException('Something was wrong!');
    }

    return await this.walletModel.create({
      name: walletDto.name,
      type: walletDto.type,
      amount: walletDto.amount,
      user: userId,
    });
  }
}
