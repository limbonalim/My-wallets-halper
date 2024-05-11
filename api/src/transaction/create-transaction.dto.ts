import { IsDate, IsEnum } from 'class-validator';
import {
  TransactionCategory,
  TransactionType,
} from 'src/schemas/transaction.schema';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: string;
  @IsDate()
  dataTime: string;
  @IsEnum(TransactionCategory)
  category: string;
}
