import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'config';
import { User, UserSchema } from './schemas/user.schema';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { AuthService } from './auth/auth.service';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';
import { FixturesService } from './fixtures/fixtures.service';
import { AnaliticController } from './analitic/analitic.controller';
import { AnaliticService } from './analitic/analitic.service';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoose.db),
    PassportModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [AppController, UserController, WalletController, TransactionController, AnaliticController],
  providers: [
    AppService,
    UserService,
    AuthService,
    LocalStrategy,
    WalletService,
    TransactionService,
    FixturesService,
    AnaliticService
  ],
})
export class AppModule {}
