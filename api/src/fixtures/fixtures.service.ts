import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Roles, User, UserDocument } from '../schemas/user.schema';
import { Wallet, WalletDocument, WalletType } from '../schemas/wallet.schema';
import {
  Transaction,
  TransactionCategory,
  TransactionDocument,
  TransactionType,
} from '../schemas/transaction.schema';
import config from '../../config';

@Injectable()
export class FixturesService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {
    void this.createFixture();
  }

  private TransactionTypeArr = Object.values(TransactionType);
  private TransactionCategoryArr = Object.values(TransactionCategory);

  async dropCollection(db: mongoose.Connection, collectionName: string) {
    try {
      console.log('dropping db');
      await db.dropCollection(collectionName);
    } catch (e) {
      console.log(
        `Collection ${collectionName} was missing. skipping drop ...`,
      );
    }
  }

  async createFixture() {
    console.log('Connected db');
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['wallets', 'transactions', 'users'];
    for (const collectionName of collections) {
      await this.dropCollection(db, collectionName);
    }

    const [admin, userTwo] = await this.userModel.create([
      {
        email: 'admin',
        password: '123',
        role: Roles.admin,
        token: 'someToken',
        displayName: 'Admin',
      },
      {
        email: 'user',
        password: '123',
        role: Roles.user,
        token: 'someToken1',
        displayName: 'User',
      },
    ]);

    const [
      walletAdminCard,
      walletAdminCrypto,
      walletAdminWallet,
      walletUserCard,
      walletUserCrypto,
      walletUserWallet,
    ] = await this.walletModel.create([
      {
        name: 'walletAdminCard',
        type: WalletType.card,
        amount: 100,
        user: admin,
      },
      {
        name: 'walletAdminCrypto',
        type: WalletType.crypto,
        amount: 100,
        user: admin,
      },
      {
        name: 'walletAdminWallet',
        type: WalletType.wallet,
        amount: 100,
        user: admin,
      },
      {
        name: 'walletUserCard',
        type: WalletType.card,
        amount: 100,
        user: userTwo,
      },
      {
        name: 'walletUserCrypto',
        type: WalletType.crypto,
        amount: 100,
        user: userTwo,
      },
      {
        name: 'walletUserWallet',
        type: WalletType.wallet,
        amount: 100,
        user: userTwo,
      },
    ]);

    await this.createTransactions(walletAdminCard);
    await this.createTransactions(walletAdminCrypto);
    await this.createTransactions(walletAdminWallet);
    await this.createTransactions(walletUserCard);
    await this.createTransactions(walletUserCrypto);
    await this.createTransactions(walletUserWallet);

    await db.close();
  }

  async createTransactions (wallet) {
    for (let j = 0; j < this.TransactionCategoryArr.length - 1; j++) {
      await this.transactionModel.create({
        type: j % 2 === 0 ? TransactionType.income : TransactionType.outcome,
        category: this.TransactionCategoryArr[j],
        wallet,
        amount: Math.floor(Math.random() * 50),
        dataTime: new Date().toISOString()
      });
    }
  }
}
