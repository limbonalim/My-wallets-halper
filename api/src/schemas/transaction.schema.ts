import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { Wallet } from './wallet.schema';

export enum TransactionType {
  income = 'income',
  outcome = 'outcome',
}

export enum TransactionCategory {
  food = 'food',
  clothes = 'clothes',
  rent = 'rent',
  paymentForServices = 'payment for services',
  mobilePayment = 'mobile payment',
  internetPayment = 'internet payment',
  translations = 'translations',
  salary = 'salary',
  grocery = 'grocery',
  other = 'other',
}

@Schema()
export class Transaction {
  @Prop({ required: true, enum: TransactionType })
  type: string;
  @Prop({ required: true, default: Date.now })
  dataTime: string;
  @Prop({ required: true, enum: TransactionCategory })
  category: string;
  @Prop({ required: true, ref: Wallet.name })
  wallet: MongooseSchema.Types.ObjectId;
  @Prop({required: true})
  amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

export type TransactionDocument = Transaction & Document;
