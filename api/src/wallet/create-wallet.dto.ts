import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { WalletType } from 'src/schemas/wallet.schema';

export class CreateWalletDto {
  @IsString()
  name: string;
  @IsEnum(WalletType)
  type: string;
  @IsNumber()
  @IsPositive()
  amount: number;
}
