import { IsDate, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import {
  TransactionCategory,
  TransactionType,
} from 'src/schemas/transaction.schema';

export class UpdateTransactionDto {
  @IsOptional()
  @IsEnum(TransactionType)
  type?: string;
  @IsOptional()
  @IsDate()
  dataTime?: string;
  @IsOptional()
  @IsEnum(TransactionCategory)
  category?: string;
  @IsNumber()
  @IsPositive()
  amount?: number;
}
