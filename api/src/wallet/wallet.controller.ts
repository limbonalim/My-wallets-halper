import { Response, Request } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';
import { CreateWalletDto } from './create-wallet.dto';
import mongoose from 'mongoose';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @UseGuards(TokenAuthGuard)
  @Get()
  async getByUser(@Req() req: Request) {
    const user = req.user;
    if (!user) {
      return new NotFoundException();
    }
    return this.walletService.getByUser(user.toString());
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  async createOne(
    @Body() data: CreateWalletDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const user = req.user;
      if (!user) {
        return new NotFoundException();
      }
      const answer = await this.walletService.createOne(data, user.toString());
      return res.status(HttpStatus.CREATED).json(answer);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new UnprocessableEntityException(error);
      }
      throw error;
    }
  }
}
