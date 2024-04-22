import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { WalletType } from 'src/schemas/wallet.schema';

export class UpdateWalletDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsEnum(WalletType)
  type?: string;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;
}
