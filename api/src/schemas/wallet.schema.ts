import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { User } from './user.schema';

export enum WalletType {
  card = 'card',
  crypto = 'crypto',
  wallet = 'wallet',
}

@Schema()
export class Wallet {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, enum: WalletType, default: WalletType.wallet })
  type: string;
  @Prop({ required: true, default: 0 })
  amount: number;
  @Prop({ required: true, ref: User.name })
  user: MongooseSchema.Types.ObjectId;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

export type WalletDocument = Wallet & Document;
