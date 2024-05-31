import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsDateString,
} from 'class-validator';
import {
  TransactionCategory,
  TransactionType,
} from 'src/schemas/transaction.schema';

export class UpdateTransactionDto {
  @IsOptional()
  @IsEnum(TransactionType)
  type?: string;
  @IsOptional()
  @IsDateString()
  dataTime?: string;
  @IsOptional()
  @IsEnum(TransactionCategory)
  category?: string;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;
}
