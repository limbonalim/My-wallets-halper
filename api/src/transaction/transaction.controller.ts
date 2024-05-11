import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Req,
  Res,
  UseGuards,
  HttpStatus,
  UnprocessableEntityException,
  Patch,
  Delete,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Response, Request } from 'express';
import { TransactionService } from './transaction.service';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';
import { CreateTransactionDto } from './create-transaction.dto';
import { UpdateTransactionDto } from './update-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(TokenAuthGuard)
  @Get(':wallet')
  getByWallet(@Param('wallet') wallet: string, @Req() req: Request) {
    return this.transactionService.getByWallet(wallet, req.user.toString());
  }

  @UseGuards(TokenAuthGuard)
  @Post(':wallet')
  async createOne(
    @Param('wallet') wallet: string,
    @Body() data: CreateTransactionDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const answer = await this.transactionService.createOne(
        data,
        req.user.toString(),
        wallet,
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
    @Body() data: UpdateTransactionDto,
    @Req() req: Request,
  ) {
    return this.transactionService.updateOne(
      data,
      req.user.toString(),
      wallet,
    );
  }

  @UseGuards(TokenAuthGuard)
  @Delete(':wallet')
  deleteOne(@Param('wallet') wallet: string, @Req() req: Request) {
    return this.transactionService.deleteOne(wallet, req.user.toString());
  }
}
