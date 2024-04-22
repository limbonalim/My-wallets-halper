import { Response, Request } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { WalletService } from './wallet.service';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';
import { CreateWalletDto } from './create-wallet.dto';


@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @UseGuards(TokenAuthGuard)
  @Get()
  getByUser(@Req() req: Request) {
    return this.walletService.getByUser(req.user.toString());
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  async createOne(
    @Body() data: CreateWalletDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const answer = await this.walletService.createOne(
        data,
        req.user.toString(),
      );
      return res.status(HttpStatus.CREATED).json(answer);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new UnprocessableEntityException(error);
      }
      throw error;
    }
  }
}
