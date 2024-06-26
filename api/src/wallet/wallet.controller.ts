import { Response, Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { WalletService } from './wallet.service';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';
import { CreateWalletDto } from './create-wallet.dto';
import { UpdateWalletDto } from './update-wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @UseGuards(TokenAuthGuard)
  @Get()
  getByUser(@Req() req: Request, @Query('type') type: string) {
    return this.walletService.getByUser(req.user.toString(), type);
  }

  @UseGuards(TokenAuthGuard)
  @Get('/all')
  getAllByUser(@Req() req: Request) {
    return this.walletService.getAllByUser(req.user.toString());
  }

  @UseGuards(TokenAuthGuard)
  @Get(':id')
  async getOne(@Req() req: Request, @Param('id') id: string) {
    return await this.walletService.getOne(req.user.toString(), id);
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

  @UseGuards(TokenAuthGuard)
  @Patch(':wallet')
  updateOne(
    @Param('wallet') wallet: string,
    @Req() req: Request,
    @Body() data: UpdateWalletDto,
  ) {
    return this.walletService.updateOne(wallet, req.user.toString(), data);
  }

  @UseGuards(TokenAuthGuard)
  @Delete(':wallet')
  deleteOne(@Param('wallet') wallet: string, @Req() req: Request) {
    return this.walletService.deleteOne(wallet, req.user.toString());
  }
}
