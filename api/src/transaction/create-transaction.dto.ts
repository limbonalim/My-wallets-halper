import { IsEnum, IsNumber, IsPositive, IsDateString } from 'class-validator';
import {
  TransactionCategory,
  TransactionType,
} from 'src/schemas/transaction.schema';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: string;
  @IsDateString()
  dataTime?: string;
  @IsEnum(TransactionCategory)
  category: string;
  @IsNumber()
  @IsPositive()
  amount: number;
}
